# SANTA DEL SUR STORE — ESTRUCTURA DE LANDINGS
## DESCRIPCIÓN COMERCIAL INTERACTIVA R1
> **Vigencia:** consultar primero la actualización SDS-L01.3G / SDS-L01.4 / SDS-L01.5 al final. Las secciones iniciales conservan el registro histórico de construcción.
Frontera SDS-L01.3A–F. Fecha de aceptación visual por el operador: 27/11/2026.
**DISEÑO APROBADO / IMPLEMENTACIÓN GUARDADA / CONGELAMIENTO DOCUMENTAL / NO PUBLICADO.**
Fuente efectiva: tema Shopify Santa Del Sur | Migración R1, ID 191487017159 (no publicado en las verificaciones previas). Este documento registra el contrato, no sustituye los archivos efectivos. Producto piloto: Rollo LED 50M, handle `luces-navidenas-de-jardin-hogar`. No implica certificación funcional integral ni aceptación de MANDO.

### Arquitectura y diseño comunes
Una sola plantilla global; cada producto configura la narrativa y el orden de bloques. Tab canónico Descripción → #sds-description, después de las filas comerciales y del cuerpo introductorio correspondiente. El anclaje y la disponibilidad se calculan sobre el mismo contenido capturado. Mantener sticky tabs, galería, variantes, ofertas, visor, compra y demás secciones aprobadas.
Manrope; fondo blanco, #EDEDED para superficies neutras, azul #2479FF como identidad; radios 4 px, divisorias de 1 px #D9D9D9 de borde a borde, sin sombras decorativas. Títulos de bloques 22 px/800, párrafos generales 14 px/1.6; texto interior 13 px en tarjetas cuando corresponda. Gutter textual 28 px, 22 px <=360 px. En viewport <=767 px las superficies visuales de los cuatro componentes ocupan el ancho de la landing menos 16 px (8 px por lado); en escritorio se conservan los gutters normales. La landing conserva su ancho máximo de 480 px. Imágenes lazy, dimensiones reservadas, sin librerías externas.
El halo de interacción es una señal funcional, no una sombra decorativa.

### Contrato de datos v1
Metacampos PRODUCT, namespace custom:
- `sds_description_blocks`: json; definición 636204220615.
- `sds_description_images`: list.file_reference; definición 636204253383.
- `sds_short_description`: resumen existente, independiente y preservado.

Objeto con `schema_version: 1` y array `blocks`. Cada bloque tiene `id` estable y no vacío, `type`, `enabled: true` para activar, título y texto opcionales según el tipo. El orden del array determina el orden visual. Hasta 30 bloques inspeccionados por producto; los tipos desconocidos y los registros sin contenido requerido se omiten. El contrato requiere IDs únicos y datos correctamente tipados; el render actual no certifica unicidad ni constituye un validador JSON exhaustivo. Las referencias de imágenes son índices enteros base 1 en el orden de la lista de archivos; mantener el orden de la lista o actualizar coordinadamente todas las referencias. No usar archivos arbitrarios ni URLs externas como sustitutos. El tipo de medio debe ser imagen.
Si no se obtiene contenido modular válido, se conserva la descripción nativa de Shopify; el piloto puede mostrar una demo explícita únicamente bajo request.design_mode. No se guardaron valores de demostración en metacampos de productos. No confundir la existencia de las definiciones con la carga de contenido.

### 1. Antes y después — before_after
SDS-L01.3B R2 aprobado.
Campos: title, text, before_label, after_label, initial_position (0–100, default 50), pairs[]: title, before_index, after_index, before_alt, after_alt.
Hasta 12 parejas por bloque. Dos referencias distintas, imágenes con idénticas dimensiones exactas y proporción 3:4; omitir pareja inválida. Los atributos visuales de la escena requieren revisión humana.
Comparador vertical de dos capas, separador blanco y control de rango nativo táctil/mouse/teclado, etiquetas antes y después, posición inicial configurable. ANTES a la izquierda y DESPUÉS a la derecha. Selector de escenario si hay más de una pareja válida; sin JS, las escenas se mantienen visibles y el rango interactivo no se ofrece. Margen móvil 8 px. No inventar un efecto comercial.
Producción posterior: primero crear escena base, luego editar esa misma escena para introducir el producto y su efecto, no dos generaciones independientes. Cámara, encuadre, perspectiva, geometría, objetos, hora y condiciones ambientales constantes. Permitir solo diferencias derivadas del producto. Objetivo de entrega WebP 1536×2048 (3:4), sin desplazamiento entre capas; revisar realismo y correspondencia del producto, así como alineación a 0/25/50/75/100%. Si la imagen es una simulación, no presentarla como prueba fotográfica real.

### 2. Nosotros vs. alternativas — comparison
SDS-L01.3C aprobado. Tabla explícitamente extensible: añadir, eliminar y reordenar atributos mediante rows[], hasta 12 filas por bloque, sin editar HTML/CSS; para más comparaciones pueden repetirse bloques. No limitar a las tres filas de demo.
Campos: title, text, left_label, right_label, left_image_index, right_image_index, left_caption, right_caption, note; rows[] con label, left, right (los tres no vacíos).
Dos tarjetas 3:4, separación 8 px, cabecera propia azul y alternativa gris. Tabla semántica 40/30/30, columna propia azul pastel, textos comparables. Si no hay dos imágenes válidas, mostrar solo tabla; si no hay filas válidas, no mostrar bloque. No inferir superioridad, calidad, rendimiento ni prestaciones de terceros. Toda comparación debe estar sustentada y precisar la alternativa. Demo 50 m frente a ejemplo de 10 m, ilustración por longitud exclusivamente.

### 3. Problema vs. solución — problem_solution
SDS-L01.3D aprobado. Carrusel manual, hasta 12 situaciones por bloque, sin autoplay.
Campos: title, text; situations[] con title, problem, solution, problem_image_index, solution_image_index, problem_alt, solution_alt. Requiere tres textos y dos referencias distintas de imagen válidas. Los recuadros se presentan en 3:4 con object-fit cover. Dos tarjetas lado a lado, separación 8 px, problema rojo pastel #F6F1F1 y solución verde pastel #EEF4F0; iconos y etiquetas explícitos. Navegación nativa por gesto, flechas y puntos; estado activo sincronizado, controles ocultos cuando no corresponden, respeto a movimiento reducido. Sin JS, situaciones visibles en columna. No prometer resultados no comprobados.

