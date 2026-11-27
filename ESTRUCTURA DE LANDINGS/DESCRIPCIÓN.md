# SANTA DEL SUR STORE — ESTRUCTURA DE LANDINGS
## DESCRIPCIÓN COMERCIAL INTERACTIVA R1
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
