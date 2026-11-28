# PREGUNTAS — SDS-L01.11

28/11/2026 · **FUENTE CONSTRUIDA EN AISLAMIENTO / DOCUMENTADA / NO INTEGRADA / NO LIVE.** Operador aprobó estructura reutilizable y solicitó no interferir con el ensamble paralelo de Protocol Data. La lectura previa de R1 encontró pending vacío en esta ocasión, pero no certifica ausencia de commits awaitingPublish ajenos ni cierre del ensamble; no se ejecutaron escrituras Shopify, theme_commit o theme_publish. No se intervino el tema de ensayo paralelo. SDS-L01.10-R1 permanece pendiente de reconciliación de publicación; no se declara cerrado en producción.

## Arquitectura
- PRODUCT custom.sds_faq tipo json (definición y carga propuestas, aún no creadas). schema_version:1; title; contact (enabled, title, text, button); items (id, enabled, question, answer). Máximo 20 preguntas válidas, orden por arreglo, IDs estables y contenido editorial. Omitir entradas deshabilitadas o incompletas. No presentar preguntas como escritas por compradores reales. Escapar texto; respuestas conservan saltos de línea.
- details/summary nativos independientes, primera pregunta admitida abierta, restantes cerradas, interacción táctil y teclado nativa; no JS ni peticiones adicionales. Fondo blanco, iconos azules #2479ff, líneas #d9d9d9, texto negro y gris oscuro, radio 4px en acceso contextual. Título de sección configurable por metacampo. Sin imágenes.
- Sticky Tab Preguntas último en registro existente, destino #sds-questions, disponibilidad derivada del mismo HTML capturado. Si no hay preguntas válidas, no render público ni assets; placeholder exclusivo del editor. Mantener orden físico después de Reseñas y antes del spacer.
- CTA reutiliza data-sds-open-screen="support" y aria-controls existente. Doble condición contact.enabled=true y contextual_support_ready=true aportada por integrador certificado; semilla y render inicial false. El slide leído de R1 contiene fieldset disabled y aviso de formulario en preparación; no se habilita ni se declara conectado por inferencia. CTA oculto públicamente hasta certificación. No incorporar formulario, API, estado, secretos ni lógica de logística. Certificar producto, oferta, SKU, sitio, envío único, recepción y retorno privado antes de habilitar.

## Fuente y semilla
Carpeta IMPLEMENTACIONES/PREGUNTAS:
- sds-product-questions.liquid — renderer.
- sds-questions.css — estilos acotados.
- piloto.json — cinco preguntas del producto 15540666695879 (rollo 50M, 240 LED, uso interior/exterior según manual, alimentación 220–240 Vca y composición de oferta).
- INTEGRACIÓN.md — anclas exactas, cambios mínimos y puertas de publicación.
Verificación de catálogo confirma custom.sds_technical_specs y custom.sds_components de variante 68891312423111 con rollo y 8 tubos colgantes. Persiste denominación histórica de mariposas; no se cambia en esta tarea. Semilla no se ha escrito a Shopify.

## Evidencia
Readback GitHub de los cuatro archivos: Liquid blob 5421fdf58ced472b80f665202985fd0e570f9e74, CSS d3575d883bed30ee22e81f6f122624fdfd978c04, JSON 133451d2f4afa6a45f41a6c886bae659c8a3040a, integración a19634f714b687a2c821a21117bac0e2b3570fe0. Último commit de paquete fb62293972148953f83fd19b41f205c1b0f1d7ed.
12/12 comprobaciones estáticas y de fixture (balance de bloques y delimitadores, CSS, esquema/5 IDs, especificaciones, detalles nativos, escape, doble admisión, router, ausencia de formulario/red, ocultamiento y contrato de integración). Primera comprobación de balance devolvió falso por error del verificador: trataba el tag liquid como bloque con endliquid. Se corrigió el verificador, examinando también las instrucciones internas; PASS sin modificar la fuente. No equivale a ejecución del parser Liquid de Shopify ni prueba de navegador.
Pendiente reconciliar R1 con MANDO/WORK, aplicar únicamente los cambios registrados, crear/sembrar metacampo con protección de concurrencia, validar captura y render, guardar y publicar con autorización acotada. No merge. No se alteraron precios, stock, SKU, variantes, ofertas, galería, preguntas existentes, conexiones ni el estado de publicación de Shopify.
