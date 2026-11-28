# VIDEOS — HISTORIAS SDS-L01.9

28/11/2026 · **CONSTRUIDO / GUARDADO / NO PUBLICADO / SIN ARCHIVOS COMERCIALES VINCULADOS.**
Autorización: construir motor global, reordenar Sticky Tabs y documentar, sin publicar. Tema Santa Del Sur | Migración R1, 191487017159. Commit Shopify 0f68276397f6711416cc7ef6ffb58afdc5902575. Cinco archivos awaitingPublish, sin pending ni pushErrors.

## Contrato de catálogo
- PRODUCT custom.sds_stories (JSON), definición 637220192455.
- PRODUCT custom.sds_story_media (list.file_reference), definición 637220225223. Referencias ordenadas de archivos Shopify; índices base 1.
- Ejemplo de configuración (no cargado):
```json
{"schema_version":1,"items":[{"id":"story-01","title":"Demostración del producto","enabled":true,"video_index":1,"preview_index":2,"poster_index":3,"illustrative":false}]}
```
- video_index requerido: video Shopify con fuente MP4. preview_index opcional: video de previsualización del mismo contenido; si falta se selecciona la menor fuente MP4 por ancho del original. Original para visor: mayor fuente MP4 por ancho. poster_index opcional: imagen aprobada, preferentemente WebP; fallback preview_image de Shopify a 360px, formato efectivo no garantizado. Conservar índices al actualizar archivos. IDs estables; títulos no vacíos; enabled explícitamente true; máximo 12 entradas válidas. illustrative=true muestra identificación de ambientación ilustrativa.
- No confiar en el esquema como validación editorial, de derechos ni de fidelidad del producto. Solo vincular archivos previamente aprobados; no inferir equivalencia de producto ni permiso comercial por mera presencia de un archivo.

## Diseño y comportamiento
- Videos inmediatamente antes de Descripción. Fondo blanco, historias 9:16, object-fit cover en previews, radio 4px, gap 6px, margen lateral 8px, objetivo 3,5 visibles cuando hay suficientes historias. Scroll horizontal nativo con snap proximity; anchura de tarjeta calc((100% - 18px)/3.5).
- Preview muted, loop, playsinline, preload none; sin src inicial, asignación diferida al alcanzar visibilidad >=50% del área efectiva (rail, viewport, navegación sticky y dock inferior). Hasta 4 previews elegibles simultáneas. Pausa cuando salen del área visible, documento oculto, producto inert, visor abierto, hover mouse o foco en rail, pausa explícita, movimiento reducido o Save-Data cuando el navegador lo expone. Fuentes ya asignadas se conservan hasta desconexión; no garantizar cero transferencia residual. Protección de generación en promesas de play para descartar fallos obsoletos por pausa.
- Controles de pausa/reanudación y audio inicial silenciado; fallback de poster ante fallo. Sin JS o sin showModal, enlace nativo al MP4 original.
- Visor dialog nativo en top layer, controles de video, audio inicial muted, título, contador, anterior/siguiente y cierre. Video original en contain, sin forzar recorte; reproducción tras selección salvo movimiento reducido. Escape/cierre nativo; restauración de scroll vertical/horizontal y foco. Sin navegación automática entre historias. No implementar gesto de swipe en visor ni integración específica con historial del navegador en esta versión; navegación mediante botones/teclado. El resto de la página queda modalmente inactivo.
- Si no hay entradas válidas, no se renderiza sección pública ni se cargan sus assets; placeholder exclusivamente editor. La disponibilidad de tab deriva del cuerpo capturado.

## Orden canónico
Videos, Descripción, Ficha técnica, Imágenes, Depósito, Reseñas, Preguntas. Registry shop custom.sds_global_tabs actualizado con compareDigest y mismos ids/targets/enabled. Plantilla y registro reconciliados. Preguntas al final también en orden físico; Imágenes sigue postergado. Sin contenido, los tabs permanecen ocultos según motor de disponibilidad. No se altera controlador de navegación ni lógica de compra.

