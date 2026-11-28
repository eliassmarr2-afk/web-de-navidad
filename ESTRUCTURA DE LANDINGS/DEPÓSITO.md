# DEPÓSITO — SDS-L01.10

28/11/2026 · **RECURSOS APROBADOS Y CARGADOS EN DRIVE / INTERFAZ PENDIENTE DE PACTO.**

Título comercial solicitado: «Imágenes del vendedor». Aviso de alcance solicitado para este grupo: «COMBO 2 | TIRA LED 50 METROS + 8 TUBOS LED COLGANTES» y «Estas imágenes pertenecen a un combo.» Se propone aclarar que los productos incluidos dependen de la opción seleccionada. Mostrar también «Imágenes ilustrativas del proceso de preparación», dado que son recreaciones generadas a partir de referencias del embalaje, no fotografías documentales de un depósito o despachos reales. No presentar las etiquetas sintéticas como guías de seguimiento.

## Recursos aprobados
Carpeta existente [Deposito](https://drive.google.com/drive/folders/13sefaYJFc2Ro8E9_B0wWRQOakiJKQuvC), dentro de Secciones del producto piloto. Cuatro WebP 1254 × 1254, calidad de conversión 94, originales preservados. Carga y readback verificados.

| Archivo | ID Drive | Bytes |
|---|---|---:|
| 01_DEPOSITO_REVISION.webp | 1uP8Xw1teqrf3n4NwcRjSrcnCyvHlTr_h | 382920 |
| 02_DEPOSITO_EMBALADO.webp | 1c1bszMmSopRBY9F0wZD0Q0eB4bfWd0YU | 328974 |
| 03_DEPOSITO_ROTULADO.webp | 1HhEsHAClya6W63ym9egQeVW1CF7EvNHX | 309548 |
| 04_DEPOSITO_LISTO_PARA_SALIR.webp | 19mOvbUacDA-_eMQxMfHOsVMjiqzscGfJ | 339576 |

Secuencia solicitada: revisión, embalado, rotulado y listo para salir. La cuarta ilustración muestra un paquete rotulado y otra caja aún descubierta; no afirmar que ambos bultos están cerrados. Las escenas muestran recreaciones del entorno de trabajo, con variaciones de cámara y utilería, no evidencia de una ubicación real idéntica. Las leyendas deben ser breves y no afirmar hechos operativos no verificados.

## Frontera siguiente
Definir y pactar estructura reutilizable por producto/grupo/oferta, aviso de alcance separado de imagen, leyendas individuales, formato cuadrado. No construir ni publicar Shopify todavía. Sin cambios de catálogo ni Protocol Data.

## Construcción SDS-L01.10
**CONSTRUIDO / DATOS VINCULADOS / TEMA GUARDADO NO PUBLICADO.** Operador aprobó carrusel compacto, fondo #EDEDED, divisorias de profundidad superior e inferior, cuatro imágenes 1:1 con leyendas, encabezado de combo y reutilización global. Tema R1 191487017159, commit 6430808906c92184f1eccd25b185ca36ac14386e. Cinco archivos awaitingPublish, pending y pushErrors vacíos.

### Contrato de catálogo
PRODUCT custom.sds_warehouse (JSON), definición 637301457095, valor piloto 193088798720199; PRODUCT custom.sds_warehouse_media (list.file_reference), definición 637301489863, valor piloto 193088798687431. Esquema v1: title; groups (id, enabled, title, notice, variant_id informativo opcional, illustrative, disclosure, items); items (id, image_index base uno, caption, alt opcional). Render máximo 8 grupos y 12 imágenes válidas por grupo; requiere encabezado y aviso, omite índices inválidos y archivos no imagen. Se recorren las referencias por forloop.index (patrón R1 de Historias). No hardcodear imágenes ni URLs. Si illustrative no es false, se muestra aviso ilustrativo por defecto. El operador debe preservar esa identificación para recreaciones. No validar propiedad comercial ni hechos logísticos a partir del metacampo. Grupos visibles independientemente de variante seleccionada; no hay filtro dinámico ni cambio de compra. El aviso de alcance evita confundir la compra unitaria con la oferta.

Ejemplo del piloto:
```json
{"schema_version":1,"title":"Imágenes del vendedor","groups":[{"id":"combo-2","enabled":true,"variant_id":"68891312423111","title":"COMBO 2 | TIRA LED 50 METROS + 8 TUBOS LED COLGANTES","notice":"Estas imágenes pertenecen a un combo. Los productos incluidos dependen de la oferta que selecciones.","illustrative":true,"disclosure":"Imágenes ilustrativas del proceso de preparación.","items":[{"id":"revision","image_index":1,"caption":"Revisión","alt":"Recreación de las cajas ELECLU del combo sobre una mesa de trabajo"},{"id":"embalado","image_index":2,"caption":"Embalado","alt":"Recreación de la caja del rollo LED colocada dentro de una bolsa negra de envío"},{"id":"rotulado","image_index":3,"caption":"Rotulado","alt":"Recreación de la colocación de una etiqueta sobre el embalaje negro"},{"id":"despacho","image_index":4,"caption":"Listo para salir","alt":"Recreación de un paquete rotulado junto a la caja de tubos LED"}]}]}
```

### Medios Shopify
Orden 1–4: MediaImage/47640038146247, MediaImage/47640039227591, MediaImage/47640039784647, MediaImage/47640040243399. Cuatro WebP originales verificados 1254×1254 y READY. Carga a Files, no galería de producto. MetafieldsSet atómico compareDigest:null para ambos campos nuevos; readback correcto y ordenado. Variante 68891312423111 conserva denominación antigua «Guirnalda Luminica 50M + Luces Mariposa» y resumen antiguo con mariposas; composición sds_components actual indica rollo y 8 tubos colgantes. No se modifica denominación ni resumen sin autorización. Revisar coherencia comercial antes del lanzamiento.

### Diseño / motor
- snippets/sds-product-warehouse.liquid: grupos, figure/figcaption, alt, alcance e identificación ilustrativa. Imágenes responsivas 240–900px, sizes 45vw/210px, lazy. Captura única del cuerpo; sin contenido no se renderiza ni se cargan assets salvo editor.
- assets/sds-warehouse.css: sección #ededed, bordes #c8c8c8 de 1px y mismo efecto inset superior/inferior 0 2px 3px rgba(0,0,0,.06) de Descripción; evita borde adicional de siguiente sección. Rail margen 8px, gap 6px, ancho de tarjeta calc((100% - 12px)/2.2), foto 1:1, tarjeta blanca radio 4px, leyenda centrada. Aviso azul suave #dbe8fc, título #1764cf.
- assets/sds-warehouse.js: custom element por grupo, scroll nativo manual y snap, indicadores por posiciones alcanzables (sin duplicados; normalmente 3 para 4 imágenes con 2,2 visibles), estado aria-current, teclado flechas/Home/End sobre rail, resize, reduced motion, desconexión. Sin autoplay ni visor adicional. Sin JS conserva scroll manual y contenido; indicadores ocultos.
- sections/sds-native-product.liquid + snippets/sds-commercial-tabs.liquid: reemplazo de placeholder Depósito por cuerpo capturado, disponibilidad derivada del mismo. Orden canónico intacto Videos, Descripción, Ficha técnica, Imágenes, Depósito, Reseñas, Preguntas.

### Evidencia y límites
10/10 pruebas DOM simulado sobre JS leído de tema, sintaxis PASS: posiciones alcanzables, inicial, medio, extremo, sincronización, Home, reduced motion, sin overflow y desconexión. Readback catálogo: 4 imágenes galería, 3 historias, 15 referencias img Descripción, 13 filas ficha. Captura both devolvió solo metadatos desktop 1440, previewUrl null; sin imagen inspeccionable ni medición móvil. No afirmar render Liquid real, dimensiones, continuidad de desplazamiento o visualidad certificados hasta publicar y probar. Cinco archivos guardados, no se ejecutó theme_publish, no se alteraron precio, stock, variantes, ofertas ni Protocol Data. Los archivos y metacampos sí están guardados en Admin. Pendiente autorización expresa de publicación y validación visual. 

## Publicación SDS-L01.10 — 28/11/2026
**LIVE / SMOKE TEST PASS / VALIDACIÓN VISUAL DEL OPERADOR PENDIENTE.** Autorización expresa. Shopify theme_publish R1 191487017159 confirmó published=true, pending=[], userErrors=[], rejectedReason=null. Preflight: 4/4 MediaImage READY 1254×1254, configuración v1, galería principal cuatro imágenes. Extracción pública qa=sds-l0110 de #sds-warehouse y nav confirma cuatro figure con src/srcset responsivos, lazy, alt, leyendas exactas y aviso de alcance e ilustrativo. Tabs públicos Videos, Descripción, Ficha técnica, Depósito. Run ec0f0e11-9860-4b11-9ed5-159eb6868cc9 completado: navegador reporta clic Depósito, tres indicadores operativos con pares Revisión/Embalado, Embalado/Rotulado, Rotulado/Listo para salir y retorno inicial; contenido y orden visibles. Sin medición de geometría, efecto visual de divisorias, tiempos/carga de recursos ni gesto táctil real; pendiente comprobación móvil del operador. No compras, formularios ni cambios adicionales. Persiste discrepancia de nombre/resumen antiguo de variante registrada en construcción, fuera de alcance. No merge.

## Aprobación visual y ajuste final SDS-L01.10-R1 — 28/11/2026
**DISEÑO APROBADO POR EL OPERADOR / AJUSTE DE SCROLL SOLICITADO.** El operador confirmó «El diseño queda APROBADO» y pidió eliminar exclusivamente la barra visible de desplazamiento horizontal. Contrato final de Depósito: conservar overflow-x:auto, snap, gesto táctil, teclado e indicadores de posición; ocultar scrollbar nativa mediante scrollbar-width:none y ::-webkit-scrollbar en el rail propio de Depósito. No modificar el espaciado estructural, imágenes, metacampos ni otros carruseles. Esta regla pasa a formar parte de la estructura reutilizable de ESTE tab. Implementación/publicación del ajuste se registrarán por separado; no inferir certificación del gesto táctil ni del CSS nuevo a partir de la aprobación anterior. Siguiente frontera propuesta: Preguntas SDS-L01.11.

### Implementación final R1
**GUARDADO / PENDIENTE DE PUBLICACIÓN.** Commit Shopify c2abf71b82cff3da0b5ca7a9ce78855677aff478. Único archivo assets/sds-warehouse.css: reemplazo scrollbar-width:thin por scrollbar-width:none y regla .sds-pdp .sds-warehouse__rail::-webkit-scrollbar{display:none;width:0;height:0}. Readback de la edición confirma overflow-x:auto y scroll-snap-type:x mandatory intactos. Sin cambio de JS, metacampos, navegación, fotos, indicadores ni otras secciones. Primer intento bloqueado temporalmente por rate limit sin ejecución; reintento exitoso. Guardado sin errores, awaitingPublish solo ese CSS. No publicado ni validado visualmente todavía. Regla normativa del componente: no mostrar scrollbar nativa; preservar desplazamiento y controles accesibles.
