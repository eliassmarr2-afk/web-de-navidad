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
