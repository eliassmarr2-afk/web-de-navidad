# MIG-SHFY-02 — Navidad / Regalos / Colecciones · Shopify candidate receipt

**Fecha:** 2026-11-23 · Argentina (UTC−03)  
**Estado:** CONSTRUIDO EN SHOPIFY, VERSIÓN GUARDADA, NOT LIVE.  
**Home:** CONGELADA en su estado MIG-SHFY-01D por decisión del operador; sin correcciones desktop.  
**Repositorio:** `eliassmarr2-afk/web-de-navidad` / `construction/shopify-migration`  
**GitHub `main` canónico:** `7111c545b26e92b6b2b4801534659afeed02a5c1` (verificado sin cambios).  
**Shopify:** `b06xsm-bh.myshopify.com`; Horizon MAIN `gid://shopify/OnlineStoreTheme/191330517191`  
**Theme commit nuevo:** `a844ae1904321f26ff349d83dde8704a29b49878`; `pending=[]`, `pushErrors=[]`, `rejectedReason=null`.  
**Publicación:** `theme_publish` NO ejecutado. El tema guardó cambios pendientes de publicación.

## 1. Diseño y origen literal

- `navidad.html` y `regalos.html`, `css/seasonal-hub.css` y `js/seasonal-hub.js`: dos hubs editoriales, una presentación, mismos cuatro u ocho handles y el mismo banner navideño.
- `colecciones/*.html`, `css/collection-page.css`, `js/collection-page.js`, `js/commerce/collection-adapter.js`: ocho rutas estáticas que apuntaban a un único renderer; proveedor mock no autorizado para Shopify.
- Contratos canónicos: `SANTA_CLAUSULA_COLLECTIONS_V1_SHOPIFY_CONTRACT.md` y `SANTA_CLAUSULA_SHARED_TABBAR_V1_CONTRACT.md`. En Shopify se sustituye la marca heredada por **Santa Del Sur Store**, no se cambia el esquema de pantallas.
- Fondo #EDEDED, Manrope, banners 25svh de ancho completo, navegación superpuesta y breadcrumbs, cajas blancas de radio compacto y barra inferior móvil original.

## 2. Archivos construidos y guardados en Shopify Horizon

- `assets/sds-seasonal-hub.css` — estilos del hub, derivados de CSS original y aislados.
- `assets/sds-native-collection.css` — estilos de colección, derivados de CSS original.
- `assets/sds-shared-tabbar.css` — barra móvil original, compartida.
- `sections/sds-seasonal-hub.liquid` — un componente editorial con variante Navidad / Regalos, ocho/cuatro enlaces y un rail de productos reales opcional.
- `sections/sds-native-collection.liquid` — un único componente para todas las colecciones, `collection.title`, `collection.description`, `collection.image`, `collection.products`, clasificación nativa, paginación 24/pg y espacios vacíos veraces.
- `snippets/sds-seasonal-tabbar.liquid` — navegación inferior para hubs y colecciones, con destinos no habilitados sin hipervínculos falsos.
- `templates/page.navidad.json` — template editorial Navidad.
- `templates/page.regalos.json` — template editorial Regalos.
- `templates/collection.json` — plantilla genérica de colecciones.
- `layout/theme.liquid` — cabecera/footer Horizon se omiten únicamente en Home, Colecciones y hubs `page.handle` navidad/regalos; la portada conserva su propio diseño.
- `DESIGN.md` — anexo de reglas MIG-SHFY-02.

La imagen temporal común es el asset Shopify previamente importado `sds-christmas-hero-banner.webp`, compartido mientras se definen artes por categoría.

## 3. Identidades comerciales: colecciones CREADAS NO PUBLICADAS

La API `collectionCreate` deja colecciones **unpublished por defecto**, sin `publishablePublish`.

| Handle | Nombre | Shopify Collection GID |
|---|---|---|
| `arboles` | Árboles | `gid://shopify/Collection/516764205255` |
| `regalos` | Regalos | `gid://shopify/Collection/516764238023` |
| `decoracion` | Decoración | `gid://shopify/Collection/516764270791` |
| `luces` | Luces | `gid://shopify/Collection/516764303559` |
| `envoltorios` | Envoltorios | `gid://shopify/Collection/516764336327` |
| `mesa` | Mesa | `gid://shopify/Collection/516764369095` |
| `monos` | Moños | `gid://shopify/Collection/516764401863` |
| `ofertas` | Ofertas | `gid://shopify/Collection/516764434631` |

**Handle congelado:** `monos` es deliberadamente ASCII (sin eñe). `ofertas` no impone descuentos ni selecciona SKUs por sí sola. Descripciones editoriales conservadas del adaptador original.

**Comprobación posterior:** `collectionsCount(limit:null)=9` en total (8 nuevas + `frontpage` preexistente); `collectionsCount(query:"published_status:unpublished")=8`, `published=1`. **0 productos**.

## 4. Páginas editoriales CREADAS como borrador

| Handle | Nombre | Shopify Page GID | templateSuffix | isPublished |
|---|---|---|---|---|
| `navidad` | Navidad | `gid://shopify/Page/169150644423` | `navidad` | `false` |
| `regalos` | Regalos | `gid://shopify/Page/169150677191` | `regalos` | `false` |

La página `Contacto` original permanece `published` y no fue modificada. Crear recursos en borrador no los hace visibles en la tienda.

## 5. Validaciones y limitaciones reales

- `jq`: cuatro templates JSON (Home, Navidad, Regalos, Colección) parseables y orden con elementos; PASS.
- Secciones Liquids `sds-seasonal-hub.liquid` y `sds-native-collection.liquid` cada una con schema; PASS.
- Relación `collections[handle]` evita rutas rotas mientras recursos siguen ocultos; PASS estático.
- `collection.sort_options` y `paginate collection.products by 24`: presentes, sin producto ficticio; PASS estático.
- `layout/theme.liquid` guarda `sds_fullbleed` por página sin afectar secciones Home; PASS estático.
- Screenshot Shopify de `/collections/frontpage` en 390 px y 1440 px: generados con éxito; screenshot `/pages/contact` 390 px: generado con éxito. Home `/` 390 px también se volvió a solicitar. Estas pruebas acreditan renderizado, **no** certificación visual 1:1 ni flujos de navegación en navegador.
- Las landings borrador no fueron probadas en un navegador público ni puestas en producción; aún requieren revisión visual por el operador.
- El enlace Shopify directo con GitHub **no** se activó. Se intentó exportar código del tema para replicarlo bajo `shopify/` en esta rama, pero `theme_bash` devolvió `rate_limited`; la copia binaria de nuevos archivos a GitHub continúa pendiente. Esta documentación NO sustituye a la fuente de Shopify.

## 6. Puertas de salida antes de LIVE

1. Sincronizar una copia verificable de los archivos Liquid, JSON y CSS en la rama `construction/shopify-migration`.
2. Validar visual y funcionalmente Navidad, Regalos, Colecciones, navegación y sorting con contenido real o estados vacíos, en móvil y escritorio.
3. Asociar imágenes, colecciones y catálogo reales; **no** trasladar precios, stock, reviews ni descuentos mock.
4. Con aprobación explícita, publicar coordinadamente páginas/colecciones y luego la versión del tema Shopify. Nunca publicarlas por separado dejando rutas rotas.
5. Después: MIG-SHFY-03 Producto/Ofertas/Combos, y solo cuando todo el storefront esté estable conectar Protocol Data.
