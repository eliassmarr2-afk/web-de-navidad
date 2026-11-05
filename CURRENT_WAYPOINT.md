# WEB DE NAVIDAD — CURRENT WAYPOINT

**Fecha:** 2026-11-04  
**Repo:** `eliassmarr2-afk/web-de-navidad`  
**Branch:** `main`  
**Visibilidad:** pública.

## Estado

```text
SITE CLONE             COMPLETE
HOME UI V1             IMPLEMENTED
HOME VISUAL REVISION    CODE READY / REVIEW PENDING
VISUAL/DEVICE REVIEW   PENDING
FINAL IMAGES           NOT STARTED
LIVE COMMERCE          NOT AUTHORIZED
LIVE PROTOCOL DATA     NOT AUTHORIZED
```

## Entregado

- Capa navideña independiente sobre arquitectura clonada.
- Ocho categorías en una única fila deslizable, círculos rojos e iconos blancos, sin caja de fondo.
- Hero full-bleed con controles superiores, buscador y mapa superpuestos; filtros, banner medio con sombrerito, combos y productos; navegación inferior móvil.
- Catálogo demo en `js/commerce/catalog.js` sin integración live.
- Aislamiento de `sessionStorage` y eventos respecto de Indumentary.

## Pendientes explícitos

1. Validación visual del operador en smartphone y desktop.
2. Producción y sustitución de imágenes comerciales reales, separada del código funcional.
3. Personalización navideña de Product, Tracking y Soporte; heredados del sitio fuente en V1.
4. Integraciones Shopify / Protocol Data sólo tras contratos y autorización posterior.

## Fuente y límites

Original `eliassmarr2-afk/indumentary` intacto. Documentos heredados que todavía mencionen Indumentary reflejan su origen histórico, no el contrato actual de Web de Navidad. El contrato vigente de Home es `CHRISTMAS_DESIGN_CONTRACT.md`.

## Nueva autoridad de diseño — 2026-11-04

- El operador aprobó una revisión visual **posterior** al build inicial, documentada en `HOME_V1_APPROVED_VISUAL_REVISION.md`.
- **DISEÑO CERRADO / CÓDIGO IMPLEMENTADO / VALIDACIÓN VISUAL PENDIENTE** para esta nueva revisión: hero full-bleed aprox. 25 % de altura y controles (ubicación, íconos, buscador y botón de mapa) superpuestos; categorías en una única fila edge-to-edge sin caja; filtros sobre fondo general; banner promocional 2,6:1 inmediatamente después de filtros con sombrerito navideño; navegación inferior conservada.
- La revisión reemplaza la versión antigua de dos filas y cabecera separada. La implementación se entrega por commit en main; **no considerar validado en dispositivos hasta revisión de operador**.
- Las imágenes del banner hero y fotografías comerciales definitivas se diseñarán en fase posterior; no adelantar su producción.
- No tocar Shopify/Protocol Data LIVE, ni `indumentary`, ni reconstruir infraestructura ensamblable.

## Entrega de código de revisión visual — 2026-11-04

- `index.html`: hero superior full-bleed, ubicación y accesos dentro, buscador y botón mapa dentro, sección banner medio antes de packs, corrección de cierres HTML.
- `css/navidad-home.css`: layout responsive, barra inferior preservada, categories rail y filtros sobre fondo general.
- `js/app.js`: render de una sola fila, control mapa delegado a modal de ubicación, sincronización del indicador del menú inferior; sin cambios en adapters.
- `assets/christmas-santa-hat.svg`: adorno local para la esquina del segundo banner.
- **Pendiente:** revisión visual real del operador en móvil y desktop; creatividad definitiva del hero y fotografías de catálogo; pruebas funcionales en navegador. Este registro no certifica producción.

## Ajuste visual correctivo — 2026-11-04

- Operador verificó visualmente la Home V1 en móvil y aprobó su composición general.
- Incidencia detectada en captura: franja vacía a la derecha del hero y del contenido principal, mientras la barra inferior sí ocupa el ancho del viewport.
- Corrección específica en `css/navidad-home.css` (solo Home móvil, hasta 720 px): alinear el ancho del body, el shell, el hero y `page-content` con `100vw`, y mantener el recorte horizontal dentro del viewport. Se incrementó el parámetro de versión de CSS en `index.html` para evitar caché de estilos obsoletos.
- **Estado:** ajuste de código listo; comprobación visual del operador pendiente. No declarar el defecto cerrado hasta capturar una nueva pantalla.
- **Siguiente fase tras validar:** diseño de las creatividades de los banners; todavía sin modificar fotografía final, catálogo, ni Protocol Data/Shopify.

