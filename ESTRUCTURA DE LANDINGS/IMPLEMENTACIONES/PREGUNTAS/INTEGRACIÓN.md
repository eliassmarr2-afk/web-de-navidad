# Integración acotada — SDS-L01.11
No ejecutar en tema R1 mientras exista una intervención concurrente no reconciliada. No sobrescribir archivos completos compartidos. No ejecutar commit/publish sin autorización de alcance y comprobación de todos los pending/awaitingPublish. Los archivos de esta carpeta son fuentes de construcción, no cambios aplicados al tema.

1. Copiar sds-product-questions.liquid a snippets/ y sds-questions.css a assets/.
2. Definir metacampo PRODUCT custom.sds_faq tipo json, si no existe. Cargar piloto 15540666695879 desde piloto.json con compareDigest:null solo si no existe valor; no sobrescribir dato concurrente. Verificar lectura. No habilitar contact.enabled.
3. En sections/sds-native-product.liquid, inmediatamente antes de la única llamada a render 'sds-commercial-tabs', insertar:

```liquid
    {% capture sds_questions_body %}{% render 'sds-product-questions', product: product, section: section, contextual_support_ready: false %}{% endcapture %}
    {% assign sds_questions_body = sds_questions_body | strip %}
    {% assign sds_questions_available = false %}
    {% if sds_questions_body != blank %}{% assign sds_questions_available = true %}{% endif %}
    {% if sds_questions_available %}{{ "sds-questions.css" | asset_url | stylesheet_tag }}{% endif %}
```

En ESA llamada, añadir el argumento questions_available: sds_questions_available, conservando todos los existentes. Ejemplo de la lectura 28/11/2026:

```liquid
    {% render 'sds-commercial-tabs', product: product, description_available: sds_description_available, specifications_available: sds_specifications_available, videos_available: sds_stories_available, warehouse_available: sds_warehouse_available, questions_available: sds_questions_available %}
```

4. Inmediatamente después de render 'sds-product-reviews' y antes del spacer comercial, reemplazar SOLO:
```liquid
      {% render 'sds-commercial-pending', key: 'questions', title: 'Preguntas' %}
```
por:
```liquid
      {{ sds_questions_body }}
```
5. En snippets/sds-commercial-tabs.liquid, dentro de case key, agregar antes del endcase:
```liquid
          when 'questions'
            if questions_available == true
              assign available = true
            endif
```
Orden existente permanece videos,description,specifications,images,warehouse,reviews,questions. No modificar shop registry, router, slide, logística ni revisiones.
6. Verificar que cada ancla sea única, que el cuerpo capturado derive la disponibilidad y que el tab no aparezca sin preguntas válidas en storefront. Editor permite placeholder. Validar preguntas y respuestas con escape, primera abierta, restantes cerradas e independencia de aperturas. Probar teclado y móvil. Revisar cambios de terceros antes de guardar.
7. Admisión de consulta: exclusivamente después de certificación del flujo real de Conversaciones y autorización del MANDO, reconciliar parámetro contextual_support_ready con la capacidad efectivamente admitida por el integrador, y habilitar contact.enabled en el producto. No sustituir por true sin certificación. El botón usa data-sds-open-screen="support" y aria-controls="sds-support-{{ section.id }}", contrato leído del dock existente. No crear formulario, endpoint, credencial, fetch o estado nuevo. Verificar variante seleccionada, SKU y sitio, envío único, recepción en Protocol Data, historial privado y retorno. Si no está admitido, CTA ausente públicamente; FAQ sigue disponible.
