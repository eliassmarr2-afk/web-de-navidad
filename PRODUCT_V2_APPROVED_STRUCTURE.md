# WEB DE NAVIDAD — PRODUCTO V2 / ESTRUCTURA VISUAL APROBADA

**Fecha de aprobación:** 2026-11-04  
**Estado:** **DISEÑO APROBADO / CÓDIGO IMPLEMENTADO EN PREPARACIÓN / VALIDACIÓN VISUAL PENDIENTE**  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`  
**Página:** `product.html`  
**Marca temporal visible:** **SantaClaus Store**  
**Documento anterior:** `PRODUCT_V2_INITIAL_STRUCTURE.md` (antecedente parcial; sustituido por este contrato para el diseño de la página)

> **ENMIENDA DE ALCANCE FINAL — 2026-11-04 (prevalece sobre referencias a una reconstrucción posterior a la imagen):** El operador confirmó que únicamente deben modificarse **el encabezado, la franja de domicilio, el título/valoración/badge/entrega previos a la fotografía y el encuadre 1:1 de esta**. **Todas las secciones que actualmente están debajo de la imagen conservan su estructura existente**: miniaturas, detalles, variantes, ofertas, secciones comerciales, soporte, pestañas, descripción y barra de compra. La frase previa «Elegí tu oferta comienza después de la imagen» indica continuidad comercial conceptual, **no autoriza a mover ni eliminar los bloques intermedios del legado**. La adaptación navideña de esa zona será una etapa separada.

## 1. Autoridad y alcance

Este contrato reproduce las decisiones del operador sobre la nueva Product Page de Web de Navidad, tomando como **referencia de composición** la captura móvil que compartió el 4 de noviembre de 2026 (ficha de producto de Shopify con franja de navegación, título, rating, badge, información de llegada e imagen grande).

La nueva página **no** replica el layout fotográfico primero ni el branding deportivo heredados de `indumentary`. Aprovecha la arquitectura ensamblable, los módulos de Commerce, la ubicación de sesión y los límites de Shopify / Protocol Data, sin activar conexiones live.

**Última enmienda aprobada:** todos los contenedores de **badges de esta página tendrán `border-radius: 4px`**. No usar radios de 8, 12, 16 px ni píldoras en esos badges. Esta regla no obliga a modificar los radios de botones, cards, inputs o banners que no sean badges.

## 2. Sistema visual

- **Tipografía:** `Manrope`, verificada en el repositorio Camping (`eliassmarr2-afk/ecommerce-v2`, `css/base.css`). Conservar su peso, espaciado y jerarquía sobria; no agregar una familia nueva.
- **Header:** rojo navideño (`#B20B17` como token inicial), tipografía e íconos blancos.
- **Barra de ubicación:** verde navideño (`#17643F` como token inicial), texto e íconos blancos, contraste legible.
- **Cuerpo:** blanco (`#FFFFFF`) en el bloque de presentación del producto y detrás de la galería.
- **Badge «MÁS ELEGIDO»:** verde con texto blanco en mayúsculas, **`border-radius: 4px`**.
- **Rating:** cinco estrellas pequeñas, **verdes y rellenas** (no íconos solo de contorno), y al lado la valoración literal **`(4.7)`** en maqueta.
- Los demás badges que aparezcan en Product V2 también usan **`border-radius: 4px`**.

## 3. Orden canónico de la zona superior móvil

### 3.1 Encabezado

- Franja roja navideña superior, distinta de la galería.
- Logo textual temporal **SantaClaus Store** en blanco.
- Preservar regreso/navegación y acceso al carrito con controles reales; la posición exacta de controles secundarios puede ajustarse sin cambiar el orden de las secciones.
- El header no se superpone a la fotografía: es una banda independiente.

### 3.2 Franja verde de ubicación (pegada al header)

- Contenedor **borde a borde**, pegado directamente al límite inferior del header rojo, sin separación, margen exterior ni redondeo de esquinas.
- Toda la superficie es accionable, con ícono de **casa** y chevron a la derecha.
- Sin ubicación: **«Colocá tu dirección de envío»**.
- Con ubicación: **«Llega a {domicilio}»**, usando exclusivamente `visibleLabel` guardado en el estado de ubicación del storefront. Si no hay dirección, mostrar `CP {postalCode}` y nunca fabricar calle o altura.
- Ambos estados abren **el mismo selector de domicilio** que usa la Home: un solo contexto de sesión, una sola autoridad de lectura y guardado, sin duplicar estado.

### 3.3 Datos del producto sobre fondo blanco

