# MIG-SHFY-03B.2 — PDP Preview QA + LIVE theme gate

**Fecha de control:** 2026-11-25, America/Argentina/Buenos_Aires.
**Ámbito:** Santa Del Sur Store, Shopify `b06xsm-bh.myshopify.com`.
**Tipo:** auditoría de lectura, SIN cambios de código, productos, inventario, datos personales, órdenes ni publicidad.

## Estado administrativo comprobado

- El tema `Santa Del Sur | Migración (BORRADOR)` (`gid://shopify/OnlineStoreTheme/191382716615`) ya tiene `role=MAIN`; el Horizon anterior (`gid://shopify/OnlineStoreTheme/191330517191`) figura `UNPUBLISHED`. El nombre del tema aún contiene la palabra «BORRADOR» pero ya es el LIVE.
- Las páginas `seguimiento` y `soporte` están `isPublished=true`; `conversacion`, `navidad` y `regalos` continúan como borradores.
- Browser externo sin login visitó `/`, `/pages/seguimiento`, `/pages/soporte` y `/products/arbol-de-navidad-canadiense-artificial-150-cm`: todas redirigen a `/password`. La tienda **sigue en modo privado**, aunque tema MAIN ya se publicó.
- Shopify Help Center 2026: acceso se controla desde **Tienda online > Preferencias > Acceso a la tienda > Modo privado**, o menú de lanzamiento de Tienda online; requiere ejecución por operador en Admin. Shopify conector no expone mutación autorizada para cambiar este acceso; no fingir cambio.

## Auditoría PDP / producto real

- `templates/product.json` monta `sections/sds-native-product.liquid`.
- La sección renderiza datos Shopify nativos: título, galería 1:1, miniaturas, precio, variantes comerciales como tarjetas, metacampos para badges/resumen/componentes, enlace a soporte, cantidad, formulario `product` y carrito Shopify, sticky de compra.
- `assets/sds-home.js` y `assets/sds-product.js` comparten la clave de sesión de ubicación `sds:location:session:v1`.
- Metafield definitions confirmadas: PRODUCT `custom.sds_product_badge` y `custom.sds_short_description`; PRODUCTVARIANT `custom.sds_offer_badge`, `custom.sds_offer_summary`, `custom.sds_components` JSON y `custom.sds_bundle_ready` Boolean. La sección deshabilita la compra de un combo cuando hay componentes descriptivos sin `bundle_ready=true`. Ese boolean NO constituye por sí mismo una integración transaccional de stock de componentes.
- Esta revisión no ha certificado E2E checkout, inventario de bundles o integración Protocol Data.

### Vista previa de dos productos Borrador (Shopify `onlineStorePreviewUrl`)

**No guardar tokens de preview ni claves efímeras en repositorios**. Resolver nuevamente `onlineStorePreviewUrl` mediante Shopify Admin GraphQL si el usuario necesita enlaces.

1. Árbol Canadiense (`gid://shopify/Product/15540665843911`): browser en preview Shopify carga cabecera SDS, título correcto, galería con imagen principal y al menos 2 fotos, «Elegí tu oferta» con una tarjeta única, precio `$0,00` de borrador y «Sin stock» con botón deshabilitado. La compra no está abierta.
2. Luces Navideñas de Jardín / Hogar (`gid://shopify/Product/15540666695879`): preview carga cabecera SDS, título correcto y **una sola tarjeta de oferta**. Muestra «Imagen pendiente de carga», `$0,00` y «Sin stock». No existe aún composición cargada.
3. Vista previa de borradores funciona aunque la tienda general continúe bloqueada. Advertencia: el navegador observó etiqueta `Password protected` del administrador pero no bloqueó el enlace `products_preview`.
4. Previews son QA de renderizado, **no publicación de productos**. Usuarios públicos normales siguen sin acceso.

## Bloqueos comerciales para siguiente etapa

- Falta foto del producto Luces, especificaciones y contenido exacto del combo/oferta.
- Faltan precios reales, SKU cuando existan, stock verificado y costos de envío; ambos productos están `DRAFT`, 1 variante cada uno y stock cero.
- Completar los datos reales antes de activar venta. Evitar exponer precio de `0.00 ARS` en fichas activas.
- Mantener preservada la plantilla de producto reutilizable para todos los SKUs. Para Luces, una sola variante = una sola oferta visual; componentes sólo se modelarán cuando haya detalle real, siempre con separación de inventario de Shopify.
- Solicitar al operador revisar la UI en móvil mediante los preview links privados. No ejecutar cambios de código en live sin pactar primero alcance según protocolo de pegado y acordar aprobación de la construcción.

## Revisión post migración detectada (fuera de alcance)

- `layout/theme.liquid` actual activa `sds_fullbleed` para Home, Colecciones, Producto, Navidad y Regalos; **no** incluye handles `seguimiento`, `soporte` ni `conversacion`. Estas páginas pueden heredar header/footer Horizon además de su cabecera propia y requieren QA/corrección separada después de asegurar acceso de navegador. No se modificaron hoy.

**GitHub main sin cambios.** Este archivo registra verificaciones, no una certificación productiva ni activación del sistema.
