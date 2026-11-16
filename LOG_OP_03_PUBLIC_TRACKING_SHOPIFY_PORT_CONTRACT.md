# Santa Clausula / Protocol Data — LOG-OP-03 · Seguimiento público y puerto Shopify

**Fecha:** 2026-11-16 (Argentina, GMT−03:00).
**Estado:** CONTRATO DE INTEGRACIÓN / DISEÑO PROPUESTO · NO LIVE · NO SHOPIFY CONNECTED · NO CUSTOMER WRITES.
**Autoridad del operador:** luego de aceptar LOG-OP-02, ordenó corregir la separación visual de Pedidos logísticos y abrir LOG-OP-03 siguiendo la división pública/privada, con este contrato antes de conectar datos reales.

## 0. Autoridades y fuentes

La presente especificación de trabajo **no reemplaza ni modifica** la autoridad congelada del backend Protocol Data V2.

- Repositorio canónico: `eliassmarr2-afk/protocol-data-v2`, `foundation/0.1-workspace-store`, `docs/domains/logistics/LOGISTICS_V2_PUBLIC_TRACKING_CONTRACT.md` (BC-02 FROZEN), `LOGISTICS_V2_POSTPURCHASE_QUERY_EDGE_CONTRACT.md`, `LOGISTICS_V2_POSTPURCHASE_COMMAND_EDGE_CONTRACT.md`, `LOGISTICS_V2_BACKEND_FINAL_FREEZE.md`.
- Repositorio visual de cliente: `eliassmarr2-afk/web-de-navidad`, main `c0ec9917f1c4ca769e4e69249806576c620fd5cd`: `TRACKING_SURFACE_CONTRACT.md`, `tracking.html`, `js/tracking.js`, `css/tracking.css`, `css/tracking-results.css`, `PROTOCOL_DATA_READINESS.md` y `SHOPIFY.md`.
- Consola privada: `eliassmarr2-afk/protocol-data-operativo`, LOG-OP-01/02 lector y comandos con JWT en `#logistica/envios`. No trasladar sus rutas, claves ni datos privados al navegador público.
- `web-de-navidad/TRACKING_SURFACE_CONTRACT.md` todavía describe un candidato **INDUMENTARY**; no se ha transferido ni certificado su presentación como Santa Clausula. `tracking.html` usa títulos/marca IND., `js/tracking.js` tiene `window.IND_TRACKING_LOOKUP_ADAPTER` y los datos son MOCK; `js/protocol/logistics.js` retorna `not_integrated`.
- Shopify: tema/colecciones con blueprint parcial, **NO INTEGRADO**. No hay checkout Shopify, Order canónica de Shopify ni sitio público/tracked installation activos que certifiquen seguimiento real.

## 1. Resultado objetivo

El comprador consulta exclusivamente **una proyección logística pública** desde la web navideña / futuro tema Shopify, luego de superar una autorización por capacidad de posesión. La lectura de estado se origina en **Logística V2** y no en una tabla espejo del storefront.

```text
Protocol Data Operativo (JWT operador)
       |
       | LOG-OP-02: logistics-postpurchase-command / lifecycle_transition
       v
Logística V2 (estado canónico + outbox de notificación)
       |
       +---> logistics-status-notification-worker (correo: servicio separado)
       |
       +---> logistics-public-tracking (proyección limitada)
                       ^
                       | POST: public_installation_key + access
                       |    + request Origin validado en servidor
       [Adaptador de seguimiento Santa Clausula]
                       ^
                       |
  Shopify / correo / seguimiento.html (UI sin credenciales internas)
```

**IDENTIFICADOR LOCALIZA; CAPACIDAD AUTORIZA.**

No utilizar JWT operador, `service_role`, acceso a `logistics-postpurchase-query` ni `logistics-postpurchase-command` desde el cliente de Shopify.

## 2. Transporte público exacto ya certificado

