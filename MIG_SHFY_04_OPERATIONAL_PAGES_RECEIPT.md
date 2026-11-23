# MIG-SHFY-04 — Tracking, Soporte y Conversaciones en Shopify

**Fecha:** 2026-11-23 · Argentina (-03)  
**Estado:** CONSTRUIDO EN TEMA BORRADOR / 21-21 QA ESTÁTICO PASS / NO PUBLICADO / REVISIÓN VISUAL PENDIENTE  
**Store:** `b06xsm-bh.myshopify.com`  
**Tema BORRADOR:** `Santa Del Sur | Migración (BORRADOR)`, `gid://shopify/OnlineStoreTheme/191382716615`, `UNPUBLISHED`.  
**Tema LIVE preservado:** `Horizon`, `gid://shopify/OnlineStoreTheme/191330517191`, `MAIN`.  
**Rama fuente de migración:** `construction/shopify-migration`. `main` original = `7111c545b26e92b6b2b4801534659afeed02a5c1` (sin cambios).

## Páginas Shopify nuevas (borradores, NO publicadas)

| Ruta / template | Shopify Page GID | isPublished |
|---|---|---|
| `/pages/seguimiento`, `page.seguimiento` | `gid://shopify/Page/169156346055` | false |
| `/pages/soporte`, `page.soporte` | `gid://shopify/Page/169156378823` | false |
| `/pages/conversacion`, `page.conversacion` | `gid://shopify/Page/169156411591` | false |

## Contrato migrado

**Tracking:** extraído de `tracking.html`, `css/tracking.css`, `css/tracking-results.css`, `js/tracking.js`, con la ficha de 4 tarjetas y 5 acciones de Ayuda. Se mantiene el carrito nativo `routes.cart_url` y contador `cart.item_count`. En esta versión se instaló SOLO el adaptador cerrado `enabled:false`, sin consultar BC-02 ni Protocol Data. El fixture de `?vista=demo` es ficticio y explícitamente identificado como tal. La ilustración raster inicial del repositorio no pudo importarse desde URL (falló validación de imagen); el fallback SVG `tracking-empty-state-v2.svg` sí está copiado al tema.

**Soporte:** preserva encabezado, campos y jerarquía original de `soporte.html` y `css/support.css`; cambió la marca heredada `SANTA CLAUSULA` por `SANTA DEL SUR STORE`, sin inventar logo. **Campos de nombre, email, motivo y mensaje, y submit, todos DISABLED**. No se solicita ni envía PII ni se crean casos. El acceso a la vista de conversación se habilitará cuando exista página Shopify resoluble/autorizada.

**Conversaciones:** módulo de `conversacion.html`, CSS de chat/rating y scripts originales de demo. Conserva escenarios General, Pedido sin verificar, Pedido verificado ficticio, Producto y Cierre/CSAT. El compositor no envía mensajes y CSAT no persiste calificaciones. Por defecto no hay conversación activa; los parámetros `?demo=1|buyer-pending|buyer-verified|product|closed-rating` solo habilitan fixtures de diseño. Se añade `noindex,nofollow` al layout de esa página.

**Datos/medios:** Shopify Files `sds-tracking-not-found.png` (`gid://shopify/MediaImage/47501858242759`) y `sds-chat-demo-proyector.webp` (`gid://shopify/MediaImage/47501860176071`) son ilustraciones, no pedidos o productos reales.

**Estructura:** `layout/theme.liquid` extiende su guard scoped full-bleed/Manrope a los tres handles sin tocar el layout visual de Home, Navidad, Regalos, Colecciones o Producto. El carrito/checkout sigue siendo Shopify nativo.

## Verificaciones y límites

- Shopify Admin GraphQL leyó de vuelta exactamente 3 templates JSON, 3 secciones Liquid, 3 controladores JavaScript, 3 CSS, 1 SVG y el layout, todos sin errores de archivo.
- **21/21 QA estático PASS**, incluidos templates, schemas, 4 tarjetas, reader fail-closed, native cart, soporte inputs disabled, demo chat/CSAT, privacy noindex, layout, scripts JavaScript parseables y ausencia de llamadas `fetch` / `XMLHttpRequest`.
- Generación `theme_screenshot` 390px solicitada en `/pages/seguimiento?vista=demo`, `/pages/soporte`, `/pages/conversacion?demo=1`. **No debe utilizarse como certificación visual** porque el workspace de captura mostraba un snapshot anterior a los últimos archivos del Admin GraphQL. El editor del tema requiere aceptación visual real por operador.
- Páginas `isPublished=false`; tema `UNPUBLISHED`; 0 productos; sin cambios a pedidos/checkout/inventario ni conexión a Protocol Data.
- No se autorizó `theme_publish` ni publicación de estas páginas.

## Manifest SHA: copia exacta de archivos leídos desde Shopify

| Archivo | Blob GitHub |
|---|---|
| `shopify/layout/theme.liquid` | `a5bf5e0f98ffa0f7ac55f121df9f7ea65b12d10e` |
| `shopify/assets/sds-tracking.css` | `9c4bbfbac69f17d63cd27ceeea0aa5a6b6392aff` |
| `shopify/assets/sds-support.css` | `093cb3d5fd61a8f6c948a36cfde24ae3390761a8` |
| `shopify/assets/sds-conversation.css` | `88f67c96e2ee2527e1cd86cab71bd197656bdf51` |
| `shopify/assets/sds-tracking-empty.svg` | `f498c77a19cc4b209d4853e57a00305ab5519771` |
| `shopify/assets/sds-tracking-preview.js` | `12af18e553350be248af160609a1ed4fec946e88` |
| `shopify/assets/sds-conversation-preview.js` | `00dc8c856020afe4b06bb378bfe47b3b23b19c44` |
| `shopify/assets/sds-conversation-rating-preview.js` | `7afd91f6aa069e55207f7b59bf779d9fc171f44e` |
| `shopify/sections/sds-tracking.liquid` | `2a8194e97f059f9ecb30188e4d2dc03e34327deb` |
| `shopify/sections/sds-support.liquid` | `61197e0e9c8b3ae5e439efb1cff8920bab44f520` |
| `shopify/sections/sds-conversation.liquid` | `def31892ba741a322fd78a5e5e4464d66b612f27` |
| `shopify/templates/page.seguimiento.json` | `a849b66a4663f280407ea5398dc80b1ad22be98b` |
| `shopify/templates/page.soporte.json` | `49343ab2fda424336bb2eaee86693bed2a189e94` |
| `shopify/templates/page.conversacion.json` | `84bc6d3e2340d3bb489f3298c3e5c7cc9d4d7392` |

## Próximo gate

Desde el editor del tema `Santa Del Sur | Migración (BORRADOR)`, revisar las tres plantillas en móvil/escritorio. La habilitación operativa de Tracking exige capability pública BC-02 y protección contra exposición privada; Soporte exige backend autorizado de conversaciones/antispam; Chat requiere control de acceso individual y permisos de calificación. Nunca activar solo por tener UI. El carrito nativo se validará con primer producto real, sin ventas ficticias.
