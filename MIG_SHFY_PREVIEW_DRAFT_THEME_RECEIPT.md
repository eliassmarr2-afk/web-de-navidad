# MIG-SHFY-PREVIEW-01 — Shopify editable draft theme

**Fecha:** 2026-11-23, Buenos Aires (-03)
**Motivo:** el comerciante abrió `Shopify → Temas` y siguió viendo la miniatura original Horizon; las versiones desarrolladas guardadas desde el conector no estaban expuestas como tema de preview independiente.

## Solución instalada y verificada

Se creó mediante Shopify `themeDuplicate` una **copia independiente, no publicada**:

- Tienda: `b06xsm-bh.myshopify.com`.
- Tema original (LIVE, intacto): `Horizon`, `gid://shopify/OnlineStoreTheme/191330517191`, role `MAIN`.
- Tema de ensayo: `Santa Del Sur | Migración (BORRADOR)`, `gid://shopify/OnlineStoreTheme/191382716615`, role `UNPUBLISHED`.
- Fuente del tema duplicado: Horizon original, conservando los archivos estándar.
- Código portado: **25 archivos exactos** de `shopify/` en rama `construction/shopify-migration`: todos los CSS/JS/SVG modificados, layout, secciones SDS, snippets y plantillas (Home, Navidad, Regalos, Colecciones y Producto). `DESIGN.md` no se cargó como archivo de tema porque es un contrato de repositorio, no un archivo instalable Shopify.
- Método: Admin GraphQL `themeFilesUpsert` usando contenido de los blobs canónicos GitHub. La carga inicial de `templates/index.json` fue rechazada por falta de secciones; se instalaron primero las secciones y se repitió la plantilla; **segunda instalación sin errores**.
- Verificación Admin GraphQL: existen los dos temas, `MAIN` y `UNPUBLISHED`; el borrador no está procesando ni falló procesamiento. Se comprobó en el borrador que `templates/index.json`, `sections/sds-home-hero.liquid`, `sections/sds-native-product.liquid` y `assets/sds-home.css` están presentes, sin errores de consulta.
- Shopify `theme_screenshot` del borrador `/` a 390px: completado. **No** equivale a aceptación de fidelidad visual.
- Estado: NO se ejecutó `theme_publish`; la tienda pública sigue protegida por contraseña y la publicación anterior permanece intacta.
- Tampoco se modificaron productos, inventario, pagos, checkout, páginas ni colecciones. Protocol Data permanece desconectado.
- El usuario debe ingresar a `Shopify → Temas → Biblioteca de temas → Santa Del Sur | Migración (BORRADOR) → (…) → Vista previa`; no abrir el editor del Horizon MAIN si desea ver los nuevos componentes.

## Gates aún abiertos

1. El preview de Home puede examinarse con el tema de borrador. Las páginas Navidad y Regalos y ocho colecciones siguen no publicadas, por lo que su navegación pública puede estar cerrada.
2. Producto continúa sin una ficha real para un navegador (0 productos).
3. Revisar capturas móviles y escritorio en la vista previa oficial, verificar manejo de selectores, galería, ofertas, módulos de compra y metadatos.
4. No dar GO LIVE ni conectar Protocol Data por esta operación.
