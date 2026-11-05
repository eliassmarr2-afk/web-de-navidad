# INDUMENTARY — PROTOCOL DATA READINESS

**Fecha:** 2026-10-30  
**Estado:** INITIALIZED / NO LIVE PROTOCOL DATA INTEGRATIONS YET

---

## 1. REGLA DE ESTADO

Se utilizan dos dimensiones separadas.

```text
READINESS
=
RESERVED / READY / CONFIGURED / INTEGRATED
```

```text
ACTIVATION
=
ACTIVE / NOT ACTIVE
```

`NOT ACTIVE` no sustituye readiness.

---

## 2. MATRIZ INICIAL

| Capacidad | Current source / authority | Target / canonical owner | Readiness | Activation |
|---|---|---|---|---|
| Products / mappings | local/mock catalog | Protocol Data Products + provider bindings | RESERVED | NOT ACTIVE |
| Orders relation | none | Orders/provider ingestion according to live contract | RESERVED | NOT ACTIVE |
| Logistics | none | Protocol Data Logistics | RESERVED | NOT ACTIVE |
| Shipping Surface | documented site seam | Protocol Data Logistics Shipping Resolver | RESERVED | NOT ACTIVE |
| Tracking Surface | none | Protocol Data Logistics Tracking | RESERVED | NOT ACTIVE |
| Support Start | none | Protocol Data Support | RESERVED | NOT ACTIVE |
| Customer Conversation | none | Protocol Data Support | RESERVED | NOT ACTIVE |
| Experience / Review | none | future Experiences V2 authority | RESERVED | NOT ACTIVE |
| Measurement Event Layer | none | Site Event Layer + authorized Protocol Data ingest | RESERVED | NOT ACTIVE |
| Policies | local content planned | configured Policy Content source | RESERVED | NOT ACTIVE |

---

## 3. SITE-OWNED SESSION LOCATION CONTEXT

Existe una responsabilidad propia del storefront que no debe confundirse con Logistics:

```text
SESSION LOCATION CONTEXT
```

Target owner:

```text
SITE APPLICATION / SESSION STATE
```

Su propósito es reutilizar durante la sesión los datos que el usuario ya ingresó para envío.

Puede contener el contexto mínimo necesario para volver a consultar Logistics.

No posee:

- tarifa;
- promesa;
- disponibilidad;
- geografía canónica;
- regla logística.

---

## 4. PUBLIC SITE / ORIGIN

El repositorio es público, pero todavía no existe deployment/site origin canónico.

```text
PUBLIC PREVIEW ORIGIN
=
PENDING

PROTOCOL DATA TRACKED INSTALLATION
=
NOT ACTIVE
```

Antes de integrar boundaries públicos se revalidará la relación vigente:

```text
PUBLIC SITE / ORIGIN
→ TRACKED INSTALLATION
→ STORE
→ WORKSPACE
```

El browser no elegirá arbitrariamente Workspace/Store como tenant authority.

---

## 5. SHIPPING

La UI inicial reservará:

```text
“¿A dónde lo enviamos?”
```

con CP + dirección opcional.

Mientras Logistics no esté integrado:

- no se mostrarán tarifas reales inventadas;
- no se mostrarán promesas canónicas inventadas;
- cualquier dato demo deberá identificarse como mock/development.

Cuando se integre:

```text
SESSION LOCATION CONTEXT
→ AUTHORIZED SHIPPING ADAPTER
→ PROTOCOL DATA LOGISTICS
→ RESULT
```

---

## 6. TRACKING

Menú reservado:

```text
SABER DE MI ENVÍO
```

No se implementará lookup inseguro por order/tracking naked ID como autoridad.

La futura superficie seguirá el contrato público de Tracking vigente.

---

## 7. SUPPORT / CONVERSATION

Menú reservado:

```text
SOPORTE
```

Se preservará:

```text
SUPPORT START
!=
CUSTOMER CONVERSATION
```

Support Start crea un caso nuevo.

Conversation continúa un caso exacto mediante acceso autorizado.

Tracking access, Support access y Experience access no se reutilizan entre dominios.

---

## 8. EXPERIENCE

```text
READINESS = RESERVED
ACTIVATION = NOT ACTIVE
```

No se inventará una API de Experiencias V2.

La futura UI deberá poder integrarse sin reconstruir el sitio cuando exista la autoridad V2 correspondiente.

---

## 9. MEASUREMENT

Primera construcción:

```text
EVENT LAYER
=
TO BE IMPLEMENTED WITH HOME FOUNDATION
```

GTM u otro transporte podrá conectarse después.

No deberán enviarse a analytics ordinarios:

- raw capabilities;
- domicilio completo;
- mensajes de soporte;
- signed/private URLs;
- review free text por defecto;
- secretos.

---

## 10. LIVE CONTRACT REVALIDATION

Antes de mover cualquier capacidad a `INTEGRATED` se releerá el contrato vigente de Protocol Data correspondiente.

Este documento registra readiness del sitio; no congela endpoints, payloads ni versiones runtime.

---

## 11. STICKY DE COMPRA — SEAM RESERVADO