## Archivos
- assets/sds-stories.css
- assets/sds-stories.js
- snippets/sds-product-stories.liquid
- snippets/sds-commercial-tabs.liquid
- sections/sds-native-product.liquid
Título de sección configurable en stories_heading. No se modificaron HTML de descripción (15 referencias img), ficha técnica (13 filas), precios, inventario, SKU, variantes, ofertas ni Protocol Data. No se cargaron videos, no se recortaron marcas de agua ni se modificaron los originales.

## Evidencia y límites
- Prueba sintáctica JavaScript PASS sobre fuente final. DOM/media simulados 20/20 PASS antes de añadir guardia final de generación; incluye elegibilidad, silencio, pausa persistente, visibilidad, ahorro de datos, reduced motion, documento oculto, inert, hover/foco independiente, visor, anterior/siguiente, cierre/foco y liberación de fuentes. Primera corrida 12/17 por defecto del mock (Object.assign evaluaba getters/setters); corregido mock con descriptores y casos extendidos, no contar como fallo real del producto. Guardia final de generación verificada sintácticamente, no repetición completa posterior.
- No certificación Liquid con videos reales, reproducción/codec, consumo de red, proporción medida, teclado real, iOS/Android, zoom o regresión de dock/visor. theme_screenshot móvil 390 devolvió metadatos sin previewUrl ni captura inspeccionable por el asistente; no hay contenido de historias en el piloto.
- Readback de producto: sds_stories y sds_story_media sin valores. Por tanto no se puede observar el carrusel público aún. Registro y definiciones de catálogo sí están guardados; el tema no se publicó. No merge.
- Próxima frontera: aprobar selección de archivos, derechos de reutilización comercial y correspondencia exacta con el rollo de 240 LED. Excluir archivo 1000140019.mp4 por discrepancia de 500 LED detectada en revisión previa. 0018 tiene marca TikTok; no editar ni reutilizar hasta confirmar permiso/fuente. 0017, 0023, 0024 candidatos, no aprobados por inferencia. Comprimir previews, preparar posters WebP, subir medios aprobados y comprobar READY/referencias. Publicar solo con autorización expresa y certificar en navegador móvil el tab contiguo, loop/mute, carga, pausa, navegación horizontal, visor y retorno, dock y tabs existentes. Validar producto sin historias. Registrar aprobación visual antes del cierre.

## SDS-L01.9A — Preparación audiovisual (28/11/2026)
**RECURSOS OPTIMIZADOS LOCALMENTE / SIN CARGA SHOPIFY / NO PUBLICADO.**
Seleccionados 1000140017.mp4, 1000140023.mp4 y 1000140024.mp4. Originales preservados, total 22.145.429 bytes. Prefijo de salida SDS_LED50_STORY_{17,23,24}. PREVIEW MP4 H.264 yuv420p 270x480, 24 fps, 8 segundos sin pista de audio, inicio 3s, 3s, 5s respectivamente; tamaños 435113, 440092, 440785 bytes. POSTER WebP 360x640 de cada inicio, tamaños 47300, 27964, 37946 bytes. Total preview+poster 1.429.200 bytes, reducción potencial 93,55% frente a originales completos, no medición de tráfico real. FULL 576x1024 H.264/AAC con faststart, tamaños 5625236, 6166389, 2442696 bytes; duraciones 26.1, 45.9, 21.8 segundos. FULL 24 remux sin recompresión para conservar calidad/peso. Seis videos decodificados con FFmpeg sin error, tres WebP verificados. ZIP SDS-L01.9A_Historias_LED50.zip (15.603.629 bytes).
- Propuesta de orden: 24 impacto visual, 17 demostración física, 23 explicación. Con tres archivos solo hay tres historias, no cuarta parcial; no duplicar contenido para simular 3,5 tarjetas. Mantener anchura pactada y admitir cuarta cuando haya recurso autorizado.
- No certificada equivalencia exacta de todos los modelos ni contenido hablado/derechos de música e imagen; 24 muestra tonos distintos, 23 contiene presentación de una persona. Confirmar correspondencia y autorización comercial antes de carga a CDN público. No se removieron marcas, no se usaron 18/19. Shopify upload_file admite chatFile, flujo de carga requiere confirmación de resultado y lectura READY antes de vincular. No se hizo llamada de carga, mutación de catálogo ni publicación.
