# ShipFex: Database Schema Design (PostgreSQL)

This document outlines a scalable, normalized relational database schema for the ShipFex platform, designed to support multi-tenancy and the core features of an integrated ecommerce, shipping, and logistics system.

---

## 1. Entity-Relationship Diagram (ERD)

Here is a text-based representation of the core relationships. `(1) --- (*)` indicates a one-to-many relationship.

```
+-----------+ (1) --- (*) +----------------+ (1) --- (*) +-------------------+
| merchants |-------------|   merchant_users |-------------|       users       |
+-----------+             +----------------+             +-------------------+
      |                   (Role is here)
      |
(1)---*--------------------------------------------------------------------------------------------------+
      |                                                                                                  |
      | (1)---(*) +-------------+                                                                        |
      |-----------| warehouses  | (1) --- (*) +------------------+                                       |
      |           +-------------+             | inventory_levels | (*) --- (1) +----------------+       |
      |                                       +------------------+-------------| product_variants |       |
      |                                                                        +----------------+       |
      | (1)---(*) +--------------+ (1) --- (*) +----------------+ (1) --- (*)           | (1)            |
      |-----------|   products     |-------------| product_variants |-------------+       |                |
      |           +--------------+             +----------------+             |       |                |
      |                                                |                      |       |                |
      |                                                +----------------------+       |                |
      |                                                                               |                |
      | (1)---(*) +--------------+ (1) --- (*) +-----------------+                     |                |
      |-----------|  customers   |-------------|      orders     |---------------------+----------------+
      |           +--------------+             +-----------------+ (1)---(*) +-------------+          |
      |                                                |                     | order_items |          |
      |                                                |                     +-------------+          |
      |                                                |                                              |
      |           +------------------------------------+------------------------------------------+    |
      |           |                                    |                                          |    |
      |     (1)---*---+-------------+ (1)---(*) +---------------+ (1)---(*) +------------------+   |    |
      |-----------| integrations  |             |   shipments   |-------------| shipment_items   |   |    |
      |           +-------------+             +---------------+             +------------------+   |    |
      |                                                |                                              |
|
      |     (1)---*---+--------------+ (1)---(*) +-----------------+ (1)---(*) +-----------------+    |
      |-----------|    suppliers   |-------------| inbound_notices |-------------| inbound_items   |    |
      |           +--------------+             +-----------------+             +-----------------+    |
      |                                                                                               |
      |     (1-0)-*---+-------------+ (1)---(*) +--------------+ (1)---(*) +----------------+     |
      `-----------| return_requests|-------------| return_items |-------------| stock_movements|     |
                  +--------------+             +--------------+             +----------------+     |
                        |                                                          | (Polymorphic)  |
                        | (Links to original order_items)                            |                |
                        +------------------------------------------------------------+----------------+

```

---

## 2. Tables with Field Definitions (PostgreSQL)

### Core & Multi-Tenancy

**1. `merchants`**
Manages the tenants.
```sql
CREATE TABLE merchants (
    merchant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- subscription_status, billing_info, etc. can be added here
);
```

**2. `users`**
Stores user credentials. A user can exist without being part of a merchant.
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);
```

**3. `merchant_users` (Junction Table)**
Links users to merchants with specific roles.
```sql
CREATE TYPE merchant_role AS ENUM ('Admin', 'Manager', 'Staff', 'Read-Only');

CREATE TABLE merchant_users (
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role merchant_role NOT NULL DEFAULT 'Staff',
    PRIMARY KEY (merchant_id, user_id)
);
```

### Product & Inventory

**4. `products`**
The core product definition.
```sql
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(merchant_id, name)
);
CREATE INDEX ON products(merchant_id);
```

**5. `product_variants`**
Stores the individual SKUs for a product (e.g., size, color).
```sql
CREATE TABLE product_variants (
    variant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL,
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    attributes JSONB, -- e.g., {"size": "Large", "color": "Black"}
    barcode VARCHAR(100), -- UPC, EAN, etc.
    weight_grams INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(merchant_id, sku)
);
CREATE INDEX ON product_variants(product_id);
CREATE INDEX ON product_variants(merchant_id, sku);
```

**6. `warehouses`**
Physical locations where inventory is stored.
```sql
CREATE TABLE warehouses (
    warehouse_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address JSONB, -- {"street": "123 Main St", "city": "Anytown", ...}
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE(merchant_id, name)
);
CREATE INDEX ON warehouses(merchant_id);
```

