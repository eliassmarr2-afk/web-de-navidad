> **CASO C APROBADO Y UI IMPLEMENTADA (2026-11-05):** La arquitectura candidata anterior fue concretada para producto en [SANTA_CLAUSULA_SUPPORT_PRODUCT_V1_IMPLEMENTATION.md](./SANTA_CLAUSULA_SUPPORT_PRODUCT_V1_IMPLEMENTATION.md). El botón de Producto y la conversación compartida cuentan con vista contextual de ejemplo, sin el mock de sesión Indumentary activo. Las futuras integraciones Shopify y Protocol Data continúan NO ACTIVE. Esta nota prevalece sobre el estado C candidato en secciones históricas de este documento.

# SANTA CLAUSULA — CUSTOMER CONVERSATION / CHAT VISUAL V1

> **ENMIENDA DE TRES ORÍGENES / 2026-11-05:** [SANTA_CLAUSULA_CONVERSACIONES_TRES_ORIGENES.md](./SANTA_CLAUSULA_CONVERSACIONES_TRES_ORIGENES.md) es la autoridad local posterior aprobada para A (Soporte general con favicon), B (Soporte con Order verificado) y C (chat contextual desde producto), todos bajo un único Support/Conversations. No confundir origen de entrada con asociación canónica a Order. Public Start es anónimo **pero emite una capability**; la UI no exige mostrarla al cliente en el inicio. «Chats por productos» puede usar Queue/Segment, pero la clasificación automática aún necesita un workflow confiable. **Sin código UI ni integración live autorizados todavía.**

**Fecha:** 2026-11-04  
**Estado:** **CANDIDATO DE DISEÑO Y ENSAMBLE / PENDIENTE DE APROBACIÓN VISUAL DEL OPERADOR / NO IMPLEMENTADO**  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`  
**Próximo desarrollo:** estructura visual del chat, después de cambiar el marco de imagen principal de la ficha de producto a 4:5.  
**Owner futuro de casos y mensajes:** Protocol Data V2 — Support / Conversations.  
**Fuente de contexto comercial visible:** Commerce (mock hoy, Shopify Adapter futuro); no atribuir a Commerce autoridad sobre casos.

## 1. Autoridad heredada / límites

Se han revisado:
- `CUSTOMER_CONVERSATION_SURFACE_CONTRACT.md` en este repositorio, inicialmente heredado de INDUMENTARY (3 Nov 2026), que pacta un único chat con dos contextos customer-facing y marca la UI como no implementada.
- `eliassmarr2-afk/Ecosistema-para-negocios/docs/sitios-web-de-nicho/006_CONTRATO_SUPERFICIES_PUBLICAS_PROTOCOL_DATA_READY.md` (más su aceptación/freeze posterior).
- `eliassmarr2-afk/protocol-data-v2/docs/domains/logistics/LOGISTICS_V2_SUPPORT_CONVERSATIONS_CONTRACT.md`: dominio Support / Conversations, con autoridad canónica de casos.
- `LOGISTICS_V2_SUPPORT_PUBLIC_CUSTOMER_ACCESS_CORE_CONTRACT.md` y `LOGISTICS_V2_SUPPORT_PUBLIC_CUSTOMER_EDGE_RUNTIME_CONTRACT.md`: acceso público customer y capacidad de posesión autorizada.
- `LOGISTICS_V2_SUPPORT_CONVERSATIONS_ORDER_ASSOCIATION_COMMAND_CONTRACT.md`, **FROZEN CANDIDATE CONTRACT**, no asumir deploy ni extensión pública.

Este documento es una **propuesta local de diseño**, no congela un contrato central, no aporta endpoints válidos y no autoriza conexión live.

## 2. Principio de implementación: no duplicar chats

Actualmente `product.html` posee el acceso `#productSupportButton` y un chat local demo en `js/product-support-camping-v1.js`. También hay un módulo mock de soporte en `js/product-runtime-v4.js` y una página separada `soporte.html` para Support Start. **No se deben crear casos en paralelo ni mantener dos fuentes de estado customer.**

Diseño propuesto:
- El **acceso contextual** a la consulta de producto utiliza el botón existente `#productSupportButton` en el sector vendedor. No agrega un botón flotante que tape el sticky de compra.
- **Inicio público**: formulario / Support Start para un **caso nuevo**, si el backend está autorizado. La página `soporte.html` permanece una entrada pública general. El contexto de producto solo es una pista presentacional (ID, imagen, título, oferta seleccionada), no vinculación probada a Order.
- **Continuación**: **una sola** UI de conversación del cliente, apta para abrirse como vista dedicada (nombre de ruta propuesto: `conversacion.html`, a aprobar) y, si se desea, como panel desde Producto, utilizando **el mismo boundary de Support**. No mantener un chat independiente por producto en `sessionStorage`.
- Transición a la nueva UI únicamente con refactor controlado del legado, sin inicialización doble ni promesas de soporte real en mock.

## 3. Diseño visual propuesto (no aprobado todavía)

**Identidad:** SANTA CLAUSULA, tipografía Manrope, verde navideño `#1E7437`, blanco `#FFFFFF`, texto principal negro `#000000`, subtextos grises, radios de badges `4px`. Fondo de conversación blanco. Acentos de la marca sin sobrecargar.

**Móvil:** conversación en una vista alta accesible, con cabecera no desplazable, listado de mensajes desplazable y composer al pie, separado del sticky comercial. Evitar teclado automático al abrir. **Escritorio:** panel lateral contenido de aproximadamente 420px, o ruta independiente responsive.

