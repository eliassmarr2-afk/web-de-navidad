import { SITE_CONFIG } from "./config/site.js";
import { categories, filters, combos, products, filterProducts } from "./commerce/catalog.js";
import { collectionPath } from "./commerce/collection-adapter.js";
import { getCartCount } from "./commerce/cart.js";
import { getSessionLocation, saveSessionLocation } from "./shared/location-state.js";
import { emitSiteEvent } from "./shared/events.js";
import { resolveShippingForLocation } from "./protocol/logistics.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const elements = {
  menuToggle: $("#menuToggle"),
  menuClose: $("#menuClose"),
  menu: $("#siteMenu"),
  menuOverlay: $("#menuOverlay"),
  cartButton: $("#cartButton"),
  cartCount: $("#cartCount"),
  locationTrigger: $("#locationTrigger"),
  mapTrigger: $("#mapTrigger"),
  locationPrimary: $("#locationPrimary"),
  locationSecondary: $("#locationSecondary"),
  locationModal: $("#locationModal"),
  locationClose: $("#locationClose"),
  locationCancel: $("#locationCancel"),
  locationForm: $("#locationForm"),
  postalCode: $("#postalCode"),
  streetAddress: $("#streetAddress"),
  productSearch: $("#productSearch"),
  categoryList: $("#categoryList"),
  comboList: $("#comboList"),
  filterList: $("#filterList"),
  productGrid: $("#productGrid"),
  resultCount: $("#resultCount"),
  emptyState: $("#emptyState"),
  toast: $("#toast"),
};

let toastTimer;
let activeFilter = null;