## Banner superior aprobado — 2026-11-04

- El operador seleccionó una imagen navideña panorámica con Papá Noel a la derecha, regalos a la izquierda y centro verde/rojo sin textos.
- Fuente suministrada por el operador; se preparó copia WebP **1536×864** para subir a `assets/christmas-hero-banner.webp`.
- `css/navidad-home.css` referencia el asset relativo `../assets/christmas-hero-banner.webp` con fondo degradado de reserva y centrado `cover`, ocultando las decoraciones del placeholder anterior.
- La imagen fue subida y verificada en el árbol de `main` (2026-11-04); el recorte visual definitivo en teléfono continúa sujeto a revisión.

## Segundo banner — cupón navideño aprobado — 2026-11-04

- El operador subió el arte rectangular completo `assets/christmas-coupon-banner.png`, confirmado SHA `9aa98256b76b3feefb935546a37210ed32c89c54`, 2022×778 px; el archivo inicialmente tenía un nombre automático de GitHub y fue asignado a una ruta canónica sin modificar el contenido binario.
- `index.html` reemplaza el banner rojo previo y su sombrerito superpuesto por **una sola imagen completa**. No se insertan textos duplicados sobre ella.
- `css/navidad-home.css` y `assets/coupon-ticket-mask.svg` crean la silueta de cupón (muescas, recorte y sombra) **en el contenedor**, no en la imagen; se conserva relación 2022:778.
- Contrato específico: `CHRISTMAS_COUPON_BANNER_V1.md`, que prevalece sobre la anterior especificación del segundo banner con sombrerito en la Home V1.
- **Pendiente de revisión visual** en móvil y desktop; la publicidad de 20% en el área izquierda y 25% en el talón verde es una inconsistencia textual solicitada expresamente y pendiente de aclaración comercial antes de producción. Ningún descuento/cupón fue integrado al motor comercial.

## Producto V2 — estructura aprobada — 2026-11-04

- **Autoridad vigente:** `PRODUCT_V2_APPROVED_STRUCTURE.md`. Sustituye el borrador `PRODUCT_V2_INITIAL_STRUCTURE.md` solo para el diseño de la nueva página de producto.
- **DISEÑO APROBADO / CÓDIGO FUNCIONAL PENDIENTE:** encabezado rojo `SantaClaus Store`; franja verde de domicilio borde a borde con mismo flujo Home; título del proyector sobre blanco; valoración `(4.7)` con cinco estrellas verdes rellenas pequeñas a la derecha; badge `MÁS ELEGIDO` debajo del título; mensaje contextual de entrega; foto principal 1:1 borde a borde; ofertas a continuación.
- **Enmienda final:** **todos los contenedores de badge de la Product V2 tienen `border-radius: 4px`**. No redondearlos como pills.
- Tipografía **Manrope**, verificada en el repositorio Camping `eliassmarr2-afk/ecommerce-v2`.
- **Guardas:** corregir el uso heredado de `indumentary.sessionLocation.v1` en la página anterior y reutilizar `web-de-navidad.sessionLocation.v1`; no inventar fechas, precios ni reputación verificada; Shopify/Protocol Data no activos. Imagen real se aborda después de cerrar la implementación estructural.
- No se ha modificado `product.html` en esta aceptación; sigue siendo el build heredado de Indumentary hasta el movimiento técnico autorizado.

## Producto V2 — implementación superior — 2026-11-04

