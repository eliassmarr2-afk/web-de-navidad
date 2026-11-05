# SANTA CLAUSULA — CONTRATO DE VINCULACIÓN · CALIFICACIÓN AL CERRAR CONVERSACIONES

**Fecha de aprobación del operador:** 2026-11-05  
**Estado local:** **APROBADO / CERRADO PARA DISEÑO Y CONTRATO DE VINCULACIÓN**  
**Estado técnico real:** **SOLO PREPARACIÓN DE FRONTEND / PROTOCOL DATA CSAT NO IMPLEMENTADO NI CERTIFICADO**  
**Alcance:** escenarios A (soporte general), B (soporte con pedido verificado), C (consulta desde landing product).  
**Responsable del estado del caso:** Protocol Data V2 → Logística → Support / Conversations.  
**Responsable final del registro de calificación CSAT:** a incorporar y decidir en un contrato canónico propio de Protocol Data V2 (no asumir que es Experiencias postcompra).  

## 1. Autoridades contrastadas

En la rama canónica `foundation/0.1-workspace-store` del repositorio `eliassmarr2-afk/protocol-data-v2`:
- `LOGISTICS_V2_SUPPORT_CONVERSATIONS_OPERATOR_COMMAND_CONTRACT.md`: `close_case` requiere Store + caso y una transición real desde `nueva`, `en_proceso` o `respondida`; establece `status=cerrada`, `closed_at` del servidor y actividad `status_changed`. No crea un mensaje. Un cierre repetido es `changed=false`; `reopen_case` limpia `closed_at`, establece `en_proceso` y actividad `case_reopened`.
- `LOGISTICS_V2_SUPPORT_PUBLIC_CUSTOMER_ACCESS_CORE_CONTRACT.md`: lectura customer autorizada proyecta `status` y `closed_at` del caso; envío de mensajes desde caso `cerrada` se rechaza, y la capacidad customer no confiere derecho de reabrir. Solo `visibility=public` se muestra al cliente.
- Auditoría de `Conversations V1`: cierre/reapertura y bloqueo de respuesta; **no se constató contractualmente** que el cierre lanzase la calificación de atención en V1 desde los artefactos inspeccionados.
- Auditoría de `Experiencias V1`: valoraciones reales 1–5 y comentarios, pero orientadas a `post-delivery` y productos/pedidos; no autoriza reutilizar el esquema de Experiencias postcompra como CSAT de Conversaciones.

Este documento **congela las expectativas del sitio** que el operador aprobó. **NO modifica**, por sí solo, contratos centrales de Support, tablas, Edge Functions ni las decisiones de Control sobre backend.

## 2. Secuencia aprobada

```text
Operador autorizado ejecuta close_case
  ↓
Logística / Support persiste case.status=cerrada + closed_at + activity
  ↓
Front customer lee el mismo case mediante su capacidad autorizada
  ↓
UI reemplaza el composer por «Conversación finalizada»
  ↓
Servicio de calificaciones confirma elegibilidad de ESTE cierre y permiso de envío
  ↓
Se abre slide de atención CSAT
  ↓
Cliente elige puntuación 1–5, escribe comentario opcional o pulsa «Ahora no»
  ↓
Si envía: request al servicio FUTURO de CSAT
  ↓
Sólo tras ACK real e idempotente del servicio: confirmación definitiva
```

**Regla bloqueante:** no usar query parameters, UI mocks ni coincidencia de correo como prueba de cierre, acceso al caso, elegibilidad, rating permitido o verificación de comprador.

## 3. Contrato visual y accesibilidad aprobado

- Bottom sheet blanco, sobre el chat ahora solo lectura, cabecera de marca sin fotografía de producto.
- Tirador neutral, botón `×`, check verde, título «Tu conversación finalizó».
- Pregunta «¿Cómo calificarías la atención recibida?».
- 1–5 estrellas (etiquetas `Muy mala`, `Mala`, `Regular`, `Buena`, `Excelente`), puntuación obligatoria para enviar.
- Comentario opcional con máximo **600 caracteres aprobado como propuesta de UX**; el backend tendrá que incorporar el límite en su contrato de escritura.
- Botones «Enviar calificación» y «Ahora no». En demo el CTA indica `Simular envío de calificación` para evitar falso éxito.
- Tras omitir: el chat sigue cerrado; CTA discreta `Calificar atención` si todavía existe elegibilidad.
- Tras ACK backend: estado de agradecimiento. Nunca reconocer como enviada una puntuación que no se persistió.
- Cierre con `×`, fondo o tecla Escape, gestión de foco; estrellas accesibles por teclado.
- **Norma visual transversal:** sin contornos decorativos de color en tarjetas, badges, controles o widgets; fondos planos y sombras suaves/cortas, bordes 0 y radio compacto de 4px en campos/acciones. Mantener enfoque visible accesible mediante sombras/subrayados.
- El comentario/opinión evalúa **la atención del chat**; no se convierte en una reseña de producto ni en una evaluación de entrega.