function formatMoney(value) {
  return new Intl.NumberFormat(SITE_CONFIG.locale, {
    style: "currency",
    currency: SITE_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 2800);
}

function openMenu() {
  elements.menuOverlay.hidden = false;
  elements.menu.classList.add("is-open");
  elements.menu.setAttribute("aria-hidden", "false");
  elements.menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
  emitSiteEvent("navigation_menu_opened");
}

function closeMenu() {
  elements.menu.classList.remove("is-open");
  elements.menu.setAttribute("aria-hidden", "true");
  elements.menuToggle.setAttribute("aria-expanded", "false");
  elements.menuOverlay.hidden = true;
  document.body.classList.remove("no-scroll");
}

function openLocationModal() {
  closeMenu();
  const current = getSessionLocation();
  elements.postalCode.value = current?.postalCode || "";
  elements.streetAddress.value = current?.address || "";
  elements.locationModal.hidden = false;
  document.body.classList.add("no-scroll");
  emitSiteEvent("shipping_location_opened");
}

function closeLocationModal() {
  elements.locationModal.hidden = true;
  document.body.classList.remove("no-scroll");
}

function updateLocationUI(location = getSessionLocation()) {
  if (!location) {
    elements.locationPrimary.textContent = "¿A dónde lo enviamos?";
    elements.locationSecondary.textContent = "Ingresá tu código postal y dirección opcional";
    return;
  }

  elements.locationPrimary.textContent = `Enviar a ${location.visibleLabel}`;
  elements.locationSecondary.textContent = `CP ${location.postalCode} · guardado durante esta sesión`;
}

const iconMarkup = {
  tree: '<path d="M32 5 19 22h7L14 37h9L10 52h44L41 37h9L38 22h7Z"/><path d="M32 52v7M25 21l7-8 7 8"/><circle cx="30" cy="32" r="1"/><circle cx="39" cy="44" r="1"/>',
  gift: '<rect x="11" y="27" width="42" height="30" rx="3"/><path d="M8 20h48v10H8zM32 20v37"/><path d="M32 20C18 20 11 14 16 7c6-8 16 5 16 13Zm0 0c14 0 21-6 16-13-6-8-16 5-16 13Z"/>',
  ornament: '<circle cx="32" cy="37" r="19"/><path d="M26 18v-5h12v5M32 13V6M32 22v30M17 37h30M22 27l20 20M42 27 22 47"/><path d="M10 13v10M5 18h10M54 51v8M50 55h8"/>',
  lights: '<path d="M4 16c15 20 41 20 56 0M11 23v6M24 30v6M39 30v6M53 23v6"/><path d="M8 29h6l2 7-5 7-5-7Zm13 7h6l2 7-5 7-5-7Zm15 0h6l2 7-5 7-5-7Zm14-7h6l2 7-5 7-5-7Z"/>',
  wrap: '<path d="m8 22 33-13 14 33-33 13zM22 55l-5-13L50 29M16 25l12 28M39 9l13 31"/><path d="m22 17 4 5-4 5-4-5Zm22 19 4 5-4 5-4-5Z"/>',
  table: '<circle cx="32" cy="37" r="16"/><circle cx="32" cy="37" r="11"/><path d="M11 18v38M6 18v14h10V18M52 18v38M56 18v17h-8"/><path d="M30 7v9M26 9l4-6 4 6"/>',
  bow: '<path d="M32 31C23 15 8 12 6 24c-2 13 18 14 26 7Zm0 0c9-16 24-19 26-7 2 13-18 14-26 7Z"/><rect x="28" y="27" width="8" height="10" rx="2"/><path d="m28 35-13 23-3-12-10-2 17-11m17 2 13 23 3-12 10-2-17-11"/>',
  sale: '<path d="M9 10h27l19 19-26 26L9 35Z"/><circle cx="22" cy="23" r="4"/><path d="m25 45 17-17M30 32h1M39 41h1"/>'
};

function iconSVG(name) {
  return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    (iconMarkup[name] || iconMarkup.gift) + '</svg>';
}

function renderCategories() {
  // Each category now has a unique static URL. It shares ONE collection
  // renderer and will later map to /collections/{handle} in Shopify.
  elements.categoryList.innerHTML = categories.map(category => `
    <a class="category-card" href="${collectionPath(category.id)}" data-collection-handle="${category.id}">
      <span class="category-card__image">${iconSVG(category.icon)}</span>
      <span class="category-card__label">${category.label}</span>
    </a>`).join("");
}

function renderFilters() {
  elements.filterList.innerHTML = filters.map(filter => `
    <button class="filter-chip" type="button" data-filter="${filter.id}" aria-pressed="false">
      ${iconSVG(filter.icon)}<span>${filter.label}</span>
    </button>`).join("");
}

function renderCombos() {
  elements.comboList.innerHTML = combos.map(combo => `
    <article class="combo-card">
      <div class="combo-card__media" aria-label="Fotografía comercial pendiente">
        <div class="holiday-media holiday-media--combo" aria-hidden="true">${iconSVG("gift")}<span>Imagen próximamente</span></div>
      </div>
      <div class="combo-card__content">
        <h3>${combo.title}</h3>
        <p>${combo.subtitle}</p>
        <div class="stars" aria-label="Representación visual de estrellas; sin reseñas verificadas">★★★★★</div>
        <div class="price-row">
          <strong class="price-current">${formatMoney(combo.price)}</strong>
          <span class="price-old">${formatMoney(combo.compareAt)}</span>
        </div>
        <button class="offer-link" type="button" data-offer="${combo.id}">Explorar packs →</button>
      </div>
    </article>`).join("");
}

function renderProducts(list = products) {
  elements.resultCount.textContent = `${list.length} producto${list.length === 1 ? "" : "s"} · demo`;
  elements.emptyState.hidden = list.length > 0;
  elements.productGrid.innerHTML = list.map(product => `
    <article class="product-card" data-product-id="${product.id}" tabindex="0" role="link" aria-label="Ver ${product.title}">
      <div class="product-card__media">
        <img src="${product.image}" alt="Imagen temporal de ${product.title}" loading="lazy" />
      </div>
      <div class="product-card__content">
        <h3>${product.title}</h3>
        <p class="product-card__subtitle">${product.subtitle}</p>
        <div class="stars" aria-label="Estrellas ilustrativas, no valoraciones reales">★★★★★</div>
        <span class="delivery-badge" title="Demo visual. Logistics todavía no está integrado.">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3Z" /><path d="M14 9h4l3 3v4h-7Z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
          Envío a tu dirección
        </span>
        <small class="delivery-demo-note">Envío y precio ilustrativos · sin compra real</small>
        <div class="product-card__divider"></div>
      </div>
      <div class="product-card__commerce">
        <span class="trust-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6v5c0 5.2 3.4 8.5 8 10 4.6-1.5 8-4.8 8-10V6Z" /><path d="m9 12 2 2 4-4" /></svg>Comercio de demostración</span>
        <strong class="product-card__price">${formatMoney(product.price)}</strong>
      </div>
    </article>`).join("");
}

function applyCatalog() {
  renderProducts(filterProducts({ query: elements.productSearch.value, filter: activeFilter }));
  $("[data-filter]", elements.filterList).forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)));
}

