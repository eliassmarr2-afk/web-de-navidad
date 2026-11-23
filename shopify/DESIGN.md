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


## MIG-SHFY-03 — Shopify-native product surface (2026-11-23)
- Explicit source: `web-de-navidad/product.html` and the final approved Product V2 contracts, including compact green header, location label, title before 1:1 media, thumbnail rail, offer cards with details, policies and fixed blue CTA.
- The original UI's reviews, "+600 vendidos", preferred badge, mock prices, urgency, financing and delivery promises are **not** evidence. Show only Shopify-native data and merchant-defined badges.
- Merchandising display is never the stock authority: one selected Shopify variant ID and price/compareAt/availability are authoritative for a purchased line. Offer cards map 1:1 to product variants; the native Shopify `{% form 'product' %}` posts the real selected variant and quantity.
- A variant metafield `custom.sds_components` (JSON array of `{title,quantity}` entries) is *descriptive only*, not an inventory or price calculator. `custom.sds_offer_badge` and `custom.sds_offer_summary` are optional display fields. For products: `custom.sds_product_badge`, `custom.sds_short_description`.
- For **real bundled components**, use Shopify Bundles or an approved bundle management mechanism and verify inventory mapping separately. A visual card and metafields must never be treated as proof that the underlying component SKUs are reserved. Do not turn on bundle sales based on the JSON array.
- The approved "Iniciar compra" CTA is a native Shopify product form submission that adds the variant to the native cart; the disclaimer identifies that step. The sticky price is **per unit**, not shipping-included checkout total. Delivery remains pending without authoritative logistics quotes.
- Reminder and product-specific conversations are pending backend certificates; show unavailable states and never collect email or PII before that integration. Policies link to actual Shopify policies when configured.
- Scope: `templates/product.json`, `sections/sds-native-product.liquid`, `assets/sds-product.css`, `assets/sds-product.js` and product-only full-bleed guard in `layout/theme.liquid`. Homepage, collection templates and checkout remain unchanged. Product catalog still has zero real SKUs.
- Still unpublished, and requires first live real draft product, accessibility/video/gallery QA, and operator visual review before release.

- **MIG-SHFY-03 safety gate:** If `custom.sds_components` is present for a variant, the "Iniciar compra" button is disabled by default unless `custom.sds_bundle_ready` (variant boolean) is explicitly TRUE after a genuine Shopify Bundles or inventory-linked integration and manual verification. The flag is an operator release control, NOT evidence that Shopify automatically reserves every component.
- The components JSON may optionally include `handle` for a live Shopify product; the details dialog uses `all_products[item.handle]` to show that product's actual image/title/unit price when it resolves. A reference is **display only**: no line item, SKU, price or inventory is computed from it. Missing handles fall back to the item's supplied title. Do not draw strikethrough comparison unit prices without verified promotion data.
- Shopify metafield definition IDs: product `custom.sds_product_badge`=631834902727, `custom.sds_short_description`=631834935495; variant `custom.sds_offer_badge`=631834968263, `custom.sds_offer_summary`=631835001031, `custom.sds_components`=631835033799, `custom.sds_bundle_ready`=631836377287. All definitions created with PUBLIC_READ and pinned for merchant editing, but no values or SKUs exist yet.
