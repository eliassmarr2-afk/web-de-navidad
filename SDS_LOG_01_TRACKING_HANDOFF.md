# SDS-LOG-01 — Santa Del Sur Store / Consulta logística pública

**Fecha:** 2026-11-20 (America/Argentina/Buenos_Aires)  
**Alcance:** `eliassmarr2-afk/web-de-navidad`, `tracking.html`.  
**Estado:** UI CONSTRUIDA / PUBLIC BC-02 PREPARADO / INSTALACIÓN DESHABILITADA / SHOPIFY NO INTEGRADO.

## 1. Diseño de origen

La estructura de la superficie proviene de `eliassmarr2-afk/indumentary`:

- `tracking.html`
- `css/tracking.css`
- `css/tracking-results.css`
- `js/tracking.js` (referente de estados y presentación, no autoridad comercial).

Preservamos la disposición, buscador, tres estados visuales, tarjetas `tracking-result-card`, timeline `tracking-timeline`, y las imágenes contextuales. El recurso local disponible para vacío es `assets/tracking-empty-state-final.webp` (mismo blob que la versión optimizada conservada en IND); error: `assets/tracking-no-encontrado.png` (mismo blob).

## 2. Protocolo V2 consumido

Contrato inalterado: `protocol-data-v2/docs/domains/logistics/LOGISTICS_V2_PUBLIC_TRACKING_CONTRACT.md` (BC-02 FROZEN).

Se reutilizó el lector de la rama ya construida `construction/logop03b-santa-tracking-surface`:

- `js/protocol/tracking-public-v2.js`
- `js/protocol/tracking-site-config.js`

El lector **nunca** envía tracking ID, Order ID ni Logistics Order ID como prueba de autorización. Requiere una capacidad secreta de posesión de 43 caracteres, `public_installation_key` y `Origin` del navegador. `POST` sin cookies, sin persistencia local, sin token en URL o logs. La configuración actual está `enabled:false`, con installation key vacía. **No existe seguimiento real habilitado.**

## 3. Estados y prueba visual

- `EMPTY`: ilustración de búsqueda original; no se renderizan tarjetas.
- `NOT_FOUND`: ilustración contextual de error; no se revelan identidades.
- `FOUND`: cuatro tarjetas con diseño heredado: Estado del pedido, Información del envío, Actualizaciones del envío, Ayuda.
- `UNAVAILABLE`: búsqueda real deshabilitada y aviso al comprador.
- `ERROR`: fallo seguro, nunca inventa un resultado encontrado.

Vista sintética de **demostración explícita**: `tracking.html?vista=demo`.
Códigos sintéticos: `C-1111` (éxito), `A1111` y `B1111` (no encontrado).
La vista muestra una marca visible de demostración; no usa backend, clientes ni Orders reales. Esta ruta no autoriza consultas públicas de compradores.

## 4. Puerto “Mensaje de logística”

`Mensaje de logística` se representa dentro de la **primera tarjeta de estados**, usando únicamente el texto `body` y `createdAt` de la observación **pública** más reciente de `projection.logistics.observations`. Las observaciones adicionales se muestran en la tercera tarjeta. No se leen observaciones internas ni se infieren novedades.

La tarjeta de envío consume solamente la allowlist BC-02:

- `lifecycleStatus`
- `updatedAt`, `deliveredAt`
- `carrierLabel`, `trackingNumber`, `trackingUrl`
- `promiseLabel`, `deliveryMinDays`, `deliveryMaxDays`, `deliveryTimeBand`
- `observations`, `hasMoreObservations`.

El lector normaliza esas claves desde el endpoint autorizado.

## 5. Puertos de incidencia

Existen contenedores inertemente ocultos `data-public-incident-slot` en cada tarjeta: `status`, `shipment`, `updates`, `support`.

**Importante:** BC-02 **no** proyecta actualmente un incidente estructurado (tipo, severidad, mensaje y ámbito). Por ello los contenedores de producción permanecen vacíos/ocultos. Solo `?vista=demo` enseña un incidente ficticio claramente identificado en el área `shipment`.

Para publicar incidencias reales se requiere primero una extensión de proyección pública **autorizada y certificada** por Mando V2; luego un adaptador allowlisted que convierta campos seguros al contrato visual, sin exponer notas privadas, intervención interna, JWT de operador ni identidad de cliente. No completar estos huecos con inferencias de estados u observaciones no estructuradas.

## 6. Límites de información

No mostrar al comprador desde el BC-02 público: nombre, email, teléfono, domicilio, productos, precios, costo logístico, actor, notas internas, Support ni Orders snapshots.

Los apartados históricos “Datos del cliente” y “Productos comprados” de IND requieren una frontera **distinta, autenticada y autorizada**, posiblemente a través de Shopify. No están incluidos en este puerto de seguimiento público. Se preserva la jerarquía visual de cuatro tarjetas, sin filtración de esos datos.

## 7. Próximo movimiento: Shopify

Antes de activar `enabled:true`, certificar:

1. Tracked Site real, Store activa y Origin canónico de la tienda Shopify.
2. `publicInstallationKey` real, segregada por sitio; sin credenciales de operador.
3. Emisión y **entrega segura** de la capacidad de consulta al comprador, nunca en querystrings, analytics o almacenamiento durable.
4. Certificación de estados/observaciones, 404 uniforme, abuso fail-closed y no-exposición de información privada.
5. Contrato separado para acceder a datos comerciales privados desde sesión legítima Shopify, si se decide habilitarlos.

**Sin escrituras a Protocol Data V2, sin cambios a Supabase, sin activación de Shopify y sin secretos nuevos.**

## 8. SDS-LOG-02 — Restauración completa de acciones de Ayuda

**Fecha:** 2026-11-20 (Argentina). La tarjeta original de INDUMENTARY `Ayuda`
contenía exactamente cinco acciones, aquí recuperadas en su orden original:

1. Cambiar mi dirección de entrega
2. Cambiar/Agregar productos
3. Reportar error
4. Cancelar compra
5. Hablar con Soporte

**Presentación:** misma tarjeta `tracking-result-card`, contenedor
`tracking-actions`, cinco filas `tracking-action` con chevrón y divisores.
Se restauraron únicamente las acciones visuales, sin mutar el estado del pedido.

**Puertos:** los primeros cuatro redirigen a `soporte.html?motivo=<ENUM_FIJO>`.
El único parámetro transportado es una categoría estática, perteneciente a una
allowlist cerrada. El quinto enlace abre `soporte.html` sin parámetros.

`js/support.js` usa esos cuatro valores de `motivo` para seleccionar el campo
`subject` ya existente y preparar una descripción de consulta **editable**.
No recibe ni almacena ID de seguimiento, token de acceso, nombre, dirección,
correo, datos comerciales o identidad de pedido desde tracking. No hay escritura,
envío ni persistencia; el formulario actual continúa en modo demostración.

Las operaciones de cambio/cancelación, la autorización comercial y la apertura real
de conversaciones permanecen **pendientes de contrato Shopify / Protocol Data**.
Ningún clic debe presentarse como una orden confirmada. No se modificaron
las capacidades públicas BC-02, su lector ni la configuración default-deny.