- El operador confirmó que se cambia **exclusivamente lo anterior a la imagen** y el marco 1:1 de la propia imagen. **El cuerpo inferior se preserva**, sin reestructurar módulos deportivos/combos/soporte/compra demo heredados.
- `product.html` y `css/product-v2-top.css`: marca `SantaClaus Store` sobre rojo, franja verde de domicilio, título de proyector, valoración `(4.7)` de ejemplo con cinco estrellas verdes llenas, badge `MÁS ELEGIDO` de radio **4px**, información de ubicación y galería cuadrada full-width con placeholder.
- `js/product-v2-top.js` enlaza la banda y botón de entrega al **modal original**, leyendo `web-de-navidad.sessionLocation.v1` desde el módulo común.
- `js/product-runtime-v4.js` corrige **cuatro errores de interpolación de templates preexistentes** que hacían inválido el JavaScript original; ajusta fixture demo y flujo de ubicación, sin reescribir las ofertas ni el resto de la página.
- `js/product-commercial-v1.js` alinea la sesión compartida y deja de afirmar gratuitamente «mañana / envío gratis» sin Logistics; se escapan sugerencias de domicilio que antes eran interpretadas como HTML.
- `js/product-support-camping-v1.js`: el widget de reanudación del chat se mantiene **debajo de la imagen** tras mover la presentación arriba.
- Documento técnico: `PRODUCT_V2_IMPLEMENTATION_RECEIPT.md`.
- **Pendiente:** revisión visual/navegación de la nueva ficha en móvil; despliegue de Pages; futura foto real del proyector; cambio de ofertas y contenidos heredados solo mediante acuerdo separado. Shopify y Protocol Data continúan NOT ACTIVE.

## Producto V2 — imagen principal del proyector — 2026-11-04

- El operador subió `assets/proyector-navideno-producto.webp`; GitHub verificó el blob `51e1b138a5a0ff82beef41a351897f03fe1db030` (292326 bytes).
- La fotografía cuadrada se vinculó al `#productImage` de `product.html` y a la fuente media de la ficha demo `prod-002` en `js/product-runtime-v4.js`. La miniatura usa esa fuente existente, sin cambios en el módulo inferior.
- Se conserva composición **1:1 de borde a borde**, sin radios ni separaciones. Foto subida es un asset de demostración local; Shopify aún no está integrado.
- **Pendiente:** confirmar visualmente la publicación de GitHub Pages en móvil. La actualización del código no equivale a validación final del navegador.

## Producto V2 — nueva paleta beige, título y metadatos — 2026-11-04

- Fuente: imagen de paleta compartida por el operador. Valores exactos: `#A60B08` rojo, `#5E0001` bordó, `#1D2E19` verde, `#CFCABF` beige, `#76584C` marrón.
- **Encabezado** beige navideño con íconos/brand verde oscuro; **franja de domicilio** verde oscuro con texto blanco. Introducción y fondo de la imagen permanecen blancos.
- Sobre el título aparece en gris **«Nuevo | +600 vendidos»**, dato ilustrativo no verificado. Título se acorta a **«Proyector de formas navideñas portable»** (sin «| Iluminación LED para hogar»).
- Se verificó **Manrope** en `eliassmarr2-afk/ecommerce-v2` (Camping); el nuevo título adopta peso **600** y menor tamaño (21–27px) para acercarse a su jerarquía tipográfica.
- Badge `MÁS ELEGIDO` conserva verde oscuro y radio **4px**. La puntuación `4.7` y ventas son demo hasta obtener evidencia real.
- Se redistribuyen acentos rojos/bordó en botones comerciales, badges secundarios y selección; **ningún componente bajo la imagen cambia de orden ni funcionalidad**.
- Autoridad de cambio: `PRODUCT_V2_PALETTE_REVISION.md`, que prevalece sobre colores/título del contrato anterior.
- **Pendiente:** publicación GitHub Pages, revisión visual y sustitución de datos comerciales simulados antes de lanzamiento real.

## Santa Clausula — encabezado verde y logo pendiente — 2026-11-04

- El operador confirmó la identidad **SANTA CLAUSULA**, representada por un logo transparente con leyenda STORE; la imagen de referencia «Jingle» establece **el nuevo verde del encabezado #1E7437**.
- El logo **ya fue subido por el operador y verificado en main**: `assets/santa-clausula-logo.webp`, 800×800, 107242 bytes, Git SHA `f2700940ec6f65b9975b5c07adc9e6730f0ca9e0`. **Está insertado en el centro del encabezado** con tamaño compacto 58×58px (50×50 en pantallas estrechas), manteniendo transparencia.
- `product.html`: marca y metadatos actualizados; CSS/JS versionados para evitar caché.
- `css/product-v2-top.css`: cabecera verde y controles blancos, **franja de domicilio blanca pura con texto negro e iconos negros, únicamente borde inferior gris de 1px**, títulos principales y precios negros puros, subtextos grises, badge «MÁS ELEGIDO» mismo verde y 4px de radio.
- `js/product-runtime-v4.js`: nombre de marca del título dinámico y vendedor alineado; imagen 1:1 y secciones inferiores conservadas.
- Autoridad vigente de identidad y color: `SANTA_CLAUSULA_BRAND_HEADER_V1.md`. La imagen anterior «Jingle» es solo una referencia cromática, NO el logo.
- **Siguiente movimiento:** esperar la confirmación de publicación en GitHub Pages y verificar en móvil el tamaño del logo, fondo verde, selector blanco con línea gris inferior, títulos negros y badge verde.

