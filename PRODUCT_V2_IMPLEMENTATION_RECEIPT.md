# WEB DE NAVIDAD — PRODUCT V2 UPPER SURFACE IMPLEMENTATION RECEIPT

**Fecha:** 2026-11-04  
**Autoridad visual:** `PRODUCT_V2_APPROVED_STRUCTURE.md`  
**Alcance autorizado por el operador:** exclusivamente la sección **anterior a la fotografía y el encabezado**; galería 1:1; preservar la estructura situada **después** de la imagen.  
**Estado:** CÓDIGO PREPARADO PARA MAIN / REVISIÓN VISUAL Y FUNCIONAL EN NAVEGADOR PENDIENTE.

## Cambios

1. `product.html`:
   - encabezado rojo con marca temporal **SantaClaus Store** y botones existentes de regreso, compartir y favoritos;
   - franja verde de domicilio 100% de ancho pegada al encabezado, con ícono de casa;
   - bloque blanco antes de la imagen: título **Proyector de formas navideñas portable | Iluminación LED para hogar**, badge **MÁS ELEGIDO**, cinco estrellas verdes rellenas y `(4.7)` a la derecha, botón `Ver cuándo llega` y mensaje contextual de entrega;
   - elemento `productImage` en una sección **1:1, borde a borde y sin radio**. Mientras se prepara la fotografía definitiva usa `assets/christmas-placeholder.svg`;
   - mantiene IDs y controladores existentes de compartir, favoritos, galería, reseñas demo, modal de ubicación, oferta, soporte, tabs y compra demo;
   - **desde `<section class="detail-section" id="detailSection">` hasta el cierre de la página, el HTML existente se conserva idéntico**, excepto por añadir una referencia al controlador superior antes de `</body>`.
2. `css/product-v2-top.css`: estilos aislados en `.christmas-product-v2`. El radio de los contenedores badge es **4px**; la media principal ocupa todo el ancho sin bordes ni márgenes; se neutraliza únicamente el solapamiento heredado de `.product-sheet`, sin reconstruir el cuerpo inferior.
3. `js/product-v2-top.js`: muestra ubicación con `getSessionLocation()`, actualiza textos cuando recibe el evento `web-de-navidad:location-change` y activa el **modal existente** a través de `#locationTrigger`. No se crea un formulario ni almacén de estado adicional.
4. `js/product-runtime-v4.js`: datos DEMO del producto mostrado y placeholder local; evita fijar fechas/valoraciones falsas en el bloque superior; el modal de producto lee y escribe la misma clave de ubicación que la Home, precarga la ubicación y emite el evento compartido. Registros de ofertas/carrito/compras demo inferiores no se reconstruyen. Además, se corrigieron **cuatro expresiones de template literal sintácticamente inválidas que ya existían en el runtime heredado**; se verificó que el archivo completo ahora pasa la comprobación de sintaxis JavaScript.
5. `js/product-support-camping-v1.js`: ancla el widget de reanudación de conversación **después de la galería/miniaturas**, evitando que aparezca entre el nuevo encabezado y la imagen al mover la presentación de producto.
6. `js/product-commercial-v1.js`: únicamente compatibilidad con ubicación de sesión (clave/evento), eliminación de promesas ficticias de entrega gratis/mañana y escape de cadenas de dirección en sugerencias HTML para evitar que una dirección ingresada se interprete como markup. **Su estructura de tarjetas, precio, acciones y modal inferior permanece igual.**

## Límites

- La **estructura inferior** permanece como estaba, incluso si hay textos, ofertas y referencias deportivas heredadas. El operador pidió conservarla; su eventual adaptación comercial navideña es un movimiento **separado**.
- Se mantiene el precio y ofertas mock anteriores para no inventar valores nuevos. **No representan valores de venta reales** y deben reemplazarse antes de producción.
- Los distintivos `MÁS ELEGIDO` y `(4.7)` constituyen contenido visual de demostración; no son reseñas ni evidencia comercial verificada.
- No hay promesas de tarifa o fecha de entrega sin respuesta de Logistics.
- No se conectó Shopify ni Protocol Data.
- No se modificó `indumentary` ni la Home.

## Validación requerida

1. Smartphone 320/360/390/430px: header rojo, franja verde sin huecos, título multilineal y rating a la derecha sin overflow.
2. Imagen placeholder cuadrada 1:1, borde a borde; gallery button funciona.
3. Badges con radio exacto 4px.
4. Ubicación guardada en Home aparece en Producto, y guardada en Producto aparece en Home; modal precargado.
5. Botón `Ver cuándo llega` abre modal de ubicación y no inventa fechas.
6. Revisar que TODOS los bloques bajo la imagen conserven su interacción original (miniaturas, oferta/combo, precios mock, soporte, tabs, descripción, CTA de compra demo).
7. Confirmar despliegue GitHub Pages y revisar en navegador antes de clasificar como publicado/aceptado.

## Riesgos futuros fuera de alcance

- `product.html?id=nav-xxx` conserva fallback de la ficha heredada; la vinculación completa de cada artículo del catálogo navideño debe pactarse separadamente.
- Nombres e identificadores `indumentary` aún existen en módulos legacy de soporte y carrito; requieren migración controlada posterior, no una sustitución global improvisada.
- La ficha del proyector usa imagen placeholder hasta recibir la fotografía final.