- Autoridad de diseño: `PRODUCT_V2_STICKY_APPROVED.md` (2026-11-04).
- Readiness Logistics: `RESERVED`, activation `NOT ACTIVE`. El sticky toma el CP de `web-de-navidad.sessionLocation.v1` y reserva exclusivamente un **evento de presentación interno** `santa-clausula:shipping-quote` para un futuro adaptador autorizado. No es contrato de API ni endpoint público.
- Badges de «Envío gratis» y «Llega mañana» únicamente cuando lo confirma Logistics para el CP de sesión; sin servicio, placeholders de consulta.
- Cuotas dependen de Commerce/checkout (no Logistics); adapter local reservado `santa-clausula:payment-terms`.
- La cifra `#productPrice` se deriva de la oferta seleccionada en Commerce mock. **No es total de checkout autorizado** hasta agregar cotización logística y precio definitivo por la integración correcta.
- El botón `#startCheckout` permanece no transaccional; futuras activaciones requieren revisión del contrato de Shopify/checkout.

---

## 12. PURCHASE REMINDERS — CAPACIDAD PROPIA DEL STOREFRONT

**Propietario:** nueva capacidad de Reminder Service propia del storefront; **NO es Logistics, Support, Experiencias ni Orders**.

```text
READINESS = RESERVED / UI IMPLEMENTED
ACTIVATION = NOT ACTIVE
```

- UX contractual aprobada en `PRODUCT_V2_PURCHASE_REMINDERS_APPROVED.md`. Un correo puntual tras consentimiento y verificación del titular. No es marketing consent.
- La UI inserta una fila después de los tres ítems comerciales y un modal inferior con fecha/hora `America/Argentina/Buenos_Aires`.
- Seam local `window.SantaClausulaReminderAdapter.create` **sin implementación**. Requiere backend de tienda independiente, contra-abuso, email verification, protección de PII, scheduler, proveedor de correo y cancelación.
- El único proyecto Supabase conectado ahora es `protocol-data-v2`; no se utiliza para esta nueva función sin autorización explícita.
- Al no estar activo, la UI informa el estado de preparación y jamás afirma una programación real.
- Event Layer y futura atribución de compra deben preservar privacidad, no enviar emails crudos a UTM, no atribuir venta sin Orders/Commerce confirmado.

---

## 13. SOPORTE GENERAL V1 — UI DESACOPLADA

**READINESS:** CASE A UI IMPLEMENTED / BACKEND RESERVED. **ACTIVATION:** NOT ACTIVE.

- Entrada pública `soporte.html`: formulario con nombre/correo/motivo/primer mensaje, sin envío de datos en demo.
- Vista customer `conversacion.html`: empty por defecto; `?demo=1` solo muestra contenido ficticio claramente señalado y composer deshabilitado. No se procesan ni guardan tokens de capacidad.
- Documentación local: `SANTA_CLAUSULA_SUPPORT_GENERAL_V1_IMPLEMENTATION.md` y `SANTA_CLAUSULA_CONVERSACIONES_TRES_ORIGENES.md`.
- Support Public Start real deberá seguir los contratos exactos de Protocol Data V2, con capability emitida y continuidad autorizada; no se heredan permisos por formulario, correo o Shopify.
- Escenarios B (buyer) y C (landing product), colas/segmentos y consultas reales siguen PENDIENTES. Ninguna conexión Supabase ni secrets se modificó.

---

## 14. SOPORTE CASO B — PREVIEW DE PEDIDO

```text
CASE B VISUAL READINESS = UI IMPLEMENTED / DEMO ONLY
ORDER ASSOCIATION CUSTOMER PROJECTION = NOT AVAILABLE
SUPPORT PUBLIC/CUSTOMER LIVE = NOT ACTIVE
```

- El mismo `conversacion.html` soporta modo `buyer-pending` sin exponer Order y modo `buyer-verified` con datos inequívocamente ficticios. Ningún parámetro URL es credencial ni prueba de compra.
- `SANTA_CLAUSULA_SUPPORT_BUYER_V1_IMPLEMENTATION.md` congela el alcance visual y el requisito de cards/badges/widgets sin bordes de color, con sombras compactas.
- En producción, identidad comprador y asociación Order requieren verificación y proyección customer-safe expresamente autorizada. `SUPPORT 014` sigue siendo contrato candidato en los documentos auditados.
- La capa A, el demo C legado, Product/Shopify/Orders/Logistics y Supabase no fueron conectados o modificados.

---

## 15. SOPORTE CASO C — PRODUCT LANDING VISUAL

```text
CASE C UI / PRODUCT CONTEXT = IMPLEMENTED / DEMO ONLY
COMMERCE PRODUCT / OFFER IDENTIFIERS = MOCK / UI ONLY
SUPPORT PUBLIC/CUSTOMER LIVE = NOT ACTIVE
TRUSTED PRODUCT ROUTING = NOT ACTIVE
```

- `product.html` conserva acceso existente al chat, reemplaza el demo con `js/product-support-v2.js` y `css/product-support-v2.css`. Formulario nombre/correo/mensaje sin selector de motivo, imagen 4:5 y nombre de oferta solo si se selecciona; no realiza network ni persiste PII.
- `js/product-runtime-v4.js` ya no genera sesiones locales del soporte ni registra otro handler. `js/product-support-camping-v1.js` permanece como fuente histórica **sin cargar en el producto**.
- `conversacion.html?demo=product` usa mismo diseño A/B y un fixture ilustrativo de producto, sin datos de cliente ni traslado de consulta por URL.
- Contrato exacto de alcance `SANTA_CLAUSULA_SUPPORT_PRODUCT_V1_IMPLEMENTATION.md`.
- Futura integración: Shopify/Commerce resuelve producto y oferta; Protocol Data Support posee identidad de caso, mensajes, acceso por capability y routing de Product después de validación server-side.