## 4. Semántica de elegibilidad y ciclos de cierre — interfaz propuesta

La autorización y comprobación de elegibilidad **corresponden al backend**. El servidor debe resolver:
- Tenant `workspace_id` / `store_id` en un contexto válido; caso canónico `support_case_id` y cliente con capability vigente/autoridad equivalente aprobada.
- Caso efectivamente `cerrada` y cierre individual actual. El hecho `closed_at` sirve para lectura visible, pero no debe ser el único identificador idempotente si existen reaperturas y recierres.
- **Identidad estable de ciclo de cierre**, propuesta como `support_case_id + close_cycle_id` generado en servidor o actividad de cierre apropiada. Sin asumir que esa columna ya existe.
- Una sola calificación aceptada por ciclo elegible (o regla equivalente definida por Control), sin overwrites, duplicados ni replays.
- Puntuación de 1 a 5; comentario opcional limitado, normalizado y tratado como entrada no confiable.
- Marca de creación de registro y `submitted_at` del servidor. No confiar en timestamp ni `user_id` enviado por navegador.
- Estados de elegibilidad: `eligible`, `submitted`, `not_eligible`, `expired`, `revoked`, o resultados equivalentes fijados por contrato futuro, no payloads actuales.
- Reapertura: la UI refresca chat y no permite calificar un cierre que fue invalidado por la regla futura; la calificación ya registrada no se elimina por suposición.
- Un nuevo cierre después de reapertura **no** implica automáticamente nueva encuesta: depende del policy canónico de deduplicación aprobado posteriormente.
- El cliente **no** puede reabrir la conversación a través de la operación CSAT ni agregar mensajes normales una vez cerrada.
- La puntuación no debe producir nuevos mensajes customer ni alterar `last_message_at`; es actividad de satisfacción separada.

## 5. Integración y métricas futuras

En el mismo Store se podrán medir, si el backend persiste los datos reales:
- cierres elegibles y encuestas abiertas (con denominadores auditables);
- encuestas respondidas / omitidas;
- puntuación media CSAT y distribución 1–5;
- tiempo entre cierre y respuesta;
- análisis por período y por Queue/Segment sólo cuando el origen/routing se haya validado internamente;
- comentarios y tendencias bajo los permisos pertinentes.

No inferir un puntaje de 0 o 5 por ausencia de calificación. No copiar PII ni texto de conversación a sistemas analíticos indiscriminadamente. Aplicar autorización de operador para vistas de resultados. Los datos deben pertenecer a una Store segura y el reporte no debe mezclar tiendas.

`Experiencias` podrá consumir eventos derivados **solo si un contrato cross-domain lo autoriza**: no se insertarán reseñas de caso dentro de tablas de productos, pedidos o postcompra por coincidencia de nombres de campos.

## 6. Entrega implementada en web-de-navidad (frontend preview)

- `conversacion.html?demo=closed-rating` muestra conversación ficticia cerrada, composer oculto y banda en solo lectura; abre automáticamente el slide de muestra.
- `js/customer-conversation-v1.js` reconoce un modo de preview de cierre y mantiene aislados A, B y C.
- `js/conversation-rating-v1.js` mantiene rating y comentario **en memoria de la página**, no los envía ni almacena; sus botones muestran únicamente estados ilustrativos.
- `css/conversation-rating-v1.css` añade el sheet y estados sin contornos de color.
- El modo sin `?demo` mantiene pantalla vacía sin acceso a casos; ningún parámetro de preview otorga capacidad de posesión.

```text
DESIGN / SITE INTEGRATION CONTRACT = APPROVED / CLOSED
STATIC FRONTEND DEMO = IMPLEMENTED
CANONICAL V2 CSAT DATABASE / EDGE / AUTH = NOT IMPLEMENTED
REAL RATING SUBMISSION / METRICS = NOT ACTIVE
POSTPURCHASE EXPERIENCE INTEGRATION = NOT ACTIVE
```

**Transferencia futura a Protocol Data:** llevar este contrato aprobado como entrada de Control para diseñar, implementar y certificar el boundary CSAT. Una aprobación local del sitio **no equivale** a migración/Edge certificados en V2.
