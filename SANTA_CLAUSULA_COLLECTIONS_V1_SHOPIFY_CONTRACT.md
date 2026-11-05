# SANTA CLAUSULA — COLECCIONES V1 / RUTAS ESTÁTICAS + UNA PLANTILLA + MIGRACIÓN SHOPIFY

**Fecha:** 2026-11-05  
**Estado:** IMPLEMENTACIÓN V1 EN WEB ESTÁTICA / PENDIENTE DE REVISIÓN VISUAL / SHOPIFY NO CONECTADO  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`, rama `main`  
**Solicitud:** una página para cada colección existente de Inicio, pero jamás ocho códigos independientes ni una migración página por página.

## 1. Inventario contractual de colecciones

Las siguientes ocho identidades corresponden exactamente a los `categories.id` existentes en `js/commerce/catalog.js`:

| Colección | Handle estable | Página pública de vista previa | URL Shopify objetivo |
|---|---|---|---|
| Árboles | `arboles` | `/colecciones/arboles.html` | `/collections/arboles` |
| Regalos | `regalos` | `/colecciones/regalos.html` | `/collections/regalos` |
| Decoración | `decoracion` | `/colecciones/decoracion.html` | `/collections/decoracion` |
| Luces | `luces` | `/colecciones/luces.html` | `/collections/luces` |
| Envoltorios | `envoltorios` | `/colecciones/envoltorios.html` | `/collections/envoltorios` |
| Mesa | `mesa` | `/colecciones/mesa.html` | `/collections/mesa` |
| Moños | `monos` | `/colecciones/monos.html` | `/collections/monos` |
| Ofertas | `ofertas` | `/colecciones/ofertas.html` | `/collections/ofertas` |

El handle sin tilde `monos` es una ruta estable, no un texto comercial en castellano.

## 2. Contrato de presentación aprobado

- Cada colección inicia con una **imagen navideña edge-to-edge** desde el límite superior, sin header blanco anterior.
- Imagen ocupa `25svh` (un cuarto del primer viewport) con `object-fit: cover`. Las acciones de volver a Inicio y marca se superponen dentro del banner.
- Todo el fondo de la página: **`#EDEDED`**, incluido contenido/áreas de catálogo.
- Superficies blancas con **sombra breve y poca difusión**, sin contornos decorativos de color ni contornos en tarjetas, badges y widgets.
- Debajo del hero: ruta de navegación, título, descripción, grilla responsive, ordenación local operativa, enlaces a otras colecciones y navegación móvil.
- Manrope y paleta de SANTA CLAUSULA; los elementos comerciales no se declaran ventas activas.
- **Imagen temporal actual:** `assets/christmas-hero-banner.webp`, reutilizada desde el banco de recursos del sitio y con posición ajustada por colección. **No se generaron todavía ocho fotografías definitivas distintas.** La futura imagen real será una propiedad de la colección y se reemplazará en el adapter/Shopify, nunca por un cambio de HTML página a página.

## 3. Fuente de verdad y archivos exactos

```text
js/commerce/catalog.js
  categories[] : id, label, icon               ← identidad local V1
  products[] : catálogo ilustrativo            ← NO inventario real
       │
       ▼
js/commerce/collection-adapter.js
  loadCollectionPageModel(handle)              ← boundary de datos común
  collectionIndex() / collectionPath(handle)
       │
       ▼
js/collection-page.js                          ← UN renderer para todas
       │
       ├── css/collection-page.css             ← UN layout responsive
       │
       └── colecciones/*.html                   ← OCHO entrypoints GENERADOS
                ↑
        scripts/build-collection-pages.mjs     ← UN generador
```

Para regenerar las páginas estáticas (Node.js 22+):
```bash
node scripts/build-collection-pages.mjs
```

**No editar `colecciones/arboles.html`, `regalos.html`, etc. a mano.** Los wrappers solo identifican su `data-collection-handle`, título/SEO básico y cargan los mismos CSS/JS. El diseño central se corrige una sola vez.

**El Home** modifica `js/app.js` para que los círculos rojos sean enlaces navegables mediante `collectionPath(category.id)`; los ocho enlaces del menú lateral también van a su ruta individual. Búsqueda, filtros generales y catálogo Home quedan disponibles.

**Estado de listados V1:** se muestran los productos ilustrativos de `catalog.js` filtrados por su categoría. `Ofertas` incluye su categoría y productos mock etiquetados con `promociones`. En un Shopify real, esa pertenencia la define el catálogo/provider, y la condición de precio/ahorro depende de la fuente comercial autorizada. Los productos demo **no enlazan** a `product.html` porque esa página actualmente solo presenta el proyector navideño y sería falso afirmar que corresponde a todos los SKUs.

## 4. Contrato de migración Shopify sin duplicación de páginas