function runSearch(query) {
  activeFilter = null;
  applyCatalog();
  emitSiteEvent("catalog_search_changed", {
    query: String(query || "").trim(),
    resultCount: filterProducts({ query }).length,
  });
}

function selectFilter(filter) {
  activeFilter = activeFilter === filter ? null : filter;
  elements.productSearch.value = "";
  applyCatalog();
  $("#productos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  emitSiteEvent("catalog_filter_selected", { filter: activeFilter || "all" });
}

function openProduct(productId) {
  emitSiteEvent("product_card_opened", { productId });
  window.location.href = `./product.html?id=${encodeURIComponent(productId)}`;
}

async function handleLocationSubmit(event) {
  event.preventDefault();

  const postalCode = elements.postalCode.value.trim().toUpperCase();
  const address = elements.streetAddress.value.trim();
  const isValid = /^(?:\d{4}|[A-Z]\d{4}[A-Z]{3})$/.test(postalCode);

  if (!isValid) {
    showToast("Ingresá un CP de 4 dígitos o un CPA completo.");
    return;
  }

  const location = saveSessionLocation({ postalCode, address });
  updateLocationUI(location);
  closeLocationModal();

  const shipping = await resolveShippingForLocation(location);
  emitSiteEvent("shipping_location_saved", {
    postalCode: location.postalCode,
    hasAddress: Boolean(location.address),
    shippingStatus: shipping.status,
  });

  showToast(`Ubicación guardada: ${location.visibleLabel}.`);
}

function bindEvents() {
  elements.menuToggle.addEventListener("click", openMenu);
  elements.menuClose.addEventListener("click", closeMenu);
  elements.menuOverlay.addEventListener("click", closeMenu);

  elements.locationTrigger.addEventListener("click", openLocationModal);
  elements.mapTrigger.addEventListener("click", openLocationModal);
  elements.locationClose.addEventListener("click", closeLocationModal);
  elements.locationCancel.addEventListener("click", closeLocationModal);
  elements.locationModal.addEventListener("click", (event) => {
    if (event.target === elements.locationModal) closeLocationModal();
  });
  elements.locationForm.addEventListener("submit", handleLocationSubmit);

  elements.productSearch.addEventListener("input", (event) => runSearch(event.target.value));

  elements.categoryList.addEventListener("click", (event) => {
    const link = event.target.closest("[data-collection-handle]");
    if (!link) return;
    emitSiteEvent("collection_open_requested", {
      handle: link.dataset.collectionHandle, source: "home_rail",
    });
  });

  elements.filterList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (button) selectFilter(button.dataset.filter);
  });

  elements.comboList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-offer]");
    if (!button) return;
    emitSiteEvent("commercial_offer_opened", { offerId: button.dataset.offer, source: "home_combo" });
    selectFilter("packs");
  });

  elements.productGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-product-id]");
    if (card) openProduct(card.dataset.productId);
  });

  elements.productGrid.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const card = event.target.closest("[data-product-id]");
    if (!card) return;
    event.preventDefault();
    openProduct(card.dataset.productId);
  });

  elements.cartButton.addEventListener("click", () => {
    emitSiteEvent("cart_open_requested", { count: getCartCount() });
    showToast("Carrito preparado arquitectónicamente; su vista se construirá después.");
  });

  $('[data-collection-nav]').forEach((link) => link.addEventListener("click", () => {
    emitSiteEvent("collection_open_requested", {
      handle: link.dataset.collectionNav, source: "home_menu",
    });
  }));

  $$('[data-close-menu]').forEach((link) => link.addEventListener("click", closeMenu));

  $$('[data-reserved]').forEach((control) => control.addEventListener("click", () => {
    closeMenu();
    showToast(`${control.dataset.reserved}: superficie reservada para un próximo build.`);
  }));

  window.addEventListener("web-de-navidad:cart-change", () => {
    elements.cartCount.textContent = String(getCartCount());
  });


  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!elements.locationModal.hidden) closeLocationModal();
    if (elements.menu.classList.contains("is-open")) closeMenu();
  });
}

function init() {
  renderCategories();
  renderFilters();
  renderCombos();
  renderProducts(products);
  updateLocationUI();
  elements.cartCount.textContent = String(getCartCount());
  bindEvents();
  emitSiteEvent("home_viewed", { environment: SITE_CONFIG.environment });
}

init();
