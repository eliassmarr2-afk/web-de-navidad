# WEB DE NAVIDAD — HOME V1 / REVISIÓN VISUAL APROBADA

**Fecha:** 2026-11-04  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`  
**Estado:** DISEÑO CERRADO / IMPLEMENTACIÓN DE CÓDIGO PREPARADA / VALIDACIÓN VISUAL PENDIENTE  
**Autoridad:** instrucciones visuales expresas del operador, basadas en la captura de referencia compartida en el chat.  
**Precedencia:** este documento **sustituye únicamente** las disposiciones incompatibles de `CHRISTMAS_DESIGN_CONTRACT.md` (2026-11-03). Conserva las restantes decisiones V1 relativas a colores de categorías, catálogo mock, accesibilidad, rutas y límites de integración.

## Objetivo

Adaptar la Home actual al patrón de aplicación móvil de la referencia **sin reconstruir la infraestructura ni activar Shopify o Protocol Data**. La referencia determina composición y proporciones; la ilustración definitiva del hero y las fotografías comerciales se diseñarán **después** y no deben inventarse durante esta revisión.

## Orden canónico de la Home móvil

1. **Hero/cabecera navideña full-bleed** desde el borde superior físico del viewport; no hay franja informativa ni cabecera separadas por encima de la ilustración.
   - El hero mide aproximadamente **25 % de la altura visible** del teléfono (objetivo CSS conceptual: `25svh`; ajustar sólo por legibilidad y áreas seguras); ocupa **100 % del ancho visible**, sin márgenes laterales, bordes redondeados externos ni marco.
   - La futura imagen llena el bloque, recortada de forma controlada sin deformación (`cover` y punto focal definido al incorporar la imagen). La versión actual conserva un fondo/placeholder neutral hasta aprobar la creatividad final.
   - **Fila superior superpuesta dentro del hero:** izquierda, selector de domicilio compacto tipo *pill* blanca con pin, texto breve y chevron; derecha, accesos circulares blancos con íconos oscuros, visualmente equivalentes a la referencia. Deben tener acciones reales: menú existente, seguimiento y carrito demo; no fingir funcionalidades de cuenta/notificaciones que hoy no existen. Botones accesibles y adaptados a safe-area.
   - **Fila inferior superpuesta dentro del hero:** buscador horizontal blanco en forma de píldora, ocupando el espacio disponible; inmediatamente **a su derecha** un botón circular blanco con ícono de mapa/ubicación. El mapa abre el selector de domicilio existente; no invoca geolocalización automática ni calcula tarifas. El buscador conserva `id=productSearch` y la búsqueda existente en el catálogo.
   - No colocar un H1 gigante sobre el buscador ni una tarjeta de texto que tape la ilustración. El título de la página seguirá disponible semánticamente sin interferir en el hero móvil.
2. **Categorías:** **una sola fila horizontal** desplazable con las ocho categorías actuales: Árboles, Regalos, Decoración, Luces, Envoltorios, Mesa, Moños, Ofertas. Mantener los íconos **blancos dentro de círculos rojos** aprobados en V1.
   - Los elementos flotan sobre el **fondo general** `#FFF8F7`; eliminar el contenedor rosado, su borde, radius y cualquier tarjeta envolvente.
   - El rail llega a **ambos bordes laterales del teléfono**; sin padding inicial/final del carril, sin flechas fijas consumiendo ancho. Las categorías que desbordan pueden quedar naturalmente recortadas por el borde físico del viewport. Scroll táctil horizontal y accesibilidad por teclado.
   - Conservar el filtrado por identidad categórica, `aria-pressed` y el modelo de estado único; reemplazar renderizado de dos rails por uno.
3. **Filtros con iconos:** una fila de chips/pills deslizable horizontalmente, sobre el fondo general, sin panel contenedor. Conservar Packs / Promociones / Para regalar / Decoración / Envoltorios y su lógica de filtro.
4. **Banner promocional medio:** ubicado **inmediatamente después de los filtros** y antes del merchandising de packs/productos. Relación de aspecto **2,6:1** en móvil, con esquinas redondeadas, tipografía contrastante y mensaje navideño; ningún descuento no autorizado.
   - Incorporar **sombrerito de Papá Noel** visible en el **extremo superior izquierdo**, con aspecto decorativo superpuesto al borde del banner y sin bloquear información ni accesibilidad. Puede resolverse con vector local pequeño; la fotografía/creatividad definitiva continúa pendiente.
