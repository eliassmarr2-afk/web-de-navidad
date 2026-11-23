# MIG-SHFY-01A / Foundation — registro de ejecución

**Fecha:** 2026-11-23 (Argentina)  
**Destino autorizado:** Shopify `b06xsm-bh.myshopify.com` · Horizon MAIN tema `gid://shopify/OnlineStoreTheme/191330517191`  
**Fuente congelada:** `main` snapshot `7111c545b26e92b6b2b4801534659afeed02a5c1`  
**Rama aislada:** `construction/shopify-migration`

## Operaciones realizadas

### Shopify Files, sí cargados
- `sds-christmas-hero-banner.webp`, copia del `assets/christmas-hero-banner.webp` de la web original; identificador Shopify `gid://shopify/MediaImage/47498945855687`.
- `sds-christmas-coupon-banner.png`, copia de `assets/christmas-coupon-banner.png`; identificador Shopify `gid://shopify/MediaImage/47498948280519`.

Los medios fueron cargados como recursos de la tienda, **no** asignados aún a secciones, productos ni descuentos reales. La imagen del cupón contiene promociones ilustrativas y su publicación requerirá descuentos comerciales autorizados o una marca explícita de demostración.

### Shopify Horizon — cambios pendientes, no guardados ni publicados
En la sesión de edición del tema se prepararon:
- `DESIGN.md`: especificación visual objetivo Santa Del Sur Store, preservando la composición aprobada de `web-de-navidad`.
- `assets/sds-home.css`: estilos aislados de Home, hero 25svh, controles integrados, categorías, filtros, merchandising y barra móvil.
- `assets/sds-home.js`: formulario de código postal/dirección opcional con persistencia solo en sesión; **no** calcula ni promete tarifas.

**Evidencia:** la primera operación `theme_bash` devolvió exitCode 0 y archivos pendientes. La operación siguiente, que intentó crear secciones Liquid, recibió `rate_limited / Nothing ran`; por tanto **NO declaramos que las secciones, la plantilla `index.json` o `layout/theme.liquid` hayan sido instaladas**.

## Pendientes antes de revisión visual

1. Crear secciones nativas editables para el hero, categorías/filtros, cupón, carriles de productos y tabs móviles.
2. Configurar `templates/index.json` en el tema (no reemplazar `templates/product.json`, `collection.json`, carrito ni checkout).
3. En la Home, integrar navegación dentro del hero sin duplicar visualmente el header Horizon; preservar el header nativo en otras páginas.
4. Asignar las imágenes alojadas en Shopify mediante `image_picker`.
5. Ejecutar captura responsive y verificación de Liquid y esquema; arreglar inconsistencias antes de `theme_commit`.
6. Revisar por separado el logo aprobado de Santa Del Sur: no utilizar el logo de `Santa Clausula` heredado.
7. `theme_commit` solo tras renderizar correctamente; **no** `theme_publish` antes de aprobación.

## Límites

- Shopify actualmente tiene cero productos; las secciones comerciales deberán mostrar estado vacío honesto, no inventario ni precios.
- El sitio GitHub en `main` queda inalterado.
- No habilitar Protocol Data, conexiones de pedidos, reglas de shipping ni checkout simulado.
- No incluir tokens o datos de compradores en fuentes o registros.