- Edge Function: `logistics-public-tracking`, `verify_jwt=false` porque la autorización depende de una **capacidad de posesión**, no de anonimato irrestricto.
- Resolución obligatoria: `public_installation_key` + encabezado real `Origin` del request → Tracked Site activo → Store activo → Workspace activo.
- Método: `POST`. Cuerpo permitido de inicio: `public_installation_key`, `access`, opcionales `page_size` y `cursor`.
- Cuerpo prohibido como reemplazo de autorización: `workspace_id`, `store_id`, `order_id`, `logistics_order_id`, `tracking_number`.
- `access` es una capacidad de 32 bytes aleatorios codificados en base64url **sin padding, 43 caracteres**, emitida por la frontera autenticada del operador; se retorna **una sola vez** y el backend almacena solo digest SHA-256.
- Vida inicial fija: **30 días**. Issue/rotate/revoke están sujetos a las capacidades y autorizaciones del operador; tokens viejos/rotados/revocados/vencidos quedan inválidos.
- Nunca enviar capacidad por URL, querystring, analítica, logs, repositorio, telemetría ni convertir un número de pedido en credencial. Evitar almacenar el token durablemente en el navegador. El establecimiento/recuperación segura desde email o sesión Shopify se acordará antes de conectar el flujo de compradores.
- Sitio/Origin desconocido o token inexistente/expirado/revocado/cruzado no deben revelar existencia de pedidos privados. Respetar controles antiabuso del backend.
- Los cambios de estado de LOG-OP-02 no exigen sincronización manual de un segundo estado Shopify: el puerto consulta la proyección actual autorizada de V2.

## 3. Proyección logística pública permitida (fuente BC-02)

Campos canónicos (presentar únicamente los disponibles):

| Campo V2 | Presentación Santa Clausula |
|---|---|
| `lifecycle_status` | Recibido / Despachado / En camino / Entregado |
| `carrier_label` | Transportista, cuando exista |
| `tracking_number` | Referencia de seguimiento autorizada, cuando exista |
| `tracking_url` | Enlace a transportista, con validación de destino |
| `shipping_promise_label` | Promesa o ventana estimada de entrega |
| `delivery_min_operational_days` / `delivery_max_operational_days` | Rango temporal si el backend lo informa |
| `delivery_time_band` | Franja horaria de entrega autorizada |
| `status_changed_at` | Fecha del último cambio logístico |
| `delivered_at` | Fecha de entrega efectiva, si aplica |
| Observaciones con visibilidad `public` | Detalles públicos acotados |

La línea de tiempo `received → dispatched → in_transit → delivered` es presentación derivada del **estado canónico**, no un historial inventado de eventos. Si no existe una fecha individual por etapa, no mostrarla como comprobada.

**Prohibido en esta proyección:** email/teléfono de cliente, calle y domicilio, notas internas, actor operador, intervención privada, ids de Store/Workspace, costos logísticos, márgenes/finanzas, evidencias de notificación, Support, snapshot crudo de Order, capacidad o digest.

## 4. Otras tarjetas del tracking actual: diferenciarlas por autoridad

La pantalla prototipo `tracking.html` muestra más que Logística y `js/tracking.js` contiene fixtures de cliente, domicilio, artículos e importes. No interpretar esos fixtures como datos que el tracking público V2 pueda entregar.

| Tarjeta | Autoridad necesaria | Primera V1 |
|---|---|---|
| Estado, línea de tiempo, transportista y promesa | Logistics Public Tracking BC-02 | **Permitido** |
| Datos personales / domicilio | Proyección customer-safe separada de Orders, con identidad comprobada | **NO HABILITADO** |
| Productos, importes, descuentos | Commerce/Orders con alcance customer-safe y autorización propia | **NO HABILITADO** |
| Cambiar domicilio, productos, cancelar | Comando postpurchase con comprobación propia de elegibilidad | **NO HABILITADO** |
| Hablar con Soporte | Support Customer / capability propia o inicio público de caso | Navegación disponible; no reutilizar `access` logístico |

Si no existe una proyección autorizada, **no mostrar la tarjeta**; no rellenarla con mocks en modo activo.

## 5. Estados visuales del adaptador

Preservar la semántica definida por el contrato local `TRACKING_SURFACE_CONTRACT.md`:

- `EMPTY`: sin consulta; no revelar datos.
- `FOUND`: capability válida y proyección pública autoritativa recibida.
- `NOT_FOUND`: no resuelto, inexistente, vencido, revocado, inválido o no autorizado cuando el backend colapsa esos casos.
- `UNAUTHORIZED`: solo cuando una frontera autorizada permita distinguirlo públicamente; no diferenciar token inválido y pedido ajeno por decisión de UI.
- `ERROR`: error transitorio sin concluir que un pedido no exista.

