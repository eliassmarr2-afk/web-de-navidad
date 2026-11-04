# WEB DE NAVIDAD — PRODUCT V2 / AJUSTE TIPOGRÁFICO Y PALETA NAVIDEÑA

**Fecha:** 2026-11-04  
**Autoridad:** instrucciones expresas del operador tras aprobar la imagen del proyector 1:1 y compartir una paleta visual de Navidad.  
**Estado:** CÓDIGO PREPARADO / VALIDACIÓN VISUAL EN DISPOSITIVO PENDIENTE  
**Precedencia:** este documento modifica exclusivamente el título, texto informativo superior y colores de PRODUCT_V2_APPROVED_STRUCTURE.md; preserva la arquitectura y la distribución ya aprobadas.

> **NUEVA AUTORIDAD DE MARCA Y ENCABEZADO (2026-11-04):** [SANTA_CLAUSULA_BRAND_HEADER_V1.md](./SANTA_CLAUSULA_BRAND_HEADER_V1.md) prevalece sobre el nombre «SantaClaus Store» y el encabezado beige: marca **SANTA CLAUSULA**, fondo verde **#1E7437**, franja de domicilio **blanca #FFFFFF** con texto negro y solo línea inferior gris, títulos importantes negros **#000000** y badge verde **#1E7437**, radio 4px. El logo WebP va centrado y compacto **una vez subido y verificado**. No afecta la arquitectura ni la zona inferior.


## Ajustes de texto

- Título anterior: `Proyector de formas navideñas portable | Iluminación LED para hogar`.
- **Nuevo título visible:** `Proyector de formas navideñas portable`. El carácter «|» y todo el texto posterior quedan fuera del título.
- **Nuevo metadato gris inmediatamente encima del título:** `Nuevo | +600 vendidos`.
- La calificación `(4.7)` y cinco estrellas verdes rellenas permanecen a la derecha, en la misma zona aprobada.
- El badge `MÁS ELEGIDO` sigue debajo del título, con radio fijo de **4px**.
- IMPORTANTE: **`+600 vendidos`, `(4.7)` y `MÁS ELEGIDO` son contenido ilustrativo / DEMO**. No existe evidencia verificada de ventas, reputación o ranking; antes de una operación comercial deben reemplazarse por datos reales u omitirse. El HTML etiqueta el metadato como demostrativo.

## Tipografía — verificación con Camping

- Repositorio de referencia: `eliassmarr2-afk/ecommerce-v2`, `css/base.css` y `index.html`.
- **La familia es exactamente Manrope**, en Camping y en esta página, descargada desde Google Fonts.
- El tratamiento de fuentes no era idéntico: en Navidad se había configurado el título con peso 750 y Camping cargaba mayormente pesos 400, 500 y 600.
- **Corrección visual:** se usa `font-weight: 600`, `font-size: clamp(21px, 5.6vw, 27px)` (hasta 360 px: 20 px), y `line-height: 1.2`. Esto reduce el tamaño sin perder legibilidad ni alterar los bloques.

## Nueva paleta (imagen suministrada por el operador)

| Uso | Color | Hex |
| --- | --- | --- |
| Rojo principal / compra y selección | Rojo Navidad | `#A60B08` |
| Promociones / precios destacados | Bordó oscuro | `#5E0001` |
| Franja de domicilio / títulos / rating / badges verdes | Verde abeto | `#1D2E19` |
| **Encabezado principal** / base cálida exterior | Beige navideño | `#CFCABF` |
| Textos secundarios cálidos | Marrón taupe | `#76584C` |

El encabezado cambia de rojo a **beige `#CFCABF`**, con marca e iconografía en verde abeto oscuro `#1D2E19`, para cumplir contraste. La franja de ubicación debajo es **verde abeto**, con texto blanco. El bloque de presentación del producto y el fondo de la imagen principal **continúan blancos**.

Los metadatos «Nuevo | +600 vendidos» se muestran en **gris neutral**, no rojo ni marrón; los colores comerciales se distribuyen en CTA, badges, precios, estado seleccionado y acentos de la zona comercial inferior.

## Alcance técnico y guardas

- `product.html`: título corto en `<title>` y `#productTitle`, nueva línea gris encima del título, cache bust de CSS y ajuste del `theme-color` del navegador.
- `js/product-runtime-v4.js`: actualizar el título de la ficha demo `prod-002` para impedir que la carga del controlador restituya el título anterior.
- `css/product-v2-top.css`: implementar tokens y estilos mediante **selectores de clase `.christmas-product-v2`**. Se modifica solo **color** en la estructura que sigue debajo de la imagen, sin alterar geometría ni funciones de ofertas, variantes, chat, miniaturas, tabs, checkout mock o barra fija.
- El encabezado conserva navegación, compartir/favoritos. Domicilio usa sesión compartida con Home. Foto WebP `assets/proyector-navideno-producto.webp` permanece cuadrada 1:1 y de borde a borde.
- **No tocar** `indumentary`, la Home de Navidad, Tracking, Soporte ni integraciones Shopify / Protocol Data.
- No considerar la modificación publicada hasta recibir GitHub Pages en Success y realizar revisión visual en móvil.

## Criterios de recepción

1. Encabezado beige, marca e íconos verde abeto; franja inmediatamente inferior verde oscuro con texto blanco.
2. «Nuevo | +600 vendidos» en gris inmediatamente encima del título corto.
3. El título visible termina en «portable»; sin barra vertical ni subtítulo.
4. Manrope 600 y tamaño ligeramente menor; las estrellas y `(4.7)` continúan a la derecha.
5. Badge `MÁS ELEGIDO`: verde abeto y border-radius 4px.
6. Fotografía del proyector 1:1, borde a borde, intacta.
7. De la imagen hacia abajo, **sin reordenar módulos ni borrar contenido**; solo nueva colorimetría.
8. Verificar valores 320/360/390/430/720px, contraste de texto y estado de botones.
