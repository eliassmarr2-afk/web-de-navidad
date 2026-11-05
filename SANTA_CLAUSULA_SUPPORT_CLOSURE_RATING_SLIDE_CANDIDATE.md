# SANTA CLAUSULA — SLIDE DE CALIFICACIÓN POR CIERRE DE CONVERSACIÓN

**Fecha de diseño:** 2026-11-05  
**Estado:** CANDIDATO DE DISEÑO / PENDIENTE DE APROBACIÓN DEL OPERADOR / **FRONTEND NO IMPLEMENTADO**  
**Ámbito:** las tres modalidades ya aprobadas: A soporte general, B consulta sobre pedido, C consulta desde landing de producto.  
**Owner del caso/mensajes/cierre:** Protocol Data V2 — Logistics / Support / Conversations.  
**Owner de esta nueva respuesta CSAT:** **POR PACTAR EN UN CONTRATO CANÓNICO V2**. No asumir que Experience post-compra tiene ownership sobre la calificación de un caso de Support.

## 1. Documentación auditada y evidencia

- `docs/domains/logistics/LOGISTICS_V2_SUPPORT_CONVERSATIONS_OPERATOR_COMMAND_CONTRACT.md`: `close_case` cambia caso abierto a `cerrada`, fija `closed_at`, añade `status_changed`, modifica `last_activity_at` y **no crea un mensaje**. Cierre repetido no muta estado. `reopen_case` vuelve a `en_proceso`, limpia `closed_at` y registra `case_reopened`.
- `docs/domains/logistics/LOGISTICS_V2_SUPPORT_PUBLIC_CUSTOMER_ACCESS_CORE_CONTRACT.md`: la lectura pública autorizada expone `status` y `closed_at`. `status=cerrada` **rechaza** respuestas customer; el cliente no puede reabrir el caso. La vista customer muestra exclusivamente mensajes `visibility=public`.
- `docs/audit/conversations-v1/panel-ui-actions.md` y `docs/audit/conversations-v1/deep-audit.md`: V1 tenía cierre/reapertura y bloqueaba los compositores de mensajes al cerrar; no se encontró evidencia inequívoca de la encuesta post-cierre dentro de la auditoría de Conversaciones V1.
- `docs/audit/experiencias-v1/public-review-page.md`, `lifecycle-and-data-model.md` y `deep-audit.md`: V1 tenía reseñas de producto/pedido con estrellas 1–5, comentario opcional, una respuesta idempotente por sesión y rating opcional de `support`. **Ese flujo se dispara por entrega / post-compra**, no por `close_case` de Conversaciones. No reutilizar su payload como si fuera una calificación de chat.
- El PDF de arquitectura `E-COMMERCE _ VINCULOS CON PROTOCOL DATA V2.pdf` establece interfaces comerciales interoperables con Logística y Experiencias, sin congelar un contrato específico de encuesta por cierre de chat.

**Resultado de auditoría:** el bloqueo de respuestas al cerrar es base canónica. La encuesta de cierre **requiere un contrato V2 nuevo** que defina identidad, almacenamiento, elegibilidad, envío y métricas. No inventar endpoints ni afirmar que un simple cambio de `status` genera automáticamente la encuesta.

## 2. Diseño UX candidato — rating al finalizar conversación

**Disparador:** la UI del cliente recibe desde una lectura/actualización pública **autorizada y confirmada** que el **mismo caso** está en `cerrada`. En ese mismo render:
1. Conservar el historial público en modo solo lectura.
2. Reemplazar composer por banda no interactiva: `Conversación finalizada · Ya no es posible responder`.
3. Mostrar un **bottom sheet blanco** sobre el chat, con fondo atenuado y contenido:
   - Tirador gris neutro; cerrar discreto `×`.
   - Icono de check verde (cierre confirmado), sin badge con contorno.
   - Título `Tu conversación finalizó`.
   - Explicación `¿Cómo calificarías la atención recibida?`.
   - Selector **1–5 estrellas**, única respuesta requerida; etiquetas accesibles `Muy mala / Mala / Regular / Buena / Excelente`.
   - Campo `¿Querés contarnos algo más?` (opcional, máximo **600 caracteres propuestos**, pendientes de aprobación como contrato).
   - Acción principal verde `Enviar calificación`, habilitada tras elegir una estrella; acción secundaria `Ahora no`.
   - Nota clara: `Esta calificación corresponde a la atención recibida, no al producto ni a la compra.`
4. En móvil: bottom sheet con altura adaptativa, foco accesible, scroll si se abre teclado; escritorio: mismo sheet centrado en un panel contenido, sin bloquear el historial más de lo necesario.
5. **Sin contornos decorativos de color ni bordes de tarjeta/badge/widget**; separación con fondos y sombras leves, compactas, poco difuminadas; radios compactos de 4px en controles y tarjeta, sin sustituir foco accesible.

**No se debe mostrar automáticamente** ante una selección de `demo=buyer-verified`, query param, texto de mensaje, cierre de modal local ni presunción de identidad. El evento de referencia es el cierre canónico emitido por Support, no el navegador.

## 3. Estados del slide

