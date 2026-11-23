# MIG-SHFY-02 — Source mirror verification / updated disposition

**Fecha:** 2026-11-23 · Buenos Aires  
**Fuente efectiva:** Shopify Horizon saved theme commit `a844ae1904321f26ff349d83dde8704a29b49878`.  
**Destino:** `eliassmarr2-afk/web-de-navidad` rama `construction/shopify-migration` exclusivamente, bajo `shopify/`.  
**Estado:** CODE MIRROR COMPLETADO (22/22 ARCHIVOS DE LA MIGRACIÓN). NO PUBLISHED / NOT LIVE.

## Mirror manifest
Se leyeron individualmente archivos desde Shopify `theme_bash` por lotes pequeños; los contenidos recibidos se registraron como blobs UTF-8 en GitHub. Los hashes incluidos a continuación representan el contenido exacto exportado por el conector. No se regeneraron del repositorio estático ni se sintetizaron.

| Archivo en Shopify | Blob SHA en GitHub |
|---|---|
| `shopify/assets/sds-seasonal-hub.css` | `da9307f64e125917699f001cf363be5818389345` |
| `shopify/snippets/sds-seasonal-tabbar.liquid` | `b161f6353dcc19d23469a8ec244594d1850d2d75` |
| `shopify/assets/sds-native-collection.css` | `1e7c59d1a9cc8f285caf725e8a05f56fe480d66a` |
| `shopify/sections/sds-native-collection.liquid` | `d1b701883c5bc1679ed747927a020816497c910a` |
| `shopify/sections/sds-seasonal-hub.liquid` | `22713733391ae74e5856e81e3c1ada7c6f1a04f4` |
| `shopify/assets/sds-shared-tabbar.css` | `a400b7b005d3a51bbf1956b30a11c471d5a67dd2` |
| `shopify/templates/page.navidad.json` | `cd685d5a8abb4273d42640e619fbaf003bfa0310` |
| `shopify/templates/page.regalos.json` | `2b65f00cae4e740b68f8d1b3695b5911bf2f21b3` |
| `shopify/templates/collection.json` | `c2ba6c660e3486e32ee2984456b2822bce676c14` |
| `shopify/layout/theme.liquid` | `560e02e1a0c83f28a2ea2058c3cafb9ce34cdb0a` |
| `shopify/DESIGN.md` | `a292ec2beb31c80d9b73c7fc522172c7ab3633b5` |
| `shopify/assets/sds-home.css` | `1f383e2cdb88a8c2bb500dbb7751abd2222ae945` |
| `shopify/assets/sds-home.js` | `b117d9d92d0278b26653d9e0cd0c476a26681479` |
| `shopify/sections/sds-home-categories.liquid` | `66ebc9cc64fcc53c6b38bcb5e0e16c12214823ab` |
| `shopify/sections/sds-home-coupon.liquid` | `97a15e5e7652fd0e04413002cb903c79bc87244f` |
| `shopify/sections/sds-home-footer.liquid` | `fb3d10c02a162d72a928970df28cf2323947825d` |
| `shopify/sections/sds-home-hero.liquid` | `702f69e19447a0f07a11cc83bfbd8dc5b52792c1` |
| `shopify/sections/sds-home-merch.liquid` | `a48467c60c9e2346411a670653679cf42cc6af2e` |
| `shopify/sections/sds-home-tabs.liquid` | `a17bf12e502105cd31769720c8a3f58eb07222b2` |
| `shopify/assets/sds-coupon-ticket-mask.svg` | `10fd5bf0e7df0cd482aa8e6931d28386660ea7c6` |
| `shopify/snippets/sds-home-icon.liquid` | `006cc6f808a585a42984f8e0d73c99d5b75f954b` |
| `shopify/templates/index.json` | `c09e02d58cbcabd2aba9bd659387c94a78101959` |

## Alcance de la copia
Los 22 archivos abarcan la Foundation y Home guardadas (MIG-SHFY-01), junto a las dos landings, renderer de colecciones, estilos, snippets y plantillas de MIG-SHFY-02. Constituyen **la superficie desarrollada/alterada por esta migración**, no una descarga completa de todos los archivos estándar Horizon.

La plantilla `shopify/templates/collection.json` de la rama reemplaza exclusivamente la vieja referencia inactiva. El blueprint histórico `shopify/sections/santa-clausula-collection.liquid` no es la implementación activa.

**Disposición actualiza** la limitación temporal consignada en `MIG_SHFY_02_NAVIDAD_REGALOS_COLLECTIONS_RECEIPT.md`: la exportación finalmente se completó tras dividirla en grupos pequeños.

## Límites de seguridad y release
- `main` GitHub sigue en `7111c545b26e92b6b2b4801534659afeed02a5c1`.
- Shopify theme version `a844ae1904321f26ff349d83dde8704a29b49878`: guardada sin `theme_publish`.
- Colecciones 8/8 creadas **unpublished**. Páginas Navidad/Regalos 2/2 creadas **unpublished**.
- Ningún producto importado; no se tocaron precios, envíos, carrito/checkout productivos, logística ni Protocol Data.
- En una activación futura, la publicación coordinada de páginas/colecciones y tema requiere autorización explícita; no asumirla de este checkpoint.

## Certificaciones aún pendientes
- Revisión visual interactiva de Navarra/Regalos/colecciones en móvil y escritorio contra origen.
- Verificar rutas reales cuando los recursos sean publicados; no afirmar que la URL pública de un borrador resuelve.
- Verificar navegación, filtro/ordenación, back, enlaces, teclado y estados vacíos.
- Resolver contenido real de productos, imágenes por colección y metaobjetos/metafields de bundles antes de habilitar ventas.