**7. `inventory_levels`**
Tracks stock for each variant at each warehouse. This is the heart of inventory management.
```sql
CREATE TABLE inventory_levels (
    inventory_level_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    warehouse_id UUID NOT NULL REFERENCES warehouses(warehouse_id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    quantity_on_hand INT NOT NULL DEFAULT 0,
    quantity_allocated INT NOT NULL DEFAULT 0,
    -- quantity_available is (quantity_on_hand - quantity_allocated)
    low_stock_threshold INT,
    UNIQUE(merchant_id, warehouse_id, variant_id)
);
CREATE INDEX ON inventory_levels(variant_id);
```

### Sales & Order Management

**8. `customers`**
Stores customer information, shared across orders.
```sql
CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    email VARCHAR(255),
    full_name VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(merchant_id, email)
);
CREATE INDEX ON customers(merchant_id, email);
```

**9. `orders`**
Captures an entire order from a sales channel.
```sql
CREATE TYPE order_status AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled');
CREATE TYPE payment_status AS ENUM ('Paid', 'Unpaid', 'Refunded', 'Partially_Refunded');

CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(customer_id),
    integration_id UUID, -- REFERENCES integrations(integration_id)
    external_order_id VARCHAR(100), -- ID from Shopify, Amazon, etc.
    order_number VARCHAR(100) NOT NULL,
    order_status order_status NOT NULL DEFAULT 'Pending',
    payment_status payment_status NOT NULL DEFAULT 'Unpaid',
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    total_price NUMERIC(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL,
    notes TEXT,
    ordered_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(merchant_id, external_order_id, integration_id)
);
CREATE INDEX ON orders(merchant_id, order_status);
CREATE INDEX ON orders(customer_id);
```

**10. `order_items`**
The line items within an order.
```sql
CREATE TABLE order_items (
    order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(variant_id),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    -- quantity_shipped, quantity_returned can be added for complex fulfillment
);
CREATE INDEX ON order_items(order_id);
CREATE INDEX ON order_items(variant_id);
```

### Shipping & Logistics

**11. `shipments`**
Tracks an outbound package. An order can have multiple shipments (partial fulfillment).
```sql
CREATE TYPE shipment_status AS ENUM ('Pending', 'In_Transit', 'Delivered', 'Failed');

CREATE TABLE shipments (
    shipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    warehouse_id UUID NOT NULL REFERENCES warehouses(warehouse_id),
    carrier VARCHAR(100) NOT NULL, -- e.g., 'UPS', 'FedEx'
    tracking_number VARCHAR(255),
    tracking_url TEXT,
    shipping_label_url TEXT,
    status shipment_status NOT NULL DEFAULT 'Pending',
    shipped_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX ON shipments(order_id);
```

**12. `shipment_items` (Junction Table)**
Links items from an order to a specific shipment.
```sql
CREATE TABLE shipment_items (
    shipment_id UUID NOT NULL REFERENCES shipments(shipment_id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES order_items(order_item_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    PRIMARY KEY (shipment_id, order_item_id)
);
```

### Inbound & Returns

**13. `suppliers`**
Where inventory comes from.
```sql
CREATE TABLE suppliers (
    supplier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    contact_info JSONB,
    UNIQUE(merchant_id, name)
);
```

