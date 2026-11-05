/*
 * SANTA CLAUSULA — shared collection page renderer V1.
 * No per-category HTML/JS code. Shopify becomes a commerce adapter later.
 */
import { collectionIndex, loadCollectionPageModel } from "./commerce/collection-adapter.js";
import { emitSiteEvent } from "./shared/events.js";

const byId = (id) => document.getElementById(id);
const handle = document.documentElement.dataset.collectionHandle;
const hero = byId("collectionHeroImage");
const title = byId("collectionTitle");
const eyebrow = byId("collectionEyebrow");
const description = byId("collectionDescription");
const breadcrumb = byId("collectionBreadcrumb");
const count = byId("collectionResultCount");
const grid = byId("collectionProductGrid");
const empty = byId("collectionEmpty");
const sortSelect = byId("collectionSort");
const otherLinks = byId("collectionOtherLinks");

function formatARS(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) return "";
  return new Intl.NumberFormat("es-AR", {
    style: "currency", currency: "ARS", maximumFractionDigits: 0
  }).format(value);
}

function safePictureSource(value) {
  const source = String(value || "");
  if (source.startsWith("./assets/")) return "../" + source.slice(2);
  if (/^https:\/\//i.test(source)) return source;
  return "../assets/christmas-placeholder.svg";
}

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = String(text);
  return node;
}

function productCard(product) {
  const card = createElement("article", "sc-collection-product-card");
  const media = createElement("div", "sc-collection-product-card__media");
  const picture = document.createElement("img");
  picture.src = safePictureSource(product.image);
  picture.alt = "Imagen ilustrativa de " + product.title;
  picture.loading = "lazy";
  picture.decoding = "async";
  media.append(picture);

  const body = createElement("div", "sc-collection-product-card__copy");
  const heading = createElement("h3", "", product.title);
  const subtitle = createElement("p", "", product.subtitle);
  const price = createElement("strong", "sc-collection-product-card__price", formatARS(product.price));
  body.append(heading, subtitle, price);
  const foot = createElement("p", "sc-collection-product-card__foot", "Vista previa · Sin compra activa");
  card.append(media, body, foot);
  // The current product.html shows a fixed proyector. Do not link unrelated
  // demo items to that product; Shopify products will supply real URLs later.
  return card;
}

function sortProducts(items, key) {
  const result = [...items];
  if (key === "price-asc") result.sort((a,b) => a.price - b.price);
  if (key === "price-desc") result.sort((a,b) => b.price - a.price);
  if (key === "name") result.sort((a,b) => a.title.localeCompare(b.title, "es"));
  return result;
}

function renderProducts(model) {
  const items = sortProducts(model.products, sortSelect?.value || "featured");
  grid.replaceChildren(...items.map(productCard));
  empty.hidden = items.length !== 0;
  count.textContent = items.length + " producto" + (items.length === 1 ? "" : "s") + " · demo";
}

function renderCollectionNavigation(currentHandle) {
  const links = collectionIndex().map((item) => {
    const a = createElement("a", "sc-collection-more__link", item.label);
    a.href = "./" + item.handle + ".html";
    if (item.handle === currentHandle) a.setAttribute("aria-current", "page");
    return a;
  });
  otherLinks.replaceChildren(...links);
}

async function init() {
  if (!handle || !hero || !title || !eyebrow || !description ||
      !breadcrumb || !count || !grid || !empty || !sortSelect || !otherLinks) return;
  try {
    const model = await loadCollectionPageModel(handle);
    if (!model) {
      title.textContent = "Colección no encontrada";
      description.textContent = "Volvé a Inicio para explorar las colecciones disponibles.";
      count.textContent = "Sin resultados";
      empty.hidden = false;
      return;
    }

    title.textContent = model.title;
    eyebrow.textContent = model.eyebrow;
    description.textContent = model.description;
    breadcrumb.textContent = model.title;
    document.title = model.seoTitle;
    hero.src = model.heroImage;
    hero.alt = model.heroAlt;
    hero.style.objectPosition = model.heroPosition;
    renderProducts(model);
    renderCollectionNavigation(model.handle);

    sortSelect.addEventListener("change", () => {
      renderProducts(model);
      emitSiteEvent("collection_sort_changed", {
        handle: model.handle,
        sort: sortSelect.value,
        source: model.source,
      });
    });
    emitSiteEvent("collection_viewed", {
      handle: model.handle,
      productCount: model.products.length,
      source: model.source,
    });
  } catch (_error) {
    count.textContent = "Colección no disponible";
    empty.hidden = false;
    empty.textContent = "No pudimos mostrar esta colección. Volvé a intentarlo más tarde.";
  }
}

init();
