/*
 * SANTA CLAUSULA — Shared mobile tabbar V1
 * Single route registry / single component / all public storefront surfaces.
 * Shopify handoff: port the same route labels/visual semantics once into
 * the theme layout, never duplicate navigation for each collection/page.
 */
export const SITE_TABS = Object.freeze([
  { id: "home", label: "Inicio", path: "index.html", icon: "home" },
  { id: "navidad", label: "Navidad", path: "navidad.html", icon: "tree" },
  { id: "regalos", label: "Regalos", path: "regalos.html", icon: "gift" },
  { id: "pedidos", label: "Pedidos", path: "tracking.html", icon: "package" },
  { id: "ayuda", label: "Ayuda", path: "soporte.html", icon: "help" }
]);

// Rounded, stable 24x24 Lucide-style line icons. No remote icon library.
const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  tree: '<path d="M12 3 5 12h4l-5 6h16l-5-6h4z"/><path d="M12 18v4"/>',
  gift: '<rect x="3.5" y="9.5" width="17" height="11" rx="2"/><path d="M2.5 6.5h19v3h-19zM12 6.5v14"/><path d="M12 6.5C7.6 6.5 5.4 4 7.8 2.6 10.2 1.2 12 6.5Zm0 0c4.4 0 6.6-2.5 4.2-3.9-2.4-1.4-4.8 2.1-4.2 3.9Z"/>',
  package: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.3h17M9.5 9.3h5M9 15h6"/>',
  help: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 2v-7a8.5 8.5 0 1 1 18-3.5Z"/><path d="M10 9.3a2.4 2.4 0 0 1 4.5 1.1c0 1.5-2.5 1.7-2.5 3.3M12 17h.01"/>'
};

function icon(name) {
  return '<svg class="sc-tabbar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    paths[name] + "</svg>";
}

function renderTabbar(root) {
  if (root.dataset.tabbarRendered === "true") return;
  const base = root.dataset.base === "../" ? "../" : "./";
  const active = SITE_TABS.some((item) => item.id === root.dataset.active)
    ? root.dataset.active : "";

  root.classList.add("sc-tabbar");
  root.setAttribute("aria-label", "Navegación principal");
  root.innerHTML = SITE_TABS.map(({ id, label, path, icon: iconName }) => {
    const current = active === id;
    return '<a class="sc-tabbar__item' + (current ? ' sc-tabbar__item--current' : '') + '" href="' + base + path +
      '" data-tab="' + id + '"' + (current ? ' aria-current="page"' : '') + ' aria-label="' + label + '">' +
      '<span class="sc-tabbar__surface">' + icon(iconName) +
      '<span class="sc-tabbar__label">' + label + '</span></span></a>';
  }).join("");
  root.dataset.tabbarRendered = "true";
}

function initSiteTabbar() {
  document.querySelectorAll("[data-site-tabbar]").forEach(renderTabbar);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSiteTabbar, { once: true });
} else {
  initSiteTabbar();
}
