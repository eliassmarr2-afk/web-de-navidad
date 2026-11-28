# SANTA DEL SUR STORE — ESTRUCTURA DE LANDINGS
## STICKY TABS R1
Estado: DISEÑO APROBADO / IMPLEMENTACIÓN GUARDADA el 27/11/2026.
Frontera SDS-L01.2. Una arquitectura global para todos los productos R1. Shopify R1 es la fuente efectiva; esta especificación no sustituye su código.
Referencia de versión guardada de Shopify: 7f9085c37dea68f469b9b053edbeacac9bc8b60d. Prueba funcional integral pendiente; no autoriza publicación.

### Registro canónico
| Orden | Etiqueta | id | target HTML |
|---|---|---|---|
| 1 | Preguntas | questions | sds-questions |
| 2 | Descripción | description | sds-description |
| 3 | Imágenes | images | sds-images |
| 4 | Depósito | warehouse | sds-warehouse |
| 5 | Reseñas | reviews | sds-reviews |
| 6 | Videos | videos | sds-videos |
| 7 | Ficha técnica | specifications | sds-specifications |

Orden de navegación fijo, distinto del orden físico cuando sea necesario: Reseñas siempre al final del cuerpo. No reemplazar el contenido al pulsar un tab: desplazarse a un anclaje de la landing continua.

### Diseño congelado
- Barra horizontal sticky superior, ubicada después de las filas comerciales, antes del cuerpo informativo.
- Fondo blanco, Manrope 13 px, peso 600, altura útil mínima 44 px, indicador activo inferior 2 px #2479FF; inactivo #555555. Divisorias externas de 1 px #D9D9D9, sin sombras.
- Desplazamiento horizontal natural, sin desbordamiento de página, gap 16 px, padding lateral de barra 12 px. Mantener visible la pestaña activa al navegar.
- Cuerpo comercial sin padding estructural; cada sección conserva padding interior de 28 px (22 px en pantallas <=360 px). Divisoria superior de ancho completo, sin duplicaciones. Anclaje en su borde superior.
- Preservar oferta, variante, galería principal, pantallas existentes y barra inferior de compra.

### Contrato JSON v1
Metacampo tienda: `custom.sds_global_tabs`, tipo json; producto: `custom.sds_product_tabs`, tipo json. Ambas definiciones creadas; configuración global sembrada con siete registros habilitados; excepciones por producto opcionales.
Objeto con `schema_version: 1` y array `tabs`. Cada registro global: id, label, target (sin #), enabled booleano, order. La excepción por producto se identifica por id y enabled. Identidades, etiquetas, referencias y orden canónicos no se alteran por configuración. Precedencia: fallback del tema, configuración global, excepción local; registros ausentes o inválidos no sustituyen defaults. No admitir destinos arbitrarios.
La habilitación no implica disponibilidad: filtrar según la existencia de contenido real y del destino renderizado. En request.design_mode se pueden mostrar los siete destinos con mensajes explícitos de contenido pendiente; en vista comercial se omiten enlaces a secciones sin contenido. Actualmente Descripción enlaza el HTML existente; Ficha técnica se habilita con datos reales. Preguntas, Imágenes complementarias, Depósito, Videos y Reseñas requieren activar sus contratos de contenido al construir las fases correspondientes. El estado vacío de reseñas puede mostrarse sin enlace.
No inventar prestaciones, reseñas ni fotografías de compradores.

### Comportamiento y verificación
Controlador compartido, enlaces semánticos, aria-current=location, cálculo de alturas reales, scroll manual y por clic, seguimiento del tab activo, ResizeObserver y carga de imágenes, preferencia de movimiento reducido. Contemplar scroller de escritorio (.page-wrapper) y documento en móvil. Reservar espacio final si es necesario para alinear el último destino. Verificar dispositivos, cambios de altura, ausencia de desbordamientos, teclado, foco, todos los anclajes, estado final, visores/slides y compra. No declarar PASS solo por lectura estática o recibo de guardado.
Los placeholders editor-only no son secciones comerciales terminadas. Pactar individualmente cada sección antes de construirla.

### Archivos efectivos de referencia
- sections/sds-native-product.liquid
- snippets/sds-commercial-tabs.liquid
- snippets/sds-commercial-pending.liquid
- snippets/sds-product-lower.liquid
- snippets/sds-product-specifications.liquid
- snippets/sds-product-reviews.liquid
- assets/sds-commercial-tabs.js
- assets/sds-product-r1.css

No modificar Protocol Data, puertos, precios, inventarios, SKU, variantes, ofertas ni publicar el tema. Los hitos SDS-L01 y SDS-L02 siguen pendientes de aceptación de MANDO.

## SDS-L01.8 — Reordenamiento aprobado (28/11/2026)
**Construido, publicación pendiente.** El nuevo orden canónico y del registro global es Preguntas, Descripción, Ficha técnica, Imágenes, Depósito, Reseñas, Videos. Ficha técnica se coloca inmediatamente después de Descripción; su disponibilidad deriva del HTML capturado del render de especificaciones estructuradas. Imágenes queda postergado, sin eliminar su capacidad futura. No se alteran los IDs, destinos ni el controlador de scroll. Consultar FICHA TÉCNICA.md. Shopify commit fa217c628c26368c86547247e7ed907d07e5ef28.
