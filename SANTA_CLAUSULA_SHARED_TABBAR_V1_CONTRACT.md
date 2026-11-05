# SANTA CLAUSULA — TAB INFERIOR ENSAMBLABLE + LANDINGS NAVIDAD/REGALOS V1

**Fecha:** 2026-11-05  
**Estado:** DISEÑO REFERENCIADO POR OPERADOR / IMPLEMENTACIÓN V1 / REVISIÓN VISUAL EN DISPOSITIVO PENDIENTE  
**Referencia:** primera barra de la imagen aportada por el operador (píldora activa, iconos rounded y superficie translúcida); **no** se reutiliza ni modifica material gráfico de terceros.  
**Owner:** SITE UI / NAVIGATION, no comercio, no operaciones Protocol Data.

## 1. Cinco destinos y rutas congeladas

| Tab | URL estática | Pantalla |
|---|---|---|
| Inicio (casa) | `/index.html` | Home actual |
| Navidad (árbol) | `/navidad.html` | Nueva landing de temporada |
| Regalos (centro) | `/regalos.html` | Nueva landing editorial de regalo |
| Pedidos (paquete) | `/tracking.html` | Tracking actual, sin nuevo sistema |
| Ayuda (conversación) | `/soporte.html` | Soporte general actual, sin duplicación |

`/regalos.html` **NO sustituye ni duplica** `/colecciones/regalos.html`. La primera es un espacio editorial/selector de ideas; la segunda es un recurso comercial de colección con productos, cuyo contenido pertenecerá a Shopify.

## 2. Contrato visual móvil

- **La barra ocupa exactamente de izquierda a derecha y se pega al límite inferior**, `position: fixed; inset: auto 0 0; width:100%`. Contenedor `border:0`, `border-radius:0`, `box-shadow:none`. No se dibujan contornos ni una línea superior visible.
- Fondo rojo/blanco navideño **translúcido**, `rgba(255,246,247,.86)`, con `backdrop-filter:blur(15px)` y degradado discreto sobre el borde superior para que no se perciba una caja independiente. Fallback sólido cuando se pide reducir transparencia.
- Iconos lineales **estables, con extremo/unión redondeados** `stroke-linecap/linejoin=round`. Rutas SVG embebidas en un único módulo; **no** dependencias de iconos de terceros.
- Estado activo: píldora solo alrededor de `icono + texto` con radio `999px` y fondo rojo navideño suavizado `rgba(178,11,23,.13)`; texto `#A20B19`. Los ítems no activos muestran icono y pequeña etiqueta de destino para accesibilidad/orientación. **La píldora interna se redondea; jamás el contenedor**.
- Orden invariable 1 Inicio, 2 Navidad, 3 Regalos, 4 Pedidos, 5 Ayuda. **Regalos permanece en el centro**.
- Visible hasta `767px`, oculto en escritorio para evitar introducción de un segundo header; respeta `safe-area-inset-bottom`.
- Accesibilidad: `aria-label` por enlace, `aria-current=page` solo para la sección activa; navegación por teclado con foco visible mediante sombra, sin contornos decorativos.
- El wrapper de Producto conserva el sticky de compra aprobado, `z-index:75`; la barra general usa `z-index:60`, de manera que cuando aparece el sticky tiene prioridad visual y funcional. No se alteró la lógica de precios, compra, envío ni su umbral de aparición.

## 3. Componentes y composición — una autoridad

```text
js/shared/site-tabbar.js    ← SITE_TABS: 5 rutas + labels + SVG único
css/site-tabbar.css         ← diseño de barra único, viewport y safe area
       │
       ├── index.html                     active=home
       ├── navidad.html                   active=navidad
       ├── regalos.html                   active=regalos
       ├── tracking.html                  active=pedidos
       ├── soporte.html                   active=ayuda
       ├── product.html                   active=ninguno; compra sticky prioritaria
       └── colecciones/<handle>.html      active=navidad excepto regalos
                 └─ generator: scripts/build-collection-pages.mjs
```

