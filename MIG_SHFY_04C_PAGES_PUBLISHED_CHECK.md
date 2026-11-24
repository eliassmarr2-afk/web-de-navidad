# MIG-SHFY-04C — Publicación acotada de páginas de consulta y soporte

**Fecha operativa:** 2026-11-23 · America/Argentina/Buenos_Aires  
**Autorización:** el operador autorizó explícitamente publicar **solo** las páginas «Estado de mi compra» y «Soporte» para resolver enlaces que devolvían 404.  
**Tienda:** `b06xsm-bh.myshopify.com`, cuenta operativa `santadelsur1@gmail.com`.  
**Disposición:** PAGES PUBLISHED / DRAFT THEME UNPUBLISHED / STORE PASSWORD GATE OBSERVED / NO PROTOCOL DATA.

## Mutación ejecutada

Shopify Admin GraphQL `pageUpdate(page: {isPublished:true})` se ejecutó únicamente sobre:

| Página | Shopify ID | Handle | Template | Estado posterior |
|---|---|---|---|---|
| Seguimiento de mi pedido («Estado de mi compra» en menú) | `gid://shopify/Page/169156346055` | `seguimiento` | `seguimiento` | `isPublished=true` |
| Soporte | `gid://shopify/Page/169156378823` | `soporte` | `soporte` | `isPublished=true` |

Ambas respuestas devolvieron `userErrors=[]`. Relectura Admin GraphQL de `pages` confirmó ambos estados TRUE.

## Controles de contención comprobados

- Tema `Santa Del Sur | Migración (BORRADOR)` `gid://shopify/OnlineStoreTheme/191382716615` conserva role `UNPUBLISHED`.
- Tema `Horizon` original `gid://shopify/OnlineStoreTheme/191330517191` conserva role `MAIN`.
- `pages/navidad`, `pages/regalos` y `pages/conversacion` continúan `isPublished=false`.
- No se modificaron plantillas Liquid, JS, CSS, menús, contenido de páginas, checkout, permisos operativos, productos ni datos de clientes.
- No se ejecutó `theme_publish`, ni se habilitó el lector de Protocol Data o el formulario de consultas.
- `main` del repositorio de origen permanece `7111c545b26e92b6b2b4801534659afeed02a5c1`.

## Pruebas tras la publicación

- `theme_screenshot` del tema borrador `/pages/seguimiento` y `/pages/soporte` a 390px devolvió respuestas de captura de la herramienta Shopify. Esto no constituye por sí solo un PASS de navegación.
- Navegador externo sin autenticación inspeccionó las dos rutas. Ambas redirigen a `https://b06xsm-bh.myshopify.com/password`, pantalla **«Opening soon»** con título temporal «Mi tienda». No se observó el 404 anterior de las rutas desde este navegador, pero la contraseña intercepta antes de comprobar la renderización de la página.
- **Limitación:** no se ha ejecutado recorrido autenticado en el navegador del operador dentro del preview del tema borrador; todavía falta comprobar que al tocar ambos links se mantenga seleccionado ese tema y se rendericen sus plantillas.
- El nombre temporal «Mi tienda» pertenece a la configuración general de la tienda / Horizon y queda pendiente de migración visual, no autorizado a cambiar en este movimiento.

## Instrucciones para revisar

Desde `Shopify → Tienda online → Temas` entrar a **Santa Del Sur | Migración (BORRADOR)** → **Vista previa**. Recargar portada para tomar el estado nuevo, abrir el menú y tocar «Estado de mi compra» / «Soporte». Revisar URL `/pages/seguimiento` y `/pages/soporte` manteniendo el modo preview; no usar simplemente el Horizon original. Si aún aparece 404, revisar la URL efectiva y tema preview antes de modificar permisos o publicar tema.

**Seguridad:** publicar páginas las incorpora al catálogo de páginas de la tienda, pero la contraseña global continúa protegiendo acceso externo; no es aislamiento equivalente a autenticación de recursos privados. Formularios/consultas reales deben permanecer cerrados hasta aprobar conexiones.
