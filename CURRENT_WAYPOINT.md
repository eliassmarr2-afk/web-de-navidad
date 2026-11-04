# WEB DE NAVIDAD — CURRENT WAYPOINT

**Fecha:** 2026-11-04  
**Repo:** `eliassmarr2-afk/web-de-navidad`  
**Branch:** `main`  
**Visibilidad:** pública.

## Estado

```text
SITE CLONE             COMPLETE
HOME UI V1             IMPLEMENTED
HOME VISUAL REVISION    CODE READY / REVIEW PENDING
VISUAL/DEVICE REVIEW   PENDING
FINAL IMAGES           NOT STARTED
LIVE COMMERCE          NOT AUTHORIZED
LIVE PROTOCOL DATA     NOT AUTHORIZED
```

## Entregado

- Capa navideña independiente sobre arquitectura clonada.
- Ocho categorías en una única fila deslizable, círculos rojos e iconos blancos, sin caja de fondo.
- Hero full-bleed con controles superiores, buscador y mapa superpuestos; filtros, banner medio con sombrerito, combos y productos; navegación inferior móvil.
- Catálogo demo en `js/commerce/catalog.js` sin integración live.
- Aislamiento de `sessionStorage` y eventos respecto de Indumentary.

## Pendientes explícitos

1. Validación visual del operador en smartphone y desktop.
2. Producción y sustitución de imágenes comerciales reales, separada del código funcional.
3. Personalización navideña de Product, Tracking y Soporte; heredados del sitio fuente en V1.
4. Integraciones Shopify / Protocol Data sólo tras contratos y autorización posterior.

## Fuente y límites

Original `eliassmarr2-afk/indumentary` intacto. Documentos heredados que todavía mencionen Indumentary reflejan su origen histórico, no el contrato actual de Web de Navidad. El contrato vigente de Home es `CHRISTMAS_DESIGN_CONTRACT.md`.

## Nueva autoridad de diseño — 2026-11-04

- El operador aprobó una revisión visual **posterior** al build inicial, documentada en `HOME_V1_APPROVED_VISUAL_REVISION.md`.
- **DISEÑO CERRADO / CÓDIGO IMPLEMENTADO / VALIDACIÓN VISUAL PENDIENTE** para esta nueva revisión: hero full-bleed aprox. 25 % de altura y controles (ubicación, íconos, buscador y botón de mapa) superpuestos; categorías en una única fila edge-to-edge sin caja; filtros sobre fondo general; banner promocional 2,6:1 inmediatamente después de filtros con sombrerito navideño; navegación inferior conservada.
- La revisión reemplaza la versión antigua de dos filas y cabecera separada. La implementación se entrega por commit en main; **no considerar validado en dispositivos hasta revisión de operador**.
- Las imágenes del banner hero y fotografías comerciales definitivas se diseñarán en fase posterior; no adelantar su producción.
- No tocar Shopify/Protocol Data LIVE, ni `indumentary`, ni reconstruir infraestructura ensamblable.

## Entrega de código de revisión visual — 2026-11-04

- `index.html`: hero superior full-bleed, ubicación y accesos dentro, buscador y botón mapa dentro, sección banner medio antes de packs, corrección de cierres HTML.
- `css/navidad-home.css`: layout responsive, barra inferior preservada, categories rail y filtros sobre fondo general.
- `js/app.js`: render de una sola fila, control mapa delegado a modal de ubicación, sincronización del indicador del menú inferior; sin cambios en adapters.
- `assets/christmas-santa-hat.svg`: adorno local para la esquina del segundo banner.
- **Pendiente:** revisión visual real del operador en móvil y desktop; creatividad definitiva del hero y fotografías de catálogo; pruebas funcionales en navegador. Este registro no certifica producción.

## Ajuste visual correctivo — 2026-11-04