Shopify permite una única plantilla de colección común (`templates/collection.json`) con una sección dinámica. En este repositorio se guarda una **referencia nativa inactiva**, no una conexión productiva:

```text
shopify/templates/collection.json
shopify/sections/santa-clausula-collection.liquid
```

Cuando exista un tema Shopify autorizado, esos archivos se podrán incorporar **una sola vez**, y las colecciones existentes podrán utilizar esa única plantilla sin crear ocho páginas HTML ni copiar ocho CSS/JS.

**Shopify será autoridad** de `collection.handle`, `collection.title`, `collection.description`, `collection.image`, `collection.products`, ordenación, visibilidad, SEO y URLs canónicas. El tema utiliza Liquid para leer esos datos e incluye `paginate collection.products by 24`, enlaces reales de Producto y un menú de colecciones opcional. El banner nativo también ocupa `25svh`; la adaptación visual a una cabecera de tema superpuesta/absoluta deberá verificarse una sola vez durante el montaje en Shopify, porque el header de un tema puede ocupar espacio antes del contenido.

Crear las **colecciones como datos** en Shopify y asociar productos es una tarea real e inevitable, aunque se pueda automatizar por API/importación. Lo que evitamos por arquitectura es **mantener una página de código por colección**. Los handles de la tabla se utilizan como mapping contractual; no equivalen a IDs de Shopify ni a SKUs.

**Si se utiliza Storefront API headless** en vez de un tema Liquid, el mismo contract del adapter será alimentado mediante `collection(handle: ...)` y productos paginados; la UI seguirá única y se validarán previamente credenciales públicas, scopes, caché, disponibilidad y mercados. No se conecta API durante V1.

## 5. Límites Protocol Data

- **Collections = merchandising/navegación de Shopify**. No introducir un segundo inventario canónico bajo el sitio.
- **Products V2** tiene identidad y modelos propios para SKUs, Product Sets y Commercial Offers. `SKU != Product Set != Commercial Offer != Shopify Variant` permanece intacto.
- El handle `ofertas` es una agrupación navegacional y no define por sí solo descuentos, bundles ni márgenes autorizados.
- **Orders/Logistics** no intervienen en renderizar una categoría sin contexto operacional; no calcular envíos ni prometer disponibilidad desde un card visual.
- El Site Event Layer puede emitir `collection_viewed`, `collection_sort_changed` y `collection_open_requested` sin PII; la conexión de medición a Protocol Data sigue separada y no activa.
- Shopify, Supabase, Protocol Data y el checkout **no fueron conectados ni alterados**.

## 6. Checklist de aceptación

1. Ocho enlaces del rail de Inicio y ocho enlaces de Menú abren ocho rutas individuales sin 404.
2. Las ocho páginas cargan la **misma** CSS y JS y resuelven su handle desde el documento.
3. El banner se posiciona en la parte superior sin márgenes externos y ocupa `25svh`.
4. Fondo `#EDEDED`, banner temporal navideño visible y responsive.
5. Catálogo demo filtrado/ordenado; enlace a productos irreales NO ofrecido como si vendieran.
6. Rail de colecciones relacionadas, navegación de retorno y menú inferior móvil operativo.
7. No se tocan Producto, Soporte, Chat, Rating o Logistics.
8. Builder produce 8 archivos sincronizados con la lista canónica `categories`.
9. Código Shopify nativo de referencia: una plantilla / una sección, sin duplicar las páginas.
10. Verificar GitHub Pages y revisión visual en móvil/desktop.

## 7. Evidencia documental externa (consultada, no activada)

- [Shopify / Collection theme template](https://shopify.dev/docs/storefronts/themes/architecture/templates/collection)
- [Shopify / JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates)
- [Shopify / Storefront API Collection](https://shopify.dev/docs/api/storefront/latest/objects/collection)

**Fase siguiente:** aprobación visual de colección; incorporación de fotografía definitiva por categoría/colección y posterior Shopify adapter/conexión cuando esté autorizado.

## 8. Extensión de navegación global — 2026-11-05

- Nuevo contrato `SANTA_CLAUSULA_SHARED_TABBAR_V1_CONTRACT.md`.
- Las ocho páginas generadas de colecciones incorporan `data-site-tabbar` con el mismo `js/shared/site-tabbar.js` y `css/site-tabbar.css`, mediante el builder `scripts/build-collection-pages.mjs`.
- El tab `Navidad` enlaza a nuevo hub `navidad.html`; el tab central `Regalos` enlaza a hub `regalos.html`. La colección `colecciones/regalos.html` sigue siendo entidad separada.
- Cinco destinos globales y ninguna barra duplicada; el diseño del banner/colección `#EDEDED` y `25svh` queda intacto.
