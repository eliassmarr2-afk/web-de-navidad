# WEB DE NAVIDAD — CURRENT WAYPOINT

**Fecha:** 2026-11-03  
**Repo:** `eliassmarr2-afk/web-de-navidad`  
**Branch:** `main`  
**Visibilidad:** pública.

## Estado

```text
SITE CLONE             COMPLETE
HOME UI V1             IMPLEMENTED
APPROVED VISUAL DESIGN PRESERVED
VISUAL/DEVICE REVIEW   PENDING
FINAL IMAGES           NOT STARTED
LIVE COMMERCE          NOT AUTHORIZED
LIVE PROTOCOL DATA     NOT AUTHORIZED
```

## Entregado

- Capa navideña independiente sobre arquitectura clonada.
- Ocho categorías circulares blancas/rojas en dos filas deslizadas.
- Filtros interactivos, búsqueda demo, combos, productos, dos banners, navegación inferior móvil.
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
- **DISEÑO CERRADO / IMPLEMENTACIÓN PENDIENTE** para esta nueva revisión: hero full-bleed aprox. 25 % de altura y controles (ubicación, íconos, buscador y botón de mapa) superpuestos; categorías en una única fila edge-to-edge sin caja; filtros sobre fondo general; banner promocional 2,6:1 inmediatamente después de filtros con sombrerito navideño; navegación inferior conservada.
- La Home actual todavía implementa la versión anterior de dos filas y cabecera separada. No considerar la revisión nueva desplegada ni validada.
- Las imágenes del banner hero y fotografías comerciales definitivas se diseñarán en fase posterior; no adelantar su producción.
- No tocar Shopify/Protocol Data LIVE, ni `indumentary`, ni reconstruir infraestructura ensamblable.