## Producto V2 — Sticky de Compra aprobado e implementado — 2026-11-04

- **Referencia:** captura de compra móvil del operador. Diseño aprobado explícitamente.
- Nuevo `PRODUCT_V2_STICKY_APPROVED.md`: contrato definitivo de barra fija blanca, total e importe de la oferta seleccionada, shipping/badge a la derecha, cuotas, CTA azul `#2579FF` único y de ancho completo, sin botón negro de carrito.
- **Umbral:** aparece al alcanzar el 30% de la distancia desplazable real de la página; se oculta al retroceder. CSS inicial oculto; JS maneja `aria-hidden`, `inert` y listeners pasivos.
- `product.html`: reemplaza **solo** la barra `.purchase-bar`, conservando el único `#productPrice` para mantener los cálculos existentes y el `#oldPrice` oculto para compatibilidad; ID del nuevo CTA `#startCheckout` para desacoplarlo del demo cart.
- `css/product-v2-sticky.css` y `js/product-v2-sticky.js`: CSS responsive, visibilidad al 30% y estados de envío/cuotas. Sin Protocol Data/Shopify activos: se muestran «Calculá el envío con tu CP», «Ingresá tu CP» o «Entrega por confirmar», «Cuotas por confirmar». **No anunciar gratis/mañana** sin Logistics; los futuros eventos locales de adapter se detallan en el contrato.
- «Iniciar compra» muestra aviso de demo, no genera orden ni simula checkout. Precio actual todavía es mock y no representa un total real con logística.
- **Importante:** el resto de la estructura inferior, las ofertas, las variantes y la fotografía 1:1 se mantienen sin cambios. Revisión visual y publicación de Pages pendientes.

## Producto V2 — galería reservada y contorno azul del combo — 2026-11-04

- Cambio **limitado** a la superficie visual de Producto: eliminar el hueco visible de galería entre la foto 1:1 y el combo seleccionable. Mientras no se apruebe una galería, se ocultan visualmente el separador `.product-sheet__handle`, la tira `#thumbnailRail` y el botón «Ver galería». Los nodos permanecen para compatibilidad y habilitación futura; no se reescribe el runtime de fotografías.
- La oferta seleccionable `.product-combo-card` pasa a tener **radio de 4px siempre**, también en bordes izquierdo de imagen y derecho de contenido, sin cambiar su composición.
- El estado `.is-selected` recupera **contorno azul #2479FF de 3px** y marcador circular azul, desplazando únicamente la recolorización roja posterior. Los eventos existentes y la fuente de precio del sticky permanecen intactos.
- `css/product-v2-combo-refinement.css`: hoja scoped cargada **después** de `css/product-v2-sticky.css` para resolver la precedencia sin tocar colores de otros componentes.
- La reanudación contextual de Soporte se mantiene visible **debajo del combo** mediante el orden flex del widget, aunque la tira de miniaturas permanezca oculta.
- **Sin cambios** al resto del sitio, al HTML estructural inferior, al sticky, a la imagen principal 1:1, a las ofertas/variantes, ni a Shopify/Protocol Data. Pendiente inspección en móvil tras desplegar GitHub Pages.

## Recordatorio de Compra V1 — modal aprobado e integrado — 2026-11-04

- El operador aprobó el módulo **«Programá un recordatorio para comprar este producto»** inmediatamente debajo de los tres ítems del cuerpo comercial. Fila blanca, reloj negro y chevron, con subtexto gris.
- **Contrato:** `PRODUCT_V2_PURCHASE_REMINDERS_APPROVED.md`, autoridad para UI y arquitectura futura del Reminder Service.
- **Archivos nuevos:** `js/product-purchase-reminder-v1.js` y `css/product-purchase-reminder-v1.css`; se cargan con `defer` después del cuerpo comercial y con CSS posterior a las hojas de producto. No cambia el HTML estructural de la foto, el combo, las ofertas ni el sticky.
- **Modal:** «Recordame comprar», email, fecha y hora de Argentina (GMT−3), privacidad sin marketing y botón verde, radios 4px. Validación de datos y navegación con teclado. Se admiten fechas futuras hasta 25 de diciembre de cada temporada.
- El frontend reserva `window.SantaClausulaReminderAdapter.create`; respuestas de éxito solo si provienen de un adaptador real. **No existe todavía backend de recordatorios ni emisor de correo integrado.**
- **Fase actual UI PREVIEW:** al abrir muestra aviso de servicio no habilitado. Sin backend, no transmite, guarda ni programa correos y no declara éxito. No activar accidentalmente sobre Supabase `protocol-data-v2`, único proyecto conectado: requiere servicio aislado y autorización.
- **Próximo movimiento operativo:** configurar servicio de backend + verificación de correo + scheduler + proveedor de email + cancelación y seguridad; pruebas end-to-end. Inspección visual móvil de esta UI pendiente del despliegue de Pages.