**14. `inbound_notices` (ASNs)**
Advance Shipping Notices for incoming stock.
```sql
CREATE TYPE inbound_status AS ENUM ('In_Transit', 'Receiving', 'Received', 'Cancelled');

CREATE TABLE inbound_notices (
    inbound_notice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES suppliers(supplier_id),
    warehouse_id UUID NOT NULL REFERENCES warehouses(warehouse_id),
    tracking_number VARCHAR(255),
    expected_at DATE NOT NULL,
    received_at TIMESTAMPTZ,
    status inbound_status NOT NULL DEFAULT 'In_Transit',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**15. `inbound_items`**
Line items expected in an ASN.
```sql
CREATE TABLE inbound_items (
    inbound_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inbound_notice_id UUID NOT NULL REFERENCES inbound_notices(inbound_notice_id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(variant_id),
    quantity_expected INT NOT NULL,
    quantity_received INT DEFAULT 0
);
```

**16. `return_requests` (RMAs)**
Manages customer return requests.
```sql
CREATE TYPE rma_status AS ENUM ('Pending', 'Authorized', 'Received', 'Restocked', 'Refunded', 'Rejected');

CREATE TABLE return_requests (
    rma_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(customer_id),
    reason TEXT,
    status rma_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**17. `return_items`**
Specific items being returned as part of an RMA.
```sql
CREATE TABLE return_items (
    return_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rma_id UUID NOT NULL REFERENCES return_requests(rma_id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES order_items(order_item_id),
    quantity INT NOT NULL,
    received_at TIMESTAMPTZ,
    -- e.g., 'Damaged', 'Wrong Item'
    disposition VARCHAR(100) 
);
```

### System & Integrations

**18. `integrations`**
Stores connection details for external platforms.
```sql
CREATE TABLE integrations (
    integration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    platform_name VARCHAR(100) NOT NULL, -- e.g., 'Shopify', 'Amazon'
    api_credentials JSONB, -- Encrypted
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_sync_at TIMESTAMPTZ,
    UNIQUE(merchant_id, platform_name)
);
```

**19. `audit_logs`**
Generic table for logging important events.
```sql
CREATE TABLE audit_logs (
    log_id BIGSERIAL PRIMARY KEY,
    merchant_id UUID REFERENCES merchants(merchant_id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL, -- e.g., 'order.created', 'inventory.updated'
    entity_type VARCHAR(50), -- e.g., 'Order', 'Product'
    entity_id UUID,
    before_state JSONB,
    after_state JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX ON audit_logs(merchant_id, created_at);
CREATE INDEX ON audit_logs(entity_type, entity_id);
```

---

## 3. Explanation of Design Choices

1.  **Multi-Tenancy First**: The `merchant_id` foreign key is present in almost every table. This is the fundamental mechanism for data isolation. By indexing `merchant_id` on all tables, we ensure that queries for a single merchant's data are extremely fast and don't scan the entire table space.

2.  **Normalization over Denormalization**: The schema is highly normalized (e.g., `products` and `product_variants` are separate; `orders` and `order_items` are separate).
    *   **Why**: This reduces data redundancy, improves data integrity, and makes the database easier to maintain. For example, updating a product's name only requires a change in one row in the `products` table, not across every order item. While this may require more `JOIN`s for complex queries, it's the right approach for a transactional system (OLTP). For reporting, you would build materialized views or use a data warehouse.

3.  **UUIDs for Primary Keys**: `UUID` is used for all primary keys instead of `SERIAL` integers.
    *   **Why**: In a distributed or multi-tenant system, UUIDs prevent key collisions. They can be generated by the application layer without a round-trip to the database, which is beneficial for performance at scale. They also don't expose business metrics (e.g., "we have 10,000 orders").

4.  **JSONB for Flexible Attributes**: Fields like `product_variants.attributes`, `warehouses.address`, and `orders.shipping_address` use `JSONB`.
    *   **Why**: This provides flexibility without sacrificing performance. PostgreSQL has powerful indexing capabilities for `JSONB` fields (GIN indexes), allowing you to efficiently query inside these semi-structured fields. It avoids creating dozens of extra columns for data that might be sparse or variable.

5.  **ENUM Types for Statuses**: `order_status`, `shipment_status`, etc., are defined as PostgreSQL `ENUM` types.
    *   **Why**: This is more efficient and safer than using `VARCHAR`. It provides type safety (you can't insert an invalid status) and takes up less storage space than a string.

6.  **Decoupled Inventory Logic**: The `inventory_levels` table is the single source of truth for stock. `quantity_on_hand` is the physical count, and `quantity_allocated` is reserved for open orders. The actual "available" stock is a calculated value (`on_hand - allocated`).
    *   **Why**: This prevents race conditions. When an order is placed, you only need to increment `quantity_allocated`. When it ships, you decrement both `quantity_allocated` and `quantity_on_hand`. This is a standard and robust pattern for ecommerce inventory.

7.  **Dedicated Audit Log**: The `audit_logs` table provides a generic way to track changes.
    *   **Why**: A centralized log is crucial for debugging, security, and historical tracking. Using `JSONB` for `before_state` and `after_state` provides a flexible way to capture what changed without needing a rigid schema for the log itself.
