# WEB DE NAVIDAD — SEGUNDO BANNER / CUPÓN V1

**Fecha:** 2026-11-04  
**Estado:** diseño aprobado por el operador; integración de código preparada para `main`. Revisión visual en móvil pendiente.  
**Alcance:** solo el banner comercial medio de la Home.

## Decisión de diseño

El cupón **no es una fotografía de un objeto sobre un fondo**, ni una imagen con esquinas recortadas. La imagen original tiene formato **rectangular completo**; la propia página recorta su contorno con CSS para simular un ticket desprendible, con esquinas cóncavas, muescas en el punto de separación y sombra exterior. Sin sub-fondo oscuro ni borde exterior de maqueta.

**Imagen aprobada**, aportada por el operador, exactamente 2022 × 778 px, PNG RGB, 1.562.271 bytes y blob SHA `9aa98256b76b3feefb935546a37210ed32c89c54`. Se preserva sin modificaciones de píxeles en `assets/christmas-coupon-banner.png` (nombre canónico).

El área principal blanca y el talón verde, incluyendo sus textos y la línea impresa de perforación, forman parte de **una sola imagen**. No generar textos superpuestos ni un segundo separador con CSS.

## Textos fijados en el arte

Área blanca:
- **¡NAVIDAD DE CUPONES!**
- **CONSEGUÍ 20% OFF**
- **PRODUCTOS SELECCIONADOS**
- **válido hasta el 25 de Diciembre del 2026**

Talón verde:
- **Ticket Válido**
- **código NAVIDAD2026**
- **25% OFF**

**Inconsistencia comercial pendiente:** la pieza, siguiendo literalmente el pedido del operador, exhibe **20%** en el área principal y **25%** en el talón. Esta discordancia **no debe interpretarse como autorización de ambas promociones**. Antes de activar ventas, precios o cupones reales, decidir el beneficio aplicable y actualizar la creatividad si corresponde. El sitio sigue siendo catálogo demo sin checkout ni motor de cupones conectado.

## Implementación

- `index.html`: sustituye el contenido HTML del antiguo banner rojo (texto, sombrerito y estrella) por una sola etiqueta `<img>` con la imagen rectangular, dentro de un enlace al catálogo `#productos`.
- `css/navidad-home.css`: reemplaza reglas antiguas de `christmas-middle-banner` por componente `christmas-middle-banner--ticket`; relación **2022:778** sin recortar texto, CSS shadow exterior y máscara de silueta.
- `assets/coupon-ticket-mask.svg`: máscara **exclusivamente geométrica** para recortar esquinas y muescas en la separación del talón verde. No sustituye la imagen del banner ni contiene texto o ilustración navideña.
- Mantener estructura de Home, buscador, filtros, packs, otras páginas y límites del e-commerce ensamblable intactos.
- No activar integraciones Shopify ni Protocol Data.

## Aceptación visual pendiente

1. Verificar que el banner utilice el PNG directamente de borde a borde, sin mockup con marco oscuro.
2. Confirmar esquinas cóncavas y sombra alrededor del contenedor; ninguna sombra o silueta está pintada sobre la imagen.
3. La línea de corte visible es la impresa en la foto, alineada con las muescas superior e inferior del contenedor.
4. En móviles, mantener relación 2022:778 y los textos completos, sin `object-fit: cover`, recortes ni desbordamientos laterales.
5. Enlace lleva a `#productos`; el sitio no promete aplicar automáticamente el descuento.
