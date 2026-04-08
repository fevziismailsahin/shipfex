-- Migration 001: ShipFex Genesis v1.0 schema

-- ============================================================
-- Schemas
-- ============================================================
CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS governance;
CREATE SCHEMA IF NOT EXISTS twin;
CREATE SCHEMA IF NOT EXISTS catalog;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS oms;
CREATE SCHEMA IF NOT EXISTS integration;

-- ============================================================
-- app.tenant_id() helper for RLS policies
-- ============================================================
CREATE OR REPLACE FUNCTION app.tenant_id() RETURNS uuid AS $$
  SELECT current_setting('app.tenant_id')::uuid;
$$ LANGUAGE sql STABLE;

-- ============================================================
-- Enums
-- ============================================================
DO $$ BEGIN
  CREATE TYPE inventory.lot_status AS ENUM (
    'Available', 'Reserved', 'Quarantined', 'InTransit'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE inventory.ledger_action AS ENUM (
    'PUT', 'PICK', 'ADJUST_UP', 'ADJUST_DOWN',
    'RESERVE', 'RELEASE', 'MOVE_OUT', 'MOVE_IN', 'COUNT'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE oms.allocation_status AS ENUM (
    'PENDING', 'COMPLETED', 'ROLLING_BACK', 'FAILED'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE oms.reservation_status AS ENUM (
    'RESERVED', 'RELEASED', 'PICKED'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- governance.tenant
-- ============================================================
CREATE TABLE IF NOT EXISTS governance.tenant (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- twin.location
-- ============================================================
CREATE TABLE IF NOT EXISTS twin.location (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       uuid NOT NULL REFERENCES governance.tenant(id),
    barcode_alias   text NOT NULL,
    metadata        jsonb NOT NULL DEFAULT '{}',
    created_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, barcode_alias)
);

ALTER TABLE twin.location ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON twin.location
    FOR ALL
    USING (tenant_id = app.tenant_id());

-- ============================================================
-- catalog.asset_master
-- ============================================================
CREATE TABLE IF NOT EXISTS catalog.asset_master (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       uuid NOT NULL REFERENCES governance.tenant(id),
    sku_or_part_num text NOT NULL,
    metadata        jsonb NOT NULL DEFAULT '{}',
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, sku_or_part_num)
);

CREATE INDEX IF NOT EXISTS idx_asset_master_upc
    ON catalog.asset_master ((metadata->>'upc'));

ALTER TABLE catalog.asset_master ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON catalog.asset_master
    FOR ALL
    USING (tenant_id = app.tenant_id());

-- ============================================================
-- inventory.inventory_lot
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory.inventory_lot (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           uuid NOT NULL REFERENCES governance.tenant(id),
    location_id         uuid NOT NULL REFERENCES twin.location(id),
    asset_id            uuid NOT NULL REFERENCES catalog.asset_master(id),
    lot_profile         jsonb NOT NULL DEFAULT '{}',
    lot_profile_hash    text GENERATED ALWAYS AS (md5(lot_profile::text)) STORED,
    status              inventory.lot_status NOT NULL DEFAULT 'Available',
    quantity_available  numeric NOT NULL DEFAULT 0 CHECK (quantity_available >= 0),
    quantity_reserved   numeric NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, location_id, asset_id, lot_profile_hash)
);

ALTER TABLE inventory.inventory_lot ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON inventory.inventory_lot
    FOR ALL
    USING (tenant_id = app.tenant_id());

-- ============================================================
-- inventory.inventory_ledger_event (append-only)
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory.inventory_ledger_event (
    event_id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           uuid NOT NULL REFERENCES governance.tenant(id),
    lot_id              uuid NOT NULL REFERENCES inventory.inventory_lot(id),
    action              inventory.ledger_action NOT NULL,
    quantity            numeric NOT NULL,
    idempotency_key     text NOT NULL,
    correlation_id      text,
    causation_id        uuid,
    metadata            jsonb NOT NULL DEFAULT '{}',
    occurred_at         timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, idempotency_key)
);

ALTER TABLE inventory.inventory_ledger_event ENABLE ROW LEVEL SECURITY;

-- Ledger: allow INSERT and SELECT, but REVOKE UPDATE and DELETE at object level
CREATE POLICY tenant_insert ON inventory.inventory_ledger_event
    FOR INSERT
    WITH CHECK (tenant_id = app.tenant_id());

CREATE POLICY tenant_select ON inventory.inventory_ledger_event
    FOR SELECT
    USING (tenant_id = app.tenant_id());

-- Revoke UPDATE/DELETE from all roles to enforce append-only
REVOKE UPDATE, DELETE ON inventory.inventory_ledger_event FROM PUBLIC;

-- ============================================================
-- integration.outbox_event
-- ============================================================
CREATE TABLE IF NOT EXISTS integration.outbox_event (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       uuid NOT NULL REFERENCES governance.tenant(id),
    dedup_key       text NOT NULL,
    topic           text NOT NULL,
    payload         jsonb NOT NULL DEFAULT '{}',
    created_at      timestamptz NOT NULL DEFAULT now(),
    published_at    timestamptz,
    UNIQUE (tenant_id, dedup_key)
);

CREATE INDEX IF NOT EXISTS idx_outbox_unpublished
    ON integration.outbox_event (created_at)
    WHERE published_at IS NULL;

ALTER TABLE integration.outbox_event ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON integration.outbox_event
    FOR ALL
    USING (tenant_id = app.tenant_id());

-- ============================================================
-- oms.allocation_attempt
-- ============================================================
CREATE TABLE IF NOT EXISTS oms.allocation_attempt (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       uuid NOT NULL REFERENCES governance.tenant(id),
    order_id        uuid NOT NULL,
    status          oms.allocation_status NOT NULL DEFAULT 'PENDING',
    reserved_lots   jsonb NOT NULL DEFAULT '{}',
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, order_id)
);

ALTER TABLE oms.allocation_attempt ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON oms.allocation_attempt
    FOR ALL
    USING (tenant_id = app.tenant_id());

-- ============================================================
-- oms.reservation
-- ============================================================
CREATE TABLE IF NOT EXISTS oms.reservation (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id           uuid NOT NULL REFERENCES governance.tenant(id),
    order_id            uuid NOT NULL,
    line_id             uuid NOT NULL,
    lot_id              uuid NOT NULL REFERENCES inventory.inventory_lot(id),
    quantity            numeric NOT NULL CHECK (quantity > 0),
    status              oms.reservation_status NOT NULL DEFAULT 'RESERVED',
    reserve_event_id    uuid,
    release_event_id    uuid,
    pick_event_id       uuid,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, order_id, line_id, lot_id)
);

ALTER TABLE oms.reservation ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON oms.reservation
    FOR ALL
    USING (tenant_id = app.tenant_id());
