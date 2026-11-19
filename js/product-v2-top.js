import { getSessionLocation } from "./shared/location-state.js";

// SDS-01.1 — approved compact header. No new form, storage or logistics adapter.
const locationBanner = document.getElementById("productLocationBanner");
const locationPopover = document.getElementById("productLocationPopover");
const locationLabel = document.getElementById("productLocationLabel");
const locationChange = document.getElementById("productLocationChange");
const locationChangeLabel = document.getElementById("productLocationChangeLabel");
const locationDismiss = document.getElementById("productLocationDismiss");
const deliveryAction = document.getElementById("productDeliveryAction");
const deliveryMessage = document.getElementById("productDeliveryMessage");
const legacyLocationTrigger = document.getElementById("locationTrigger");

let appearanceTimer = null;

function syncLocation() {
  const saved = getSessionLocation();
  const label = String(saved?.visibleLabel || saved?.address || (saved?.postalCode ? `CP ${saved.postalCode}` : "")).trim();
  if (locationLabel) {
    locationLabel.textContent = label ? `Llega a ${label}` : "Ingresá tu domicilio";
  }
  if (locationChangeLabel) locationChangeLabel.textContent = label ? "Cambiar" : "Ingresar";
  if (locationBanner) {
    locationBanner.setAttribute("aria-label", label ? `Cambiar domicilio de envío: ${label}` : "Colocá tu dirección de envío");
  }
  if (deliveryMessage) {
    deliveryMessage.textContent = label
      ? `Destino: ${label}. Todavía no tenemos una fecha de entrega confirmada.`
      : "Ingresá tu domicilio para consultar la entrega.";
  }
}

function dismissLocationPopover({ restoreFocus = false } = {}) {
  if (appearanceTimer !== null) {
    window.clearTimeout(appearanceTimer);
    appearanceTimer = null;
  }
  if (locationPopover) locationPopover.hidden = true;
  if (restoreFocus) locationBanner?.focus({ preventScroll: true });
}

function openSharedLocationFlow() {
  dismissLocationPopover();
  // The existing Product location sheet stays intact and writes the same
  // Session Location Context as Home. Do not open a parallel dialog.
  legacyLocationTrigger?.click();
}

locationBanner?.addEventListener("click", openSharedLocationFlow);
locationChange?.addEventListener("click", openSharedLocationFlow);
locationDismiss?.addEventListener("click", () => dismissLocationPopover({ restoreFocus: true }));
deliveryAction?.addEventListener("click", openSharedLocationFlow);
window.addEventListener("web-de-navidad:location-change", syncLocation);
window.addEventListener("pageshow", syncLocation);
window.addEventListener("pagehide", () => dismissLocationPopover());
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && locationPopover && !locationPopover.hidden && !document.body.classList.contains("no-scroll")) {
    dismissLocationPopover({ restoreFocus: locationPopover.contains(document.activeElement) });
  }
});
syncLocation();

if (locationPopover) {
  appearanceTimer = window.setTimeout(() => {
    appearanceTimer = null;
    // Do not interrupt a customer who already opened another modal.
    if (document.body.classList.contains("no-scroll")) return;
    syncLocation();
    locationPopover.hidden = false;
  }, 2000);
}
