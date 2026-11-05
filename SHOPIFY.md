# INDUMENTARY — SHOPIFY

**Fecha:** 2026-10-30  
**Estado:** SHOPIFY COMPATIBLE / NOT INTEGRATED

---

## 1. CURRENT COMMERCE ENGINE

```text
MOCK / DEVELOPMENT ONLY
```

La primera construcción utilizará HTML/CSS/JavaScript y catálogo local/mock para validar experiencia y componentes.

No existe todavía checkout real ni Shopify live.

---

## 2. SHOPIFY STATUS

```text
SHOPIFY COMPATIBLE
```

Todavía no se declara `SHOPIFY READY` ni `SHOPIFY INTEGRATED` porque faltan mappings concretos, catálogo real y conexión provider.

---

## 3. PRODUCT MODEL

El diseño deberá preservar:

```text
SKU
!= PRODUCT SET
!= COMMERCIAL OFFER
!= SHOPIFY / PROVIDER VARIANT
```

Ejemplos del vertical:

- una camiseta física puede ser SKU;
- color/talle pueden expresarse mediante provider variants según implementación;
- un combo puede representar un Product Set;
- una promoción de ese combo puede representar una Commercial Offer.

---

## 4. COMBOS

Las tarjetas “Llevá tu combo” no deberán convertir el HTML visible en autoridad de composición.

Futuro objetivo:

```text
COMMERCIAL OFFER
→ PRODUCT SET
→ COMPONENT SKUs + QUANTITIES
→ PROVIDER SELLING REPRESENTATION
```

---

## 5. SEARCH

La Home tendrá Search UI desacoplada.

```text
SEARCH UI
→ COMMERCE SEARCH ADAPTER
→ CURRENT PRODUCT SOURCE
```

Primera fase: mock/local.

Shopify integrado: productos/ofertas disponibles desde el provider según contrato vigente.

---

## 6. CART

La interfaz reservará entrada al carrito desde el header y futuras acciones de producto.

El cart model deberá permitir posteriormente traducir selección comercial a provider cart lines sin confundir cantidad de Variant con cantidad física de componentes de un Set.

---

## 7. CHECKOUT

No se implementa checkout real en la primera Home.

La arquitectura reservará:

```text
SITE CART
→ COMMERCE ADAPTER
→ SHOPIFY / PROVIDER CHECKOUT HANDOFF
```

Una señal browser de compra nunca sustituirá la Order canónica.

---

## 8. PRODUCT PAGE

Futura Product Page preparada para:

- producto/oferta;
- imagen/media;
- color;
- talle;
- cantidad;
- precio visible;
- shipping context;
- cart;
- provider mapping.

---

## 9. METAFIELDS / PRESENTATION

Cuando Shopify se integre, metafields pueden alimentar presentación, media, copy o layout.

No deberán transformarse en segunda autoridad de Product Set composition cuando Protocol Data Products posea esa verdad.

---

## 10. PROMOTION PATH

```text
CURRENT
=
SHOPIFY COMPATIBLE

NEXT AFTER REAL PRODUCT MODEL + ADAPTER
=
SHOPIFY READY

AFTER VERIFIED PROVIDER CONNECTION
=
SHOPIFY INTEGRATED
```

Antes de cada promoción se revalidarán los contratos Shopify vigentes y Documento 004 de la banca.

## 11. COLECCIONES / SHOPIFY — SANTA CLAUSULA

- Contrato: `SANTA_CLAUSULA_COLLECTIONS_V1_SHOPIFY_CONTRACT.md`.
- Sitio estático: ocho rutas generadas desde un único modelo y renderizador. Shopify: **una sola** `collection.json` + sección Liquid, archivadas en `shopify/` como blueprint inactivo.
- Shopify será la autoridad de `collection.handle`, `title`, `image`, `description`, `products`, SEO, ordenación y publicación. Requiere crear los registros y relaciones de productos en Shopify, pero no ocho códigos de página; esos datos se pueden gestionar en Admin o automatizar por API.
- El layout `#EDEDED` y banner `25svh` se aplicarán una sola vez al tema; el header sobrepuesto se valida al migrar.
- La colección Ofertas no define por sí misma descuentos reales ni bundles. Mantener SKU, Product Set, Commercial Offer y Shopify Variant como identidades distintas.
- Estado: SHOPIFY COMPATIBLE / NOT CONNECTED.

## 12. TAB INFERIOR ENSAMBLABLE — SHOPIFY

- Documento de sitio: `SANTA_CLAUSULA_SHARED_TABBAR_V1_CONTRACT.md`.
- Sitio GitHub Pages: una autoridad de rutas/íconos `js/shared/site-tabbar.js`, una CSS global `css/site-tabbar.css`. Las páginas `navidad.html` / `regalos.html` son landings editoriales, no colecciones de comercio por defecto.
- Blueprint nativo Shopify NO INSTALADO: `shopify/snippets/santa-clausula-site-tabbar.liquid` + `shopify/assets/santa-clausula-site-tabbar.css`. Una inclusión en layout del tema, con cinco enlaces editables en menú `santa-clausula-tabbar`, sin código por página.
- En la activación deberán resolverse las páginas merchant Navidad, Regalos, Tracking y Soporte y su proveedor autorizado; links de navegación NO confieren acceso a pedidos o conversaciones.
- Barra responsive borde a borde sin radio externo y fondo navideño traslúcido, píldora activa redondeada. Estado SHOPIFY COMPATIBLE / NO INSTALADO.
