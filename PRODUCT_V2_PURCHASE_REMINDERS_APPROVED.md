# SANTA CLAUSULA — RECORDATORIO DE COMPRA V1

**Fecha:** 2026-11-04  
**Estado del diseño:** APROBADO POR EL OPERADOR  
**Estado técnico:** UI / MODAL IMPLEMENTADOS; BACKEND, EMAIL DE VERIFICACIÓN, SCHEDULER Y ENTREGA REAL **NOT ACTIVE**  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`  
**Superficie:** `product.html` y módulo `js/product-purchase-reminder-v1.js`  
**Autoridad:** el operador aprobó el 04-11-2026 la propuesta de un recordatorio puntual por correo para quienes deseen adquirir el producto posteriormente.

## 1. Lugar y aspecto aprobados

- En el **cuerpo comercial**, inmediatamente **debajo de los tres ítems existentes**: condiciones de envío, devoluciones y pagos seguros/privacidad.
- Se conserva cada ítem original, sin reordenar ni cambiar sus eventos.
- Nueva cuarta fila blanca: **ícono negro de reloj**, texto negro **«Programá un recordatorio para comprar este producto»**, subtexto gris «Elegí cuándo querés recibir un correo» y chevron de navegación a la derecha.
- Separador fino de 1px. No se introduce una tarjeta promocional adicional.
- Al pulsar: **modal inferior / bottom sheet**, fondo blanco, tirador, título «Recordame comprar», botón de cierre, texto explicativo, correo, fecha, horario, indicación **Argentina GMT−3**, nota de privacidad y botón verde **«Programar recordatorio»**.
- Radios del nuevo formulario y aviso **4px**; evitar una nueva identidad visual. Manrope, negros principales y gris secundario.

## 2. Intención comercial

Capacidad denominada **RECORDATORIO DE COMPRA SOLICITADO**, no suscripción automática, descuento diferido, reserva de stock ni campaña de abandonos.

El visitante elige cuándo recibir **un único correo de servicio** para volver al producto u oferta que estaba mirando. El mensaje debe enlazar a la página vigente y nunca prometer que precio, disponibilidad o promoción permanecieron idénticos.

El correo no autoriza, por sí solo, incluir al interesado en una lista de email marketing; cualquier finalidad publicitaria adicional requiere un consentimiento independiente y voluntario. Recopilar el mínimo necesario.

## 3. Datos mínimos previstos

- `site_key = santa-clausula`;
- `email` validado y confirmado por el titular (no verificado únicamente por regexp de navegador);
- `product_ref` y `offer_ref` identificados mediante bindings canónicos futuros, no valores de marketing del DOM;
- `requested_local_datetime` + `timezone = America/Argentina/Buenos_Aires` y conversión UTC **en backend**;
- estado del recordatorio, `created_at`, `verified_at`, `sent_at`, `cancelled_at`;
- versión del texto de consentimiento y metadatos mínimos necesarios para seguridad;
- tokens de confirmación y cancelación aleatorios (persistir **hashes**, no tokens en claro);
- estado y registro de intentos de envío, errores sanitizados y expiración.

**No enviar PII de clientes, capacidades de Logistics/Support, direcciones postales ni secretos a analítica.**

## 4. Flujo de servidor requerido antes de activar

1. Cliente envía solicitud **solo** a un Reminder API propio y permitido por origen, con control antiabuso/limitación de tasa. **No insertar secret/service_role en frontend**.
2. Backend revalida correo, estado de producto/oferta contra fuente autorizada, identidad de tienda, fecha futura, zona horaria, propósito y consentimiento; la fecha inicial es como mínimo 15 minutos en el futuro.
3. Un correo de **verificación / confirmación de la solicitud** se manda al titular (double opt-in funcional), con link de un solo uso y expiración corta. La API no permite enumerar qué cuentas existen.
4. Tras verificar, se crea o activa exactamente un recordatorio pendiente usando clave de idempotencia. No enviar nada si el titular no confirma.
5. Un scheduler con locking/claim atómico selecciona únicamente filas **verificadas, pendientes y vencidas** y despacha mediante proveedor autorizado (Brevo u otro).
6. Retries limitados con backoff y registro de evidencia. El scheduler y el email provider deben evitar duplicación (idempotency key) y bloquear reenvío después de `sent` o `cancelled`.
7. Cada correo incluye el enlace del producto y un **link firmado de cancelación**; la cancelación no expone correo ni otros datos. Vencimientos y retención de datos definidos en política de la tienda.
8. Exponer métricas agregadas de solicitudes, verificaciones, envíos, cancelaciones y atribución a compra **solo por Orders/Commerce confirmados**, no por clic en el email.
9. Plantillas español-AR; no asumir precio, stock ni condiciones futuras de la campaña como garantizados.

La tienda es estacional. El formulario inicial limita las elecciones a una fecha futura no posterior al **25 de diciembre** de la temporada correspondiente; este límite de negocio puede revisarse en una enmienda explícita.

## 5. API de presentación reservada (no endpoint activo)

La interfaz consume opcionalmente `window.SantaClausulaReminderAdapter.create(request)`, que **únicamente puede ser instalada por un adaptador frontend de confianza después de conectar el servicio real**.

Entrada prevista:
```text
{
  site: "santa-clausula",
  productId: string,
  offerId: string | null,
  productTitle: string,       // texto ilustrativo: el backend DEBE resolver la referencia real
  email: string,
  scheduledLocal: "YYYY-MM-DDTHH:mm",
  timezone: "America/Argentina/Buenos_Aires",
  purpose: "one-off-purchase-reminder",
  consentVersion: "santa-reminder-v1-2026-11-04"
}
```

Respuesta de presentación:
- `{ status: "verification_required" }` **solo cuando** el backend confirma que se gestionó el correo de verificación.
- `{ status: "scheduled" }` **solo cuando** el backend confirma que existe un recordatorio verificado y persistido.
- Cualquier error o respuesta no reconocida: **no prometer programación**, mostrar un mensaje de fallo seguro.

**ATENCIÓN:** la mera existencia de este objeto o evento no constituye autenticación del backend. La seguridad real corresponde al servidor, con verificación de tenant, producto/offer binding, origen, antispam, autorización y idempotencia.

## 6. Estado actual — honesto, no transaccional

Existe solamente **un proyecto Supabase conectado** en esta cuenta, `protocol-data-v2`. El módulo Reminder es un servicio nuevo del storefront y **NO se debe introducir en esa producción** sin decisión y segregación de responsabilidad. Tampoco existe en este repositorio un API de recordatorios real configurado ni credenciales de correo.

Por ello:
- La fila y el formulario están integrados y son navegables.
- Mientras no se configure `SantaClausulaReminderAdapter`, el formulario avisa **desde que se abre** que el servicio todavía no está habilitado.
- No persiste, transmite ni agenda direcciones de correo. Enviar el formulario sin backend muestra un mensaje claro de no disponibilidad; **jamás un éxito falso**.
- No se crean eventos de calendario, recordatorios del propio usuario, tareas ChatGPT ni automatizaciones del asistente en sustitución de la solicitud.
- **No declarar emails enviados ni capacidad operativa** hasta completar backend, verificación real y pruebas end-to-end.

## 7. Implementación del repositorio

- `product.html`: registra CSS/JS por referencias individuales versionadas, **sin cambiar** su estructura existente (foto, combo, módulo comercial, sticky ni modales previos).
- `js/product-purchase-reminder-v1.js`: agrega únicamente la fila después de `#commercialSecurityRow` una vez generado `#productCommercialBody`; crea modal accesible, valida email y día/hora, muestra estado y llama un adaptador **solo si existe**.
- `css/product-purchase-reminder-v1.css`: estilos aislados de acceso y modal; bottom sheet responsive, contraste y `border-radius: 4px`.
- `CURRENT_WAYPOINT.md`: registra autoridad y pasos pendientes.

## 8. Recepción / siguiente movimiento

**UI:** verificar fila al terminar las tres opciones, reloj negro, respuesta al toque, inputs, accesibilidad móvil 320/360/390/430px, teclado y superposición con el sticky, validaciones y mensaje **no activo**. No permitir que el envío de un formulario no operativo devuelva éxito.

**Backend:** configurar un proyecto/servicio de recordatorios bajo propiedad explícita del storefront, DNS y proveedor de correo con remitente validado, política de privacidad, CAPTCHA/rate limits, verificación de correo, tabla con RLS/privilegios, cron, retries, cancelación e idempotencia, seguido de pruebas reales. No activar ni afirmar producción antes de una autorización de despliegue concreta y verificación.

**Conclusión:** UI APROBADA E IMPLEMENTADA EN EL REPOSITORIO; ENVÍO PROGRAMADO **NO DISPONIBLE TODAVÍA**.
