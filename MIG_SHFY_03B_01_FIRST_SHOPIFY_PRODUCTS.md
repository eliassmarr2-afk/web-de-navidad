# MIG-SHFY-03B.1 · Primer catálogo real de Santa Del Sur

**Fecha:** 2026-11-24 · Buenos Aires, Argentina (UTC−03)
**Disposición:** 2/2 productos creados en Shopify, DRAFT, una sola variante en cada ficha, sin publicación.
**Tienda:** `b06xsm-bh.myshopify.com`
**Tema de migración:** `Santa Del Sur | Migración (BORRADOR)`, sin publicar.
**Alcance:** datos comerciales de Shopify exclusivamente. No se modificó código del tema ni Protocol Data.

## Producto 1 · Árbol

- Producto: **Árbol de Navidad Canadiense Artificial 150 cm**
- Shopify Product GID: `gid://shopify/Product/15540665843911`
- Handle: `arbol-de-navidad-canadiense-artificial-150-cm`
- Variante única predeterminada: `gid://shopify/ProductVariant/68877838549191`
- Inventory Item GID: `gid://shopify/InventoryItem/70862309982407`
- `status=DRAFT`, `tracked=true`, `inventoryQuantity=0`, `price=0.00 ARS` **automático de Shopify, no es precio comercial**.
- Imágenes verificadas `READY`: árbol sin decorar, imagen principal, y detalle de ramas. Importadas de `assets/productos/arbol-canadiense-150cm/` del repo original.
- Colecciones observadas: `arboles` y `frontpage`. La asociación explícita fue con `arboles`. No publicar hasta precio, stock, información técnica y revisión visual.

## Producto 2 · Luces

- Título exacto solicitado: **Luces Navideñas de Jardín / Hogar**
- Shopify Product GID: `gid://shopify/Product/15540666695879`
- Handle: `luces-navidenas-de-jardin-hogar`
- Variante única predeterminada: `gid://shopify/ProductVariant/68877840810183`
- Inventory Item GID: `gid://shopify/InventoryItem/70862312243399`
- `status=DRAFT`, `tracked=true`, `inventoryQuantity=0`, `price=0.00 ARS` **automático de Shopify, pendiente de precio real**.
- Sin fotografías, composición ni descuento. Asociado a colección `luces`.
- La variante predeterminada es la **única oferta comprable proyectada**; la tarjeta visual en Liquid se alimentará de su ID real y metafields cuando existan. No crear variantes adicionales sin autorización.

## Protección comercial

- No se inventaron SKU, precio de venta, cantidades, componentes, características técnicas ni plazo/costo de envío.
- Los `0.00 ARS` son valores iniciales asignados por Shopify; deben sustituirse antes de activar productos. `DRAFT` + stock 0/tracked evita venta accidental en esta fase.
- Para Luces, cuando se conozcan los componentes de la oferta, usar `custom.sds_components` (JSON de presentación) y mantener `custom.sds_bundle_ready=false` hasta certificar relación real de stock vía Shopify Bundles u otra integración de inventario.
- Los productos son entidades reales de **catálogo Shopify** (no mocks); sus datos comerciales incompletos impiden aún la certificación de compra o precio.
- Ningún tema fue publicado y Protocol Data no está conectado.

## Próxima decisión

El operador debe definir precio de venta y SKU/stock del árbol individual, las imágenes y especificaciones de Luces y la composición de la tarjeta de oferta. Una vez completos, revisar en editor de tema el diseño de la ficha y comprobar variante → carrito sin efectuar una compra.