### 4. Imagen con puntos interactivos — image_hotspots
SDS-L01.3E R2 aprobado. Ampliable: hasta 12 puntos por imagen; cinco de prueba en editor, no límite fijo de cinco. Repetir bloques para más imágenes. Validar distribución para evitar solapamientos.
Campos: title, text, image_index, image_alt; points[] con x, y (números 0–100, porcentajes del ancho y alto), title, text y tone opcional: blue, green, amber. Requiere imagen 3:4, sin recorte; marcador y panel reciben el mismo tone. Valores desconocidos de tone vuelven a blue. El render omite coordenadas ausentes/fuera de rango; los datos de entrada deben ser numéricos, pues Liquid aplica coerción y no garantiza validación estricta de tipos.
Numeración consecutiva de puntos válidos, área táctil 44×44 px y círculo de 30 px; clamp de centros a 22 px del borde para conservar el área táctil. Primer punto seleccionado por defecto. Pulsar número actualiza exclusivamente su tarjeta inferior; aria-pressed, etiqueta con número y título, región de anuncio, controles de teclado nativos. Sin JS se muestran todas las tarjetas.
Color contextual: blue (base #1764CF, fondo #EDF4FF) información; green (base #00753B, fondo #EEF4F0) beneficio; amber (base #946000, fondo #FFF5E4) información importante. El color no reemplaza la numeración ni los textos.
R2: halo exterior más pronunciado, 3 pulsos de 1.4 s al primer ingreso visible (IntersectionObserver, umbral 25%; fallback al inicializar), sin repetición infinita. Al pulsar un punto, cancelar animaciones anteriores y emitir dos pulsos sincronizados de 850 ms en su halo y perímetro de tarjeta (1.7 s total); se repite al volver a pulsar. Conservar el color estático después. Respeto a prefers-reduced-motion y cancelación de recursos al desconectar. No destellos bruscos ni ocultar texto.

### 5. Bloque textual — text
Soporte existente para título y párrafo de texto plano escapado. Los demás tipos convencionales propuestos (image, benefits_grid, steps, cierre comercial) no están construidos como tipos modulares independientes en esta fase; requieren autorización y desarrollo si se necesitan. No declararlos disponibles.

### Trazabilidad de versiones guardadas (Shopify)
| Frontera | Commit |
|---|---|
| 3A/B motor y comparador | 6ef786337ca9b54c8b2f6ce191c71d839ab3cfdc |
| 3B R2 ancho móvil | d03d6c684972791e2ae4852f8efe2aa2f861c78c |
| 3C comparativa | 0f629e4d3a2d26fe8fc3e4ae3d55f9d0e7dccd97 |
| 3D problema/solución + extensión de tabla | 469d262db2d1d23e9b6aca5182efa951aedb4bb3 |
| 3E explorador | ce5a8e7c0eb4fcb83f64a25796341f83ce11031e |
| 3E R2 pulsos y contexto | ddc91feb8957d4f43025692f4af48b649ccd9b50 |

Archivos efectivos:
- sections/sds-native-product.liquid
- snippets/sds-commercial-tabs.liquid
- snippets/sds-description-content.liquid
- snippets/sds-description-before-after.liquid
- snippets/sds-description-comparison.liquid
- snippets/sds-description-problem-solution.liquid
- snippets/sds-description-problem-slide.liquid
- snippets/sds-description-hotspots.liquid
- snippets/sds-description-hotspot-marker.liquid
- snippets/sds-description-hotspot-panel.liquid
- assets/sds-description.css
- assets/sds-description.js

### Frontera siguiente y certificación pendiente
Diseño de los cuatro componentes aprobado por operador. Herramienta de guardado confirmó archivos sin errores; solicitudes de captura móvil/escritorio devolvieron metadatos, no evidencia visual inspeccionable por WORK. La aprobación del operador no sustituye pruebas reproducibles de runtime. Antes de cualquier publicación: validar datos reales con imágenes Shopify, fallback, casos inválidos, ausencia de demo comercial, desplazamiento/tacto/teclado, cambio de escenarios, múltiples instancias, ampliación de filas/puntos, foco, reducción de movimiento, rendimiento, sticky tabs, variantes, ofertas y compra. No declarar PASS sin evidencia. Revisar colisiones de puntos y legibilidad con activos finales.
SDS-L02: producir activos específicos para el piloto; no cargar ni publicar hasta pactar el contenido. Mantener los demás tabs pendientes conforme a su hoja de ruta y la aceptación de MANDO. No modificar Protocol Data, puertos, precios, inventario, SKU, variantes, ofertas o tema MAIN. Este documento no autoriza merge ni publicación.

---

## ACTUALIZACIÓN VIGENTE — SDS-L01.3G / SDS-L01.4 / SDS-L01.5
**PUBLICADO EN R1 / TRES COMPONENTES COMERCIALES INTEGRADOS / APROBACIÓN VISUAL DEL OPERADOR.**
Fecha: 27/11/2026. Esta actualización prevalece sobre las afirmaciones históricas de arquitectura y estado de publicación anteriores. El tema Santa Del Sur | Migración R1 (191487017159) es MAIN; la descripción del producto piloto 15540666695879 se leyó directamente de Shopify. No se modifica el tema ni los datos del producto durante este checkpoint documental.

### A. Fuente comercial y responsabilidades
- Autoría por producto: descripción HTML nativa de Shopify (`descriptionHtml`), no un JSON de metacampos. El HTML contiene narrativa, referencias a imágenes, orden y controles declarativos; `assets/sds-description.css` y `assets/sds-description.js` aportan estilo e interacciones comunes. No duplicar scripts en cada descripción.
- Compatibilidad: el renderizador Liquid sigue dando prioridad al contenido modular válido; luego demo editor del piloto y fallback HTML público. No se ha eliminado la ruta legacy ni cambiado su precedencia global. Para un producto gestionado por HTML, asegurar que no tenga bloques modulares activos que lo oculten. En el piloto el bloque anterior está deshabilitado (`enabled:false`); sus referencias quedan como respaldo. No borrar definiciones ni tocar metacampos de ofertas. En el editor la demo puede prevalecer sobre el HTML del piloto; validar desde la landing pública.
- Resumen superior independiente: `custom.sds_short_description` conserva la introducción anterior. No volver a repetirla en el cuerpo. El encabezado automático Descripción se oculta visualmente si existe `sds-ba-hero`, conservando el nombre accesible de la sección y el sticky tab.
- Archivos: subir WebP a Shopify Files; insertar la URL CDN real devuelta por Shopify, alt descriptivo, dimensiones reales y loading=lazy. No adjuntar estas imágenes a la galería principal. Preservar el resto del HTML y leer de vuelta tras cada actualización. Una actualización del producto no necesita republicación del tema; CSS/JS sí requieren commit y autorización de publicación.

### B. Diseño vigente
Primer tramo de Descripción: fondo #EDEDED completo de borde a borde, independientemente del gutter de 28/22 px; Antes/Después y Nosotros vs alternativas comparten este fondo. Divisorias de profundidad discreta: borde #C8C8C8 y transición de 3 px #C8C8C8/#D9D9D9/#EDEDED; no sombras decorativas de tarjetas. Problema/solución en fondo #FFFFFF de borde a borde mediante envoltorio que compensa el gutter; borde superior #C8C8C8 y sombra interior sutil 2px/3px al 6%. Radio 4 px, títulos negros #000000. La superficie blanca está definida en el HTML del producto, no mediante un cambio global del fondo de todas las landings. Mantener las tarjetas y fotos de ancho móvil landing menos 16 px.

### C. Antes/Después y comparación
Antes/Después: `sds-description-scenarios[data-sds-scenarios]` contiene select `sds-ba__selector`, opciones índice base cero y escenarios `sds-ba__scenario` en idéntico orden. Cada escenario contiene `sds-before-after`, las capas, etiquetas, línea, handle y range nativo 0–100 inicial 50. Selector con etiqueta explícita y contenedor azul suave #EEF4FF. Piloto: Balcón urbano, Patio y jardín, Interior del hogar. Usar parejas visualmente coherentes, sin deformar producto ni escena; no asegurar coincidencia perfecta sin revisión.
Comparación: `sds-comparison__cards`, tarjeta propia `sds-comparison__card--ours` fondo #2479FF y leyenda blanca; alternativa #EDEDED; tabla semántica `sds-comparison__table`, 40/30/30, filas editables. Piloto 50 m vs ejemplo 10 m, 1 vs 5 unidades, carrete vs tramos separados, instalación. No generalizar a todos los competidores; mantener nota de ejemplo ilustrativo.

### D. Problema vs solución — contrato reutilizable definitivo
- Título de sección + pregunta corta por situación; dos tarjetas simultáneas, problema #F6E8E8, solución #E8F3EB, etiquetas/iconos explícitos; fotos independientes 3:4; casilleros de texto blancos con radio 4 px, texto negro semibold, separados de los activos.
- El componente `sds-problem-solution.sds-ps__wide` contiene exactamente un track `[data-sds-ps-track]` y un slide `[data-sds-ps-slide]` por situación. Cada slide contiene `sds-ps__title`, `sds-ps__pair` y dos tarjetas. No crear una sección vertical por situación.
- Navegación inferior `[data-sds-ps-nav].sds-ps__nav.sds-ps__tabs` inicia hidden. Tres botones nativos type=button, clase `sds-ps__dot sds-ps__tab`, `data-sds-ps-index` 0,1,2 en orden DOM de slides; solo el primero inicia aria-current=true. Cada botón incluye span indicador de ancho 100%, altura 3px, radio 0. Grid repeat(3,minmax(0,1fr)) sin gap: cada tab ocupa 1/3. Etiquetas del piloto: Alcance, Instalación, Guardado. Si una situación falta, no habilitar su control ni incluirlo en el conjunto indexado. Para otro número de situaciones, adaptar la cantidad de columnas y comprobar legibilidad; el piloto certificado visualmente utiliza tres.
- El controlador existente calcula slide más próximo al borde izquierdo durante scroll, actualiza aria-current, color azul #2479FF y línea inferior; pulsar botón desplaza track al slide correspondiente. Scroll-snap horizontal, gesto manual, sin autoplay, flechas ni puntos adicionales. Respeta reducción de movimiento y cancela listeners/observer al desconectar. Región aria-live polite con situación actual. Sin JS se mantiene fallback vertical y navegación oculta. Con una sola situación no se inicializa carrusel. No usar role=tab sin implementar su contrato completo de teclado; navegación actual usa group y botones.
- El track tiene altura de la situación más alta por su grid; no garantizar ausencia absoluta de desplazamientos por carga, tipografía o textos nuevos. Validar altura, foco, swipe, teclado y estado activo en cada nuevo producto.
- Piloto: Alcance — ¿No son suficientemente largas? / Instalación — ¿Demasiados cables y conexiones? / Guardado — ¿Se enredan cuando las guardás? Los dos primeros y la estructura completa fueron aprobados por el operador; la última aprobación cubre la sección completa. No equivale a una matriz de pruebas automatizadas cross-browser.

### E. Producción y trazabilidad de activos
Protocolo: aprobar concepto y cada imagen, comprobar fidelidad del producto y perspectiva/expresión/contexto realistas, sin textos ni gráficos horneados; convertir a WebP (piloto 1086×1448 px, 3:4, calidad de exportación reportada 94/100); guardar en Drive del producto > Landing > Secciones > carpeta del componente, verificar listado; cargar en Shopify Files y confirmar READY/dimensiones; montar HTML conservando bloques previos; leer de vuelta y probar landing pública. Escenas generadas son ilustrativas, no testimonios ni prueba técnica. No prometer ausencia total de enredos ni beneficios eléctricos no verificados; para almacenaje real, desconectar las luces antes de enrollar.
- Antes y después: 01–06, carpeta 1AZEht-r9DxnIu8letOf8IGfbRz1PfT4c.
- Nosotros vs alternativas: 07–08, carpeta 1S1bo4O8aPro0mIFim7wri6nquh53JNWq.
- Problema/solucion: 09_ALCANCE_PROBLEMA.webp, 10_ALCANCE_SOLUCION.webp, 11_INSTALACION_PROBLEMA.webp, 12_INSTALACION_SOLUCION.webp, 13_GUARDADO_PROBLEMA.webp, 14_GUARDADO_SOLUCION.webp; carpeta 1QuA_XQZqBjFOtSCnAfWmDqDX6s593kOX. IDs Shopify de las seis imágenes: 47616582910151, 47616584515783, 47617257111751, 47617259405511, 47617623064775, 47617625817287.
- Tema: 65cd38e7b821e59b7014901a29d5a91350ffdd4d (jerarquía y selector), 5f5c7e6c723cd6ab679229124e5248e6c34106c4 (fondo/divisorias), 9b1867536f23f2df55623cf43fb09aed4ea69d3b (tabs inferiores); publicaciones confirmadas por Shopify. HTML se guarda en producto, no en esos commits del tema.
- Lectura final: 14 imágenes de descripción, 3 controles range, 3 situaciones problema/solución y 3 índices 0/1/2. El operador aprobó visualmente los tres componentes. Las automatizaciones anteriores tuvieron limitaciones de CSS y controles táctiles; no declarar certificación integral. Pendiente: comprobar otros productos, teclado, múltiples instancias y rendimiento. Imagen con puntos interactivos conserva diseño/motor previo aprobado en editor, pero aún no tiene contenido comercial HTML del piloto; adaptar y certificar en la próxima frontera.

### F. Plantilla HTML de referencia — tres componentes
Transcripción del HTML efectivo leído del producto piloto, con URLs sustituidas por marcadores e IDs específicos del producto neutralizados. **No pegar sin reemplazar todos los marcadores** REEMPLAZAR_URL_WEBP_01–14 por URLs reales de Shopify y PRODUCTO por identificador único; adaptar textos, alt, dimensiones y atributos a los productos nuevos. Mantener orden de parejas y tabs. Pegar en Productos > producto correspondiente > Descripción > mostrar HTML, al construir la descripción completa; si ya hay otros bloques, conservarlos y añadir solamente el bloque correspondiente. No pegar en archivos CSS/JS. Guardar y releer. Los estilos y controlador global deben existir en el tema destino.

```html
<sds-description-scenarios class="sds-description__block sds-ba-hero" data-sds-scenarios="" style="display:block;padding:0">
<h3>Un mismo espacio. Dos experiencias diferentes.</h3>
<p>Deslizá el separador para ver el antes y el después.</p>
<div class="sds-ba__chooser">
<label class="sds-ba__chooser-label" for="sds-PRODUCTO-ambiente">Elegí el ambiente para comparar</label><select id="sds-PRODUCTO-ambiente" class="sds-ba__selector" aria-label="Elegir ambiente para comparar"><option value="0">Balcón urbano</option>
<option value="1">Patio y jardín</option>
<option value="2">Interior del hogar</option></select>
</div>
<div class="sds-ba__scenario">
<h4>Balcón urbano</h4>
<sds-before-after><div class="sds-ba__stage" style="--sds-ba-position:50%">
<div class="sds-ba__layer sds-ba__layer--before"><img src="REEMPLAZAR_URL_WEBP_01" width="1086" height="1448" loading="lazy" alt="Balcón urbano sin iluminación decorativa"></div>
<div class="sds-ba__layer sds-ba__layer--after"><img src="REEMPLAZAR_URL_WEBP_02" width="1086" height="1448" loading="lazy" alt="Balcón urbano con iluminación decorativa cálida"></div>
<span class="sds-ba__label sds-ba__label--before">ANTES</span><span class="sds-ba__label sds-ba__label--after">DESPUÉS</span><span class="sds-ba__line" aria-hidden="true"></span><span class="sds-ba__handle" aria-hidden="true">↔</span><input class="sds-ba__range" type="range" min="0" max="100" step="1" value="50" aria-label="Deslizá para comparar antes y después">
</div>
<span class="sds-ba__hint">Deslizá para comparar</span></sds-before-after>
</div>
<div class="sds-ba__scenario">
<h4>Patio y jardín</h4>
<sds-before-after><div class="sds-ba__stage" style="--sds-ba-position:50%">
<div class="sds-ba__layer sds-ba__layer--before"><img src="REEMPLAZAR_URL_WEBP_03" width="1086" height="1448" loading="lazy" alt="Patio y jardín sin iluminación decorativa"></div>
<div class="sds-ba__layer sds-ba__layer--after"><img src="REEMPLAZAR_URL_WEBP_04" width="1086" height="1448" loading="lazy" alt="Patio y jardín con iluminación decorativa cálida"></div>
<span class="sds-ba__label sds-ba__label--before">ANTES</span><span class="sds-ba__label sds-ba__label--after">DESPUÉS</span><span class="sds-ba__line" aria-hidden="true"></span><span class="sds-ba__handle" aria-hidden="true">↔</span><input class="sds-ba__range" type="range" min="0" max="100" step="1" value="50" aria-label="Deslizá para comparar antes y después">
</div>
<span class="sds-ba__hint">Deslizá para comparar</span></sds-before-after>
</div>
<div class="sds-ba__scenario">
<h4>Interior del hogar</h4>
<sds-before-after><div class="sds-ba__stage" style="--sds-ba-position:50%">
<div class="sds-ba__layer sds-ba__layer--before"><img src="REEMPLAZAR_URL_WEBP_05" width="1086" height="1448" loading="lazy" alt="Interior del hogar sin iluminación decorativa"></div>
<div class="sds-ba__layer sds-ba__layer--after"><img src="REEMPLAZAR_URL_WEBP_06" width="1086" height="1448" loading="lazy" alt="Interior del hogar con iluminación decorativa cálida"></div>
<span class="sds-ba__label sds-ba__label--before">ANTES</span><span class="sds-ba__label sds-ba__label--after">DESPUÉS</span><span class="sds-ba__line" aria-hidden="true"></span><span class="sds-ba__handle" aria-hidden="true">↔</span><input class="sds-ba__range" type="range" min="0" max="100" step="1" value="50" aria-label="Deslizá para comparar antes y después">
</div>
<span class="sds-ba__hint">Deslizá para comparar</span></sds-before-after>
</div>
<p class="sds-ba__illustrative">Escenas ilustrativas de decoración.</p>
</sds-description-scenarios>
<div class="sds-description__block sds-comparison" style="padding:16px 0 0;margin-top:16px;color:#000">
<h3 style="color:#000">Más decoración. Menos complicaciones.</h3>
<p style="color:#000">Compará un rollo de 50 metros con una alternativa de tramos cortos.</p>
<div class="sds-comparison__wide">
<div class="sds-comparison__cards">
<div class="sds-comparison__card sds-comparison__card--ours" style="background:#2479FF;border-color:#2479FF;padding:4px">
<div class="sds-comparison__label" style="background:#1764CF;color:#fff;border-radius:4px 4px 0 0">Nuestro rollo LED</div>
<div class="sds-comparison__photo"><img src="REEMPLAZAR_URL_WEBP_07" width="1086" height="1448" loading="lazy" alt="Rollo LED multicolor de 50 metros con carrete transparente"></div>
<div class="sds-comparison__caption" style="color:#fff;font-size:19px">50 metros</div>
</div>
<div class="sds-comparison__card" style="background:#EDEDED;padding:4px">
<div class="sds-comparison__label" style="background:#EDEDED;color:#000">Tiras cortas</div>
<div class="sds-comparison__photo"><img src="REEMPLAZAR_URL_WEBP_08" width="1086" height="1448" loading="lazy" alt="Ejemplo ilustrativo de varios tramos de luces y conexiones separadas"></div>
<div class="sds-comparison__caption" style="color:#000;font-size:19px">Varios tramos</div>
</div>
</div>
<table class="sds-comparison__table" aria-label="Comparación por longitud y presentación">
<caption class="sds-pdp-sr">Comparación de presentaciones</caption>
<colgroup>
<col style="width:40%">
<col style="width:30%">
<col style="width:30%">
</colgroup>
<thead><tr>
<th scope="col">Característica</th>
<th scope="col">Nosotros</th>
<th scope="col">Alternativa</th>
</tr></thead>
<tbody>
<tr>
<th scope="row">Longitud por unidad</th>
<td>50 m</td>
<td>10 m*</td>
</tr>
<tr>
<th scope="row">Unidades para sumar 50 m</th>
<td>1</td>
<td>5</td>
</tr>
<tr>
<th scope="row">Presentación</th>
<td>Carrete organizador</td>
<td>Tramos separados</td>
</tr>
<tr>
<th scope="row">Instalación</th>
<td>Un rollo</td>
<td>Varios tramos</td>
</tr>
</tbody>
</table>
</div>
<p class="sds-comparison__note">*Ejemplo ilustrativo de tiras de 10 m. La cantidad de conexiones depende del modelo. Imágenes ilustrativas.</p>
</div>
<div id="sds-PRODUCTO-problem-solution" style="background:#FFFFFF;margin:16px calc(-1 * var(--sds-content-gutter,28px)) -19px;padding:19px var(--sds-content-gutter,28px);border-top:1px solid #C8C8C8;box-shadow:inset 0 2px 3px rgba(0,0,0,.06);color:#000000">
<div class="sds-description__block sds-ps" style="padding:0">
<h3 style="color:#000000">Decorá más. Complicáte menos.</h3>
<sds-problem-solution class="sds-ps__wide" role="region" aria-label="Problema y solución">
<div class="sds-ps__track" data-sds-ps-track="">
<div class="sds-ps__slide" data-sds-ps-slide="">
<h4 class="sds-ps__title" style="color:#000000">¿No son suficientemente largas?</h4>
<div class="sds-ps__pair">
<div class="sds-ps__card" style="background:#F6E8E8">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6m0-6-6 6"></path></svg><span>EL PROBLEMA</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_09" width="1086" height="1448" loading="lazy" alt="Persona frustrada ante una baranda que quedó sin decorar"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">Las luces se terminan antes que tu decoración.</p>
</div>
<div class="sds-ps__card sds-ps__card--solution" style="background:#E8F3EB">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path></svg><span>LA SOLUCIÓN</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_10" width="1086" height="1448" loading="lazy" alt="Persona satisfecha decorando con el rollo multicolor de 50 metros"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">50 metros para decorar recorridos más extensos.</p>
</div>
</div>
</div>
<div class="sds-ps__slide" data-sds-ps-slide="">
<h4 class="sds-ps__title" style="color:#000000">¿Demasiados cables y conexiones?</h4>
<div class="sds-ps__pair">
<div class="sds-ps__card" style="background:#F6E8E8">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6m0-6-6 6"></path></svg><span>EL PROBLEMA</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_11" width="1086" height="1448" loading="lazy" alt="Escena ilustrativa de una persona intentando organizar varias tiras de luces"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">Demasiados cables y conexiones para organizar.</p>
</div>
<div class="sds-ps__card sds-ps__card--solution" style="background:#E8F3EB">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path></svg><span>LA SOLUCIÓN</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_12" width="1086" height="1448" loading="lazy" alt="Escena ilustrativa de una persona preparando un rollo multicolor de luces"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">Un solo rollo para simplificar tu decoración.</p>
</div>
</div>
</div>
<div class="sds-ps__slide" data-sds-ps-slide="">
<h4 class="sds-ps__title" style="color:#000000">¿Se enredan cuando las guardás?</h4>
<div class="sds-ps__pair">
<div class="sds-ps__card" style="background:#F6E8E8">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m9 9 6 6m0-6-6 6"></path></svg><span>EL PROBLEMA</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_13" width="1086" height="1448" loading="lazy" alt="Escena ilustrativa de una persona frustrada por las luces enredadas al guardarlas"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">Cables sueltos y difíciles de organizar.</p>
</div>
<div class="sds-ps__card sds-ps__card--solution" style="background:#E8F3EB">
<div class="sds-ps__label">
<svg viewbox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path></svg><span>LA SOLUCIÓN</span>
</div>
<div class="sds-ps__photo"><img src="REEMPLAZAR_URL_WEBP_14" width="1086" height="1448" loading="lazy" alt="Escena ilustrativa de una persona organizando las luces multicolor en su carrete transparente"></div>
<p style="background:#FFFFFF;border-radius:4px;margin:8px;padding:10px 8px;color:#000000;font-weight:600;flex:1">Un carrete para volver a enrollar tus luces.</p>
</div>
</div>
</div>
</div>
<div class="sds-ps__nav sds-ps__tabs" data-sds-ps-nav="" hidden style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;width:100%;margin-top:8px;background:#FFFFFF" role="group" aria-label="Elegir situación">
<button type="button" class="sds-ps__dot sds-ps__tab" data-sds-ps-index="0" aria-current="true" style="min-width:0;min-height:48px;display:flex;flex-direction:column;align-items:stretch;justify-content:space-between;gap:0;padding:12px 0 0;font-size:13px;font-weight:650;text-align:center;border:0;border-radius:0;background:transparent">Alcance<span aria-hidden="true" style="width:100%;height:3px;border-radius:0;margin-top:10px"></span></button>
<button type="button" class="sds-ps__dot sds-ps__tab" data-sds-ps-index="1" style="min-width:0;min-height:48px;display:flex;flex-direction:column;align-items:stretch;justify-content:space-between;gap:0;padding:12px 0 0;font-size:13px;font-weight:650;text-align:center;border:0;border-radius:0;background:transparent">Instalación<span aria-hidden="true" style="width:100%;height:3px;border-radius:0;margin-top:10px"></span></button>
<button type="button" class="sds-ps__dot sds-ps__tab" data-sds-ps-index="2" style="min-width:0;min-height:48px;display:flex;flex-direction:column;align-items:stretch;justify-content:space-between;gap:0;padding:12px 0 0;font-size:13px;font-weight:650;text-align:center;border:0;border-radius:0;background:transparent">Guardado<span aria-hidden="true" style="width:100%;height:3px;border-radius:0;margin-top:10px"></span></button>
</div>
<span class="sds-pdp-sr" data-sds-ps-status="" aria-live="polite" aria-atomic="true"></span>
</sds-problem-solution>
<p style="font-size:11px;color:#595959;margin:12px 0 0">Escenas ilustrativas de decoración.</p>
</div>
</div>
```

Fin de checkpoint. No implica autorización de merge, modificación de Protocol Data ni publicación futura de temas.

---

## CIERRE VIGENTE — SDS-L01.6 / DESCRIPCIÓN COMERCIAL R1
27/11/2026. **4/4 componentes integrados en MAIN y aprobados visualmente por el operador.** Este cierre sustituye la condición pendiente del explorador indicada en la actualización anterior. No implica certificación exhaustiva ni cierre de los restantes sticky tabs o de la integración Protocol Data.

### Explorador interactivo HTML directo
- Fondo #EDEDED de borde a borde, después del tramo blanco Problema/solución; compensación de gutter y divisoria superior con profundidad sutil. Título negro, instrucción breve, imagen WebP 3:4 sin recorte. Reutiliza el archivo 07_NOSOTROS_ROLLO_50M.webp (MediaImage 47615758303431; 1086×1448), sin nueva carga ni duplicación de galería.
- Contenedor .sds-description__block.sds-hotspots; elemento sds-image-hotspots.sds-hotspots__wide con stage, imagen, botones y paneles. Los botones type=button llevan data-sds-hotspot con índice base cero, data-sds-tone (blue/green/amber), coordenadas porcentuales mediante --sds-hotspot-x/y, aria-label con número y título, aria-pressed inicial false y span con número. Paneles en idéntico orden, data-sds-hotspot-panel y mismo tone. Región de anuncio data-sds-hotspot-status. El motor actual empareja por orden DOM, no por búsqueda de índice; mantener cantidades y orden iguales.
- Motor global existente (assets/sds-description.css/js): selección inicial del primero; una tarjeta visible con JS, todas visibles sin JS, 44px área táctil, centro limitado a 22px de borde, halo de invitación finito y pulsos sincronizados al seleccionar, respeto a movimiento reducido. No duplicar JS por producto. Se recomienda hasta 12 puntos (límite del contrato modular anterior, no límite impuesto por el controlador HTML directo); ajustar densidad y coordenadas a cada imagen. No asignar propiedades a piezas que no están visibles como si fueran componentes identificados.
- Piloto: seis puntos, numerados 1–6: carrete organizador verde (27%,44%); 240 luces LED azul (72%,30%); 50 metros verde (76%,66%); uso interior/exterior azul (29%,25%); cable flexible/reforzado verde (26%,63%); datos de funcionamiento ámbar (45%,51%). Los puntos generales de uso, longitud y alimentación no identifican una pieza eléctrica concreta.
- Fuente técnica: fotos del embalaje ELECLU AH80207 aportadas por operador: 240 LED, 50 m, 220–240 Vca, 50/60 Hz, 10 W, lámparas no reemplazables, cable reforzado flexible, interior/exterior conforme a instrucciones. No declarar IP, impermeabilidad, diámetro de cable ilegible ni funciones de controlador no verificadas. Reservar especificaciones completas para Ficha técnica.
- Evidencia: readback de Shopify confirma 15 referencias img (14 archivos únicos en descripción, uno reutilizado), tres ranges, tres situaciones, tres tabs, seis marcadores y seis paneles. Navegador público, run 47afa175-b54d-409b-8307-eb6c366fab3d: seis botones presentes sobre imagen, 6/6 pulsados, correspondencia exacta de títulos/textos y una tarjeta visible por vez; sin fallas observadas. Colores y animaciones no medidos por esa automatización; operador aprobó visualmente el resultado completo. No declarar validación exhaustiva cross-browser, accesibilidad o rendimiento. No se modificaron archivos del tema para montar este bloque.
- Reutilización: añadir el siguiente bloque después de Problema/solución en descripción HTML (o posición comercial aprobada). Sustituir PRODUCTO, REEMPLAZAR_URL_WEBP_15 por URL real de Shopify, dimensiones/alt, textos, colores, índices y coordenadas. Si se usa el mismo activo de comparación, puede referenciarse la misma URL. Verificar todos los puntos en landing pública. Mantener la plantilla anterior y este apéndice como conjunto de cuatro componentes.

```html
<div id="sds-PRODUCTO-hotspots" style="background:#EDEDED;margin:19px calc(-1 * var(--sds-content-gutter,28px)) -19px;padding:19px var(--sds-content-gutter,28px);border-top:1px solid #C8C8C8;box-shadow:inset 0 2px 3px rgba(0,0,0,.06);color:#000000">
<div class="sds-description__block sds-hotspots" style="padding:0">
<h3 style="color:#000000">Conocé cada detalle.</h3>
<p style="color:#000000">Tocá los puntos para descubrir las características de tu rollo LED.</p>
<sds-image-hotspots class="sds-hotspots__wide" role="region" aria-label="Detalles interactivos del producto">
<div class="sds-hotspots__stage">
<img src="REEMPLAZAR_URL_WEBP_15" width="1086" height="1448" loading="lazy" alt="Rollo LED multicolor con carrete plástico transparente y cableado oscuro">
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="0" data-sds-tone="green" style="--sds-hotspot-x:27%;--sds-hotspot-y:44%" aria-label="1. Carrete organizador" aria-pressed="false"><span aria-hidden="true">1</span></button>
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="1" data-sds-tone="blue" style="--sds-hotspot-x:72%;--sds-hotspot-y:30%" aria-label="2. 240 luces LED" aria-pressed="false"><span aria-hidden="true">2</span></button>
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="2" data-sds-tone="green" style="--sds-hotspot-x:76%;--sds-hotspot-y:66%" aria-label="3. 50 metros de longitud" aria-pressed="false"><span aria-hidden="true">3</span></button>
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="3" data-sds-tone="blue" style="--sds-hotspot-x:29%;--sds-hotspot-y:25%" aria-label="4. Uso interior y exterior" aria-pressed="false"><span aria-hidden="true">4</span></button>
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="4" data-sds-tone="green" style="--sds-hotspot-x:26%;--sds-hotspot-y:63%" aria-label="5. Cable flexible y reforzado" aria-pressed="false"><span aria-hidden="true">5</span></button>
<button type="button" class="sds-hotspots__marker" data-sds-hotspot="5" data-sds-tone="amber" style="--sds-hotspot-x:45%;--sds-hotspot-y:51%" aria-label="6. Datos de funcionamiento" aria-pressed="false"><span aria-hidden="true">6</span></button>
</div>
<div class="sds-hotspots__panels">
<div class="sds-hotspots__panel" data-sds-hotspot-panel="0" data-sds-tone="green">
<h4>
<span>1.</span> Carrete organizador</h4>
<p style="color:#000000">Facilita el manejo del rollo y ayuda a guardarlo de forma más ordenada.</p>
</div>
<div class="sds-hotspots__panel" data-sds-hotspot-panel="1" data-sds-tone="blue">
<h4>
<span>2.</span> 240 luces LED</h4>
<p style="color:#000000">El producto cuenta con 240 LED distribuidos a lo largo del rollo.</p>
</div>
<div class="sds-hotspots__panel" data-sds-hotspot-panel="2" data-sds-tone="green">
<h4>
<span>3.</span> 50 metros de longitud</h4>
<p style="color:#000000">Ideal para decorar recorridos más extensos con un solo rollo.</p>
</div>
<div class="sds-hotspots__panel" data-sds-hotspot-panel="3" data-sds-tone="blue">
<h4>
<span>4.</span> Uso interior y exterior</h4>
<p style="color:#000000">Pensado para decorar distintos espacios del hogar. Respetá las condiciones de instalación del manual.</p>
</div>
<div class="sds-hotspots__panel" data-sds-hotspot-panel="4" data-sds-tone="green">
<h4>
<span>5.</span> Cable flexible y reforzado</h4>
<p style="color:#000000">Su cableado flexible y resistente está pensado para uso decorativo.</p>
</div>
<div class="sds-hotspots__panel" data-sds-hotspot-panel="5" data-sds-tone="amber">
<h4>
<span>6.</span> Datos de funcionamiento</h4>
<p style="color:#000000">Alimentación: 220–240 Vca, 50/60 Hz, 10 W. Las lámparas no son reemplazables.</p>
</div>
</div>
<span class="sds-pdp-sr" data-sds-hotspot-status="" aria-live="polite" aria-atomic="true"></span>
</sds-image-hotspots>
</div>
</div>
```

**Frontera cerrada: Descripción comercial interactiva del piloto.** Los demás contenidos de landing, otros productos y certificaciones integrales siguen sujetos a su hoja de ruta y autorizaciones. No merge ni cambios productivos en este checkpoint documental.

---

## SDS-L01.7 — REFINAMIENTO GLOBAL DE LANDING
28/11/2026. **CONSTRUIDO / GUARDADO EN R1 / PRUEBAS SIMULADAS PASS / PUBLICACIÓN PENDIENTE.**
Autorización del operador: construcción de los seis cambios pactados y preparación de publicación/documentación; no autoriza publicar por sí sola. Tema Santa Del Sur | Migración R1, ID 191487017159. Commit Shopify: 17e227af26a3421b9f7318fcfe908b8374a6b740. Los cuatro archivos esperan theme_publish; sin pushErrors ni pending edits. No se modificaron productos, metacampos, precios, inventario, SKU, ofertas, endpoints ni Protocol Data.

### Contrato de presentación
1. Al pulsar un marcador del explorador, mostrar su tarjeta y calcular el área visible entre navegación superior y dock inferior real (incluida la fila de consultas). Desplazar solo la distancia necesaria para mostrar la tarjeta con margen superior 10px/inferior 12px. Si ya es visible, no desplazar. Si la tarjeta supera el área disponible, alinear su inicio. Scroll de documento móvil; .page-wrapper desde 990px. Movimiento suave salvo preferencia reducida; luego iniciar pulsos sincronizados existentes, sin forzar foco. Hasta dos intentos de posicionamiento, con espera acotada; cancelar seguimiento de una selección anterior al seleccionar otra, al intervenir por wheel/touchstart/pointerdown o al desconectar. No garantizar visibilidad total si la geometría física no lo permite.
2. Retirar del render global Sobre este producto, Vendido por, Entrega y Qué incluye (inclusive), sin ocultarlos mediante CSS. El snippet legacy sds-product-lower.liquid se conserva sin render en esta plantilla; el metacampo de resumen y los datos de componentes se preservan. Se mantiene el detalle de oferta y su contenido; se elimina la actualización JS de la lista inferior retirada. Mantener Condiciones de envío y sus puertos existentes.
3. Eliminar duplicidad de bordes en la unión del cuerpo de compra con sticky tabs y primer contenido comercial. No alterar las divisorias internas aprobadas de los cuatro creativos.
4. Filas comerciales (envío, devoluciones, seguridad, recordatorio) y línea inferior del domicilio: contenedor commercial-info-stack se extiende a todo el ancho de la landing con compensación de gutter de 28px (22px hasta 360px); las filas mantienen padding interno, divisorias de 1px borde a borde. Si hay tabs inmediatamente después, su borde superior reemplaza el borde inferior del stack.
5. Acceso contextual a consulta: botón nativo data-sds-sticky-support con data-sds-open-screen="support" y aria-controls del slide ya existente. Etiqueta por defecto «¿Tenés preguntas sobre el producto?», editable mediante section.settings.sticky_support_label. Icono chat a izquierda, chevron a derecha, fila blanca de ancho completo y mínimo 44px, divisoria inferior. Está antes de sds-purchase-main, dentro del mismo aside fijo; sin overlay separado ni espacio entre superficies. Conserva el router, foco, historial y contexto de oferta del slide original. No implica habilitación o certificación del transporte de mensajes en backend.
6. Compactación: sds-purchase-main con gap 6px, padding vertical 8px más safe-area inferior, summary gap 3px. CTA con min-height 44px real y pseudo-elemento azul #2479FF inset vertical 5px (altura visual objetivo 34px en etiqueta de una línea; puede crecer con texto/zoom). Radio 4px, conserva type=submit, form, data-sds-buy-button y estado disabled; fondo disabled del pseudo-elemento. No reducir área táctil por debajo de 44px. La fila de chat añade altura al dock después de 50%, por lo que el ahorro total depende de pantalla y contenido; no afirmar reducción de 35% del dock completo.

### Comportamiento del dock y límites
Un solo controlador de progreso en assets/sds-product.js. En 0–29% ambos ocultos; 30–49% compra visible/consulta oculta; desde 50% ambos visibles. Al subir se revierten los estados. En documento sin recorrido se muestran ambos para no perder acceso. Se actualizan hidden/inert de chat y aria-hidden/inert del dock; medición de scroll en window o .page-wrapper según breakpoint existente. Observación de tamaño/contenido y regreso de slides. Reserva inferior medida con altura del cuerpo de compra, estimación/memoria del alto de chat, offset inferior y 12px de seguridad, sin depender de una altura de barra fija. Retorno de slide al mismo contenedor de scroll. No hay segundo controlador de umbrales ni estado duplicado. La lógica de compra, logística y selección de variante no cambia; el acceso es presentación, no un nuevo canal.

### Archivos efectivos
- sections/sds-native-product.liquid: retiro de bloques, inserción fila de consulta y envoltorio de compra, setting editable.
- assets/sds-product-r1.css: extensión de divisorias, compactación, reserva inferior, estilo de fila.
- assets/sds-product.js: umbrales y medición, restauración de scroll de slides, retiro de actualización lista obsoleta.
- assets/sds-description.js: revelado de tarjeta antes de pulsos y cancelación.
Sin edición del HTML de los productos ni archivos CSS del explorador. Reutilización global para todas las fichas que usan sds-native-product.

### Evidencia y puerta de publicación
- Comprobación sintáctica de ambos JavaScript mediante compilación en función, PASS.
- Controlador de scroll ejecutado con DOM simulado: 16/16, 8 posiciones por móvil/escritorio, incluyendo 299/300 y 499/500 sobre recorrido 1000, descenso y retorno.
- Revelado de tarjeta con DOM simulado: 6/6, visible sin scroll, oclusión por dock, contenedor escritorio, movimiento reducido sin pulsos, oclusión superior, tarjeta mayor al viewport. Estas pruebas no son pruebas de navegador real. Primera expectativa de desplazamiento en tres casos fue corregida de 142 a 202px para contabilizar geometría del dock de 140px y margen 12px; código no se alteró para satisfacerla.
- Solicitudes theme_screenshot móvil 390 y desktop 1440 devolvieron metadatos sin imagen inspeccionable ni previewUrl. Theme Check/CLI no disponibles en el entorno. No certificar tamaño visual, ausencia de overflow, animaciones reales, envío de mensajes o compra integral con esta evidencia.
- Publicar exclusivamente los cuatro archivos del commit tras autorización explícita. Después verificar en producción: eliminación de cuatro bloques; anchura y no duplicidad de divisorias; dock antes/entre/después de umbrales en ambos sentidos; apertura y regreso del slide de consulta con oferta elegida; CTA y estados de disponibilidad sin ejecutar compra real; visibilidad de tarjeta sobre dock combinado, animaciones, foco, reducción de movimiento y última sección. Verificar otra landing de la misma plantilla. Registrar resultado y aprobación del operador antes de declarar cierre definitivo de SDS-L01.7.

### SDS-L01.7 — Publicación y comprobación inicial en producción (28/11/2026)
**LIVE / SMOKE TEST PARCIAL / VALIDACIÓN VISUAL PENDIENTE.** Autorización explícita del operador recibida. Shopify theme_publish confirmó published=true para R1 (191487017159), pending=[], userErrors=[], rejectedReason=null. No se modificó código ni catálogo en esta frontera.
- Navegador público run 0001aefd-7bb4-4bad-b7f7-4e375880429c: cuatro bloques heredados ausentes; cuatro accesos comerciales presentes (envío, devoluciones, seguridad, recordatorio). Fila de consulta encima del resumen de compra; apertura del slide, contexto del producto y oferta unitaria correctos, cierre mediante flecha. No se envió formulario. Marcadores 1–6 presentes; selección del punto 6 muestra datos de funcionamiento por encima del dock. No se midió la distancia de scroll ni la sincronización real de pulsos. El informe describe un supuesto toggle en re-click que no forma parte del contrato fuente; no se considera verificado ese comportamiento.
- Navegador público run b7842f37-a772-4ef9-86a5-0f24ead1970e: dock inferior no visible al inicio, visible al avanzar; fila de chat y botón de compra compacto observados. No se obtuvieron porcentajes exactos ni altura medida. El informe no separa con certeza la transición de chat al 50% y contiene estimaciones de posición; no usarlas como certificación de umbrales. No se verificó geométricamente el ancho completo de divisorias ni el retorno al inicio. No se ejecutó compra, carrito, envío de consulta o cambios de datos.
- Evidencia previa permanece: 16/16 umbrales y 6/6 revelado en DOM simulado; no reemplaza navegador real. Pendiente: comprobación móvil del intervalo 30–49% sin chat y desde 50% con chat, retorno al subir, anchura/divisorias, altura efectiva del dock, desplazamiento suave y pulsos; regresión en otra ficha y validación de oferta alternativa. La publicación no certifica transporte de mensajes, logística ni checkout.
- Landing: https://b06xsm-bh.myshopify.com/products/luces-navidenas-de-jardin-hogar . El operador debe validar visualmente antes de declarar cierre definitivo de SDS-L01.7.

### Cierre visual SDS-L01.7 — 28/11/2026
**APROBADO POR EL OPERADOR / LIVE / CIERRE COMERCIAL Y VISUAL.** El operador confirmó tras la publicación: «Impecable. Quedó perfecta.». Se acepta el refinamiento global en la landing piloto y se conserva su contrato reutilizable. No implica nuevas mediciones geométricas, certificación exacta de umbrales en navegador, regresión de todas las fichas, envío de consultas, logística ni checkout; esas limitaciones técnicas del registro anterior siguen vigentes. No se realizan cambios adicionales en Shopify, merge de rama ni activación de servicios. Se cierra SDS-L01.7 y la frontera de Descripción comercial interactiva R1; los restantes Sticky Tabs continúan por su propia hoja de ruta.
