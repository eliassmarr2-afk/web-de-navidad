# SANTA CLAUSULA — CONVERSACIONES · TRES ORÍGENES / UNA SOLA AUTORIDAD

**Fecha de decisión:** 2026-11-05
**Estado:** ARQUITECTURA SEMÁNTICA Y COMPOSICIÓN VISUAL APROBADAS POR EL OPERADOR / IMPLEMENTACIÓN DEL NUEVO CHAT PENDIENTE
**Ámbito:** Soporte público general, Soporte vinculado a pedido y consultas desde landings de producto.
**Backend propietario de casos/mensajes:** Protocol Data V2 — Logistics / Support / Conversations.
**Frontend actual:** Mock existente en `js/product-support-camping-v1.js` y `soporte.html`; no confundir con la integración real.
**Carácter:** enmienda local del diseño de sitio, **no** modifica ni certifica contratos canónicos de Protocol Data.

## 1. Modelo definitivo

**UNA plataforma de casos y conversaciones, TRES contextos de origen o asociación.** El chat no es un dominio de datos paralelo, y la entrada de producto no crea un segundo motor de mensajería.

| Caso | Entrada / usuario | Cabecera cliente | Contexto visible | Contexto interno / clasificación |
|---|---|---|---|---|
| A — Soporte general | `Soporte`: motivo, nombre, correo; solicitud de caso nuevo | `Soporte \| SANTA CLAUSULA` + favicon de marca | Estado y referencia segura de caso si el servicio los expone; sin ficha/foto del producto | Origen Support, motivo declarado y Store verificada. Cola/segmento únicamente tras clasificación autorizada |
| B — Soporte con compra | `Soporte` con coincidencia potencial de compra **validada mediante identidad/Order autorizados** | `Soporte \| SANTA CLAUSULA`; opcional `Consulta sobre tu pedido` SOLO tras proyección autorizada | Referencia y contexto de pedido solamente si se confirma titularidad y el owning domain permite mostrarlo | Mismo Support Case con relación canónica exacta a Order y consulta autorizada a Orders/Logistics. No enlazar por email sin verificar |
| C — Chat desde landing product | Botón `#productSupportButton`: nombre, correo, producto consultado | `Soporte \| SANTA CLAUSULA` y tarjeta contextual de producto con foto/título en el cuerpo o cabecera según diseño visual; no mezclar con cabecera de Soporte general | Producto/oferta **presentacional** de la landing, sin asumir compra | Origen Product y referencias verificadas por el Commerce Adapter; clasificación `Chats por productos` sin crear otro backend |

En A y B el **avatar es el favicon de la marca**, nunca la fotografía de producto por defecto. En C el soporte puede utilizar el mismo avatar de tienda pero sí añade un **contexto visual de producto** al layout. Esto es una distinción de **origen** (Product vs Soporte) diferente de la distinción de **asociación a pedido** (no asociada vs asociada). Un caso C puede más adelante ser vinculado a Order solo por una operación autorizada; su origen Product no prueba compra.

## 2. Inicio simple versus continuidad segura

- El cliente inicia una consulta por `Soporte` o por Producto **sin necesitar ingresar previamente un token**. En Producto, nombre y correo permiten completar el formulario inicial de manera sencilla.
- **Esto no equivale a un chat persistente sin protección.** El contrato `SUPPORT 007` establece `ANONYMOUS PUBLIC START`, que crea **un caso nuevo, un mensaje público inicial y una capacidad de posesión opaca**. La capacidad se usa posteriormente para `CASE_PUBLIC_READ` y `CUSTOMER_PUBLIC_REPLY`.
- La capacidad se devuelve en el arranque y se valida en Support customer; no se la debe reutilizar de Tracking o Experience, ni exponer en query parameters, URLs de analítica, logs o storage no confiable.
- Para reingresar desde correo u otro dispositivo se requiere un transporte de continuidad autorizado. Un token no tiene por qué ser un formulario visible en el primer paso; tampoco puede ignorarse.
- El contrato actual de public start **crea un caso nuevo por solicitud**, no busca ni reutiliza por email, nombre, tracking u Order reference.

## 3. Compra existente / escenario B

Una coincidencia de correo o consulta de compras previas **no autoriza a mostrar datos personales ni de Orders**. Se requiere una comprobación de identidad, pertenencia al Store y asociación canónica al Order, realizada por un flujo confiable. 

- Soporte posee `protocol_support_cases.order_id`, opcional y tenant-safe. Orders es autoridad de los datos del pedido.
- El caso público inicial se crea con `order_id = NULL`. `SUPPORT 014` describe un comando trusted de link/unlink Order; su archivo actual es `FROZEN CANDIDATE CONTRACT`, no evidencia de un comando live certificado.
- El public customer query de `SUPPORT 007` **no incluye `order_id`, Queue, segmentos ni un buyer classifier**. Hasta autorizar una proyección customer-safe, la UI pública mantiene estado neutral.
- El operador podrá consultar el Order real por su boundary autorizado, cuando exista; no construir snapshots ad hoc de Orders dentro de Support para eludir la autorización.

## 4. Segmentación de casos de Producto

La estructura canónica de Support **sí contempla catálogos Store-scoped de Queues/Departments y Segments**:
- `protocol_support_queues` tiene label y status; el Case contiene `support_queue_id` opcional.
- `protocol_support_segments` es un catálogo de clasificación y el Case puede recibir segmentos autorizados.
- Commands de operator describen `change_queue` y `assign_segment`.

