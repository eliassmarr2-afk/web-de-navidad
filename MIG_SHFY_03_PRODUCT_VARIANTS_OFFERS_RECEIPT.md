# MIG-SHFY-03 · PRODUCTO / VARIANTES / OFERTAS / COMBOS

**Fecha operativa:** 2026-11-23 (America/Argentina/Buenos_Aires)
**Estado:** SHOPIFY SAVED / NOT PUBLISHED / REAL-PRODUCT RUNTIME & VISUAL QA PENDING
**Fuente canónica:** `web-de-navidad` `main` `7111c545b26e92b6b2b4801534659afeed02a5c1`.
**Trabajo aislado:** `construction/shopify-migration`. No modificar `main` antes de aceptación.
**Tienda:** `b06xsm-bh.myshopify.com`; tema Horizon MAIN `gid://shopify/OnlineStoreTheme/191330517191`.
**Shopify theme commit:** `028ca0981184b4e214a00775ddd155adfaff4ccb`, `pending=[]`, `pushErrors=[]`, `rejectedReason=null`, versión guardada **`awaitingPublish`**, `theme_publish` NO ejecutado.
**Contenido comercial:** cero productos Shopify, sin SKU real ni precio/stock publicados.

## 1. Autoridades del diseño

Reabiertos los archivos:
- `product.html` (cabecera verde, franja de domicilio, título, galería 1:1, miniaturas, estructura inferior, combo bottom sheet, sticky de compra).
- `PRODUCT_V2_APPROVED_STRUCTURE.md`, `PRODUCT_V2_PALETTE_REVISION.md`, `PRODUCT_V2_IMPLEMENTATION_RECEIPT.md`, `PRODUCT_V2_STICKY_APPROVED.md`, `PRODUCT_V2_PURCHASE_REMINDERS_APPROVED.md`, `PRODUCT_PAGE.md`.
- `js/product-combos-controller-v2.js`, `js/product-commercial-v1.js`, `css/product-v2-top.css`, `css/product-v2-combo-refinement.css`.

**Precedencia:** usar las enmiendas posteriores y los controles visuales realmente aprobados, no reconstruir promesas mock o reputación falsa. Identidad comercial final **Santa Del Sur Store**, no el asset heredado Santa Clausula. Manrope; badges radio 4px; azul `#2479FF`; fondo `#EDEDED`.

## 2. Archivos creados/modificados en Shopify

| Archivo | Función |
|---|---|
| `sections/sds-native-product.liquid` | Ficha 1:1, galería, miniaturas, oferta nativa por variante, modal Detalles, políticas, selector CP en sesión, sticky y formulario Shopify |
| `assets/sds-product.css` | Presentación responsive de Product V2 aislada bajo `.sds-pdp`; sin modificación CSS checkout |
| `assets/sds-product.js` | Selección de variante/precio/imagen/stock, modal de detalles y selector de CP, sin llamadas de backend |
| `templates/product.json` | Reemplaza layout de Product Horizon por una sección específica editada |
| `layout/theme.liquid` | Suprime cabecera/footer nativo solo en `request.page_type=='product'`; Home, Navidad, Regalos, Colecciones conservan sus mismas reglas |
| `DESIGN.md` | Contrato del port de Producto, identidad de precio/inventario y controles seguros |

## 3. Identidad y comercio autoritativo

**INVARIANTES:** `SHOPIFY_VARIANT != PRESENTATION_OFFER != PRODUCT_SET != COMPONENT_SKU` en el dominio comercial.

Para la primera versión:
- Cada tarjeta seleccionable corresponde a **una variante real Shopify** (ID de `product.variants`) dentro de la ficha.
- Shopify es autoridad para `variant.price`, `variant.compare_at_price`, `variant.available`, `product.images`, `product.description` y el `variant.id` enviado en el formulario `{% form 'product', product %}`.
- El botón visual «Iniciar compra» somete ese formulario y **agrega al carrito Shopify**; no invoca pedido, checkout externo ni API de Protocol Data. La aclaración del carrito aparece junto al CTA. El precio sticky es **unitario**; el envío y total de orden se confirman después.
- El modal «Detalles» usa el JSON descriptivo `custom.sds_components` de la variante; si declara `handle`, busca `all_products[handle]` para mostrar imagen/precio real del componente Shopify cuando esté disponible. La información descriptiva NO agrega artículos al carrito ni descuenta SKUs.
- **Compuerta de seguridad:** si `custom.sds_components` contiene datos, el botón de compra queda deshabilitado salvo que el metafield booleano `custom.sds_bundle_ready` de la variante esté explícitamente en `true` después de verificación independiente de componentes e inventario real (ej. Shopify Bundles). La aprobación booleana NO crea reservas: exige antes tener un sistema de paquetes válido. Ante falta de verificación el CTA declara «Combo en preparación».
- No simular reputación 4.7, 600 vendidos, badge «Más elegido», compare-at ni urgencia. Etiquetas visibles únicamente con metafield confirmado por el comercio. No crear componentes/precios mock.
- El código postal y domicilio opcional se comparten con Home por `sessionStorage('sds:location:session:v1')` y se muestran **sin** cotizar entrega. No se envían a Shopify por esa acción, a Protocol Data ni a terceros.
- Recordatorios, consultas con contexto SKU y citas de delivery siguen pendientes de su backend / autorización específica. Políticas enlazan a páginas reales Shopify cuando existan.

