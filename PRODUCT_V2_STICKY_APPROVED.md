# SANTA CLAUSULA — STICKY DE COMPRA V2 / ACEPTACIÓN Y ENSAMBLE

**Fecha de aprobación:** 2026-11-04  
**Estado:** **DISEÑO APROBADO / IMPLEMENTACIÓN PREPARADA / PUBLICACIÓN Y REVISIÓN VISUAL PENDIENTES**  
**Repositorio:** `eliassmarr2-afk/web-de-navidad`  
**Superficie:** `product.html`, barra fija de compra de Producto V2  
**Referencia:** captura aportada por el operador el 4 de noviembre de 2026, con total, envío, badge de entrega, cuotas y CTA azul.

## 1. Alcance cerrado

Reemplazar **solo** la barra fija de compra existente, conservando sin cambios de estructura el encabezado, selector de domicilio, bloque de producto, foto principal 1:1 y todos los bloques que están debajo de ella.

El sticky debe:
1. Tener **fondo blanco absoluto**, detalles tipográficos oscuros y textos secundarios grises.
2. Mostrar en primera línea **«Total a pagar»** a la izquierda y el **importe de la oferta seleccionada** a la derecha.
3. Mostrar a la izquierda el estado de **envío**, con el badge de llegada **a la derecha y en posición estable**.
4. Mostrar en tercera línea las condiciones de **cuotas** autorizadas, o su estado pendiente.
5. Tener **un único botón azul #2579FF**, texto blanco «Iniciar compra» con chevron, **ocupando todo el ancho útil**, sin botón negro de carrito.
6. **No aparecer al cargar**. Mostrarlo al llegar al **30% del recorrido desplazable de la página**, calculado como `scrollY / (documentElement.scrollHeight - innerHeight)`, y ocultarlo al retroceder por debajo de ese umbral.
7. Respetar safe-area inferior, accesibilidad de enfoque y pantallas móviles. Sin reestructurar la arquitectura de Commerce.

## 2. Paleta y escala

- Fondo: `#FFFFFF`.
- Texto principal e importe: `#24272D`.
- Etiquetas secundarias: `#818791`.
- CTA: **`#2579FF`**, texto blanco y radio 7px.
- Badge de entrega **confirmada**: verde `#09A458`, texto blanco y **radio 4px** según la regla general de badges de Producto V2.
- Badge **pendiente**: gris neutral `#ECEFF1`, texto `#505A63`. No debe usarse verde con promesas no respaldadas.
- Contenedor centrado de hasta 480 px en escritorio y 100% en móvil, preservando geometría responsive existente.

## 3. Fuente de precios y checkout

**No duplicar un cálculo de precio.** El elemento `#productPrice` se conserva y es actualizado por el estado actual de ofertas y combos (`js/product-runtime-v4.js` y `js/product-combos-controller-v2.js`). El sticky solo lo presenta.

**Aviso de alcance:** actualmente la cifra es **mock**, procedente de la oferta elegida, y no incluye necesariamente un cargo logístico verificado. Por ello, aunque la maqueta adopte literalmente la etiqueta «Total a pagar» de la referencia, **no constituye un total de checkout válido** hasta que Commerce y Logistics confirmen el importe final. No anunciar ni cobrar dicho total como cerrado en producción.

El botón `#startCheckout` no activa Shopify, no genera órdenes ni conserva en secreto un `addToCart` de demostración. Mientras la tienda sea mock, muestra el aviso **«La compra todavía no está habilitada. Esta es una tienda de demostración.»**. En el futuro, el checkout requerirá conexión autorizada y acuerdo técnico específico. No confundir seleccionador de ofertas y cotización con flujo de pago.

## 4. Contrato de envío Logistics

La posición visual del badge derecho es **estática**. **No son estáticas** las afirmaciones «Llega mañana» y «Envío gratis»: ambas requieren resultado público autorizado de **Protocol Data Logistics**, para el CP activo y la identidad Store/Origin correctas.