- Título de demostración, literal: **Proyector de formas navideñas portable | Iluminación LED para hogar**.
- Tamaño y jerarquía del título **análogos a la captura de referencia**: titular visible, multilineal, sin hacerlo diminuto para forzar una sola línea.
- En la **misma fila visual, alineada a la derecha**, hay una columna compacta para las **cinco estrellas verdes rellenas**, de tamaño moderado/pequeño, con **(4.7)** junto a ellas o inmediatamente asociado visualmente; no robar ancho excesivo al título ni generar scroll lateral.
- **Debajo del título** aparece el badge verde **MÁS ELEGIDO**, con radio **4 px**.
- A su derecha puede permanecer el acceso **«Ver cuándo llega»**, que abre el selector de ubicación/consulta logística disponible; no fingir que existe cálculo o promesa.
- Debajo aparece la línea contextual de entrega: si falta ubicación, invitar a ingresarla; si existe, informar destino. Una fecha, tarifa o condición de envío solo se muestra si proviene de una respuesta logística pública autorizada y vigente.

### 3.4 Imagen principal

- Se ubica **después** del bloque de título/badge/valoración/ubicación, como en la captura.
- **Proporción exacta 1:1** para la superficie visual.
- **Borde a borde horizontal** del viewport/contenedor móvil: cero márgenes, paddings o radios exteriores, sin mostrar terminaciones laterales.
- El encuadre conserva la proporción sin distorsión. La fotografía real se seleccionará en la fase de imágenes; no reconstruir como media hero deportiva antes del título.
- La galería/miniaturas futuras deben ser modulares y no romper esta primera imagen 1:1.

### 3.5 Continuación comercial

- Debajo de la imagen comienza el bloque **«Elegí tu oferta»**, manteniendo preparada la capa de Commercial Offers / Product Sets.
- La composición completa de variantes, packs, medios de pago, consultas y módulos posteriores se acordará durante la siguiente etapa; no heredar por inercia las promociones de indumentaria.

## 4. Ubicación y Logistics — contrato de interacción

La Home tiene el módulo `js/shared/location-state.js` con clave `web-de-navidad.sessionLocation.v1`, estado `visibleLabel`, `postalCode` y `address`, y evento `web-de-navidad:location-change`.

La página clonada actual usa todavía claves como `indumentary.sessionLocation.v1` en código heredado. **La implementación Product V2 debe corregir esa divergencia** para que el domicilio ingresado en Home aparezca inmediatamente en Producto y viceversa durante la misma sesión. No duplicar el flujo ni mezclar datos de otros sitios.

**La dirección no implica una promesa de entrega.** No mostrar «llega gratis», días concretos, plazos estimados, elegibilidad o tarifas sin respuesta de la autoridad Logistics cuando se active. La maqueta inicial solo informa el destino o pide ingresarlo.

## 5. Evidencia comercial y datos temporales

- `(4.7)` y **MÁS ELEGIDO** fueron solicitados como elementos visuales de la maqueta; **no constan reseñas/ventas verificadas** del proyector. No considerar esas cifras ni ese badge como hechos comerciales para producción.
- No introducir descuento, stock, precio real ni promesa de entrega no autorizados.
- Commerce continúa **MOCK / DEVELOPMENT ONLY**; Shopify, Protocol Data Logistics y demás dominios continúan **NOT ACTIVE**.
- Preservar `SKU != PRODUCT SET != COMMERCIAL OFFER != PROVIDER VARIANT` y separar presentación del modelo de datos.

## 6. Criterios de aceptación de la construcción futura

1. Encabezado rojo «SantaClaus Store» con texto blanco; inmediatamente debajo la franja verde de domicilio **borde a borde**.
2. Dirección de la Home reflejada en Producto y viceversa; clic en barra y «Ver cuándo llega» abre el flujo existente.
3. Producto blanco con título del proyector, tamaño equivalente a la referencia, multilineal y sin truncamiento.
4. Cinco estrellas **rellenas**, verdes, pequeñas, a la derecha del título, y **(4.7)** visible.
5. Badge verde **debajo** del título, texto blanco mayúsculo y **radio exactamente 4 px**. Todo badge nuevo en esta página respeta esta regla.
6. Mensaje contextual de entrega sin tarifas ni fechas inventadas.
7. Imagen principal **1:1, borde a borde, sin esquinas ni paddings externos**.
8. «Elegí tu oferta» comienza después de la imagen; no heredar combos deportivos.
9. Sin scroll horizontal global; ensayar 320, 360, 390, 430, 720 px y escritorio.
10. Sin alteraciones en `indumentary`, la Home, Tracking, Soporte, ni activación de Shopify/Protocol Data.

## 7. Estado y siguiente movimiento

**ESTRUCTURA APROBADA — AÚN NO IMPLEMENTADA.** El siguiente movimiento es una implementación controlada en `product.html`, CSS scoped y módulos de interacción/ubicación necesarios, con verificación de integridad. La imagen real del proyector se abordará en la fase visual posterior. No declarar la página publicada ni validada solo por este contrato.

## 8. Recepción de implementación — 2026-11-04

La implementación superior se registra en `PRODUCT_V2_IMPLEMENTATION_RECEIPT.md`. El HTML inferior original se conserva desde `#detailSection` en adelante; la sección de miniaturas y handle siguen presentes inmediatamente después de la imagen. La fotografía real del proyector no se ha incorporado: se utiliza temporalmente `assets/christmas-placeholder.svg` (cuadrado 1:1). La comprobación móvil y la certificación del despliegue siguen pendientes.
