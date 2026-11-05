/*
 * SANTA CLAUSULA — Seasonal Landing Hub V1
 * Shared presentation for Navidad + Regalos. No per-page commerce logic.
 * Real catalog and Shopify collection membership remain a provider boundary.
 */
import { categories, products } from "./commerce/catalog.js";
import { collectionPath } from "./commerce/collection-adapter.js";
import { emitSiteEvent } from "./shared/events.js";

const byId = (id) => document.getElementById(id);
const hub = document.documentElement.dataset.hub;
const configs = Object.freeze({
  navidad: {
    eyebrow: "LA TEMPORADA MÁS ESPERADA",
    title: "Viví la Navidad",
    intro: "Ideas, detalles y pequeños momentos que hacen que cada celebración sea especial.",
    firstHeading: "Encontrá tu inspiración",
    firstCaption: "Ocho colecciones para preparar la Navidad a tu manera.",
    handles: ["arboles","regalos","decoracion","luces","envoltorios","mesa","monos","ofertas"],
    productsHeading: "Favoritos de temporada",
    featured: products.slice(0,4)
  },
  regalos: {
    eyebrow: "LA ALEGRÍA DE REGALAR",
    title: "Regalos para sorprender",
    intro: "Inspirate con detalles especiales, envoltorios y pequeños gestos navideños.",
    firstHeading: "Elegí cómo sorprender",
    firstCaption: "Explorá colecciones pensadas para regalar.",
    handles: ["regalos","envoltorios","monos","ofertas"],
    productsHeading: "Ideas para regalar",
    featured: products.filter((product) =>
      product.category === "Regalos" || product.tags.includes("para-regalar"))
  }
});

function textNode(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = String(value ?? "");
  return node;
}

function collectionCard(category) {
  const a = document.createElement("a");
  a.className = "sc-hub-collection-card";
  a.href = collectionPath(category.id);
  const icon = textNode("span", "sc-hub-collection-card__monogram", category.label.slice(0,1));
  icon.setAttribute("aria-hidden", "true");
  const body = textNode("span", "sc-hub-collection-card__name", category.label);
  const arrow = textNode("span", "sc-hub-collection-card__arrow", "›");
  arrow.setAttribute("aria-hidden", "true");
  a.append(icon,body,arrow);
  return a;
}

function currency(value) {
  return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(value);
}

function productCard(item) {
  const card = textNode("article","sc-hub-product-card","");
  const img = document.createElement("img");
  img.src = item.image.startsWith("./assets/") ? item.image : "./assets/christmas-placeholder.svg";
  img.alt = "Imagen temporal de " + item.title;
  img.loading = "lazy";
  img.decoding = "async";
  const media = document.createElement("div");
  media.className = "sc-hub-product-card__media";
  media.append(img);
  const body = textNode("div","sc-hub-product-card__body","");
  body.append(
    textNode("strong","",item.title),
    textNode("span","",item.subtitle),
    textNode("b","",currency(item.price))
  );
  card.append(media,body);
  return card;
}

function render() {
  const config = configs[hub];
  if (!config) return;
  const ids = ["hubEyebrow","hubTitle","hubIntro","hubCollectionTitle","hubCollectionCaption","hubCollections","hubProductTitle","hubProducts"];
  if (ids.some((id) => !byId(id))) return;
  byId("hubEyebrow").textContent = config.eyebrow;
  byId("hubTitle").textContent = config.title;
  byId("hubIntro").textContent = config.intro;
  byId("hubCollectionTitle").textContent = config.firstHeading;
  byId("hubCollectionCaption").textContent = config.firstCaption;
  byId("hubProductTitle").textContent = config.productsHeading;
  const links = config.handles.map((handle) => categories.find((c) => c.id === handle)).filter(Boolean);
  byId("hubCollections").replaceChildren(...links.map(collectionCard));
  byId("hubProducts").replaceChildren(...config.featured.map(productCard));
  document.querySelectorAll("a[data-hub-collection]").forEach((a) => {
    a.href = collectionPath(a.dataset.hubCollection);
  });
  emitSiteEvent("seasonal_hub_viewed",{hub,collectionCount:links.length,source:"demo"});
}
render();
