/*
 * SANTA CLAUSULA / Collection Commerce Boundary V1.
 * SITE UI -> getCollectionPageModel(handle) -> mock now / Shopify adapter later.
 *
 * One collection identity == one stable handle, not one handwritten page.
 * The Shopify provider will replace loadCollectionPageModel without changing
 * the UI component or the eight generated static entry routes.
 */
import { categories, products } from "./catalog.js";

const temporaryBanner = "../assets/christmas-hero-banner.webp";

// SITE-OWNED PRESENTATION only. No product membership or price authority here.
// Keys are existing category ids/Shopify-target handles from catalog.js.
const presentation = Object.freeze({
  arboles: {
    eyebrow: "EL CORAZÓN DE LA NAVIDAD",
    description: "Árboles y detalles para crear el rincón más especial de las fiestas.",
    imagePosition: "50% 46%",
  },
  regalos: {
    eyebrow: "PARA SORPRENDER",
    description: "Ideas para envolver grandes momentos y compartir la alegría de regalar.",
    imagePosition: "50% 58%",
  },
  decoracion: {
    eyebrow: "HACÉ TU CASA MÁS NAVIDEÑA",
    description: "Adornos y pequeños detalles que transforman cada ambiente.",
    imagePosition: "58% 43%",
  },
  luces: {
    eyebrow: "ENCENDÉ LA MAGIA",
    description: "Destellos cálidos para iluminar cada celebración.",
    imagePosition: "45% 45%",
  },
  envoltorios: {
    eyebrow: "EL DETALLE TAMBIÉN IMPORTA",
    description: "Papeles y accesorios para que cada regalo sea una sorpresa.",
    imagePosition: "51% 65%",
  },
  mesa: {
    eyebrow: "MOMENTOS PARA COMPARTIR",
    description: "Ideas para vestir la mesa en las noches más especiales.",
    imagePosition: "55% 52%",
  },
  monos: {
    eyebrow: "UN TOQUE ESPECIAL",
    description: "Moños y terminaciones para regalos llenos de ilusión.",
    imagePosition: "48% 62%",
  },
  ofertas: {
    eyebrow: "OPORTUNIDADES DE TEMPORADA",
    description: "Descubrí nuestra selección de ofertas y conjuntos navideños.",
    imagePosition: "50% 52%",
  },
});

export const COLLECTION_HANDLES = Object.freeze(categories.map((category) => category.id));

export function collectionPath(handle, prefix = "./") {
  if (!COLLECTION_HANDLES.includes(handle)) return null;
  return `${prefix}colecciones/${handle}.html`;
}

export function collectionIndex() {
  return categories.map(({ id, label, icon }) => ({
    handle: id,
    label,
    icon,
  }));
}

function demoProductsFor(category) {
  if (category.id === "ofertas") {
    return products.filter((product) => product.category === category.label || product.tags.includes("promociones"));
  }
  return products.filter((product) => product.category === category.label);
}

/**
 * Public contract of this adapter:
 * { handle, title, description, eyebrow, heroImage, heroAlt,
 *   heroPosition, seoTitle, products[], source, currency }
 *
 * When Shopify is connected, load the collection by handle through the
 * authorized provider and map collection.image, description, products,
 * pagination/sort and SKU/offer references into THIS contract. Never trust
 * a DOM label as canonical product membership.
 */
export async function loadCollectionPageModel(handle) {
  const category = categories.find((item) => item.id === handle);
  if (!category) return null;
  const visual = presentation[handle] || {};
  return {
    handle,
    title: category.label,
    description: visual.description || "",
    eyebrow: visual.eyebrow || "COLECCIÓN DE TEMPORADA",
    heroImage: temporaryBanner,
    heroAlt: `Ambientación navideña ilustrativa de la colección ${category.label}`,
    heroPosition: visual.imagePosition || "center",
    seoTitle: `${category.label} | SANTA CLAUSULA`,
    products: demoProductsFor(category),
    source: "demo",
    currency: "ARS",
  };
}