Cada página contiene solamente un mount pequeño:

```html
<nav class="sc-tabbar" data-site-tabbar data-base="./" data-active="home" aria-label="Navegación principal"></nav>
```

No se deben copiar los cinco iconos, links ni píldoras a cada página. El módulo los compone automáticamente según el `data-base` seguro (`./` o `../`) y `data-active`. La estructura antigua `holiday-bottom-nav` de Home y `sc-collection-bottom-nav` de colecciones fue **retirada del HTML**, no queda ninguna barra DOM activa duplicada. Las reglas CSS anteriores pueden seguir en hojas heredadas sin afectar a la nueva clase.

La navegación no requiere un usuario, sesión, cookies, Shopify ni capability de Protocol Data. El cambio de activo se determina por contexto de la página, no por atributos no confiables de producto.

## 4. Navidad y Regalos — dos landings nuevas / una presentación

- `navidad.html` reúne ocho colecciones de temporada y una muestra de productos ficticios. El objetivo es descubrimiento.
- `regalos.html` presenta un hub de inspiración para regalos, con enlaces a las colecciones `Regalos`, `Envoltorios`, `Moños` y `Ofertas`, y una muestra ilustrativa de productos `para-regalar`.
- Ambas comparten `js/seasonal-hub.js` + `css/seasonal-hub.css`, y **se regeneran con un único builder**: `scripts/build-seasonal-hubs.mjs`.
- Fondo `#EDEDED`, banner de la banca `assets/christmas-hero-banner.webp` a `25svh`, ancho total y sin margen. Tarjetas limpias sin contornos, radios compactos y sombras sutiles.
- Los productos ilustrativos **no son enlazables a `product.html`** (ficha del proyector) porque no corresponden a esa identidad; no simular compra, stock, reputación ni envío.
- En el futuro el hub Navidad podrá consumir colecciones de Shopify; Regalos podrá consumir colecciones y reglas de merchandising/tagging por API, metafields o configuración de sitio, sin alterar el frontend.

## 5. Preparación Shopify: una sola inclusión global y menú editable

Archivos de referencia en el repo, **no instalados** en Shopify:

```text
shopify/snippets/santa-clausula-site-tabbar.liquid
shopify/assets/santa-clausula-site-tabbar.css
```

La referencia nativa utiliza un menú Shopify Navigation, handle `santa-clausula-tabbar`, de **exactamente cinco enlaces y en el orden fijado**. El operador podrá editar las URLs de los destinos desde Shopify Admin. En un tema real, se incluiría el snippet **una sola vez** desde el layout global del tema, sin codificar cinco menús por template ni reescribir al crear colecciones nuevas.

La instalación real queda pendiente de autenticación, recursos y tema Shopify operativo. `Navidad` y `Regalos` serán páginas/editorial landings de Shopify o destinos equivalentes según se pacte; `Pedidos` y `Ayuda` deben respetar las rutas seguras y el montaje de Tracking / Support de Protocol Data.

**Shopify no debe mezclar** navegación con el backend de Orders, Logistics, Support o Experiment/Experience. El tab no autoriza acciones; solo abre destinos.

## 6. Recepción / límites

```text
GLOBAL TABBAR SITE COMPONENT = V1 IMPLEMENTED
FIVE ROUTES = INCLUDED
NAVIDAD/REGALOS LANDINGS = IMPLEMENTED / DEMO
COLLECTION ROUTE GENERATOR = UPDATED
SHOPIFY NATIVE TABBAR BLUEPRINT = PREPARED / NOT INSTALLED
LIVE SHOPIFY / PROTOCOL DATA = NOT ACTIVE
VISUAL REVIEW ON DEVICES = PENDING
```

No fueron reescritos los formularios de Tracking/Support, Product, Conversations o la calificación CSAT. No se modificaron Supabase, Shopify Admin, pedidos ni inventario. La vista puede revisarse por URL en GitHub Pages una vez verificado el build.
