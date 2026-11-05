# SANTA CLAUSULA — SOPORTE CON CONTEXTO DE COMPRA / CHAT VISUAL B V1

**Aprobación del operador:** 2026-11-05  
**Estado:** DISEÑO B APROBADO / UI DE EJEMPLO INTEGRADA EN CONVERSACIÓN EXISTENTE / SOPORTE BACKEND NOT ACTIVE  
**Navegación de prueba:** `conversacion.html?demo=buyer-pending` y `conversacion.html?demo=buyer-verified`  
**Fuente real de contexto de pedido futuro:** Protocol Data V2 Orders (y Logistics para estado de entrega), bajo proyección autorizada.  
**Autoridad de casos/mensajes:** Protocol Data V2 — Support / Conversations.

## 1. Alcance aprobado

El cliente conserva **una misma conversación** (una ruta, una cabecera y un compositor), tanto en A (general) como en B (relacionada a compra). En B se añade al área previa a los mensajes:

1. **Pendiente de verificación:** aviso neutral «Compra pendiente de verificación», sin número de pedido, estado de logística, domicilio, importes, productos ni ningún identificador privado. Subtítulo de chat `Consulta de pedido · Sin verificar`.
2. **Pedido verificado:** tarjeta compacta de pedido con icono genérico de paquete, referencia pública del pedido y estado autorizado. Subtítulo `Consulta sobre tu pedido`; mantener marca `Soporte | SANTA CLAUSULA`, favicon de tienda y los mismos mensajes.
3. En modo real, el contenido buyer solo se activa si el backend entrega explícitamente una **proyección customer-safe** tras verificar identidad y Order asociado. No se deduce de correo, Shopify customer, sesión de navegador, seguimiento o texto del mensaje.

### Diseño general

- **Regla transversal de SANTA CLAUSULA:** no crear contornos de color alrededor de **tarjetas, badges, indicadores ni widgets**. Evitar también contornos decorativos neutros cuando el espaciado/bloque de fondo alcanza. Separar visualmente por fondos y sombras **suaves, cortas y poco difuminadas** (ejemplo `0 1px 3px rgba(18,30,19,.12)`).
- Cuando sea necesario acceso por teclado, foco visible sin marcos coloreados; subrayado o sombra neutra en controles interactivos.
- Radios de cards y bloques 4px, misma paleta verde `#1E7437`, blanco y grises. No convertir la tarjeta de pedido en CTA o desplegable ficticio.
- **Nunca mostrar foto de producto en este contexto B por defecto**; eso queda reservado para consultas iniciadas desde una landing Producto (C).

## 2. Implementación visual entregada

- `conversacion.html` contiene el mismo layout base del Caso A. Se agregan un selector de **tres vistas de ejemplo** (General, Sin verificar, Pedido verificado), un bloque pendiente y una tarjeta de pedido ficticio para B, ambos **ocultos** salvo cuando se solicitan explícitamente los modos demo.
- `js/customer-conversation-v1.js` reconoce exactamente `?demo=1`, `?demo=buyer-pending` y `?demo=buyer-verified`. Cualquier otro valor, incluso `?demo=verified`, muestra vacío (no chat). **Los parámetros son exclusivamente visuales; NUNCA otorgan autorización de acceso a Orders/Support.** Mensajes y subtitle estáticos de demostración se actualizan con `textContent`, no se consulta backend ni se conserva PII.
- `css/customer-conversation-v1.css`: estilos del bloque buyer y tarjeta sin bordes, con sombras compactas; también elimina marcos antiguos del composer y enlaces previos para respetar la nueva regla en A.
- `css/support.css` y `soporte.html`: se neutralizan contornos decorativos anteriores del formulario, aviso y enlace de vista previa; cambios únicamente estéticos y cache-busting. El formulario A, el primer mensaje y su comportamiento permanecen intactos.
- El producto `product.html` y su chat legado C permanecen sin modificación.

## 3. Seguridad y contrato técnico respetado

El public start de Support 007 **siempre crea un caso nuevo**, inicialmente con `order_id=NULL` y `support_queue_id=NULL`. Esto no cambia porque el visitante seleccione el motivo `Consulta sobre mi pedido`.

`support-customer` expone hoy únicamente los campos públicos del caso, sin `order_id` ni clasificación buyer. `SUPPORT 014` (asociación de Order) continúa marcado **FROZEN CANDIDATE CONTRACT**, no evidencia de activación. La integración del backend deberá:

- Validar autorización de posesión/capability para el caso.
- Identificar al titular de la compra mediante un procedimiento confiable independiente del correo escrito.
- Vincular solo el Order canónico perteneciente al Store y Case correctos mediante comando trusted aprobado.
- Obtener **de Orders/Logistics**, por una proyección pública customer-safe, exclusivamente referencia/estado apropiados. En caso de varias compras, requerir resolución inequívoca: **no vincular siempre la última compra automáticamente**.
- Actualizar el mismo caso sin duplicar mensajes/cronología o ampliar acceso a notas internas.
- No exponer a otros clientes IDs internos, dirección, pago, cliente, información financiera ni datos de operador.

No hay endpoint de consulta a Orders en este UI; no se activa lector de capability ni validación de correo en mock.

## 4. Presentación ficticia inequívoca

- `?demo=buyer-pending` muestra bloqueo de datos de compra y mensajes de ejemplo.
- `?demo=buyer-verified` muestra **«Compra verificada (ejemplo)»**, **«Pedido #SC-DEMO»**, **«En preparación (ejemplo)»** y mensajes de ejemplo. Nunca representa una orden real.
- En ambos, hay rótulo arriba de que es una **vista previa**, el composer y adjuntos siguen **deshabilitados**, y no hay persistencia, requests, creación de casos ni emisión de capacidades.
- `conversacion.html` sin `?demo` mantiene su estado vacío seguro. El usuario puede volver a Soporte o abrir una vista previa ilustrativa.

## 5. Próximo movimiento

1. Revisar la UI B en móvil, validar sombras, ausencia de contornos, espaciado y scroll con el composer fijo.
2. Dar por cerrado B visualmente.
3. Diseñar C: entrada contextual desde botón existente de Producto, tarjeta de producto, mapeos futuros Shopify, clase `Chats por productos` (Queue/Segment confiable), sin un segundo backend de conversaciones.
4. Cuando se autorice, planificar activación real del secure Support customer, proyección buyer y controles de abuse/privacy.