## Product V2 — media principal 4:5 — 2026-11-04

- El operador autorizó convertir únicamente el **marco visual de la imagen principal** de **1:1 a 4:5 (ancho:alto)**, manteniendo **borde a borde**, blanco, sin radios ni márgenes y sin galería visible.
- `css/product-v2-top.css`: las reglas del contenedor `.christmas-product-media` y la imagen `.product-hero__image` usan `aspect-ratio: 4 / 5`; `object-fit: cover` y centrado se conservan. **La fuente WebP actual sigue siendo 1:1**, así que el marco 4:5 puede recortar laterales: se deberá evaluar el encuadre en móvil y producir un asset vertical 4:5 si se necesita conservar absolutamente todas las formas proyectadas.
- `product.html`: se invalida únicamente caché de la hoja V2 mediante parámetro de versión; no se modifica HTML inferior ni la lógica de combos, selector, sticky o recordatorio.
- **Fase siguiente, sin frontend aún:** diseño y preflight del chat visual del cliente para enlazar con Protocol Data V2 Support/Conversations, siguiendo contratos públicos canónicos, sin reutilizar ni ampliar por suposición el actual chat mock de producto.

## Chat visual cliente — propuesta de arquitectura (sin código UI) — 2026-11-04

- Referencias auditadas: `CUSTOMER_CONVERSATION_SURFACE_CONTRACT.md` de sitio, documento 006 de Ecosistema y contratos Support/Conversations canónicos de Protocol Data V2 (core, customer edge y SUPPORT 014).
- **Nueva propuesta local candidata:** `SANTA_CLAUSULA_CUSTOMER_CHAT_VISUAL_CANDIDATE.md`. **No aprobada visualmente todavía**; no se presenta como criterio central FROZEN.
- Propuesta: acceso de Producto por `#productSupportButton` existente, continuidad con una única interfaz autorizada, móvil alto/full-screen y escritorio panel lateral; verde de marca, mensajes públicos, metadatos case safe, estados vacíos/cerrados/denegados y composer/adjuntos reservados.
- Riesgo actual: `js/product-support-camping-v1.js` usa almacenamiento y namespace `indumentary`; `js/product-runtime-v4.js` contiene otra lógica de soporte demo. No duplicar inicializaciones ni confundir mocks con casos backend.
- Distinción Support Case sin asociación Order vs caso con asociación canónica: no inferir comprador por email ni por Shopify; la proyección pública actual **no expone** Order association ni contexto buyer. `SUPPORT 014` es candidato congelado, sin evidencia de ejecución live.
- La **imagen 4:5** está implementada (commit previo); para chat esta fase es diseño y contrato **PENDIENTE DE APROBACIÓN**, sin nuevas páginas o enlaces customer live.

## Conversaciones — tres orígenes, un único backend — 2026-11-05

- **Nueva autoridad local aprobada:** `SANTA_CLAUSULA_CONVERSACIONES_TRES_ORIGENES.md`. Supera el modelo anterior de «dos modos» al distinguir **entrada** (Soporte general vs landing product) de **asociación** (sin/ con Order confirmada).
- A: soporte general con nombre/correo/motivo y cabecera «Soporte | SANTA CLAUSULA» + favicon; ninguna fotografía de producto.
- B: Support con contexto de compra **únicamente** después de identidad/Order verificados y proyección customer-safe autorizada; no detectar como comprador por coincidencia de correo.
- C: acceso vía botón existente de Producto, formulario sencillo nombre/correo, cabecera de tienda y tarjeta de producto/offer como contexto, sin suponer compra.
- **Todas** las entradas llegan al dominio Support / Conversations. El Public Start no requiere token previo del usuario, pero **emite capability** para leer/responder después; no hay canal de continuación persistente sin autorización.
- La base canónica dispone de Queues y Segments Store-scoped: `Chats por productos` es una clasificación/cola futura posible, **no** un módulo de mensajes independiente. Public Start hoy crea `support_queue_id=NULL`, por lo que asignación automática exige un flujo confiable, no un selector público arbitrary.
- El operador **no autorizó aún rediseño ni reemplazo de JS del chat**. Todo nuevo desarrollo queda pendiente de fase posterior de UI y certificación backend.