- Sin CP: envío `Calculá el envío con tu CP`; badge `Ingresá tu CP`.
- Con CP pero sin cotización vigente: `Envío por consultar`; badge `Entrega por confirmar`.
- Con quote autorizada y envío gratuito confirmado: `Envío gratis`.
- Con quote autorizada y ventana/fecha de entrega: mostrar la leyenda devuelta; usar `Llega mañana` **solo si la autoridad lo confirma**.
- Con cargo o fecha distinta: mostrar el resultado autorizado; no forzar etiquetas publicitarias.
- Con CP cambiado o quote antigua: descartar resultados previos e invalidar la vista.
- Sin red: mostrar estado pendiente, no usar datos ficticios para rellenar.

**Boundary futuro local de presentación** (NO es endpoint, API ni evidencia de activación):

`window.dispatchEvent(new CustomEvent("santa-clausula:shipping-quote", { detail: ... }))` será emitido **exclusivamente por el futuro adaptador confiable**, una vez comprobada autoridad pública, destino e identidad. Los campos de presentación locales esperados son `authority:"protocol-data-logistics"`, `status:"resolved"`, `postalCode`, `freeShipping:boolean`, `shippingLabel?:string`, `deliveryLabel?:string`. El controlador vuelve a validar coincidencia con el CP de sesión antes de dibujar. **Estos atributos de UI no son por sí solos autenticación ni validación del backend**.

No se define ningún endpoint remoto ni payload canónico de Protocol Data. Antes de integrar, revalidar contratos vigentes de Logistics, origen de sitio y tenant; no exponer secretos en navegador.

## 5. Condiciones de cuotas — autoridad separada

Logistics **no determina cuotas**. El texto «Hasta 6 cuotas con MercadoPago» de la imagen es **un ejemplo visual**, no una financiación hoy vigente. La versión sin proveedor conectado utiliza **«Cuotas por confirmar»**.

El futuro adaptador comercial o de checkout podrá publicar condiciones mediante un evento de presentación separado `santa-clausula:payment-terms` desde un origen confiable; jamás se infieren por el código postal.

## 6. Implementación

- `product.html`: reemplaza exclusivamente `.purchase-bar` actual por `<aside id="christmasPurchaseSticky" class="purchase-bar christmas-sticky">`. Preserva el único `#productPrice` original para no romper actualizaciones de precio; mantiene `#oldPrice` oculto para compatibilidad con controladores. Botón nuevo `#startCheckout` en vez de `#addToCart`, de modo que los handlers de carrito demo anteriores no simulen compras.
- `css/product-v2-sticky.css`: presentación específica y reglas de mostrar/ocultar; carga **después** de los estilos de producto ya existentes.
- `js/product-v2-sticky.js`: aparición al 30%, gestión de visibilidad y tabulación, ubicación de sesión, estados pendientes, eventos de futura presentación autorizada, CTA demo.
- `CURRENT_WAYPOINT.md`: registro de estado de la construcción.

## 7. Criterios de recepción y límites

1. Sticky oculto antes del 30%; aparece al 30% y se oculta al retroceder; contempla viewport resize y reentrada por historial.
2. Importe cambia si se selecciona una oferta/pack, sin otro cálculo duplicado.
3. Botón azul único de ancho completo; no existe el botón negro de carrito.
4. CP guardado en Home se lee desde el mismo contexto y no activa falsos «gratis/mañana».
5. Badge muestra estado pendiente gris y sólo se vuelve verde con quote futura autorizada.
6. Cuotas no se prometen mientras no exista autoridad comercial.
7. El botón da aviso de demostración mientras el checkout esté inactivo.
8. Ninguna alteración estructural al resto del producto. No conectar Shopify ni Protocol Data.
9. Revisión en 320, 360, 390, 430 y 480 px, además de escritorio. Revisar overlays de Soporte, ubicación y contenido cerca del pie.
10. **No declarar publicación ni aceptación visual** hasta que GitHub Pages despliegue el commit y el operador lo inspeccione.

**Categoría:** Composición web / Surface Commerce, preparada para ensamble futuro; no implica integración de dominio Backend.
