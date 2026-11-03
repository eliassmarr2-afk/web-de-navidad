# WEB DE NAVIDAD

Tienda modelo navideña **reutilizable cada temporada**, construida a partir de la arquitectura de `eliassmarr2-afk/indumentary` y personalizada sin modificar el repositorio de origen.

## Estado actual

```text
PHASE                    STATUS
Repository initialization  COMPLETE · PUBLIC
Home mobile V1             IMPLEMENTED · REVIEW PENDING
Home desktop responsive    IMPLEMENTED · REVIEW PENDING
Commercial photography     PENDING · NEXT VISUAL PHASE
Product detail holiday UI  LEGACY BASE · NEXT PHASE
Tracking / Support UI      INHERITED · HOLIDAY SKIN PENDING
Shopify integration        NOT ACTIVE
Protocol Data integration  NOT ACTIVE
Payments / live orders     NOT ACTIVE
```

## Implementación V1

- Cabecera roja con navegación, ubicación de sesión, carrito demo y búsqueda local de productos.
- Hero navideño de composición visual sin fotografía definitiva.
- Ocho categorías con **íconos blancos sobre círculos rojo navideño**, en dos filas horizontalmente desplazables: Árboles, Regalos, Decoración, Luces / Envoltorios, Mesa, Moños, Ofertas.
- Filtros interactivos: Packs, Promociones, Para regalar, Decoración y Envoltorios.
- Tres packs demo; banner intermedio **2,6:1**; tarjetas de productos mock con precios ilustrativos.
- Navegación móvil inferior: Inicio / Navidad / Packs / Pedidos / Ayuda.
- Diseño Manrope, tarjetas blancas, canvas rosado suave, responsive móvil/escritorio.

## Arquitectura

```text
index.html                       Home y navegación
css/base.css                    Base heredada, no duplicada
css/home.css                    Composiciones base
css/navidad-home.css            Tema estacional V1
js/app.js                       Interacciones de Home
js/commerce/catalog.js          Categorías, packs, filtros, productos demo
js/commerce/cart.js             Carrito de sesión (sin checkout live)
js/shared/location-state.js     Ubicación compartida dentro de este sitio
js/config/site.js               Identidad y límites de integración
assets/christmas-placeholder.svg Media temporal, no creatividad final
```

Las páginas `product.html`, `tracking.html` y `soporte.html` conservan la infraestructura heredada; **su estética y contenido navideño todavía no están finalizados**.

El storefront no infiere disponibilidad, descuentos, plazos ni costos de logística reales a partir de mocks. La búsqueda funciona sobre el catálogo demo. Los pedidos, pagos y conversaciones productivas requieren integraciones futuras independientes y autorización específica.

## Contrato visual

Ver `CHRISTMAS_DESIGN_CONTRACT.md`.

## Referencia estructural

`eliassmarr2-afk/indumentary` permanece independiente y no recibe cambios desde este repositorio.
