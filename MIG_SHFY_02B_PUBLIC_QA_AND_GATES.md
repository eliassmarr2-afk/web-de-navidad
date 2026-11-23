# MIG-SHFY-02B.1 — Validación de visibilidad pública y matriz de aceptación

**Fecha de auditoría:** 2026-11-23 (America/Argentina/Buenos_Aires)  
**Tienda:** `b06xsm-bh.myshopify.com`  
**Tema:** Horizon MAIN, `gid://shopify/OnlineStoreTheme/191330517191`  
**Última versión de tema verificada:** `0d5330b93e8791525db5428f5d2d8fb0af1bca0c` (MIG-SHFY-02B)  
**Rama GitHub:** `construction/shopify-migration`  
**Disposición:** PUBLIC ACCESS GATE PASS / INTERNAL INTERACTIVE VISUAL REVIEW OPEN / NOT LIVE

## 1. Prueba efectuada con un navegador externo sin autenticación

Se realizó una inspección **solo lectura** de la tienda pública, sin iniciar sesión, sin enviar formularios y sin modificaciones.

| Ruta solicitada | Observación del navegador no autenticado |
|---|---|
| `/` | Pantalla de protección por contraseña «Opening soon» |
| `/pages/navidad` | Pantalla «Opening soon» por protección de la tienda |
| `/pages/regalos` | Pantalla «Opening soon» por protección de la tienda |
| `/collections/arboles` | Pantalla «Opening soon» por protección de la tienda |
| `/collections/regalos` | Pantalla «Opening soon» por protección de la tienda |

**Conclusión válida:** el contenido en construcción no fue visible para el visitante anónimo observado. En la pantalla de protección se mostró el nombre provisional de tienda **«Mi tienda»**.

**Conclusiones NO válidas:** NO se demostró que las páginas privadas rendericen correctamente bajo autenticación, que el 404 del recurso no publicado esté configurado correctamente, que las tarjetas de colección sean navegables cuando se publiquen, o que el usuario pueda completar la navegación a productos. La pantalla de contraseña intercepta esas rutas antes de poder observar su contenido.

## 2. Estado de datos Shopify reconfirmado

- `pages['navidad']` y `pages['regalos']` tienen `isPublished=false`.
- Ocho colecciones nuevas: `unpublished=8`; la colección preexistente `frontpage` continúa en `published=1`.
- Productos: `0`.
- No se ejecutaron `pageUpdate`, `collectionUpdate`, `publishablePublish`, `theme_publish` ni cambios de estado de tienda.
- `main` original en GitHub conserva `7111c545b26e92b6b2b4801534659afeed02a5c1`.

## 3. Matriz de aceptación previa a MIG-SHFY-02C o GO LIVE

| ID | Superficie | Verificación requerida | Estado |
|---|---|---|---|
| 02B-PUB-01 | Store pública anónima | Solo ve pantalla de contraseña, no recursos internos | PASS observado |
| 02B-STR-01 | Landing Navidad | 8 colecciones y hero, copy, breadcrumb, tabs en 390 y 1440 px | Código y capturas generadas, revisión humana pendiente |
| 02B-STR-02 | Landing Regalos | 4 colecciones y hero, copy, breadcrumb, tabs en 390 y 1440 px | Código y capturas generadas, revisión humana pendiente |
| 02B-STR-03 | Colecciones | Un solo template, títulos, hero, descripción, sort_by, paginado 24 y estados vacíos | QA estructural PASS; interacción pendiente |
| 02B-NAV-01 | Home→Navidad/Regalos | Los enlaces aparecen solo si existe recurso Shopify válido y el destino es accesible | Código mirror PASS; navegación real pendiente |
| 02B-NAV-02 | Barra inferior | Inicio activo por URL; Navidad/Regalos reciben estado activo adecuado | Contrato implementado; observación en navegador pendiente |
| 02B-PRIV-01 | Pedidos/Soporte | Sin enlace a capacidad operativa privada o página inexistente | Lógica de fallback presente, sin página/operación real |
| 02B-COM-01 | Productos/Precios | Sin fichas mock, sin precios falsos, sin ofertas activadas | PASS, catálogo Shopify vacío |
| 02B-REL-01 | Publicación | Ninguna página/colección de la cohorte ni versión Shopify expuesta al público | PASS, tema no publicado y recursos unpublished |
| 02B-REL-02 | Marca pública | Cambiar título de tienda provisional «Mi tienda» cuando se decida lanzar | PENDIENTE, no modificar en esta fase |
| 02B-SYNC-01 | Repositorio | Copia aislada del tema en `shopify/`, sin cambios en `main` | PASS para los archivos desarrollados; verificar nuevos deltas |

## 4. Limitaciones y controles

El servicio `theme_screenshot` informó capturas para `/pages/navidad`, `/pages/regalos` y colecciones, pero retornó solo metadatos de la captura al asistente. No se realizó comparación visual independiente píxel a píxel y no es lícito marcarla como completa.

Para cerrar 02B en términos visuales, abrir el editor de tema Shopify con sesión autorizada, revisar las páginas en vista móvil y escritorio y comprobar navegación; esto NO exige publicarlas. La Home de escritorio **no** se corregirá en esta fase, según decisión del operador.

Las rutas y nombres de producto serán autoridad Shopify; no se crearán datos de prueba en producción ni se conectará Protocol Data antes de terminar la migración.

## 5. Recomendación de ejecución

- Mantener la contraseña de tienda y las páginas/colecciones en borrador.
- Completar aceptación de landings en editor Shopify antes del release.
- Continuar con MIG-SHFY-03 Producto/Variantes/Ofertas/Combos cuando se acepte el checkpoint 02B con estas reservas explícitas; no confundir avanzar construcción con autorizar GO LIVE.
