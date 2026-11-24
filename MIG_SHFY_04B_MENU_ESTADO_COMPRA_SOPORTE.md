# MIG-SHFY-04B / SDS menú Estado de mi compra y Soporte

**Fecha:** 2026-11-23 (America/Argentina/Buenos_Aires)
**Ámbito:** tema Shopify `Santa Del Sur | Migración (BORRADOR)`, GID `gid://shopify/OnlineStoreTheme/191382716615`; **NO** tema Horizon MAIN.
**Estado:** ARCHIVOS GUARDADOS Y VERIFICADOS / TEMA NO PUBLICADO / PÁGINAS DE DESTINO SIN PUBLICAR.

## Instrucción del operador

La Home no mostraba acceso visible a Seguimiento. Solicitud: añadir al menú **«Estado de mi compra»** y **«Soporte»**. Conservar la composición visual de la Home y no activar integraciones.

## Modificaciones exactas

1. `shopify/sections/sds-home-hero.liquid`: se incorporaron en el menú lateral de la Home dos enlaces de destino literal, **Estado de mi compra** (`/pages/seguimiento`) y **Soporte** (`/pages/soporte`), al final de las opciones del menú. Quedan presentes aunque no haya `link_list` configurada; no se eliminaron los links existentes.
2. En el mismo archivo, el ícono de camión de la cabecera pasó de control sin enlace a `<a>` con `aria-label="Estado de mi compra"`. Respeta `section.settings.tracking_url` si se configura; de lo contrario usa `/pages/seguimiento`.
3. `shopify/sections/sds-tracking.liquid`: renombrado el acceso del menú lateral de Seguimiento de **SABER DE MI ENVÍO** a **ESTADO DE MI COMPRA**, sin alterar contenido de tracking ni backend.

No se modificaron CSS, JS, plantilla de Home, Producto, Colecciones, Checkout, Pedidos o BD. No se activó Protocol Data.

## Verificación

- Admin GraphQL `themeFilesUpsert`: 2/2 archivos aceptados; `userErrors=[]`.
- Admin GraphQL `theme.files` readback: 8/8 comprobaciones PASS (2 enlaces nuevos, rutas exactas, ícono de camión, etiqueta del menú Tracking, ausencia del span deshabilitado anterior, carrito nativo preservado, 2 plantillas de destino existentes, tema UNPUBLISHED).
- Shopify Page `seguimiento` y Page `soporte` existen pero tienen `isPublished=false` — las rutas **no están certificadas como navegables** en un browser público ni desde la vista previa. El cambio solicitado agrega la navegación del tema, pero el contenido puede dar 404 hasta que se habiliten esas páginas, decisión separada que requiere autorización expresa del operador.
- Tema publicado Horizon MAIN preservado; colección/producto/capacidad no alterados.

## Precauciones y próximos pasos

No publicar las páginas ni el tema únicamente para que el menú funcione en esta fase. Para inspección, usar el selector de plantilla de Shopify Admin `page.seguimiento` y `page.soporte`. Para permitir navegación plena, se necesitará decidir la publicación controlada de esos recursos y comprobar las rutas, bajo protección de la tienda y con límites seguros. Las operaciones de seguimiento/soporte reales siguen deshabilitadas.
