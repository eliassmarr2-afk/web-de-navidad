# VINCULO PD - SHFY — MIG-SHFY-01 / Home migration baseline

**Fecha:** 2026-11-22 · America/Argentina/Buenos_Aires
**Estado:** AUDITORÍA DE LECTURA COMPLETA / RAMA AISLADA / HOME SHOPIFY PENDIENTE DE IMPLEMENTACIÓN
**Repositorio fuente:** `eliassmarr2-afk/web-de-navidad`
**Branch fuente de continuidad:** `construction/shopify-migration`
**Snapshot de `main`:** `7111c545b26e92b6b2b4801534659afeed02a5c1`
**Destino conectado:** `b06xsm-bh.myshopify.com` (Shopify Basic, Argentina, ARS)
**Tema Shopify:** Horizon, `gid://shopify/OnlineStoreTheme/191330517191` (`MAIN`).
**Atención:** ESTE DOCUMENTO NO DECLARA ningún tema construido, sincronizado ni publicado.

## Decisión y secuencia aprobadas

1. Migrar en forma controlada las superficies comerciales de GitHub hacia el tema Shopify.
2. Foundation visual + Home; luego landings / colecciones; luego ficha producto, ofertas y bundles; después carrito; después superficies de seguimiento, Soporte y Conversaciones.
3. **No** activar Protocol Data V2, logística, tracking público ni soporte transaccional mientras se verifica la compatibilidad comercial/visual Shopify.
4. Mantener la web original en `main`, con cambios de migración exclusivamente en esta rama hasta certificación.
5. No cargar precios, inventario, valoraciones, testimonios ni descuentos mock como datos reales.

## 1. Estado de origen — Home GitHub

- `index.html`: estructura inicial, hero navideño, selector de ubicación, botones de menú/tracking/carrito, búsqueda, categorías, filtros, cupón intermedio, rail de combos, productos y footer.
- `css/base.css`, `css/home.css`, `css/navidad-home.css`, `css/site-tabbar.css`: presentación y responsive.
- `js/app.js`: interacción visual y filtrado del catálogo; `js/commerce/catalog.js` = datos ilustrativos, **no** inventario/precios reales.
- `js/shared/location-state.js`: estado local de destino (no autoridad de tarifa).
- `js/shared/site-tabbar.js`: cinco destinos de navegación de cliente.
- `assets/christmas-hero-banner.webp`, `assets/christmas-coupon-banner.png`, `assets/christmas-santa-hat.svg`: recursos navideños locales que requieren inspección y portado controlado.
- `HOME_V1_APPROVED_VISUAL_REVISION.md`, `CHRISTMAS_COUPON_BANNER_V1.md`, `SANTA_CLAUSULA_SHARED_TABBAR_V1_CONTRACT.md`: precedencias de diseño. Basarse en el código realmente publicado para resolver detalles de implementación, no en descripciones antiguas por encima de revisiones posteriores.

### Estructura de Home que debe respetarse

- Hero de ancho completo (móvil ~25svh), ubicación y controles superiores integrados, buscador + ubicación/mapa integrados abajo.
- Rail horizontal de ocho categorías; filtros desplazables; cupón de campaña antes de combos.
- Rail de combos y cuadrícula de productos alimentados por entidades reales una vez existan.
- Barra inferior móvil con Inicio, Navidad, Regalos, Pedidos, Ayuda; un único componente reutilizable.
- Diseño responsive con Manrope, sin inventar un logo distinto al aprobado. El repositorio contiene restos de marca IND / Santa Clausula; el destino comercial es Santa Del Sur Store. Confirmar/reutilizar el asset correcto de marca antes de reemplazar logo.
- El checkout y el inventario pertenecen a Shopify; no copiar el carrito mock ni simular ofertas reales.

## 2. Estado de destino — Shopify Horizon

