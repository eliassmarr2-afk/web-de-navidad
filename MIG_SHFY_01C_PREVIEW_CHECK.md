# MIG-SHFY-01C · Capturas y control de versión

**Fecha:** 2026-11-23 · Argentina
**Shopify theme:** Horizon MAIN (`gid://shopify/OnlineStoreTheme/191330517191`)
**Shopify saved version:** `7bddd54d143e017fbef84a7b557a3a014110c3d0`
**Estado:** GUARDADO SIN PUBLICAR. Revisión de fidelidad visual todavía abierta.

## Verificaciones

- `theme_screenshot` sobre `/` y ancho escritorio 1440 px: herramienta completada.
- `theme_screenshot` sobre `/` y ancho móvil 390 px: herramienta completada.
- Estos resultados acreditan la capacidad de generar las vistas; **no** equivalen a una comparación exhaustiva/pixel a pixel con la web GitHub.
- El tema tiene 10 archivos en `awaitingPublish`; `pending=[]`, `pushErrors=[]`.
- `theme_publish` NO fue invocado. El frontend público de compradores NO ha sido actualizado.
- No se generaron productos comerciales, cupones operativos, cambios de inventario, Orders ni credenciales Protocol Data.

## Versionado separado

La rama `construction/shopify-migration` contiene los contratos y comprobantes. La versión del tema está almacenada por Shopify. Los archivos de esa versión aún no se copiaron físicamente a `shopify/` en GitHub: el intento de lectura conjunta excedió el límite de salida de `theme_bash`, y la lectura Admin GraphQL de `theme.files` devuelve solo los archivos del tema actualmente publicado, no los 10 `awaitingPublish`. **No afirmar sincronización bidireccional.**

## Revisión siguiente

Confirmar visualmente el hero móvil, carril de ocho categorías, filtros, cupón de aspecto idéntico, espaciado y tabs; corregir si fuera necesario. El cupón conserva diseño de ejemplo, no promoción real. Las categorías y tabs se activarán cuando existan páginas/colecciones Shopify. Una vez certificada la Home, continuar con las páginas de colección.
