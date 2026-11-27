# SANTA DEL SUR STORE — ESTRUCTURA DE LANDINGS
## RESEÑAS R3
Estado: DISEÑO APROBADO / CONGELADO por operador el 27/11/2026.
Ámbito: Shopify R1 (cuerpo comercial global). El tema Shopify vigente prevalece sobre el repositorio histórico.
Implementación de referencia: Shopify R1, versión R3 guardada 8b9a9bf734ae184d2c2a9a3a5c4615e6f2da1ab4; integrada a la navegación global en SDS-L01.2. Esto no certifica pruebas funcionales ni autoriza publicación.

### Ubicación y composición
- Última sección del cuerpo comercial, antes del cierre y de los elementos inferiores existentes. Anclaje único estable `sds-reviews`.
- H2 «Opiniones del producto»; Manrope, 18 px, peso 800, interlineado 1,3, margen inferior 16 px.
- Fondo blanco; divisorias de 1 px #D9D9D9 de borde a borde; sin sombras; contenido interior 28 px lateral (22 px hasta 360 px). No duplicar bordes ni provocar desbordamientos.
- Resumen en dos columnas: puntuación izquierda (32 px, peso 800, escala / 5, estrellas y cantidad); distribución derecha de 5 a 1 estrellas. Barras de 6 px, fondo #EDEDED, relleno verde #008744.
- Galería superior: dentro del mismo bloque que la valoración, después de las barras y antes de la primera divisoria de reseñas. Cuatro miniaturas por fila, formato 3:4, separación 6 px, radio 4 px. Solo imágenes disponibles; omitir elementos vacíos.
- Cada opinión: fila superior de identidad y estrellas; avatar circular de 34 px, fondo #EDEDED, inicial automática del nombre; nombre 13 px semibold/bold; fecha debajo en 11 px gris #595959. Estrellas verdes #008744 alineadas a la derecha (15 px), parte no rellenada gris.
- Comentario debajo de la fila, 13 px, interlineado 1,6, margen superior 12 px. Conservar la redacción auténtica; no crear testimonios.
- Fotografías asociadas debajo del comentario cuando existan; mismas dimensiones relativas 3:4, radio 4 px, cuadrícula de 4 columnas, separación 6 px, margen superior 10 px.
- Botón de ampliar en extremo inferior derecho (32 px, icono 14 px, negro translúcido). Visor compartido de R1, pantalla completa, cierre y recuperación de foco, sin afectar ofertas. No duplicar controladores.
- Estado vacío: «Todavía no hay opiniones publicadas sobre este producto.» Sin puntuación, barras, avatares ni imágenes inventadas. No ofrecer un anclaje vacío en navegación comercial.
- Expansión de textos y listado progresivo: contrato aprobado inicialmente; pendiente de implementación con fuente real.

### Datos y seguridad
Fuente propuesta: metacampo de producto `custom.sds_reviews` (JSON), pendiente de creación e integración. Versión de esquema; registros con id, rating (1–5), author_name público autorizado, published_at, comment, verified_purchase acreditada, images autorizadas, source y source_id no sensible. Calcular promedio, total y distribución desde una fuente única completa. No incluir datos privados ni simular compra verificada. Si existe una aplicación autorizada de reseñas, evaluar integración sin dos fuentes de verdad. No hay backend de captura/moderación.
Los ejemplos ficticios y las fotos de catálogo de prueba solo se renderizan mediante request.design_mode en el piloto del rollo 50M, claramente identificados. Nunca se publican como opiniones reales; no almacenar fixtures en datos de producto. No autoriza el uso comercial de testimonios falsos.

### Archivos de referencia en Shopify
- snippets/sds-product-reviews.liquid
- snippets/sds-review-photo.liquid
- assets/sds-product-r1.css
- assets/sds-product.js (visor compartido)
- sections/sds-native-product.liquid (ubicación global)
- snippets/sds-commercial-tabs.liquid (navegación)
No duplicar plantillas por producto. Antes de modificar, inspeccionar la versión efectiva en Shopify R1.

### Aceptación
Diseño R3 aceptado. Datos reales, integración del metacampo, sincronización de valoración superior y pruebas de interacción/renderizado completas: pendientes. No publicar R1 sin autorización de MANDO.