- Operador verificó visualmente la Home V1 en móvil y aprobó su composición general.
- Incidencia detectada en captura: franja vacía a la derecha del hero y del contenido principal, mientras la barra inferior sí ocupa el ancho del viewport.
- Corrección específica en `css/navidad-home.css` (solo Home móvil, hasta 720 px): alinear el ancho del body, el shell, el hero y `page-content` con `100vw`, y mantener el recorte horizontal dentro del viewport. Se incrementó el parámetro de versión de CSS en `index.html` para evitar caché de estilos obsoletos.
- **Estado:** ajuste de código listo; comprobación visual del operador pendiente. No declarar el defecto cerrado hasta capturar una nueva pantalla.
- **Siguiente fase tras validar:** diseño de las creatividades de los banners; todavía sin modificar fotografía final, catálogo, ni Protocol Data/Shopify.

## Banner superior aprobado — 2026-11-04

- El operador seleccionó una imagen navideña panorámica con Papá Noel a la derecha, regalos a la izquierda y centro verde/rojo sin textos.
- Fuente suministrada por el operador; se preparó copia WebP **1536×864** para subir a `assets/christmas-hero-banner.webp`.
- `css/navidad-home.css` referencia el asset relativo `../assets/christmas-hero-banner.webp` con fondo degradado de reserva y centrado `cover`, ocultando las decoraciones del placeholder anterior.
- La imagen fue subida y verificada en el árbol de `main` (2026-11-04); el recorte visual definitivo en teléfono continúa sujeto a revisión.

## Segundo banner — cupón navideño aprobado — 2026-11-04

- El operador subió el arte rectangular completo `assets/christmas-coupon-banner.png`, confirmado SHA `9aa98256b76b3feefb935546a37210ed32c89c54`, 2022×778 px; el archivo inicialmente tenía un nombre automático de GitHub y fue asignado a una ruta canónica sin modificar el contenido binario.
- `index.html` reemplaza el banner rojo previo y su sombrerito superpuesto por **una sola imagen completa**. No se insertan textos duplicados sobre ella.
- `css/navidad-home.css` y `assets/coupon-ticket-mask.svg` crean la silueta de cupón (muescas, recorte y sombra) **en el contenedor**, no en la imagen; se conserva relación 2022:778.
- Contrato específico: `CHRISTMAS_COUPON_BANNER_V1.md`, que prevalece sobre la anterior especificación del segundo banner con sombrerito en la Home V1.
- **Pendiente de revisión visual** en móvil y desktop; la publicidad de 20% en el área izquierda y 25% en el talón verde es una inconsistencia textual solicitada expresamente y pendiente de aclaración comercial antes de producción. Ningún descuento/cupón fue integrado al motor comercial.

## Producto V2 — estructura aprobada — 2026-11-04

- **Autoridad vigente:** `PRODUCT_V2_APPROVED_STRUCTURE.md`. Sustituye el borrador `PRODUCT_V2_INITIAL_STRUCTURE.md` solo para el diseño de la nueva página de producto.
- **DISEÑO APROBADO / CÓDIGO FUNCIONAL PENDIENTE:** encabezado rojo `SantaClaus Store`; franja verde de domicilio borde a borde con mismo flujo Home; título del proyector sobre blanco; valoración `(4.7)` con cinco estrellas verdes rellenas pequeñas a la derecha; badge `MÁS ELEGIDO` debajo del título; mensaje contextual de entrega; foto principal 1:1 borde a borde; ofertas a continuación.
- **Enmienda final:** **todos los contenedores de badge de la Product V2 tienen `border-radius: 4px`**. No redondearlos como pills.
- Tipografía **Manrope**, verificada en el repositorio Camping `eliassmarr2-afk/ecommerce-v2`.
- **Guardas:** corregir el uso heredado de `indumentary.sessionLocation.v1` en la página anterior y reutilizar `web-de-navidad.sessionLocation.v1`; no inventar fechas, precios ni reputación verificada; Shopify/Protocol Data no activos. Imagen real se aborda después de cerrar la implementación estructural.
- No se ha modificado `product.html` en esta aceptación; sigue siendo el build heredado de Indumentary hasta el movimiento técnico autorizado.

## Producto V2 — implementación superior — 2026-11-04

