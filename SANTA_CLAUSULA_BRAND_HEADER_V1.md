# SANTA CLAUSULA — IDENTIDAD Y ENCABEZADO V1

**Fecha:** 2026-11-04  
**Repositorio:** eliassmarr2-afk/web-de-navidad  
**Página afectada:** product.html  
**Estado:** DISEÑO / COLORES Y LOGO INTEGRADOS EN CÓDIGO; REVISIÓN VISUAL Y PUBLICACIÓN PENDIENTES  
**Prioridad:** esta decisión prevalece sobre los colores de cabecera y nombre de marca anteriores en PRODUCT_V2_APPROVED_STRUCTURE.md y PRODUCT_V2_PALETTE_REVISION.md.

## Identidad definitiva

- Nombre de marca: **SANTA CLAUSULA**. «STORE» es la leyenda secundaria del propio logo.
- Logo gráfico seleccionado por el operador: icono de Papá Noel con gorro rojo, barba y bigote blanco, texto central **SANTA CLAUSULA**, leyenda superior **STORE**, fondo transparente.
- El operador subió a GitHub el archivo `assets/santa-clausula-logo.webp`: **800 × 800 px, WebP con transparencia, 107242 bytes**; SHA Git blob `f2700940ec6f65b9975b5c07adc9e6730f0ca9e0`. Se verificó la igualdad binaria respecto del WebP entregado.
- **La imagen está confirmada en main y ahora reemplaza el texto provisional** mediante `<img class="christmas-product-header__logo">` con `alt="SANTA CLAUSULA STORE"`.
- Ubicación cuando se integre: **centro exacto de la cabecera**, sin ocupar alto excesivo; slot visual de **58×58 px** (50×50 px en móviles de hasta 360 px), object-fit: contain. Usar alt adecuado de marca y dejar el contenido accesible a lectores de pantalla.

## Referencia del encabezado

- Referencia aportada por operador: composición «Jingle» blanca sobre fondo verde uniforme. El texto «Jingle» **no** es la nueva marca; se toma exclusivamente su color y lenguaje visual.
- Color de encabezado, obtenido de la zona uniforme de la imagen: **#1E7437**.
- Controles superiores y marca temporal: **blancos**, con contraste sobre el verde.
- La altura previa del encabezado se mantiene; no crear nueva zona para un logo grande.

## Selector de domicilio

- La franja justo debajo del encabezado tiene fondo **#FFFFFF**.
- Letras e íconos **#000000**, sin fondo verde ni caja independiente.
- **Únicamente una línea inferior** de 1 px sólido gris claro **#D5D5D5**; cero bordes visibles en los demás lados.
- El selector continúa abriendo el mismo flujo de domicilio compartido con la Home: no duplicar estado ni alterar Backend/Logistics.

## Títulos y colores comerciales

- Todos los **títulos y textos principales** de Product V2 (título del proyector, títulos de secciones, nombres de productos/ofertas, precio principal) pasan a **negro absoluto #000000**.
- Los **subtextos y metadatos secundarios permanecen grises**; evitar convertirlos en negro. Por ejemplo «Nuevo | +600 vendidos» y explicaciones de entrega continúan secundarios.
- El badge «MÁS ELEGIDO» toma **el mismo verde del encabezado #1E7437**, texto blanco y **border-radius exacto 4px**.
- Estrellas de valoración: verde del encabezado; pictogramas rellenos; cifra (4.7) demo.
- El rojo navideño, bordó y beige anteriores pueden permanecer como acentos de componentes comerciales sin alterar la estructura.
- No cambiar ni reordenar nada bajo la imagen 1:1; solo color de textos importantes si corresponde.

## Archivos de esta revisión

1. `product.html`: establecer marca **SANTA CLAUSULA**, sustituir el texto temporal por el archivo WebP centrado, ajustar theme-color y versionado CSS/JS.
2. `css/product-v2-top.css`: reglas scoped con verde, franja blanca y borde gris, títulos negros, texto secundario gris y badge verde 4px; reservar la clase `.christmas-product-header__logo` para la posterior integración.
3. `js/product-runtime-v4.js`: alinear el nombre de marca de `document.title` y vendedor al nuevo branding sin cambiar la fuente de producto, galería, ubicación o comportamiento inferior.
4. `PRODUCT_V2_APPROVED_STRUCTURE.md`, `PRODUCT_V2_PALETTE_REVISION.md`, `CURRENT_WAYPOINT.md`: registrar precedencia, SHA de asset y recepción.

## Próximo movimiento

**Logo subido, SHA verificado e imagen central integrada**. El siguiente movimiento es comprobar el despliegue de GitHub Pages y revisar visualmente la escala del logo (58px, o 50px en móvil estrecho), el contraste del encabezado y el selector de domicilio.

**Sin Shopify ni Protocol Data activos.** La nueva marca y la hoja de estilos se aplican exclusivamente al producto hasta nueva autorización explícita para extenderlas a la Home y otras páginas.
