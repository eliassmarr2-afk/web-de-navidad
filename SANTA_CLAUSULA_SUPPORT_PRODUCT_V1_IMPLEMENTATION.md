# SANTA CLAUSULA — CHAT CONTEXTUAL DESDE PRODUCTO / CASO C V1

**Fecha:** 2026-11-05
**Estado:** DISEÑO C EXPRESAMENTE APROBADO / UI INTEGRADA / BACKEND NO ACTIVO
**Propietario futuro de casos y mensajes:** Protocol Data V2 — Logistics / Support / Conversations
**Origen UI:** `product.html`, botón existente `#productSupportButton`.
**Continuidad UI:** misma página `conversacion.html` que los casos A (Soporte general) y B (Soporte asociado a pedido verificado).
**Autoridad canónica previa:** `SANTA_CLAUSULA_CONVERSACIONES_TRES_ORIGENES.md`.

## 1. Diseño exactamente aprobado

El escenario C utiliza:
- El botón de chat existente en la sección Vendedor de la landing, sin incorporar otro widget flotante que tape el sticky comercial.
- Un **bottom sheet**: cabecera verde `#1E7437`, favicon/logo de `SANTA CLAUSULA`, subtítulo `Consulta sobre producto`, botón cerrar.
- Tarjeta visual con **fotografía de producto vertical 4:5**, título y texto de la oferta seleccionada **solo si corresponde**. No hay contornos de color en cards/widgets ni badges; separación por fondos y sombras suaves, compactas y de poca difusión. Radio 4px.
- Formulario mínimo: **nombre, correo electrónico y mensaje inicial**, sin selector de asunto redundante. Botón verde `Iniciar consulta`.
- La conversación utiliza el **mismo frontend** que A y B; añade tarjeta contextual justo encima del listado de mensajes y conserva burbujas, timestamps ilustrativos y composer fijo (deshabilitado en demo).
- No hay comprador ni Order inferidos por producto, oferta o email.

## 2. Implementación exacta en el repositorio

- `product.html`: conserva `#productSupportButton` con su posición original. Reemplaza el modal antiguo con `#productSupportBackdrop` + `#productSupportSheet`, cabecera de tienda, imagen 4:5, nombre/correo/mensaje, advertencia de demo y enlace a `conversacion.html?demo=product`. No cambia oferta, galería, imagen principal, sticky, reminder, navegación ni checkout.
- `css/product-support-v2.css`: estilos aislados de la ficha de Producto; sin bordes decorativos coloreados en cards/badges/widgets, sombras breves, inputs y bloque del producto 4px, modal de 20px arriba.
- `js/product-support-v2.js`: **único controlador activo** del botón de consulta. Al abrir toma la imagen, título y posible combo seleccionado desde el DOM comercial como snapshot **solo de presentación**. Controla modal/foco/cierre/validaciones. Al enviar, muestra que el servicio no está habilitado, **no hace network, no persiste PII, no finge caso**, no publica eventos ni genera mensajes.
- `js/product-runtime-v4.js`: elimina su inicializador duplicado de Soporte, el `supportKey` heredado de Indumentary, los handlers para escribir sesiones ficticias y la simulación de respuestas. Conserva ubicación, oferta, producto, carrito y resto de servicios que posee.
- El script `js/product-support-camping-v1.js` y stylesheet `css/product-support-camping.css` se **desvinculan del HTML** y quedan como archivos históricos inactivos en el repo. Su lógica y evento `IndumentarySupportHook` ya **no se ejecutan** desde `product.html`.
- `conversacion.html`, `js/customer-conversation-v1.js`, `css/customer-conversation-v1.css`: amplían la UI ya existente con modo `?demo=product`, sin duplicar la infraestructura de los casos A y B. El avatar sigue siendo de la tienda, la tarjeta product contextual muestra un **fixture público del proyector navideño**, no datos de cliente.

## 3. Distinción indispensable: contexto visual vs datos reales

En el bottom sheet de Producto la selección de oferta se lee del DOM actual (por ejemplo `#offerList .product-combo-card.is-selected`). Esta referencia es una **pista de presentación**; no constituye el identificador canónico de Shopify ni un campo/orden verificado por backend.

En la página de conversación `?demo=product` la foto y título son **un fixture fijo**, no se transporta por URL el correo del visitante, el primer mensaje ni el carrito. Esto evita usar un parámetro de URL como acceso a conversación o almacenar conversaciones simuladas en `sessionStorage`.

Antes de integrar Shopify y Protocol Data:
1. El Commerce Adapter resuelve producto, imagen, variante, metafields de oferta y **referencia de oferta real** desde Shopify y el catálogo autorizado.
2. Public Support Start valida el Origin/Store autorizado y crea exactamente un caso y primer mensaje; emite capacidad de posesión para continuar. **El navegador no define tenant ni asigna Queue por sí mismo**.
3. El backend clasifica el caso como origen de Producto mediante un seam confiable, con Queue/Segment Store-scoped (por ejemplo `Consultas de productos` / `Chats por productos`) **solo si el contrato de Public Start/trusted routing lo permite**. No se crean tablas de mensajes paralelas.
4. La capacidad se utiliza en Support customer read/reply, no se deriva de email ni se persiste como dato común; cualquier Order posterior pasa por verificación independiente.
5. La conversación cliente se renderiza de la misma fuente de verdad Support y el contexto producto se proyecta exclusivamente tras autorización apropiada.
6. No dar por disponibles ni siquiera en demo adjuntos reales, mensajes de operador, seguimiento del pedido o servicio de email/capability.

## 4. Seguridad de la fase de demostración

- `?demo=product` activa **solo un ejemplo estático** sin autenticación. El valor de ese parámetro no autoriza casos ni Products/Orders.
- `conversacion.html` sin modo demo sigue mostrando `No hay una conversación activa`.
- A: `?demo=1`; B: `?demo=buyer-pending`, `?demo=buyer-verified`; C: `?demo=product`. Solo muestras públicas ficticias.
- El composer/adjuntos están deshabilitados; el formulario de Producto nunca envía PII ni crea casos simulados.
- La selección comercial puede cambiar antes de abrir el modal, y se refleja en la tarjeta de ese modal. La vista de continuación usa fixture hasta integrar el Commerce Adapter; **no promete reproducir una sesión inexistente**.
- Durante esta fase no hay `Support Backend` conectado, ni secretos, ni mutaciones en Supabase.

## 5. Estado de recepción

```text
A SUPPORT GENERAL DESIGN = APPROVED / UI IMPLEMENTED
B BUYER CONTEXT DESIGN = APPROVED / UI DEMO IMPLEMENTED
C PRODUCT CONTEXT DESIGN = APPROVED / UI DEMO IMPLEMENTED
LIVE SUPPORT CUSTOMER/OPERATOR INTEGRATION = NOT ACTIVE
SHOPIFY PRODUCT/OFFER BINDINGS = NOT ACTIVE
TRUSTED AUTOMATIC PRODUCT QUEUE = NOT ACTIVE
```

La aprobación final de presentación visual en móviles depende de inspección del operador después del despliegue de GitHub Pages. El sitio es todavía una maqueta comercial; no declarar mensajes ni email reales enviados.
