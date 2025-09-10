# **App Name**: ShipFex

## Core Features:

- Home/Landing Page: Display a hero banner with clear CTAs to 'Signup' or explore 'Pricing'. Feature a preview of key functionalities to engage new users.
- Pricing: Display Starter, Growth, and Enterprise plans, including FBM/FBA pricing. CTA buttons link to Signup page.
- Features: Cards with icons and descriptions for Inventory, Orders, Shipments, Integrations, Mobile App.
- Login: Role-based login (Super Admin, Seller, Worker). Validate form, show toast messages for success/error, integrate with Firebase Auth.
- Signup: Tenant creation with initial admin account. Validate inputs, save to Firestore, display success/error messages.
- Contact: Contact form with email, phone input. Submit messages to Firestore or send via Firebase function.
- Terms/Privacy: Static legal text pages.
- Dashboard: KPI overview, recent activity table, charts. Fetch data from Firebase Firestore.
- Inventory Management: CRUD operations on SKUs, filters, search. Toasts on success/error. Uses Firebase Firestore as backend.
- Order Tracking: List and manage orders. Update status, allocate, ship. CRUD dialogs.
- Shipment Management: List shipments, generate labels (placeholder), select carrier.
- Inbound Management: ASN form, receiving list, stock updates.
- Returns Management: List returns, authorize, restock, select disposition.
- Integrations: Connect/disconnect marketplaces (Shopify, Amazon). Show webhook logs.
- Settings: Profile form, warehouse locations, notification preferences.
- Mobile App: React Native app with login, dashboard, inventory scan, pick & pack, shipment label, inbound receiving, push notifications.

## Style Guidelines:

- Clean, structured layout, prioritize KPIs, tables, and recent activity in dashboards.
- Use 'Inter' font for modern, readable interface.
- Minimalist, clear icons (inventory, orders, shipments).
- Subtle transitions for navigation, toast messages.
- Modern, Apple-style clean palette.