## 4. Metafield definitions creadas y verificadas (sin valores)

| Shopify owner | namespace.key | Tipo | GID |
|---|---|---|---|
| PRODUCT | `custom.sds_product_badge` | `single_line_text_field` | `gid://shopify/MetafieldDefinition/631834902727` |
| PRODUCT | `custom.sds_short_description` | `multi_line_text_field` | `gid://shopify/MetafieldDefinition/631834935495` |
| PRODUCTVARIANT | `custom.sds_offer_badge` | `single_line_text_field` | `gid://shopify/MetafieldDefinition/631834968263` |
| PRODUCTVARIANT | `custom.sds_offer_summary` | `multi_line_text_field` | `gid://shopify/MetafieldDefinition/631835001031` |
| PRODUCTVARIANT | `custom.sds_components` | `json` | `gid://shopify/MetafieldDefinition/631835033799` |
| PRODUCTVARIANT | `custom.sds_bundle_ready` | `boolean` | `gid://shopify/MetafieldDefinition/631836377287` |

Definiciones con acceso de lectura pública para Liquid `PUBLIC_READ`, editables en Admin, sin valores reales creados. El JSON de composición **se documenta solo como estructura visible**:
```json
[
  {"handle":"arboles","title":"Árbol de Navidad","quantity":1},
  {"handle":"luces","title":"Luces decorativas","quantity":1}
]
```
El `handle` aquí es referencia a producto Shopify para visualización. No es un identificador de inventario o componente de checkout y NO implica un bundle armado. Los ejemplos del bloque son solo esquema documental, no SKUs existentes.

## 5. Verificaciones realizadas

- Plantilla `product.json` JSON válida (una sección `sds-native-product`).
- Comprobaciones estructurales PASS (20/20) sobre formulario `product`, variante/quantity, precio, compareAt, available, detalles, gallery, CTA, badges/descuentos sin claims mock, exclusiones de header/footer para product, otras plantillas preservadas.
- Campo de inventario seguro `sds_bundle_ready` añadido y default `false`; selección y CTA lo respetan.
- Definiciones reales Shopify consultadas tras crear: 2 para PRODUCT, 4 para PRODUCTVARIANT, 0 productos.
- Vistas de Home y Colecciones 390px generadas antes de guardar como control de regresión.
- `theme_commit` guardó la versión `028ca0981184b4e214a00775ddd155adfaff4ccb`, `pending=[]` y `pushErrors=[]`, sin publicar.

## 6. NO certificado todavía

- **No hay ningún producto real** para navegar una URL Shopify `/products/<handle>` con esta plantilla; no se puede declarar un screenshot real del PDP ni hacer test de carrito/stock con compras.
- No existe integración/instalación certificada de Shopify Bundles. Un combo «real» requiere comprobar vinculación SKU, stock por componente, disponibilidad y orden. El usuario debe proporcionar o crear inventario real.
- No hay evidencia de descuentos o financiación, ni de checkout final ni de tiempos de entrega. Todo sigue pendiente.
- Falta logo oficial Santa Del Sur Store como asset del tema, y revisión móvil 390px / escritorio de la ficha con producto real.
- Recordatorio por email y soporte contextual no se activan; no se piden emails de compradores mientras tanto.
- El tema Shopify permanece no publicado; la tienda está protegida por contraseña; no se conectó Protocol Data.

## 7. Próxima frontera

`MIG-SHFY-03B`: Certificación visual/funcional sobre **primer producto real en borrador**, mapeo de ofertas → variante y prueba explícita de bundle en Shopify Bundles o alternativa de inventario. Mantener el tema guardado sin publicar hasta que existan esas evidencias. Reconciliar `shopify/` en la rama GitHub con los blobs efectivos del tema, como se hizo en MIG-SHFY-02.
