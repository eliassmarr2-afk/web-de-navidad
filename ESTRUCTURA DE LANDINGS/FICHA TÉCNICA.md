# FICHA TÉCNICA — SDS-L01.8

28/11/2026 · **CONSTRUIDA / DATOS GUARDADOS / PUBLICACIÓN DEL TEMA PENDIENTE.**
Tema R1 191487017159; commit Shopify fa217c628c26368c86547247e7ed907d07e5ef28. Operador aprobó la estructura y solicitó situar Ficha técnica inmediatamente después de Descripción.

## Contrato reutilizable
- Metacampo PRODUCT custom.sds_technical_specs (json), definición 637185097927. Un documento por producto: schema_version=1, scope opcional, groups (id, title, rows), rows (id, label, value, unit opcional), notice (title, text). Identificadores estables, únicos por grupo/fila; valores escalares de texto o numéricos; unidades independientes. No duplicar especificaciones en HTML ni programar datos de productos en Liquid.
- Render sds-product-specifications.liquid: tablas semánticas con caption, th scope=row, ancho 48/52, filas alternas, fondo blanco, radios 4px, nota informativa azul. Escapar texto, omitir filas incompletas y grupos sin filas. No es un validador JSON Schema estricto. El contenido heredado sds_characteristics/sds_care se admite como fallback si no hay grupos válidos; sin contenido no se renderiza públicamente. El editor puede mostrar un aviso.
- sections/sds-native-product.liquid captura el HTML una vez, deriva disponibilidad del mismo cuerpo y lo inserta después de Descripción. snippets/sds-commercial-tabs.liquid usa esa disponibilidad; orden global canónico: Preguntas, Descripción, Ficha técnica, Imágenes, Depósito, Reseñas, Videos. Registry shop custom.sds_global_tabs actualizado con el mismo orden; se conservan identificadores, enabled y destinos. Imágenes postergado, no eliminado; solo aparece con contenido cuando se implemente su disponibilidad. Reseñas sigue físicamente al final. No se altera el motor de desplazamiento ni dock.
- Fuente: embalaje ELECLU AH80207 fotografiado por operador (1000138433.jpg, 1000138434.jpg, 1000138435.jpg) y foto multicolor del producto aprobada. El color de la versión ilustrada no se deduce de las casillas sin marcar de la caja. Se omiten diámetro ilegible, IP, impermeabilidad y funciones de controlador no acreditadas. El origen se coloca en características generales. Alcance exclusivamente rollo, no accesorios del combo. La nota remite a instrucciones del fabricante.

## Datos del piloto
Producto 15540666695879. Metacampo gid://shopify/Metafield/193086884085959.

```json
{
  "schema_version": 1,
  "scope": "Especificaciones del rollo LED de 50 metros. No incluyen los accesorios de las ofertas.",
  "groups": [
    {
      "id": "general",
      "title": "Características generales",
      "rows": [
        {
          "id": "brand",
          "label": "Marca",
          "value": "ELECLU"
        },
        {
          "id": "model",
          "label": "Modelo",
          "value": "AH80207"
        },
        {
          "id": "length",
          "label": "Longitud",
          "value": 50,
          "unit": "metros"
        },
        {
          "id": "led_count",
          "label": "Cantidad de luces",
          "value": 240,
          "unit": "LED"
        },
        {
          "id": "light_color",
          "label": "Color de iluminación",
          "value": "Multicolor"
        },
        {
          "id": "presentation",
          "label": "Presentación",
          "value": "Rollo con carrete"
        },
        {
          "id": "environment",
          "label": "Ambientes",
          "value": "Interior y exterior"
        },
        {
          "id": "cable",
          "label": "Cableado",
          "value": "Reforzado, flexible y resistente"
        },
        {
          "id": "origin",
          "label": "Origen",
          "value": "China"
        }
      ]
    },
    {
      "id": "electrical",
      "title": "Características eléctricas",
      "rows": [
        {
          "id": "power",
          "label": "Potencia nominal",
          "value": 10,
          "unit": "W"
        },
        {
          "id": "voltage",
          "label": "Alimentación",
          "value": "220–240",
          "unit": "Vca"
        },
        {
          "id": "frequency",
          "label": "Frecuencia",
          "value": "50/60",
          "unit": "Hz"
        },
        {
          "id": "replaceable_lamps",
          "label": "Lámparas reemplazables",
          "value": "No"
        }
      ]
    }
  ],
  "notice": {
    "title": "Información importante",
    "text": "Leé el manual de instrucciones antes de utilizar el producto y respetá las condiciones de instalación indicadas por el fabricante."
  }
}
```

## Evidencia y publicación
Lectura posterior: 2 grupos, 13 filas, registro de tabs en orden solicitado. Descripción conserva 15 referencias img y seis marcadores; no se modificaron su HTML, stock, precio, SKU, variantes, ofertas ni Protocol Data. Cuatro archivos guardados esperando autorización: assets/sds-product-r1.css, sections/sds-native-product.liquid, snippets/sds-commercial-tabs.liquid, snippets/sds-product-specifications.liquid. Sin errores de guardado. Solicitud de captura móvil 390px devolvió metadatos sin imagen inspeccionable ni previewUrl. No declarar render o scroll en producción certificado hasta publicación y pruebas. Verificar adyacencia de tabs, ancla y estado activo, tablas completas, nota, ausencia pública del tab en fichas vacías y conservación de la barra de compra/consulta. La configuración de catálogo ya quedó guardada; el nuevo render requiere theme_publish autorizado.

## Publicación y comprobación en producción — 28/11/2026
**LIVE / SMOKE TEST PASS (tabs y contenido) / APROBACIÓN VISUAL PENDIENTE.** Autorización expresa del operador. Shopify theme_publish confirmó published=true, pending=[], userErrors=[], rejectedReason=null para R1 191487017159. Navegador público run fb529577-5353-4e2d-a0fd-963608a8f067: Descripción y Ficha técnica contiguos; selección y navegación hacia la ficha, regreso a descripción y estado activo observados; 13/13 filas correctas en dos tablas (9+4), alcance y aviso presentes. No tomar las paráfrasis del aviso del navegador como transcripción literal: el metacampo guardado es fuente de verdad. No se midió distancia de scroll ni geometría móvil. El navegador reportó resumen de compra y acceso de consultas en panel lateral, no confirmó dock inferior en su viewport; pendiente regresión visual móvil de SDS-L01.7. Lectura de catálogo del árbol 15540665843911 confirma ausencia de specs, characteristics y care; onlineStoreUrl null, por lo que no se certifica su render público sin contenido. No se realizaron compras, consultas ni cambios adicionales de catálogo o Protocol Data. Pendiente aprobación visual del operador y regresión pública en ficha sin datos accesible.

## Cierre visual — 28/11/2026
**APROBADO / LIVE / CIERRE COMERCIAL Y VISUAL.** El operador confirmó «APROBADA. Está muy buena.» tras la publicación. Se acepta la ficha piloto, su diseño y su navegación. Persisten las limitaciones técnicas del smoke test anterior; no se certifican geometría móvil, fichas vacías ni regresiones adicionales por inferencia. No se modifica Shopify ni se fusiona la rama. Siguiente frontera propuesta: Videos SDS-L01.9; Imágenes permanece postergado.