Sin pantallas de “pedido no encontrado” diferenciadas por email/Order, sin mostrar detalles internos, sin fallback a fixture cuando falle la red.

## 6. Arquitectura portable a Shopify

- La UI Santa Clausula de seguimiento se implementará a partir de `tracking.html` y estilos visuales autorizados, y luego se trasladará a sección/snippet/assets de Shopify según el tema elegido, **sin reescribir las reglas de autorización**.
- La presentación consume un **adaptador** con resultados normalizados; la implementación actual `window.IND_TRACKING_LOOKUP_ADAPTER` se conserva como candidato visual DEMO, pero el nombre/diseño final debe migrar a Santa Clausula sin quedar atado a IND. ni introducir dos fuentes de verdad.
- El adaptador podrá vivir en un boundary de servidor de la tienda / Shopify app proxy si el modelo de distribución y acceso lo exige. El navegador público jamás recibe secretos de servidor ni tokens administrativos; una app proxy no convierte un identificador en credencial.
- El Tracked Site y los orígenes reales de Shopify deben registrarse y verificarse **por despliegue**. Un cambio de dominio no implica acceso automático, y Origin must remain trusted from the actual request.
- Las capacidades de soporte y seguimiento siguen aisladas: **TRACKING CAPABILITY ≠ SUPPORT CAPABILITY**.

## 7. Rutas de entrada y continuidad

1. **Correo de cambio de estado:** enlazar a página de seguimiento sin incluir capacidad cruda en la URL. Antes de habilitar acceso desde email, acordar el canje de un artefacto de un solo uso o verificación equivalente; BC-02 no certifica ese canje.
2. **Shopify / cuenta de comprador:** identidad de Shopify **no equivale automáticamente** a capacidad logística. Hace falta vínculo verificado Orders ↔ Shopify Customer ↔ Store + emisión/entrega segura de capability.
3. **Página pública «Seguir mi envío»:** número visible solo como localizador; requerir la prueba de posesión/recuperación autorizada. No permitir lookup de información privada con `tracking_number` desnudo.
4. **Desde Conversaciones:** tratar como redirección/contexto, no trasladar su token de Support al endpoint de Logistics.

**Frontera pendiente:** identificar quién genera y entrega la capacidad al cliente cuando se crea una Order, qué mecanismo permite reingresar desde correo/Shopify sin mostrar el token en URL, cómo se revoca y qué queda accesible después de los 30 días.

## 8. Construcción por movimientos independientes

**LOG-OP-03A — Contrato y auditoría (ESTE COMMIT)**  
Rehidratar autoridades, bloquear campos, fijar presentación mínima Santa Clausula, documentar integraciones pendientes. **SOLO documentación**, ninguna URL/JS/Edge modificada.

**LOG-OP-03B — Surface y adaptador en Preview aislada**  
Quitar branding IND. de `tracking.html` tras acordar identidad visual, crear adapter público real sin mocks para modo activo, manejar `EMPTY / FOUND / NOT_FOUND / ERROR`, testear payload allowlist, Origin, tenant, tracking number desnudo, token revocado/expirado, y fallback prohibido. No tocar V2.

**LOG-OP-03C — Puente hacia Shopify**  
Traducir HTML/CSS/JS a sección/snippet/assets elegidos, registrar origen real, vincular Shopify Order autorizada y flujo de capability de cliente. Requiere tienda activa y contrato expreso de entrega/recuperación de token. No deploy de producción antes.

**LOG-OP-03D — Certificación de cliente real y correos**  
Verificar cambio LOG-OP-02 → estado visible en tracking público autorizado, sin fuga de datos, una sola identidad canónica. Separar entrega de notificación email LOG-OP-04, aún no certificada con proveedor.

## 9. Condiciones de salida y seguridad

- `protocol-data-v2` no requiere modificación de Postpurchase congelado para este contrato.
- Main del sitio navideño y Protocol Data Operativo no se fusionan ni actualizan por este documento.
- No crear pedidos, tokens, Tracked Sites, secretos, migraciones ni correos de prueba en esta fase.
- Todo cambio de contrato público, scopes, emisión de capacidad o nuevas proyecciones requiere autoridad y certificación independientes.
- No declarar `SHOPIFY READY`, `LIVE`, `TRACKING CONNECTED` ni `CUSTOMER ACCESS CERTIFIED` hasta pruebas hospedadas exactas.