**Cabecera de conversación:**
- volver / cerrar;
- `Soporte · SANTA CLAUSULA`;
- subheading contextual `Consulta general` por defecto; cambiar a `Consulta sobre tu pedido` solo si backend público autoriza Order association;
- estado canónico visible, localizado: `nueva / en_proceso / respondida / cerrada`;
- referencia customer-safe de caso **únicamente si es efectivamente expuesta**.

**Contexto opcional de producto:** tarjeta compacta con miniatura, nombre y referencia de oferta **solo de presentación**, proveniente del Commerce Adapter. No vincula caso con pedido, ni crea Product Set, ni otorga permisos.

**Mensajes:** cronológicos, solo `visibility=public`, distinción visual customer/operator/system cuando corresponda, timestamp, estados de carga/error/reintento. No mostrar notas internas ni estado de atención interno. No inventar respuestas del operador.

**Composer:** caja de texto, botón enviar, espacio de adjuntos cuando se autorice. En caso `cerrada`, composer en solo lectura. En mock, nada se envía y se comunica explícitamente que el servicio no está conectado.

**Estados de acceso:** vacío, carga, nuevo caso sin mensajes, conversación activa, respuesta fallida, acceso denegado/expirado/revocado, caso cerrado, adjunto fallido. No autoseleccionar campo al abrir.

## 4. Dos contextos, una única conversación

- **GENERAL (sin asociación Order conocida):** etiqueta `Consulta general`, caso y mensajes públicos. **No afirmar** que la persona «nunca compró».
- **BUYER (asociación Order confirmada y proyectada al cliente):** etiqueta `Consulta sobre tu pedido`, referencia pública autorizada de Order si el dominio la ofrece. **No inferir por mail, tracking ni localStorage**.
- Si `order_id` es desconocido desde la vista pública, usar contexto **neutral**. La proyección customer actual de Support 007 **no devuelve `order_id` ni `buyer_mode`**; el buyer header no puede activarse hoy sin nuevo contrato/proyección pública.
- Un vínculo posterior de Order por operador actualiza la presentación si el backend lo autoriza; no crea otro hilo ni modifica cronología o visibilidad.

## 5. Boundary y seguridad de la futura integración

```text
PRODUCT SUPPORT ENTRY (frontend)
        │
        ▼
AUTHORIZED PUBLIC SUPPORT START (case new)
        │
        ▼
SECURE DELIVERY / POSSESSION CAPABILITY
        │
        ▼
SAME CUSTOMER CONVERSATION UI
        │
        ▼
PROTOCOL DATA SUPPORT CUSTOMER READ / REPLY
```

- El customer API actual utiliza `Authorization: Bearer <opaque capability>`. No incluir la capacidad en URL query, analytics, logs, tags de producto, localStorage ni otros dominios de capabilities.
- La capacidad de Support nunca es una de Tracking ni de Experiencias.
- Un enlace de continuidad seguro y su transporte se implementarán **solo** según el mecanismo autorizado; la ruta propuesta `conversacion.html` no inventa un nuevo modelo de autenticación.
- El front-end no conoce tenant IDs como autoridad, no accede a endpoints de operador ni acepta datos de pedido por heurística.
- Attachments privados, MIME/tamaño, signed URLs, abuso y permisos se basarán en contratos vigentes al integrar; no permitir cargas públicas no autorizadas.
- Shopify: título, medios, precio y variantes consumidos por Commerce; el futuro metafield JSON de tabs gobierna **presentación**, no caso/Order/capability de Support.
- El DOM/render de mensajes debe escapar texto de usuario y de operador; no interpolar contenido libre mediante `innerHTML`.

## 6. Trabajo en etapas

1. **APROBACIÓN VISUAL** de esta propuesta: forma y altura del panel, cabecera, tarjeta producto, burbujas, composer, estados de inicio/continuación.
2. **MOCK UI** (sin backend): reemplazar cuidadosamente el demo legado en producto o crear un módulo de conversación encapsulado, accesible; unificar la entrada, garantizar cero escrituras o fingir envíos.
3. **PRODUCT ADAPTER**: contextualizar la vista con Shopify producto/variante/oferta mapeados, sin inferir Order.
4. **SUPPORT INTEGRATION**: revalidar estado real de Edge/DB, Origin/Store, API de capacidad, restricciones customer, snapshots permitidos y contrato buyer projection.
5. **CERTIFICACIÓN**: permisos cross-tenant, caducidad y revocación, adjuntos, errores y mensajes públicos solamente, móviles/teclado, sin leakage por URLs/logs/analytics.
6. **PRODUCCIÓN** solo tras aprobación separada; sin rebasar este documento candidato.

## 7. Criterios de salida de esta fase

```text
IMAGE 4:5 IMPLEMENTED = YES
CHAT SEMANTIC CONTRACT = REVIEWED
CHAT VISUAL DESIGN = CANDIDATE / NEEDS OPERATOR APPROVAL
CHAT CUSTOMER UI IMPLEMENTATION = NO
SUPPORT CUSTOMER LIVE INTEGRATION = NOT ACTIVE
BUYER PUBLIC SAFE PROJECTION = NOT CURRENTLY AVAILABLE
```

No confundir «diseño visual candidato» con un sistema de mensajes operable o un contrato de backend desplegado.