| Estado | Comportamiento |
|---|---|
| Caso abierto | composer habilitado solamente si la integración de customer está autorizada; rating oculto |
| Cierre confirmado + feedback elegible | composer deshabilitado; slide de rating abierto automáticamente |
| Cierre confirmado + rating omitido | chat solo lectura; acceso discreto `Calificar atención` mientras siga siendo elegible, sin reapertura forzada del slide |
| Enviando | bloquear doble submit; feedback progresivo |
| Confirmación real de backend | pantalla `Gracias por calificar nuestra atención`, datos enviados de verdad; cerrar slide |
| Ya calificado | no pedir otra vez el mismo evento de cierre; chat solo lectura |
| Vencido / sin autorización / falla de servicio | no enviar ni simular; aviso y estado seguro |
| Caso reabierto por operador | ocultar rating pendiente del cierre revocado; habilitar composer solo tras lectura autorizada de estado `en_proceso` |
| Vuelta a cerrar luego de reapertura | crear una nueva **elegibilidad de evaluación** solo si el futuro contrato define ciclos de cierre; nunca por cuenta del frontend |

El criterio de **un formulario por cierre** es propuesta, no contrato central existente. El backend tendrá que definir identificador del cierre y reglas idempotentes compatibles con reaperturas.

## 4. Boundary propuesto, sin endpoints inventados

```text
Support operator close_case (trusted)
   -> Support Case status=cerrada + closed_at + activity
   -> Support Customer authorized read confirms same case is closed
   -> Frontend disables replies
   -> Frontend opens CSAT slide only if backend marks rating eligible
   -> Secure CSAT submit (NEW V2 CONTRACT REQUIRED)
   -> Write-once result + timestamp + tenant Store / Support Case / closure reference
   -> Backend ack -> submitted state; metrics operator future
```

**Datos propuestos, NO esquema SQL autorizado:**
- `workspace_id`, `store_id`, `support_case_id` con autoridad Support.
- referencia estable al **evento/ciclo de cierre** definida por el backend, sin confiar en timestamp del navegador.
- `score` entero entre 1 y 5; `comment` opcional acotado; `submitted_at` generado por servidor.
- canal de origen `support_general`, `support_order` o `product_landing` **solo si el backend dispone de una clasificación confiable**, no enviada arbitrariamente por navegador.
- contexto de operador/cola/segmento solo para consulta interna autorizada y métricas según privacidad; nada de notas internas/PII en cliente.
- token de acceso customer de Support **no equivale automáticamente** a un permiso de escribir reseñas; se requiere operación y validación expresamente documentadas, aun si se reutiliza de manera controlada la posesión de caso.

**Métricas reales sugeridas (cuando exista persistencia):** cierres elegibles, invitaciones vistas, tasas de respuesta, CSAT promedio, distribución 1–5, tiempos de calificación, variación por Store/Queue/periodo y comentarios. Denominadores correctos y reabiertos deduplicados; no inferir satisfacción del silencio.

## 5. Separación frente a Experiencias V1 / Shopify

- **Reseña de producto**: vinculada a producto/item/pedido, permitida por la experiencia comercial y el consentimiento/política aplicable.
- **Experiencia post-compra**: evaluación general/entrega/soporte/empaque desde una sesión entregada, como en V1.
- **Calificación post-chat (CSAT)**: vinculada a un **cierre de caso de Support**; puede producirse también cuando el visitante no compró nada. Por eso necesita una entidad o subcontrato propio.
- Si Protocol Data Experiencias V2 decide consolidar métricas, hacerlo a través de un **evento/relación explícitamente autorizado**, no insertando puntuaciones anónimas de conversación en las tablas de reseñas de producto.

## 6. Desarrollo posterior a la aprobación visual

1. Confirmar composición visual del slide y escala 1–5, comentario opcional, acción `Ahora no`, reaperturas.
2. Construir **mock UI sin envío** en `conversacion.html` con modo de preview aislado `?demo=closed-rating`, separado de A/B/C. El composer se inhabilita en la vista de cierre demo; botones solo modifican estado de ejemplo sin persistencia ni falso submit.
3. Agregar CSS y JS encapsulados; preservar A/B/C, mobile, sin contornos y con accesibilidad.
4. Registrar el **nuevo contrato de feedback en Protocol Data** bajo Control (owner, lifecycle, eligibility, idempotencia, submisión, permisos, métricas). El sitio no implementa Edge/DB por cuenta propia.
5. Tras certificar la integración real, sustituir preview por lectura autorizada de `status=cerrada` + elegibilidad. Al enviar, esperar ack real del backend.
6. Evaluar si una respuesta negativa debe habilitar una nueva consulta o contacto **solo** mediante una operación separada autorizada; no reabrir automáticamente.

## 7. Límites de esta entrega

```text
SUPPORT CLOSE/READ/REPLY GUARDS = DOCUMENTED IN CANONICAL V2
POST-CHAT CSAT BACKEND = NOT PRESENT IN AUDITED CONTRACTS
SLIDE DESIGN = PROPOSED / AWAITING USER APPROVAL
SLIDE WEB IMPLEMENTATION = NOT STARTED
RATING REAL SUBMISSION / METRICS = NOT ACTIVE
```

La documentación de esta propuesta **no** implica aprobación del operador ni autorización para añadir datos sensibles al backend.