5. **Packs/combos** desplazables horizontalmente; conservar el proveedor mock y los callbacks existentes. Luego **productos destacados** con tarjetas y búsqueda/filtros funcionales. No inventar ofertas ni checkout operativo.
6. **Barra de navegación inferior**, fija en móvil, fondo blanco, cinco accesos con iconos y etiquetas: **Inicio / Navidad / Packs / Pedidos / Ayuda**. Destinos: `#top`, `#categorias`, `#packs`, `./tracking.html`, `./soporte.html`. Señalar ubicación activa, respetar `safe-area-inset-bottom`, foco visible y evitar cubrir contenido.

## Sistema visual preservado

- Tipografía Manrope.
- Rojo primario `#B20B17`, rojo oscuro `#850C17`, fondo general `#FFF8F7`, blanco `#FFFFFF`; acento turquesa para el hero ilustrado y piezas promocionales de la referencia cuando la creatividad esté definida.
- Círculos de categoría rojo navideño con vector blanco, sin recuadro rosado de fondo.
- Buscar: pill blanca de radio máximo; controles de cabecera: blancos, compactos, ligeramente elevados contra la imagen.
- Banner medio: redondeo aprox. 20–24 px; tarjetas de producto blancas con radios 16–20 px. El hero superior **no** tiene border-radius externo.
- En pantallas grandes, adaptar la retícula de forma responsable sin duplicar lógica ni alterar las cuatro páginas existentes.

## Alcance técnico previsto, no implementado por este documento

- `index.html`: reordenar la estructura visual hacia un hero que contenga ubicación, accesos superiores y buscador; eliminar las bandas separadas encima del hero en móvil; mover el banner promocional antes de los packs; mantener IDs y flujos existentes.
- `css/navidad-home.css`: estilos visuales aislados de la Home para hero full-bleed, controles superpuestos, rail de una fila, filtros y nav inferior. Evitar cambios globales en `css/base.css` y `css/home.css` que afecten Product/Tracking/Support.
- `js/app.js`: actualizar exclusivamente el renderizado de categorías para un solo rail y la unión de eventos necesarios a controles **reutilizados**; no duplicar búsqueda, ubicación, carrito ni estados.
- Nuevo vector local para el sombrero, si hace falta; **no generar ni reemplazar aún el banner ilustrado final**.
- Corregir cualquier HTML inválido que se detecte en la Home durante la implementación, preservando los contratos de accesibilidad y IDs.

## Criterios de aceptación de la implementación futura

1. Al entrar desde teléfono, la primera franja visible es la **imagen/bloque hero**, sin barras rojas, headers o márgenes por encima.
2. Ubicación e íconos quedan **dentro** de la parte alta del hero; buscador + mapa **dentro** de la parte baja.
3. Hero ocupa aprox. 1/4 del alto visible y cubre 100 % de ancho. No hay desplazamiento horizontal de la página.
4. Categorías: **una** fila, sin caja de fondo, desliza y se recorta al borde del móvil; las ocho categorías son seleccionables.
5. Filtros: scroll y filtrado correcto, indicadores activos visibles.
6. Banner medio: relación 2,6:1, sombrerito arriba izquierda; ubicado tras filtros.
7. Packs, búsqueda, tarjetas, ubicación de sesión, carrito demo, Tracking y Soporte no regresan funcionalmente.
8. Navbar inferior respeta safe-area y no tapa controles ni contenido.
9. Verificar anchos de 320, 360, 390, 430 y 720 px, y escritorio; probar foco, teclado, scroll y modal de domicilio.
10. Sin conexión LIVE Shopify/Protocol Data ni promesas comerciales nuevas.

## Estado y siguiente movimiento

El commit de documentación cierra las **decisiones visuales**. **No declara que los cambios estén desplegados ni validados visualmente**. El siguiente movimiento técnico es adaptar los archivos citados y realizar pruebas en móvil/escritorio. La ilustración hero y fotografías comerciales definitivas son una fase separada, a elección del operador.

## Recepción de implementación — 2026-11-04

Se preparó la actualización de Home en `index.html`, `css/navidad-home.css`, `js/app.js` y `assets/christmas-santa-hat.svg`. La implementación reutiliza búsqueda, ubicación, carrito de demostración, filtros, categorías, tracking y soporte. No activa Shopify ni Protocol Data.

**La entrega de código no equivale a certificación visual o funcional en navegador real.** Antes del cierre operativo se requiere revisar el sitio publicado en móvil y escritorio, incluyendo acceso al modal, scroll horizontal, navegación fija, teclado y tamaños de pantalla.
