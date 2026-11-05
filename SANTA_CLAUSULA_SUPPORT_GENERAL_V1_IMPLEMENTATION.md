# SANTA CLAUSULA — SOPORTE GENERAL / CHAT VISUAL — V1

**Fecha de aprobación visual:** 2026-11-05
**Estado:** CASO A APROBADO / UI DE SOPORTE + VISTA DE CONVERSACIÓN DE EJEMPLO IMPLEMENTADAS / BACKEND NO ACTIVO
**Repositorio:** `eliassmarr2-afk/web-de-navidad`
**Propietario canónico futuro:** Protocol Data V2 — Logistics / Support / Conversations.
**No sustituye los contratos canónicos de Protocol Data ni activa B o C.**

## 1. Alcance del diseño aprobado

El operador aprobó la primera composición **A: Soporte general**:
- Cabecera verde `#1E7437`, nombre **`Soporte | SANTA CLAUSULA`**, avatar de marca y navegación de retorno.
- Formulario público: **nombre, correo, motivo y mensaje inicial**, más campo condicional cuando el motivo es `Otro`.
- Estilo Manrope, principales negros, secundarios grises, campos y acciones de 4px de radio.
- Vista de conversación con el mismo encabezado y favicon/logo, **sin tarjeta ni fotografía de producto**.
- Motivo y estado visibles exclusivamente cuando estén autorizados; en demo se muestran etiquetados como ejemplos.
- Burbujas: cliente verde muy claro, soporte gris claro; composer fijo abajo y adjuntos reservados.
- Móvil: pantalla completa utilizable, escritorio: contenedor centrado máx. 460 px.

Esta estructura es reutilizable para B y C **tras aprobar esos contextos**; A no infiere compras por correo ni vincula un Order.

## 2. Código entregado

- `soporte.html`: reemplaza identidad `IND.` por SANTA CLAUSULA; formulario con cuatro campos (motivo + primer mensaje), acceso a la vista de demostración claramente identificado.
- `css/support.css`: hoja de estilos exclusiva para formulario A.
- `js/support.js`: validación local de nombre, correo, motivo, `Otro` y mensaje. **No llama APIs, no persiste nada, no crea casos**; al intentar enviar muestra una advertencia.
- `conversacion.html`: ruta independiente para el futuro cliente. En estado normal muestra **«No hay una conversación activa»**. Solo con `?demo=1` presenta mensajes ficticios, rótulo explícito de demo y composer inhabilitado.
- `css/customer-conversation-v1.css`: layout de pantalla alta y scroll de mensajes, responsive, sin conflicto con el sticky de producto.
- `js/customer-conversation-v1.js`: alterna demo/empty; no guarda tokens ni mensajes.
- Se reutiliza `assets/santa-clausula-logo.webp` como icono/imagen de marca. El sitio no posee todavía un favicon simbólico reducido específico.

## 3. No conectar prematuramente

**Public Start actual de Protocol Data Support** crea un caso nuevo más su mensaje público inicial y emite una capability. Eso requiere autorización de Store/Origin, controles antiabuso y un contrato HTTP, no un formulario HTML directo.

La futura secuencia será:
```text
formulario A + motivo + mensaje inicial
    -> Support Start autorizado (caso nuevo)
    -> capability segura, transportada según contrato
    -> conversación customer autorizada (public read/reply)
```

No se admite iniciar una sesión de lectura o respuesta por simple coincidencia de email, nombre, Order, Shopify ni un parámetro de consulta. La cabecera no debe sugerir comprador identificado sin la proyección autorizada correspondiente.

El sitio tiene actualmente `soporte.html` y un mock de chat **separado en Producto** (`js/product-support-camping-v1.js`); se conserva intacto mientras se diseña C, pero **no representa una segunda autoridad canónica**. Al llegar a C se debe reemplazar/refactorizar ese mock para usar un solo motor de Conversaciones.

## 4. Uso de la vista previa y prueba

- `soporte.html`: completar el formulario y pulsar `Iniciar consulta` -> **aviso explícito de no disponibilidad**, sin transmisión.
- Botón `Ver vista previa del chat` -> `conversacion.html?demo=1`, con marca, motivo ficticio y dos mensajes ficticios.
- `conversacion.html` sin `demo`: empty state; no lee ni inventa una conversación.
- Botones `Enviar` y `Adjuntar` deshabilitados en demo. No se simulan eventos reales del operador.
- Verificar en 320, 360, 390, 430, 460 px y desktop, incluyendo foco y scroll.
- **Publicación/recepción visual:** solo después del despliegue de GitHub Pages y revisión del operador.
- La página de conversación se marca `noindex,nofollow` mientras es vista previa no transaccional.

## 5. Próximos movimientos separados

1. Revisión visual y aceptación operativa de A.
2. Diseño de B: buyer context tras verificación de titularidad y proyección customer-safe, no inferido por email.
3. Diseño de C: contexto Product y clasificación backend `Chats por productos`, con Queue/Segment autorizado.
4. Transición del mock heredado del chat de Producto y futuro ensamble de Shopify / Protocol Data en fases certificadas.
5. Integración real Support public/customer solo mediante autorización independiente.

**Controles de entrega:** no inventar envío, buyer association, segmento automático, caso persistente, mensaje del operador ni capability en esta fase.

## 6. Ampliación B y regla de contornos (2026-11-05)

El diseño A fue recibido y expresamente aprobado por el operador. Luego fue aprobada la ampliación B, documentada en `SANTA_CLAUSULA_SUPPORT_BUYER_V1_IMPLEMENTATION.md`. Se reutiliza `conversacion.html` y se preserva A; se agregan vistas de pedido **exclusivamente ficticias**. Se eliminaron los contornos decorativos coloreados del frontend A (formulario, CTA de preview, enlaces de la conversación) por nueva regla visual global; no se modifica ninguna seguridad ni capacidad real.