## Caso A — Soporte general UI V1 — implementado — 2026-11-05

- El operador aprobó expresamente el 05-11-2026 la maqueta de Soporte general: cabecera verde `#1E7437`, avatar/favicon de SANTA CLAUSULA, campos nombre/correo/motivo/**mensaje inicial**, burbujas de diálogo y composer.
- **Autoridad local de implementación:** `SANTA_CLAUSULA_SUPPORT_GENERAL_V1_IMPLEMENTATION.md`.
- `soporte.html`: nueva identidad de marca, formulario de cuatro campos, acción `Iniciar consulta` que valida localmente sin enviar datos, y enlace `Ver vista previa del chat`.
- `conversacion.html`: nueva vista visual customer. **Sin `?demo=1` no existe conversación activa; con demo se muestran únicamente mensajes ficticios bien señalizados** y composer/adjuntos deshabilitados.
- `css/support.css`, `js/support.js`, `css/customer-conversation-v1.css`, `js/customer-conversation-v1.js`: UI aislada, sin backend ni token persistido. Favicon temporal reutiliza `assets/santa-clausula-logo.webp`.
- **NO tocar** la lógica de consulta de Producto/escenario C en esta fase. B/C pendientes; no duplicar motores de Support cuando se integren.
- **Estado:** UI code ready; Pages/visual mobile review PENDING; Protocol Data Support Start/Customer NOT ACTIVE; emails reales NOT ACTIVE.

## Caso B — contexto de pedido en Conversaciones, sin contornos — 2026-11-05

- El operador aprobó el diseño del escenario B **con la condición expresa de NUNCA utilizar contornos de color en tarjetas, badges o widgets**. Se prefieren sombras leves, cortas y poco difuminadas y la separación por fondo/espaciado.
- **Contrato/recibo:** `SANTA_CLAUSULA_SUPPORT_BUYER_V1_IMPLEMENTATION.md`.
- Se amplía el **mismo** `conversacion.html`, sin duplicar chats ni integrar todavía Protocol Data. La UI admite tres previews: A `?demo=1`, B sin verificar `?demo=buyer-pending`, B ficticiamente verificado `?demo=buyer-verified`.
- **Pendiente:** ninguna referencia de compra expuesta; **verificado demo:** solo `Pedido #SC-DEMO` y `En preparación (ejemplo)` con tarjetas sin bordes y sombras compactas. Los datos no provienen de Orders.
- `js/customer-conversation-v1.js`: control exclusivo de previews, sin requests ni persistencia. `css/customer-conversation-v1.css`: bloc buyer + regla sin bordes para A/B. `css/support.css` y `soporte.html`: se eliminan contornos decorativos del formulario A (sin cambiar sus campos o envíos).
- El escenario C (consulta desde Landing Product) y el soporte real B quedan pendientes. `product.html` no se modifica.
- **Seguridad:** el inicio público produce `order_id=NULL`; la consulta customer aún no proyecta buyer/Order. Una vista visual `?demo=buyer-verified` NUNCA confiere acceso seguro ni confirma ninguna compra.
- Pendiente inspección móvil/desktop y despliegue GitHub Pages del commit final.

## Caso C — chat contextual de Producto V1 — 2026-11-05

- **Diseño expresamente aprobado:** botón de chat existente en la landing, bottom sheet de marca verde `#1E7437`, fotografía 4:5, título de producto y oferta seleccionada si corresponde, formulario con nombre/correo/mensaje inicial, y mismo chat visual compartido A/B con tarjeta de producto arriba de los mensajes.
- **Contrato:** `SANTA_CLAUSULA_SUPPORT_PRODUCT_V1_IMPLEMENTATION.md`; UI integrada. Sin backend, Shopify ni correos.
- `product.html`: reemplazado modal heredado de Camping por el modal contextual de SANTA CLAUSULA. Nuevos `js/product-support-v2.js`, `css/product-support-v2.css`; uso del mismo `#productSupportButton` y ningún widget flotante adicional.
- `js/product-runtime-v4.js`: quitada ruta duplicada de chat (soporte ficticio, almacenamiento `indumentary.productSupport`, listeners). Script `js/product-support-camping-v1.js` / CSS de Camping desvinculados; fuente histórica inactiva. No existe chat paralelo.
- `conversacion.html?demo=product`: extensión de la misma UI de A/B, con un fixture navideño explícitamente ilustrativo. Las consultas reales de Producto no se crean ni simulan; formulario y composer seguros/inactivos.
- **Regla visual vigente:** tarjetas/badges/widgets sin contornos decorativos de color; fondos blancos/grises, sombra leve poco difuminada y radios 4px.
- **Próximo paso:** inspección móvil y, posteriormente, diseñar y certificar el vínculo real Shopify (producto, variantes y ofertas) ↔ Support Public Start / Customer y la clasificación confiable `Chats por productos` de Protocol Data.

## Slide de calificación post-cierre — candidato de diseño — 2026-11-05

- **Pedido del operador:** cuando Protocol Data V2 marque un caso de Conversaciones como finalizado, el chat del cliente entra en modo solo lectura y se abre un slide para calificar la atención. El operador refiere un antecedente funcional en V1, sin medición de datos confiable.
- **Revisión canónica:** `close_case` fija `status=cerrada` y `closed_at`, no genera mensaje; customer reply de casos cerrados se rechaza; `reopen_case` vuelve a `en_proceso`. V1 Conversaciones auditada confirma cierre/reapertura, mientras V1 Experiencias sí contiene rating 1–5 pero **para experiencias postcompra**, no evidencia suficiente de rating post-cierre por caso.
- **Nuevo documento candidato:** `SANTA_CLAUSULA_SUPPORT_CLOSURE_RATING_SLIDE_CANDIDATE.md`. Propuesta: sheet blanco de CSAT de atención (1–5 estrellas, comentario opcional, ahora no), apertura solo después de confirmación autorizada de cierre; compositor deshabilitado; estados omitido/enviado/vencido/reabierto. Cero bordes decorativos de color, sombras cortas.
- **Requiere contrato central nuevo:** elegibilidad y submit seguro asociado a Support Case + ciclo de cierre, idempotencia y métricas reales. NO reutilizar sin autorización las reseñas de compra/producto de Experiencias.
- **Estado:** diseño **PENDIENTE DE APROBACIÓN**; no se modifica HTML/CSS/JS del chat ni backend con este movimiento. Queda para mock visual siguiente después del acuerdo explícito.

## Cierre de Conversaciones — Slide CSAT aprobado e implementado (demo) — 2026-11-05

- **Aprobación del operador:** slide de calificación 1–5 estrellas, comentario opcional máximo 600 caracteres de UI, botón `Ahora no` y confirmación ilustrativa. Aprueba asimismo el **contrato de vinculación con Logística / Conversaciones** y da por cerrada esta etapa visual/documental.
- **Contrato local aprobado:** `SANTA_CLAUSULA_SUPPORT_CLOSURE_RATING_INTEGRATION_CONTRACT.md`. Reemplaza como autoridad vigente a `SANTA_CLAUSULA_SUPPORT_CLOSURE_RATING_SLIDE_CANDIDATE.md` (histórico, enmendado).
- **Frontend:** `conversacion.html?demo=closed-rating` añade preview de caso cerrado, composer oculto y banda de solo lectura, con slide auto-abierto; `css/conversation-rating-v1.css` y `js/conversation-rating-v1.js` encapsulan layout y UI in-memory. El selector permite volver a A/B/C.
- Regla de diseño: sin contornos de color en cards/badges/widgets, sombras breves, radios compactos.
- **Límite absoluto:** el modo demo no ve el cierre real de un caso, no envía, no guarda calificación ni simula ACK real. Integración live CSAT exige futuro contrato canónico de Protocol Data (elegibilidad por cierre, identidad con capacidad, idempotencia, escritura y métricas), con autorización y certificación independientes.
- **Estado:** `SITE UI + LOCAL INTEGRATION CONTRACT = CLOSED`; `LOGISTICS SUPPORT CSAT BACKEND = NOT ACTIVE`; no se modifican Supabase, Shopify ni módulos comerciales.
