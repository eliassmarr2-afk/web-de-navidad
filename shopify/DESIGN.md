# Santa Del Sur Store — Shopify migration design contract (MIG-SHFY-01)

## Brand overview
Santa Del Sur Store is an Argentine ecommerce storefront initially focused on Christmas decor, lights, gifting, seasonal trees and bundles. Mobile-first, quick discovery, clear purchasing intent. The design intentionally migrates the approved GitHub `web-de-navidad` experience; no new visual concept is authorized.

## Design thesis
A compact, confident Christmas storefront where an immersive seasonal header, touch-first category rails, and transparent commerce meet Shopify-native shopping.

## Colors and semantic roles
- Canvas: #EDEDED — page background, not a boxed overall website.
- Surface: #FFFFFF — cards, inputs, modal, utility buttons.
- Primary Christmas red: #B20B17 — category circles, active actions.
- Dark Christmas red: #850C17 — accent/deep emphasis.
- Ink: #1A1A1A — body text and primary product descriptions.
- Muted: #717171 — secondary copy.
- Hero fallbacks: #08684C → #168060 → #B00B19 only if the original image fails.
- Focus ring: #2479FF — accessibility only; no decorative colored borders.
- Public statuses: warning/success only with grounded real commerce data.

## Typography
- Manrope 400, 500, 600, 700, 800. Fallback: Arial, sans-serif.
- Body 14px, line-height 1.5; product metadata 11–12px; headings 22–32px.
- Category labels 10–12px, 700/800. No artificial novelty typefaces.
- Preserve selected logo artwork exactly once the approved **Santa Del Sur Store** file is available; do not replace with the unrelated Santa Clausula artwork.

## Composition and spacing
- Mobile hero full bleed, no separate header above, 25svh (195–285px clamp), background photo cover.
- Within hero: location pill top-left, native menu/tracking/cart controls top-right; search pill + location/map shortcut along bottom.
- Width on large screen max 1240px for content rails; mobile canvas uses 12px gutters; hero remains full bleed.
- Categories: one touch-scroll row of eight identities, red circles with white icons, no enclosing box.
- Filters: one horizontal touch-scroll row of compact chips, placed before coupon.
- Coupon: 2022/778 aspect, after filters and before packs. Image artwork is *illustrative* until a genuine Shopify offer is created; do not advertise it as a real discount.
- Merchandising: pack rail then featured products grid, sourced from real Shopify products once they exist.
- Card radius 4–5px; keep shadows sparse and short. No heavy borders. Search and hero controls may be pills.
- Mobile bottom navigation five tabs (Inicio, Navidad, Regalos, Pedidos, Ayuda) as one reusable section.

## Components
- Hero/header: image_picker, editable location prompt, menu picker, tracking destination, native cart route.
- Search: Shopify native routes.search_url, input q; no mock results.
- Location: browser-session CP context only (and optional address), no geolocation or freight estimate without authority.
- Category rail: merchant editable category blocks (label, icon, optional collection link).
- Filter rail: merchant editable search query shortcuts.
- Coupon: merchant editable image and URL, non-operational visual preview until actual promo verified.
- Packs/products: Shopify collection/product objects and | money; safe empty state when none exist.
- Footer: retain native Horizon footer initially; full visual port in subsequent milestone.
- Main menu: Shopify link_list via section settings; no hard-coded fake routes.
- Native cart and checkout: Shopify-owned; do not copy static local cart/mock checkout.
- Public logistics/support: independently staged pages; no capability sharing.

## Dos and Don'ts
DO preserve GitHub approved visual placement and responsive behavior; use semantic HTML, focus visibility and merchant-editable content. DO keep Shopify as commerce authority. DO hide unconfigured destinations instead of broken links.
DON'T invent prices, stock, discount rates, reviews, delivery promises, customer data or offers. DON'T publish pending work before operator review. DON'T silently integrate Protocol Data or put secret capabilities into URLs, storage or analytics. DON'T change global PDP/checkout behavior during Home migration.

## Motion philosophy
Limited 150–200ms hover/press feedback on controls and rail scrolling; no looping hero animations. Respect prefers-reduced-motion.

## Boundaries and current status
Source: GitHub `eliassmarr2-afk/web-de-navidad` main snapshot 7111c545b26e92b6b2b4801534659afeed02a5c1, isolated migration branch `construction/shopify-migration`. Target: Horizon theme 191330517191 on b06xsm-bh.myshopify.com. MIG-SHFY-01: initial HOME port only. Protocol Data connectivity remains disabled. Shopify had 0 products during audit.


## MIG-SHFY-02 — Landings y colecciones (2026-11-23)
- Two separate Shopify page templates: `page.navidad` and `page.regalos`, rendering the same `sds-seasonal-hub` section with different editorial settings and a shared 25svh seasonal banner.
- One native `collection.json` template and `sds-native-collection` section serves all eight handles: arboles, regalos, decoracion, luces, envoltorios, mesa, monos, ofertas.
- Preserve original Manrope, #EDEDED canvas, compact white cards, edge-to-edge banner, breadcrumb, native Shopify product/grid sorting and native safe empty states.
- Shopify product/collection data own actual membership, title, image, description, price and sort. No copy of demo prices or products.
- A shared native bottom-nav snippet provides five positions; missing pages remain inert until published. No fake tracking or Protocol Data.
- Shopify header and footer suppressed only on Home, native collection pages, and specifically the Navidad/Regalos pages. Homepage implementation remains untouched.
- Neither drafts nor theme changes may be published without explicit review/authorization.