Auditoría de Shopify Admin GraphQL:
- 1 tema: Horizon `MAIN`; sin tema adicional publicado como borrador.
- 0 productos; 1 colección; 0 definiciones de metafields de PRODUCT.
- `templates/index.json` actual contiene secciones de demostración Horizon `hero` y `product-list`; no equivale todavía a la Home de GitHub.
- Tema modular con `layout/theme.liquid`, `templates/index.json`, `sections/`, `blocks/`, `snippets/`, `assets/`, `config/settings_data.json`, `config/settings_schema.json`.
- Antes de implementar diseño global, leer `AGENTS.md` en la raíz; Horizon no contiene `DESIGN.md` actualmente.
- Tipografía configurada inicialmente a Inter; la referencia GitHub usa Manrope.
- El tema permite preparación y revisión antes de `theme_commit`, y edición versionada antes de `theme_publish`; **no publicar** sin validación visual y autorización.

## 3. Mapa de migración (propuesto, NO instalado)

| GitHub original | Responsabilidad | Destino Shopify nativo |
|---|---|---|
| `index.html` / Hero | Captura de ubicación, buscador, accesos y visual | Sección Home específica con bloques y ajustes editables; respetar header nativo y no duplicar carrito |
| `css/navidad-home.css` | Hero full bleed, rails, responsive | `assets/` CSS scoped del tema, tokens de `config/settings_data.json` |
| `js/app.js` | Comportamientos UI | JS modular solo para interacciones no cubiertas por Liquid/Horizon |
| `js/commerce/catalog.js` | Categorías, combos, cards mock | Colecciones y productos reales de Shopify. No portar precios ficticios |
| Cupón intermedio | Imagen, copy, destino | Sección editable y asset administrado por Shopify |
| Packs/combo rail | Merchandising | Sección alimentada por productos/colecciones o metaobjects autorizados (la composición física del bundle requiere definición aparte) |
| `js/shared/location-state.js` | Domicilio contextual de sesión | Puerto UI aislado, sin inventar tarifas. Verificación con Shopify Shipping / Protocol Data después |
| `js/shared/site-tabbar.js` | Cinco accesos | Snippet Liquid/CSS reusable; ya existe blueprint inactivo `shopify/snippets/santa-clausula-site-tabbar.liquid` |
| `footer` y páginas auxiliares | Navegación | Bloques/footer de tema con vínculos de páginas Shopify configurables |

## 4. Orden de construcción / criterios de salida

**MIG-SHFY-01A Foundation:** fijar la identidad y tokens en el tema y un `DESIGN.md`; implementar componentes globales sin modificar checkout. Validar header y navbar, responsive y accesibilidad.

**MIG-SHFY-01B Home:** portada hero, búsqueda, rail de categorías, filtros y cupón, mediante secciones editables. Comprobar en móvil y escritorio contra `web-de-navidad`.

**MIG-SHFY-01C Data readiness:** crear productos y colecciones reales en borrador antes de reemplazar la cuadrícula y los combos mock. Definir metafields de presentación posteriormente al contrato real del catálogo.

**Criterios obligatorios:** sin productos falsos publicados; sin dobles barras/cart; sin envíos o precios simulados declarados como reales; sin llamadas Protocol Data; sin despliegue visible antes de aceptación. Validación mediante preview y capturas del tema; pruebas de navegación y accesibilidad.

## 5. Vínculo GitHub vs conexión ChatGPT

La conexión de ChatGPT con GitHub y la de ChatGPT con Shopify **ya funcionan**. Son dos autorizaciones diferentes de la integración opcional **Shopify Themes ↔ GitHub** para sincronizar código automáticamente. Dicha sincronización NO se ha activado y NO es un prerrequisito para preparar componentes con las herramientas conectadas. Si se adopta después, configurar el tema y rama específica sin establecer un despliegue automático de `main` por error.

## 6. Evidencias y límites actuales

- Rama nueva anclada a `main` en `7111c545b26e92b6b2b4801534659afeed02a5c1`.
- Solo se documentó y auditó. No se editaron archivos del tema Horizon, no se desplegó, no se importaron imágenes ni productos, no se vinculó Protocol Data.
- La primera edición de tema se realizará contra esta matriz de superficies aprobadas con comprobación visual.
