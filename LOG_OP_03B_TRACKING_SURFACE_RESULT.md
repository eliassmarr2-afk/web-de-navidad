# Santa Clausula — LOG-OP-03B · Public Tracking Surface / Backend Adapter

**Fecha:** 16/11/2026, Argentina UTC−03.  
**Estado:** SOURCE BUILT / CI PENDING / NO LIVE TRACKING / NO SHOPIFY / NO HOSTED WRITES.
**Autoridad:** operador aprobó continuar tras LOG-OP-03A, y pidió después una simulación de pedido con transiciones certificadas.

## 1. Base, propiedad y límites

- Repositorio storefront: `eliassmarr2-afk/web-de-navidad`; base exacta `9cf5f70851eb57fff8ecaef2381ada9998b14812`, PR #1 DRAFT. LOG-OP-03A CI 43962077554 SUCCESS.
- Backend autoridad inmutable: Protocol Data V2, Logistics BC-02 `docs/domains/logistics/LOGISTICS_V2_PUBLIC_TRACKING_CONTRACT.md` (FROZEN), `supabase/functions/logistics-public-tracking/index.ts` y `core.ts`, rama `foundation/0.1-workspace-store`.
- Operativo privado: LOG-OP-02 `lifecycle_transition` certificado como fuente y UI, sin pedidos hosted; JWT operador y readback NO se trasladan a Shopify/cliente.
- LOG-OP-03A define el puerto hacia Shopify, registro de Origin y entrega/recuperación segura de capacidad. Las condiciones pendientes **NO se resuelven ficticiamente** aquí.

## 2. Construcción public-only

1. `tracking.html`: marca Santa Clausula, títulos/menú navideño, etiqueta de acceso seguro, `type=password`, `autocomplete=off`, `maxlength=43`, formulario inicialmente deshabilitado, enlace a Soporte independiente. Quitar branding IND. y toda terminología de lookup por bare tracking ID. Marcar `referrer=no-referrer`.
2. `js/tracking.js`: retirar completamente DEMO/IND fixtures y fallback; importar adaptador V2 y configuración; representar solo la proyección logística pública en timeline de cuatro estados, card de transporte/promesa, observaciones públicas y CTA a Soporte. No cards de Customer/Address/Commerce/Finance, no acciones de Order.
3. `js/protocol/tracking-public-v2.js`: transporte POST exclusivo de BC-02; cuerpo **exacto** `public_installation_key`, `access`, `page_size=25`. No `store_id`, `workspace_id`, `order_id`, `logistics_order_id`, `tracking_number`, JWT, cookies, service-role ni URLs con capability. Referrer no-referrer, credenciales omitidas, sin cache ni redirecciones. Origin lo agrega el navegador, y V2 lo valida con Tracked Site real.
4. `js/protocol/tracking-site-config.js`: configuración de integración pública default-deny, `enabled:false`, key vacía; URL pública de Edge **no es un secreto**, pero no hay Tracked Site/Origin ni entrega segura certificada. No habilitar sin movimiento separado.
5. `css/tracking.css`, `css/tracking-results.css`: escala/color de marca Santa Clausula (teal #16878C del sitio), estados de acceso y tarjetas logísticas. Sin cambios CSS globales.
6. `tests/logop03b-public-tracking.test.mjs`: contrato de transporte exacto, 43 caracteres, no bare ID, origen no falsificado, 4 estados, 404 uniforme, rate/network fail-safe, HTML sin IND. y whitelist que rechaza datos privados.
7. `.github/workflows/log-op-03b-public-tracking.yml`: nueve rutas exactas, Node22, bloqueo de archivos freeze.
8. Este documento (nueve rutas incluidas).

## 3. Proyección allowlist de BC-02

Campos fuente exactos: `lifecycle_status`, `carrier_label`, `tracking_number`, `tracking_url`, `shipping_promise_label`, `delivery_min_operational_days`, `delivery_max_operational_days`, `delivery_time_band`, `status_changed_at`, `delivered_at`, `observations` (`items` públicos, `page_size`, `has_more`, `next_cursor`).

- Proyectar solo `projection.logistics`, sin pasar campos extra al DOM. La respuesta de Edge debe ser íntegramente parseable con las claves exactas; `lifecycle_status` debe pertenecer a `received/dispatched/in_transit/delivered`; timestamps válidos.
- No mostrar fecha ficticia por cada estado. El timeline muestra qué etapas están previas, actual y pendientes; solo `status_changed_at` es una fecha autorizada de estado.
- `tracking_url` solo enlaza si HTTPS, sin credenciales ni fragmento. Usar `textContent`, no `innerHTML`, para contenido proveniente de V2.
- No mostrar email/teléfono, domicilio, cliente, artículos, importes, costo, notificaciones, actor, Store/Workspace, Support ni notas privadas.
- Acciones de Soporte abren `soporte.html`, pero NO trasladan `access` ni usan capability de Support.
- Modo estado: `UNAVAILABLE` al no configurar instalación, `EMPTY` sin consulta, `FOUND` con proyección estricta, `NOT_FOUND` uniforme para 404 y token inválido, `ERROR` en red/429/5xx/payload inválido. No mock fallback.

## 4. Protecciones al activar

- **La entrada actual es una capacidad de posesión**, no número de pedido ni token de Shopify. Nunca ponerla en URL/hash, analytics/log, storage, HTML attributes, localStorage ni cookies. El campo password se limpia inmediatamente al iniciar consulta. El resultado no contiene capacidad.
- Se deben configurar Tracked Site de Santa Clausula, `public_installation_key` real, `canonical_origin` verificado; el proyecto Cloudflare puede diferir del futuro dominio de Shopify.
- No se crean ni rotan tokens ni se insertan Orders/Logistics Orders en esta fase. No se configura email. La vía de entrada para compradores desde Shopify/correo se debe diseñar y certificar aparte.
- `public_installation_key` y URL de Edge son configuración del sitio, no secretos. La capacidad raw sí es secreto de posesión.
- El nuevo adaptador cumple el endpoint actual de Supabase directamente; un futuro Shopify app proxy o verificador de sesión deberá preservar el contrato sin exponer privilegios internos y requerirá autorización nueva.
- Desde URLs reales de correo no se puede recuperar una capability de forma segura con el contrato BC-02 aislado; **no activar producción con trucos de URL**.

## 5. Próxima simulación pedida por operador

**LOG-OP-LAB-01 (MOVIMIENTO FUTURO, NO EJECUTADO):** un pedido **sintético con identidad explícita de laboratorio** deberá atravesar `received → dispatched → in_transit → delivered` usando los comandos certificados; auditar exactamente un evento de outbox por transición real, cero duplicados y su proyección autorizada.

No insertar este pedido ficticio en la Store comercial hospedada ni enviar emails reales a compradores. Primero elegir entorno aislado (PG17 desechable/CI certificado o staging con autorización explícita), comprobar las migraciones congeladas, definir el vínculo Order–Logistics Order y ejecutar tres transiciones con readback y desecho del entorno. El laboratorio de backend NO equivale a la integración real de Shopify ni a entrega de correos.

## 6. Criterios de salida

- Fuente CI del HEAD exacto PASS, sin alteraciones a V2, Operativo, checkout, Orders ni Support.
- Vista pública marca Santa Clausula, ninguna fila ficticia activa, estado inicial default-deny.
- PR DRAFT, NO MERGE; las Preview públicas de la rama, de existir, mostrarán “seguimiento todavía no habilitado” y nunca datos reales.
- Primera activación pública solo tras contrato/Origin de Shopify y canal seguro de emisión/recuperación de capacidad certificado.
