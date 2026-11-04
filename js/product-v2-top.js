import { getSessionLocation } from "./shared/location-state.js";

// Visual/controller glue for the APPROVED TOP of Product V2 only.
// Does not mount a second location form or alter post-image commerce modules.
const locationBanner = document.getElementById("productLocationBanner");
const locationLabel = document.getElementById("productLocationLabel");
const deliveryAction = document.getElementById("productDeliveryAction");
const deliveryMessage = document.getElementById("productDeliveryMessage");
const legacyLocationTrigger = document.getElementById("locationTrigger");

function syncLocation() {
  const saved = getSessionLocation();
  const label = String(saved?.visibleLabel || saved?.address || (saved?.postalCode ? `CP ${saved.postalCode}` : "")).trim();
  if (locationLabel) {
    locationLabel.textContent = label ? `Llega a ${label}` : "Colocá tu dirección de envío";
  }
  if (locationBanner) {
    locationBanner.setAttribute("aria-label", label ? `Cambiar domicilio de envío: ${label}` : "Colocá tu dirección de envío");
  }
  if (deliveryMessage) {
    deliveryMessage.textContent = label
      ? `Destino: ${label}. Todavía no tenemos una fecha de entrega confirmada.`
      : "Ingresá tu domicilio para consultar la entrega.";
  }
}

function openSharedLocationFlow() {
  // The existing two-field Product location sheet stays intact. The runtime
  // writes to the SAME Session Location Context as Home, not an Indumentary key.
  legacyLocationTrigger?.click();
}

locationBanner?.addEventListener("click", openSharedLocationFlow);
deliveryAction?.addEventListener("click", openSharedLocationFlow);
window.addEventListener("web-de-navidad:location-change", syncLocation);
window.addEventListener("pageshow", syncLocation);
syncLocation();
