# MIG-SHFY-03 · Runtime synthetic certification and release gates

**Fecha:** 2026-11-23 · Argentina (GMT−03)  
**Shopify theme commit:** `028ca0981184b4e214a00775ddd155adfaff4ccb`  
**Estado:** 20/20 STATIC PASS + 14/14 RUNTIME-SYNTHETIC PASS / NOT LIVE / PRODUCT-SPECIFIC END-TO-END PENDING.

## 1. Verificaciones Shopify theme_bash

`product.json` refiere a una sola sección `sds-native-product`. Se encontraron `{% form 'product' %}`, variante Shopify en `name="id"`, input `quantity`, botón fijo `type=submit form=<id>`, disponibilidad de variante, precio y compare-at nativos, galería 1:1, modal Detalles, puertos públicos de metafields, sesión CP y guards de header/footer limitados a Product. `templates/index.json` conserva orden y secciones de Home. Sin claims de ventas, ratings, cuotas o plazos de entrega mock. **20/20 PASS**.

## 2. Verificaciones funcionales aisladas de JavaScript

El blob exacto `shopify/assets/sds-product.js` se compiló sintácticamente en un entorno V8 sin error. Se creó un DOM de pruebas con 3 variantes simuladas (una disponible, una combo no verificado y una agotada), galería, diálogo y almacenamiento de sesión. No se usó ningún producto o sesión real.

**14/14 PASS:**
1. Identidad de variante inicial correcta.
2. Precio inicial y CTA enabled para variante simple disponible.
3. CP existente compartido con Home recuperado.
4. Selección de opción cambia `input[name=id]` y precio.
5. Compare-at de variante se sincroniza.
6. Combo de composición no verificada bloquea «Iniciar compra».
7. Imagen sincronizada al elegir variante.
8. Variante sin stock produce mensaje diferenciado.
9. «Detalles» abre panel correcto.
10. Elección desde detalles mantiene compuerta de seguridad.
11. Galería cambia imagen y estado de miniatura.
12. Modal de ubicación abre.
13. CP inválido no se persiste.
14. CP válido se guarda solo en sesión.

**Limitación:** las pruebas anteriores son sintéticas y no ejecutan Liquid contra un catálogo real ni Shopify Cart/Checkout. Los flags de `sds_bundle_ready` se validaron estáticamente en Liquid y dinámicamente en JavaScript por el estado declarado en el DOM; la autoridad final continúa siendo Shopify.

## 3. Definiciones reales registradas

PRODUCT `custom.sds_product_badge`, `custom.sds_short_description`. PRODUCTVARIANT `custom.sds_offer_badge`, `custom.sds_offer_summary`, `custom.sds_components` (JSON descriptivo), `custom.sds_bundle_ready` (booleano). Las seis definiciones existen en Shopify con lectura pública para Liquid; no existen valores asociados, productos reales ni fotos comerciales.

## 4. Mirror y publicación

Se exportaron seis archivos exactamente desde Shopify y se escribieron como blobs GitHub bajo `shopify/`, versionando la plantilla Product y guardando la historia del diseño. `main` original y las pantallas Home/Navidad/Regalos/Colecciones no fueron modificadas.

El tema Horizon contiene cambios **awaitingPublish**, pero `theme_publish` nunca fue invocado. La contraseña de la tienda, las ocho colecciones ocultas y las dos landings en borrador permanecen intactas. No se habilita Protocol Data.

## 5. Próximas puertas de salida

- Cargar **primer producto comercial real**, con imágenes, variantes, inventario, precio real, país/impuestos/moneda y disponibilidad correctos. No poblar para QA un producto ficticio.
- Revisar la ficha Product en 390px/1440px y su jerarquía visual frente a GitHub.
- Probar end-to-end selección de variante real → carrito Shopify (sin compras/cobros indebidos) y coherencia de stock.
- Para combos: configurar primero productos componentes y Shopify Bundles u otro componente autorizado que controle inventario. Luego verificar `custom.sds_bundle_ready=true` solo tras un ensayo; nunca usar el JSON de presentación como fuente logística.
- Revisar arte del badge/brand/logo y el recordatorio/canal Soporte cuando sus servicios certificados existan.
- Aprobación explícita separada antes de publicar el tema o habilitar productos.
