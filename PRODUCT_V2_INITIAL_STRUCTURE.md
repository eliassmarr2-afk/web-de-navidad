# WEB DE NAVIDAD — PRODUCT PAGE V2 / ESTRUCTURA INICIAL

**Fecha:** 2026-11-04  
**Estado:** DEFINICIÓN PARCIAL DE DISEÑO / GALERÍA PENDIENTE DE IMAGEN DE REFERENCIA / SIN CAMBIOS EN CÓDIGO FUNCIONAL  
**Ruta objetivo:** `product.html`  
**Identidad visual:** SantaClaus Store

## Autoridad de este documento

Registra las instrucciones expresas del operador para la nueva página de Producto de `web-de-navidad`. El diseño de esta página **no debe heredar la composición deportiva ni el branding de `indumentary`**. Conserva arquitectura ensamblable, preparado para Shopify/Protocol Data, pero ninguna integración live.

La estructura completa todavía no está cerrada: el operador menciona una captura de referencia para la región de producto/imagen, pero esa nueva captura no fue adjuntada al mensaje en el que fijó los puntos 1–5. No interpretar imágenes anteriores de banners como referencia de la galería. **No implantar la estructura definitiva de la galería sin el nuevo referente.**

## Secciones pactadas

### 1. Encabezado — rojo navideño
- Franja horizontal con fondo rojo navideño `#B20B17` y letras blancas.
- Logo textual provisorio **SantaClaus Store**.
- Debe ser visualmente independiente de la galería de producto.
- Navegación/back y carrito deben continuar disponibles, sin inventar funcionamiento nuevo.

### 2. Franja de dirección — verde navideño
- **Pegada sin separación** al borde inferior del encabezado rojo.
- **Borde a borde**, ancho completo, sin márgenes laterales.
- Fondo verde navideño (propuesta de token provisional `#17643F`), tipografía blanca legible y contraste suficiente.
- Botón de superficie completa, con ícono de **casa**.
- Si no existe ubicación de sesión: **«Coloca tu direccion de envio»** y flecha `>` (el texto final puede acentuarse tipográficamente sin modificar la intención).
- Si existe: **«Llega a {domicilio}»**, utilizando exclusivamente `visibleLabel` del contexto de sesión; nunca inventar domicilios. Cuando solo se proporcionó código postal, `visibleLabel` será `CP ####`.
- Ambos estados abren el **mismo flujo de ingreso/edición** de ubicación utilizado en Home; conservar datos existentes y devolver control a la página de producto.
- No se declaran fechas de entrega, precio de envío, elegibilidad ni logística canónica sin autoridad de Protocol Data Logistics.

### 3. Bloque de producto — fondo blanco
- Título literal de maqueta: **«Proyector de formas navideñas portable | Iluminación LED para hogar»**.
- Badge bajo título, verde con texto blanco en mayúsculas: **«MAS ELEGIDO»**.
- Fondo del bloque **blanco**.
- Tipografía limpia, jerarquía del título predominante y legibilidad móvil.

### 4. Valoración alineada a la derecha
- Sobre la misma fila visual del título, a su derecha: **cinco estrellas verdes** y la cifra **`(4.7)`**.
- Layout responsive: columna flexible para título y columna compacta para valoración; título multilineal sin cortar texto ni producir scroll horizontal.
- La cifra y el badge son **datos provisionales de la maqueta**, no evidencia de reseñas reales o de popularidad. Antes de la venta efectiva, quitar o reemplazar con datos acreditados de una fuente autorizada.

### 5. Galería/imagen
- **Pendiente de la imagen de referencia indicada por el operador.** No reproducir la galería deportiva existente por inercia y no inventar proporciones.
- Preparar una región modular de media reemplazable posteriormente, sin dar por aprobadas dimensiones, carrusel, thumbnails, marcadores ni botones.
- Las fotografías reales se integrarán después de cerrar la estructura, tal como indicó el operador.

## Auditoría rápida del estado heredado

- `index.html` y `js/shared/location-state.js` actualmente usan `web-de-navidad.sessionLocation.v1`.
- `product.html` carga código legacy (`js/product-runtime-v4.js` y `js/product-commercial-v1.js`) que **todavía usa `indumentary.sessionLocation.v1`**. Esta divergencia impediría asegurar el contexto compartido sin migración.
- `product.html` mantiene `Campera Core`, materiales deportivos y componentes previos; la Home ya alimenta `nav-001` a `nav-008` desde el catálogo navideño.
- Existe `js/product.js` y `js/commerce/product-detail.js` como diseño de módulos de responsabilidad más próxima al modelo nuevo, pero `product.html` no los carga actualmente.
- El nuevo build debe usar **una sola autoridad de estado** de ubicación, evitar doble inicialización de producto y preservar identificación `SKU != PRODUCT SET != COMMERCIAL OFFER != PROVIDER VARIANT`.

## Secuencia y guardas de implementación

1. Completar composición de galería con la referencia visual del operador.
2. Pactar ubicación del título y la galería en móvil/escritorio, y confirmar bloques comerciales posteriores si se reemplazan.
3. Sustituir la maquetación antigua en `product.html` con componentes navideños y estilos scoped, conservando rutas de navegación `product.html?id=nav-xxx`.
4. Unificar la ubicación con `js/shared/location-state.js`, y retirar la dependencia de claves `indumentary.*` del producto.
5. Utilizar el catálogo/commerce boundary vigente; no hardcodear la información de producto como fuente permanente en HTML.
6. Verificar lectura y guardado de ubicación desde Home y Product, comportamiento sin dirección, responsive 320–720 px y escritorio, módulos de carrito y navegación.
7. Mantener Commerce mock y Protocol Data/Shopify **NOT ACTIVE**; no presentar compras, descuentos, calificaciones o entrega como verdaderos en producción sin autoridad.

## Regla de pegado y autorización

Esta nota es un **contrato de diseño parcial**, no un mandato para escribir código no pactado. Antes de reemplazar archivos funcionales, cerrar con el operador la composición visual que depende de la captura ausente; cuando se implemente desde GitHub, registrar exactamente rutas, alcance, pruebas y resultado. `indumentary` original no debe ser modificado.