Por tanto, el rótulo operativo **`Chats por productos`** puede implementarse como un **Queue/Department y/o Segment del Store**, con la definición concreta pendiente de acuerdo y verificación operacional. No requiere nueva tabla ni segundo chat.

**Límite actual:** `SUPPORT 007 PUBLIC START` crea `support_queue_id = NULL`. No dispone de un permiso público para que el browser asigne Queue/Segments arbitrariamente. Para clasificar automáticamente C al iniciar, sería necesaria una regla **server-side con autoridad validada por Origin/Store y referencias de Product** o un workflow interno posterior que consuma acciones permitidas. No asumir que ya está desplegado.

Las etiquetas para A deben derivarse de motivos válidos y B de una asociación Order verificada; no aceptar clasificaciones críticas basadas solamente en HTML del cliente.

## 5. Identificadores y contexto que necesitamos conservar

- Identidad del Store/Workspace resuelta por boundary público confiable, no IDs elegidos en JavaScript.
- `support_case_id` y `support_message_id` canónicos y los estados del caso autorizados.
- Datos de contacto proporcionados por el cliente; **no** constituyen identidad verificada de comprador.
- Origen verificable de entrada: `support_general`, `support_order_candidate` o `product_landing` es una **clasificación conceptual propuesta**, todavía no un campo físico ni un payload aprobado. No incorporarlos al esquema Support sin contrato.
- Producto vinculado a su identidad canónica del Commerce Adapter y referencia a oferta solo si el adapter la valida; nunca una relación de Order inferida por el producto que visita.
- Contexto de pedido y referencia customer-safe únicamente si el dominio Orders/Support habilita una proyección segura.
- Visibilidad de mensajes siempre `public` en cliente; notas internas y metadatos de gestión solo en operator.

## 6. Arquitectura propuesta

```text
A. SOPORTE GENERAL ──────┐
                         │
B. SOPORTE + ORDER ──────┼──> VALIDATED PUBLIC START
   (tras verificación)    │     └── New Support Case + capability
                         │
C. LANDING PRODUCT ──────┘
        │
        └── Trusted contextual classification / routing
                              │
                              ▼
                  PROTOCOL DATA SUPPORT
             Cases · Messages · Queues · Segments
                              │
                              ▼
                 UNIFIED CUSTOMER CONVERSATION UI
                  public capability read / reply
```

La detección y asociación de Order puede ocurrir **posteriormente** al inicio del caso mediante un comando trusted. La UI cambia de contexto únicamente tras recibir datos autorizados. El origen A/C no reescribe la identidad del caso.

## 7. Recepción, autoridad y siguiente paso

**APROBADO:** tres orígenes funcionales; favicon/título de Store para Soporte general; contexto Order solo autorizado; contenido específico de producto para chat iniciado desde landing; backend único Protocol Data Conversations; objetivo de clasificación `Chats por productos`.

**PENDIENTE:** UX exacta de identificación de compra/continuidad, opciones reales de Queue/Segment, esquema seguro de metadata de origen/producto, diseño de estados de la conversación y compatibilidad con Shopify Product/Offer adapters.

**NO ACTIVADO:** rediseño del chat heredado, Support/Conversations conectado, segmentación automática pública, buyer detection/Order projection, correos de acceso seguros ni respuestas reales desde la web.

Esta enmienda **prevalece** frente a cualquier descripción anterior del chat como dos únicas categorías de entrada o como un chat de producto que pudiera mantenerse sin autorización de lectura/respuesta.

## 8. Implementación visual — Caso A, 2026-11-05

El operador aprobó expresamente el diseño A de Soporte general: logo de SANTA CLAUSULA y texto de tienda, inicio por nombre/correo/motivo/mensaje inicial, presentación de mensajes de ambos interlocutores sin producto ni Order, y composer fijo.

La implementación aislada de la UI A está documentada en `SANTA_CLAUSULA_SUPPORT_GENERAL_V1_IMPLEMENTATION.md` y está incorporada al repositorio mediante `soporte.html` y `conversacion.html`. **El modo demo no crea ningún Support Case ni admite capacidades reales**. Los escenarios B y C no se han construido con esta aprobación; mantienen fases independientes. Los contratos de Support siguen siendo autoridad para abrir/leer/responder casos reales.

## 9. Caso B visual — aprobado e integrado (2026-11-05)

- **Autoridad local:** `SANTA_CLAUSULA_SUPPORT_BUYER_V1_IMPLEMENTATION.md`.
- El mismo cliente visual `conversacion.html` tiene el escenario A (general) y dos estados B: compra sin verificar (sin Order mostrado) y compra verificada **ficticia/solo demo** (tarjeta con referencia/estado ficticios). La cabecera de Soporte y el favicon se conservan.
- **Regla visual expresa y transversal:** tarjetas, badges, widgets sin contornos de color; cuando convenga, sombras leves con desenfoque mínimo. Se mantiene una señal de foco por subrayado/sombra accesible.
- El frontend no introduce Orders en la proyección `support-customer`, no realiza detección de comprador, ni crea un caso en segundo backend. El modo verificado real depende de una futura proyección buyer customer-safe y asociación canónica verificada.
- C (product landing) permanece pendiente y sin alteración del mock heredado.
