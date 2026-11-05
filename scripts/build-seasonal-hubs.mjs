/*
 * Generated seasonal hub entries for GitHub Pages.
 * One template, two routes, one shared JS+CSS; no page-specific code.
 * Run: node scripts/build-seasonal-hubs.mjs
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const entries = [
  {
    "id": "navidad",
    "title": "Navidad",
    "visible": "Viví la Navidad",
    "description": "Explorá todo para celebrar la Navidad en SANTA CLAUSULA: árboles, luces, regalos y decoración."
  },
  {
    "id": "regalos",
    "title": "Regalos",
    "visible": "Regalos para sorprender",
    "description": "Ideas para regalar en Navidad: regalos, envoltorios, moños y selecciones especiales de SANTA CLAUSULA."
  }
];
const template = "<!doctype html>\n<html lang=\"es-AR\" data-hub=\"{{HUB_ID}}\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n  <meta name=\"theme-color\" content=\"#EDEDED\" />\n  <meta name=\"santa-clausula-hub-build\" content=\"20261105-tabbar-v1\" />\n  <title>{{SEO_TITLE}} | SANTA CLAUSULA</title>\n  <meta name=\"description\" content=\"{{SEO_DESCRIPTION}}\" />\n  <link rel=\"icon\" type=\"image/webp\" href=\"./assets/santa-clausula-logo.webp\" />\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n  <link href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap\" rel=\"stylesheet\" />\n  <link rel=\"stylesheet\" href=\"./css/seasonal-hub.css?v=20261105-tabbar-v1\" />\n  <link rel=\"stylesheet\" href=\"./css/site-tabbar.css?v=20261105-tabbar-v1\" />\n</head>\n<body class=\"sc-hub-page\">\n  <section class=\"sc-hub-hero\" aria-label=\"Imagen navideña de temporada\">\n    <img src=\"./assets/christmas-hero-banner.webp\" alt=\"Escena ilustrativa de Navidad\" fetchpriority=\"high\" decoding=\"async\" />\n    <div class=\"sc-hub-hero__top\">\n      <a href=\"./index.html\" class=\"sc-hub-hero__back\" aria-label=\"Volver al inicio\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m15 18-6-6 6-6\"/></svg></a>\n      <a href=\"./index.html\" class=\"sc-hub-hero__brand\">SANTA CLAUSULA</a>\n      <span class=\"sc-hub-hero__space\" aria-hidden=\"true\"></span>\n    </div>\n    <span class=\"sc-hub-hero__caption\">LA MAGIA DE LA NAVIDAD</span>\n  </section>\n  <main class=\"sc-hub-main\">\n    <nav class=\"sc-hub-breadcrumb\" aria-label=\"Ruta de navegación\">\n      <a href=\"./index.html\">Inicio</a><span aria-hidden=\"true\">/</span><span aria-current=\"page\">{{SEO_TITLE}}</span>\n    </nav>\n    <header class=\"sc-hub-head\">\n      <p id=\"hubEyebrow\" class=\"sc-hub-eyebrow\"></p>\n      <h1 id=\"hubTitle\">{{VISIBLE_TITLE}}</h1>\n      <p id=\"hubIntro\"></p>\n    </header>\n    <section class=\"sc-hub-section\" aria-labelledby=\"hubCollectionTitle\">\n      <h2 id=\"hubCollectionTitle\">Encontrá tu inspiración</h2>\n      <p id=\"hubCollectionCaption\" class=\"sc-hub-section__caption\"></p>\n      <div class=\"sc-hub-collection-grid\" id=\"hubCollections\" aria-label=\"Colecciones navideñas\"></div>\n    </section>\n    <section class=\"sc-hub-section\" aria-labelledby=\"hubProductTitle\">\n      <h2 id=\"hubProductTitle\">Ideas navideñas</h2>\n      <p class=\"sc-hub-section__caption\">Selección de demostración de nuestro catálogo.</p>\n      <div class=\"sc-hub-product-grid\" id=\"hubProducts\"></div>\n      <p class=\"sc-hub-demo-note\">Los productos y precios son ilustrativos. Próximamente, el contenido comercial provendrá de Shopify.</p>\n    </section>\n  </main>\n  <footer class=\"sc-hub-footer\">\n    <p><strong>SANTA CLAUSULA</strong> · Tu Navidad, a tu manera.</p>\n    <a href=\"./soporte.html\">¿Necesitás ayuda?</a>\n  </footer>\n  <nav class=\"sc-tabbar\" data-site-tabbar data-base=\"./\" data-active=\"{{HUB_ID}}\" aria-label=\"Navegación principal\"></nav>\n  <script type=\"module\" src=\"./js/seasonal-hub.js?v=20261105-tabbar-v1\"></script>\n  <script type=\"module\" src=\"./js/shared/site-tabbar.js?v=20261105-tabbar-v1\"></script>\n</body>\n</html>\n";
const escapeHtml = (v) => String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
export function renderHub({ id, title, visible, description }) {
  if (!/^(navidad|regalos)$/.test(id)) throw new Error("Unknown hub " + id);
  return template.replaceAll("{{HUB_ID}}",escapeHtml(id))
    .replaceAll("{{SEO_TITLE}}",escapeHtml(title))
    .replaceAll("{{VISIBLE_TITLE}}",escapeHtml(visible))
    .replaceAll("{{SEO_DESCRIPTION}}",escapeHtml(description));
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  for (const entry of entries) await writeFile(join(root,entry.id+".html"),renderHub(entry),"utf8");
  process.stdout.write("Generated " + entries.length + " seasonal hubs.\n");
}
