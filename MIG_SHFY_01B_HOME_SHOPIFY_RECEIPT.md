# MIG-SHFY-01B — Primer montaje de Home en Horizon

**Fecha operativa:** 2026-11-23 · Argentina (-03)
**Estado:** VERSIÓN SHOPIFY GUARDADA / PENDIENTE DE PUBLICACIÓN / VALIDACIÓN VISUAL MÓVIL PENDIENTE
**Tienda:** `b06xsm-bh.myshopify.com`
**Tema:** Horizon MAIN — `gid://shopify/OnlineStoreTheme/191330517191`
**Commit del tema Shopify:** `7bddd54d143e017fbef84a7b557a3a014110c3d0`
**GitHub:** fuente `main` `7111c545b26e92b6b2b4801534659afeed02a5c1`, rama aislada `construction/shopify-migration`

## Trabajo ejecutado en Shopify

1. Copia a Shopify Files de `christmas-hero-banner.webp` y `christmas-coupon-banner.png` del repositorio original.
2. `DESIGN.md` con el sistema visual objetivo (Manrope, #EDEDED, rojo navideño, radios compactos, hero 25svh, estructura de Home).
3. `assets/sds-home.css`: presentación aislada de la Home (no modificación del CSS de producto, checkout o colecciones).
4. `assets/sds-home.js`: selector de ubicación con CP y dirección opcional guardados únicamente durante la sesión, sin cálculo de tarifas ni API pública.
5. `sections/sds-home-hero.liquid`: portada con imagen original Shopify, selector de CP, menú editable, seguimiento pendiente, **carrito Shopify nativo** y **búsqueda Shopify nativa**.
6. `sections/sds-home-categories.liquid`: ocho categorías con iconos y cinco búsquedas/filtros, destino merchant-editable, no rutas rotas forzadas.
7. `sections/sds-home-coupon.liquid`: imagen original con marca visible de demostración y **sin enlazar a un descuento ficticio**.
8. `sections/sds-home-merch.liquid`: reutilizable para carrusel de packs y cuadrícula de productos; usa solo colecciones/productos reales Shopify. Como no hay catálogo, muestra textos de estado vacío.
9. `sections/sds-home-tabs.liquid`: barra móvil de cinco destinos, rutas no configuradas inertemente deshabilitadas.
10. `templates/index.json`: orden de seis secciones: Hero, Categorías+Filtros, Cupón, Packs, Productos, Tabs.
11. `layout/theme.liquid`: en Home solamente omite encabezado Horizon para evitar duplicar la cabecera integrada al hero. El header original sigue en otras páginas.

## Evidencia de la operación

- Validación JSON de `templates/index.json` por `jq`: PASS.
- Comprobación de cinco secciones con `{% schema %}`: PASS.
- Ajuste `unless request.page_type == 'index'` cerrado correctamente en `layout/theme.liquid`: PASS.
- `theme_screenshot` de escritorio, ruta `/`, 1440px: la herramienta completó la captura sin error. **No constituye todavía una auditoría visual comparativa detallada**.
- Solicitud adicional de screenshot móvil 390px: limitada por la cuota temporal de capturas. Se requiere completar y revisar.
- `theme_commit` devolvió `commit=7bddd54d143e017fbef84a7b557a3a014110c3d0`, `pending=[]`, `pushErrors=[]`, `rejectedReason=null`, **`awaitingPublish` = 10 archivos**.
- **No se ejecutó `theme_publish` y no se tocaron Orders/Finance/Logistics/Support, ni se modificó el código de la web pública en GitHub `main`.**

## No se declara completado

- Exactitud pixel a pixel de Home en móvil/escritorio hasta disponer de capturas y ajuste óptico.
- Identidad gráfica definitiva del logo Santa Del Sur (no reemplazar por logo heredado Santa Clausula).
- Datos comerciales reales: 0 productos; 1 colección al inicio. No se crearon productos mock.
- Ocho colecciones reales, páginas Navidad/Regalos, productos/bundles, carrito personalizado, tracking y soporte.
- Conexión automatizada GitHub→Shopify, publicación del tema ni integración Protocol Data.

## Próximo paso controlado

Auditar capturas móviles/escritorio, corregir diferencias del port Home, validar URLs editables, imágenes y flujo de CP sin calcular costos, y pedir aceptación visual antes de publicar. Después construir páginas de colecciones y ficha de producto sobre la misma Foundation, preservando el checkout nativo.

**Revisión 01A:** `MIG_SHFY_01A_FOUNDATION_EXECUTION.md` registra correctamente la preparación inicial y el límite temporal previo; este documento deja constancia del avance posterior hasta el commit Shopify.
