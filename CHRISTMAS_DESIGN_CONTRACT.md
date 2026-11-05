> **REGLA TRANSVERSAL DE SUPERFICIES SIN CONTORNOS (APROBADA 2026-11-05):** En SANTA CLAUSULA no incorporar contornos decorativos coloreados a tarjetas, badges, estados o widgets. Su separación visual se resuelve por blancos/grises, espaciado y sombras suaves, cortas y de poco desenfoque. Las nuevas superficies deben usar preferentemente radio de 4px y conservar feedback accesible de foco por sombras/subrayados sin contornos coloreados. Esta revisión visual posterior prevalece sobre estilos de borde decorativo anteriores en superficies que se diseñen o refinen a partir de ahora. No autoriza cambiar en masa los demás módulos ya aprobados ni sus controles comerciales.

> **REVISIÓN VIGENTE (2026-11-04):** La composición móvil de este contrato fue modificada por [HOME_V1_APPROVED_VISUAL_REVISION.md](./HOME_V1_APPROVED_VISUAL_REVISION.md). En caso de conflicto prevalece la revisión posterior: hero full-bleed 25 % del alto, ubicación e íconos dentro del hero, buscador + mapa dentro del hero, una sola fila de categorías sin caja, banner medio con sombrero. La implementación de esta revisión está pendiente.

# WEB DE NAVIDAD — CONTRATO VISUAL Y FUNCIONAL V1

**Fecha:** 2026-11-03  
**Decisión:** Aprobado por el operador antes del primer build.  
**Aplicación:** Home responsive, prioridad móvil.  
**Origen técnico:** clon independiente del modelo Indumentary.

## Identidad visual

```text
TIPOGRAFÍA            Manrope
ROJO NAVIDEÑO         #B20B17
ROJO OSCURO           #850C17
ROSA MUY SUAVE        #FFF0F1
CANVAS                #FFF8F7
TARJETAS              #FFFFFF
SUPERFICIES GENERALES 16–20 px radius
BANNERS               20–24 px radius
ICONOS CATEGORÍA      BLANCOS
FORMATO CATEGORÍA     CÍRCULO ROJO
```

## Orden de la Home

1. Tira informativa navideña.
2. Header con hamburger / marca temporal / carrito.
3. Selector de ubicación que conserva código postal y dirección durante la sesión.
4. Buscador desacoplado del proveedor, operativo sobre catálogo mock.
5. Hero navideño superior (sin fotografía definitiva).
6. Categorías en dos rails horizontales desplazables:
   - Fila 1: Árboles, Regalos, Decoración, Luces.
   - Fila 2: Envoltorios, Mesa, Moños, Ofertas.
7. Filtros con íconos clickeables: Packs, Promociones, Para regalar, Decoración, Envoltorios.
8. Tres tarjetas de packs, scroll horizontal.
9. Banner comercial intermedio, relación **2,6:1**.
10. Catálogo responsive en tarjetas blancas, dos columnas en móvil.
11. Pie y navegación inferior móvil: Inicio / Navidad / Packs / Pedidos / Ayuda.

## Comportamiento

- La categoría seleccionada filtra productos por identidad categórica, sin hacer coincidencias vagas.
- El filtro se conmuta con `aria-pressed`; al pulsarlo otra vez se vuelve al catálogo completo.
- La búsqueda filtra por nombre, subtítulo, categoría y etiquetas con normalización de acentos.
- Categorías, filtros y búsqueda presentan una sola selección activa por vez; el conjunto de resultados se calcula desde el catálogo, no desde el DOM.
- Cada fila de categorías permite desplazamiento táctil y flechas funcionales.
- Los accesos Pedidos y Ayuda conservan las rutas existentes de Tracking y Soporte, aún pendientes de apariencia navideña.
- Carrito, ubicación y Event Layer usan claves/eventos propios del repositorio para evitar cruces de sesión con Indumentary.

## Guardas

- Sin archivos de fotografía comercial definitivos. `assets/christmas-placeholder.svg` es una reserva neutral.
- No se conecta Shopify ni Protocol Data en V1.
- Los precios, los productos, las estrellas y los estados comerciales son ilustrativos; no verifican inventario, reputación, entrega ni checkout.
- No borrar páginas ni contratos heredados del modelo de origen.
- Etapa siguiente: revisión visual móvil/escritorio; después creatividades/imágenes; luego skin y contenido de Producto, Tracking y Soporte.

## COLECCIONES — EXTENSIÓN 2026-11-05

- Contrato: `SANTA_CLAUSULA_COLLECTIONS_V1_SHOPIFY_CONTRACT.md`.
- Fondo `#EDEDED`, banner superior `25svh`, ancho completo y pegado al límite superior.
- Ocho rutas de colecciones, **una única plantilla y un adapter reemplazable**. Banco temporal de imagen propia `assets/christmas-hero-banner.webp` para los ocho banners; imágenes individuales se incorporarán por datos de colección en Shopify.
- Mantener norma sin bordes/contornos decorativos coloreados; sombras compactas.
- Inicio solo cambia navegación de colecciones, sin alterar los módulos comerciales aprobados.
