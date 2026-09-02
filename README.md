# সহজ সমাধান — Full Starter Package

## Included
- `public/` — customer-facing storefront
- `admin/` — admin product-management interface
- WhatsApp order number: +8801710441658
- Product upload from Admin
- Product data shared between storefront/admin through browser localStorage

## IMPORTANT SECURITY LIMITATION
This package is a functional starter/prototype, NOT a production-secure e-commerce backend. The included admin PIN is client-side and therefore must NOT be used for a real store with sensitive data. Real production deployment requires server-side authentication, database, private storage, authorization rules, and server-side order/accounting APIs.

## Quick test
1. Open `public/index.html`.
2. Open `admin/index.html`.
3. Admin demo PIN: `2468`.
4. Add a product in Admin.
5. Refresh `public/index.html`; the product appears.
6. Use Order to open WhatsApp with the order message.

## Production next step
Replace the browser-only storage/auth with a real backend (e.g. Cloudflare Workers + D1/R2 or another secure database/storage provider) before taking live orders or storing customer information.
