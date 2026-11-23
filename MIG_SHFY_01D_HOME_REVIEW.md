# MIG-SHFY-01D — Auditoría y refinamiento de la Home (Shopify Horizon)

**Fecha:** 2026-11-23 · Buenos Aires (UTC−03)  
**Tienda conectada:** `b06xsm-bh.myshopify.com` · cuenta verificada por conector Shopify  
**Tema:** Horizon `MAIN` · `gid://shopify/OnlineStoreTheme/191330517191`  
**Versión Shopify guardada:** `a156f073d8e4c846df3cb57b77cb9b84a910442e`  
**Shopify:** `awaitingPublish` = 13 archivos, `pending=[]`, `pushErrors=[]`, `rejectedReason=null`  
**GitHub original:** `main` `7111c545b26e92b6b2b4801534659afeed02a5c1` (sin modificaciones).  
**Estado:** MEJORAS DE FIDELIDAD CONSTRUIDAS Y GUARDADAS / NO PUBLICADO / ACEPTACIÓN VISUAL DE OPERADOR PENDIENTE.

## 1. Fuente de comparación

Se reabrieron los originales exactos:
- `index.html`, `css/base.css`, `css/home.css`, `css/navidad-home.css`;
- `js/app.js`, en particular `iconMarkup` con los ocho iconos SVG;
- `assets/coupon-ticket-mask.svg` (mascarilla original con esquinas cóncavas y dos muescas intermedias);
- `CHRISTMAS_COUPON_BANNER_V1.md` y `HOME_V1_APPROVED_VISUAL_REVISION.md`.

## 2. Correcciones MIG-SHFY-01D realizadas y guardadas

1. **Tipografía:** cargo Manrope 400–800 en la cabecera HTML únicamente de la Home; las demás páginas mantienen su tipografía Horizon.
2. **Cupón:** `assets/sds-coupon-ticket-mask.svg` reproduce la máscara del ticket original. `assets/sds-home.css` utiliza `mask-image` y `-webkit-mask-image` para el contorno y sombra exterior separada, preservando la imagen íntegra 2022×778.
3. **Menú lateral:** `sections/sds-home-hero.liquid` ahora abre un `dialog` nativo de lado izquierdo (`sds-menu-dialog`), desacoplado del hero con `overflow:hidden`. `assets/sds-home.js` abre/cierra el diálogo y restaura foco.
4. **Footer:** `sections/sds-home-footer.liquid` reutiliza la composición de marca y enlaces; los enlaces sin destino Shopify permanecen no accionables. En Home se omite el footer Horizon para evitar duplicación; en otras páginas no se altera.
5. **Iconografía exacta:** `snippets/sds-home-icon.liquid` contiene los ocho vectores SVG de `js/app.js` y es consumido por categorías y por filtros; filtros exponen selector de icono editable desde Shopify. `templates/index.json` mapea 8 categorías y 5 filtros.
6. **Orden de Home:** 7 secciones: `sds_hero`, `sds_categories`, `sds_coupon`, `sds_packs`, `sds_products`, `sds_footer`, `sds_tabs`.
7. **Límites conservados:** carrito/búsqueda nativos Shopify, CP en sesión sin tarifa ni disponibilidad inventadas, tracking no conectado, sin comandos reales de Soporte/Protocol Data.

## 3. Verificaciones realizadas

- `jq` de orden y bloques en `templates/index.json`: 4 comprobaciones true (7 secciones, 8 categorías, 5 filtros, 5 pestañas).
- `sections/sds-home-*.liquid` cuenta 6 esquemas.
- `layout/theme.liquid` presenta 2 exclusiones limitadas a `request.page_type == 'index'` (header/footer Horizon).
- El nuevo diálogo de menú aparece en el marcado y CSS/JS; el recurso SVG de cupón existe.
- Render de screenshot Shopify de Home: escritorio `1440px` y móvil `390px`, sin error en la herramienta.
- El guardado `theme_commit` de Shopify devolvió SHA real `a156f073d8e4c846df3cb57b77cb9b84a910442e` sin rechazos y 13 archivos en `awaitingPublish`.
- **No** se realizaron pruebas interactivas reales en navegador de CP, menú, búsqueda y carrito; no se afirma PASS de esos flujos.
- **No** se dispone aquí de un comparador de píxeles o captura binaria para certificar visualmente 1:1; la herramienta de screenshot acredita la generación, no una revisión humana exhaustiva de fidelidad.
- **No** se llamó a `theme_publish`.

## 4. Bloqueantes para publicación real

1. **Aceptación visual del operador** en el preview: escritorio/móvil, foto de hero, máscara de cupón, iconos, espaciado, tabbar, menú, footer y comportamiento de sesión.
2. **Cupón comercial contradictorio:** el arte original contiene 20% OFF y 25% OFF en la misma pieza. No activar descuentos ni mostrar como oferta real hasta elegir el beneficio y reemplazar el arte o certificar su validez comercial.
3. **Logotipo aprobado Santa Del Sur Store**: aún no existe como archivo identificable en la tienda Shopify. Los dos únicos medios de Shopify Files al cierre de auditoría son hero y cupón. Nunca reemplazar con el archivo ajeno `santa-clausula-logo.webp`.
4. Catálogo inexistente (0 productos en Shopify): no declarar packs, inventario, precios ni promociones reales; carriles vacíos con texto honesto.
5. Rutas Navidad/Regalos/Pedidos/Ayuda aún no migradas: pestañas sin destino se mantienen inertes.
6. La versión guardada en Shopify **aún no está copiada completamente como fuente editable en `shopify/` de la rama GitHub**. La rama reúne contrato y recibos. El acople directo GitHub↔Shopify no está activado.

## 5. Disposición

**MIG-SHFY-01D = IMPLEMENTADO / CAPTURAS GENERADAS / REVISIÓN VISUAL OPERADOR PENDIENTE / NOT LIVE.**  
Próxima fase después de aprobación: adaptar landings Navidad/Regalos y colecciones, luego Producto y ofertas. No conectar Protocol Data antes de cerrar migración de superficies comerciales.

**Regla:** la ausencia de publicación es intencional, no un error. Esta entrega no autoriza `theme_publish`.
