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
