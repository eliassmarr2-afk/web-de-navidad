// Catálogo de demostración. No constituye inventario, precio ni promesa comercial real.
// Reemplazar por adapter de proveedor cuando se habilite Shopify.
export const categories = Object.freeze([
  { id: "arboles", label: "Árboles", icon: "tree" },
  { id: "regalos", label: "Regalos", icon: "gift" },
  { id: "decoracion", label: "Decoración", icon: "ornament" },
  { id: "luces", label: "Luces", icon: "lights" },
  { id: "envoltorios", label: "Envoltorios", icon: "wrap" },
  { id: "mesa", label: "Mesa", icon: "table" },
  { id: "monos", label: "Moños", icon: "bow" },
  { id: "ofertas", label: "Ofertas", icon: "sale" },
]);

export const filters = Object.freeze([
  { id: "packs", label: "Packs", icon: "gift" },
  { id: "promociones", label: "Promociones", icon: "sale" },
  { id: "para-regalar", label: "Para regalar", icon: "bow" },
  { id: "decoracion", label: "Decoración", icon: "ornament" },
  { id: "envoltorios", label: "Envoltorios", icon: "wrap" },
]);

export const combos = Object.freeze([
  { id: "pack-fiestas", title: "Pack Fiestas", subtitle: "Ideas para ambientar y celebrar.", price: 58990, compareAt: 74990 },
  { id: "pack-regalos", title: "Pack Regalos", subtitle: "Detalles especiales listos para regalar.", price: 42990, compareAt: 54990 },
  { id: "pack-mesa", title: "Pack Mesa", subtitle: "Una mesa preparada para compartir.", price: 62990, compareAt: 80990 },
]);

const image = "./assets/christmas-placeholder.svg";
export const products = Object.freeze([
  { id: "nav-001", category: "Árboles", title: "Árbol navideño clásico", subtitle: "Una Navidad para recordar", price: 89990, compareAt: 109990, tags: ["decoracion", "para-regalar"], image },
  { id: "nav-002", category: "Regalos", title: "Set de regalos festivos", subtitle: "Detalles para sorprender", price: 35990, compareAt: 42990, tags: ["packs", "para-regalar", "promociones"], image },
  { id: "nav-003", category: "Decoración", title: "Corona decorativa", subtitle: "Un recibimiento especial", price: 24990, compareAt: 29990, tags: ["decoracion"], image },
  { id: "nav-004", category: "Luces", title: "Luces cálidas navideñas", subtitle: "Iluminá tus mejores momentos", price: 19990, compareAt: 25990, tags: ["decoracion", "promociones"], image },
  { id: "nav-005", category: "Envoltorios", title: "Papeles festivos x3", subtitle: "Para envolver cada sorpresa", price: 10990, compareAt: 13990, tags: ["envoltorios", "para-regalar"], image },
  { id: "nav-006", category: "Mesa", title: "Centro de mesa navideño", subtitle: "El detalle de una gran noche", price: 29990, compareAt: 36990, tags: ["decoracion"], image },
  { id: "nav-007", category: "Moños", title: "Moños navideños x12", subtitle: "El toque final para regalar", price: 8990, compareAt: 11990, tags: ["envoltorios", "promociones", "para-regalar"], image },
  { id: "nav-008", category: "Ofertas", title: "Kit Navidad en casa", subtitle: "Un conjunto para toda la celebración", price: 67990, compareAt: 84990, tags: ["packs", "promociones", "para-regalar"], image },
]);

function normalized(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

export function filterProducts({ query = "", category = null, filter = null } = {}) {
  const needle = normalized(query);
  return products.filter(product => {
    const matchesCategory = !category || product.category === category;
    const matchesFilter = !filter || product.tags.includes(filter);
    const haystack = normalized([product.title, product.subtitle, product.category, ...product.tags].join(" "));
    return matchesCategory && matchesFilter && (!needle || haystack.includes(needle));
  });
}
export function searchProducts(query) {
  return filterProducts({ query });
}
