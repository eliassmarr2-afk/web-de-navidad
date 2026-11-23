# MIG-SHFY-02B · Revisión móvil y navegación previa a publicación

**Fecha:** 2026-11-23 · Buenos Aires (GMT−03)  
**Estado:** QA ESTÁTICO PASS / CAPTURAS GENERADAS / INTERACCIONES Y APROBACIÓN VISUAL PENDIENTES / NOT LIVE.  
**Tienda:** Shopify `b06xsm-bh.myshopify.com`; Horizon MAIN `gid://shopify/OnlineStoreTheme/191330517191`.  
**Versión Shopify guardada:** `0d5330b93e8791525db5428f5d2d8fb0af1bca0c`.  
**GitHub rama:** `construction/shopify-migration`; `main` inalterado `7111c545b26e92b6b2b4801534659afeed02a5c1`.

## Alcance aprobado

Congelar **aspecto de Home** en el estado MIG-SHFY-01D, sin corrección de escritorio. Revisar Navidad, Regalos y la única plantilla de Colecciones, su navegación móvil y estados vacíos, conservando sitio no publicado y Protocol Data sin conexión.

## Implementación concreta MIG-SHFY-02B

Archivo editado y respaldado desde Shopify: `shopify/sections/sds-home-tabs.liquid`.

Solo cambia la lógica de destino de los cinco tabs: conserva todos los SVG, clases, textos y HTML original. Primero respeta `block.settings.destination` editable; cuando no existe, el tab Inicio enlaza a `routes.root_url` y los otros cuatro resuelven los recursos Shopify `pages['navidad']`, `pages['regalos']`, `pages['seguimiento']`, `pages['soporte']`. Al faltar un recurso, el tab sigue sin enlace; no se inventan URLs ni se ejecutan servicios operativos.

El comportamiento del tab seleccionado de las landings y colecciones usa `snippets/sds-seasonal-tabbar.liquid` de la fase 02A sin duplicar el componente por categoría.

## Verificación estructural (22/22 PASS)

- Composición validada por `jq`: `page.navidad.json`, `page.regalos.json`, `collection.json` y Home sin cambios de secciones.
- Navidad usa ocho identidades; Regalos cuatro (`regalos, envoltorios, monos, ofertas`).
- Todos los handles comerciales siguen bajo una plantilla de colección compartida; usa `collection.products`, `collection.products_count`, `collection.image`, `sort_by`, opciones nativas de Shopify y paginación de 24.
- Los cuatro destinos de la barra Home están protegidos por resolución del recurso Shopify; Pedidos y Ayuda siguen sin pantalla activa.
- Dos exclusiones `sds_fullbleed` para header/footer de las superficies aprobadas; sin intervención del checkout ni de la Home visual.
- Secciones Liquid, schemas, assets y CSS presentes; sin referencias de escritura Protocol Data ni productos/precios mock en las nuevas plantillas.

## Capturas y límites de la evidencia

La herramienta Shopify `theme_screenshot` devolvió resultados de captura móvil 390px para `/`, `/pages/navidad`, `/pages/regalos`, `/collections/arboles`, `/collections/regalos` y `/collections/frontpage` durante la revisión. La generación de una captura no prueba que un recurso en borrador sea públicamente navegable ni certifica por sí sola el aspecto exacto del contenido. **No se completó un recorrido real de clics ni comparación de píxeles con la fuente GitHub.**

## Estado de publicación y datos (consulta posterior)

- Navarra/Navidad y Regalos: ambas páginas en borrador (`isPublished=false`).
- Ocho colecciones nuevas: `unpublished=8`; solo `frontpage` preexistente está publicada.
- Shopify tiene cero productos reales. No se creó inventario ni se alteraron costos/checkout.
- Tema guardado con `pending=[]`, `pushErrors=[]`, `rejectedReason=null`, y 22 archivos `awaitingPublish`. No se ejecutó `theme_publish`.

## Disposición y próximo gate

MIG-SHFY-02B = **CONSTRUIDO / QA ESTRUCTURAL PASS / GUARDADO / GIT MIRROR / NO LIVE**. Falta aceptar visualmente y probar de manera interactiva los enlaces cuando se habiliten las páginas/colecciones; ese paso será requisito para el GO LIVE coordinado, no una autorización para publicar ahora. La Home de escritorio conserva exactamente su presentación anterior.