- El operador confirmó que se cambia **exclusivamente lo anterior a la imagen** y el marco 1:1 de la propia imagen. **El cuerpo inferior se preserva**, sin reestructurar módulos deportivos/combos/soporte/compra demo heredados.
- `product.html` y `css/product-v2-top.css`: marca `SantaClaus Store` sobre rojo, franja verde de domicilio, título de proyector, valoración `(4.7)` de ejemplo con cinco estrellas verdes llenas, badge `MÁS ELEGIDO` de radio **4px**, información de ubicación y galería cuadrada full-width con placeholder.
- `js/product-v2-top.js` enlaza la banda y botón de entrega al **modal original**, leyendo `web-de-navidad.sessionLocation.v1` desde el módulo común.
- `js/product-runtime-v4.js` corrige **cuatro errores de interpolación de templates preexistentes** que hacían inválido el JavaScript original; ajusta fixture demo y flujo de ubicación, sin reescribir las ofertas ni el resto de la página.
- `js/product-commercial-v1.js` alinea la sesión compartida y deja de afirmar gratuitamente «mañana / envío gratis» sin Logistics; se escapan sugerencias de domicilio que antes eran interpretadas como HTML.
- `js/product-support-camping-v1.js`: el widget de reanudación del chat se mantiene **debajo de la imagen** tras mover la presentación arriba.
- Documento técnico: `PRODUCT_V2_IMPLEMENTATION_RECEIPT.md`.
- **Pendiente:** revisión visual/navegación de la nueva ficha en móvil; despliegue de Pages; futura foto real del proyector; cambio de ofertas y contenidos heredados solo mediante acuerdo separado. Shopify y Protocol Data continúan NOT ACTIVE.

## Producto V2 — imagen principal del proyector — 2026-11-04

- El operador subió `assets/proyector-navideno-producto.webp`; GitHub verificó el blob `51e1b138a5a0ff82beef41a351897f03fe1db030` (292326 bytes).
- La fotografía cuadrada se vinculó al `#productImage` de `product.html` y a la fuente media de la ficha demo `prod-002` en `js/product-runtime-v4.js`. La miniatura usa esa fuente existente, sin cambios en el módulo inferior.
- Se conserva composición **1:1 de borde a borde**, sin radios ni separaciones. Foto subida es un asset de demostración local; Shopify aún no está integrado.
- **Pendiente:** confirmar visualmente la publicación de GitHub Pages en móvil. La actualización del código no equivale a validación final del navegador.

## Producto V2 — nueva paleta beige, título y metadatos — 2026-11-04

- Fuente: imagen de paleta compartida por el operador. Valores exactos: `#A60B08` rojo, `#5E0001` bordó, `#1D2E19` verde, `#CFCABF` beige, `#76584C` marrón.
- **Encabezado** beige navideño con íconos/brand verde oscuro; **franja de domicilio** verde oscuro con texto blanco. Introducción y fondo de la imagen permanecen blancos.
- Sobre el título aparece en gris **«Nuevo | +600 vendidos»**, dato ilustrativo no verificado. Título se acorta a **«Proyector de formas navideñas portable»** (sin «| Iluminación LED para hogar»).
- Se verificó **Manrope** en `eliassmarr2-afk/ecommerce-v2` (Camping); el nuevo título adopta peso **600** y menor tamaño (21–27px) para acercarse a su jerarquía tipográfica.
- Badge `MÁS ELEGIDO` conserva verde oscuro y radio **4px**. La puntuación `4.7` y ventas son demo hasta obtener evidencia real.
- Se redistribuyen acentos rojos/bordó en botones comerciales, badges secundarios y selección; **ningún componente bajo la imagen cambia de orden ni funcionalidad**.
- Autoridad de cambio: `PRODUCT_V2_PALETTE_REVISION.md`, que prevalece sobre colores/título del contrato anterior.
- **Pendiente:** publicación GitHub Pages, revisión visual y sustitución de datos comerciales simulados antes de lanzamiento real.
