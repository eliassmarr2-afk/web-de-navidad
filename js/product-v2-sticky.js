import { getSessionLocation } from "./shared/location-state.js";

/* SANTA CLAUSULA — Sticky Purchase V2, approved 2026-11-04.
   UI-only module; no direct calls to Logistics/Shopify or pricing logic.
   The established #productPrice remains the sole rendered offer-price source.
*/
const sticky = document.getElementById("christmasPurchaseSticky");
const checkoutButton = document.getElementById("startCheckout");
const shippingLabel = document.getElementById("stickyShippingLabel");
const deliveryBadge = document.getElementById("stickyDeliveryBadge");
const installmentsLabel = document.getElementById("stickyInstallmentsLabel");
const toast = document.getElementById("toast");
const SCROLL_THRESHOLD = 0.30;
let framePending = false;
let toastHideTimer = null;

function updateStickyVisibility() {
  framePending = false;
  if (!sticky) return;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const visible = maxScroll > 0 && window.scrollY >= maxScroll * SCROLL_THRESHOLD;
  sticky.classList.toggle("is-visible", visible);
  sticky.setAttribute("aria-hidden", String(!visible));
  sticky.inert = !visible;
}

function scheduleVisibilityUpdate() {
  if (framePending) return;
  framePending = true;
  window.requestAnimationFrame(updateStickyVisibility);
}

function resetShippingDisplay() {
  const context = getSessionLocation();
  const hasPostalCode = Boolean(String(context?.postalCode || "").trim());
  if (shippingLabel) shippingLabel.textContent = hasPostalCode ? "Envío por consultar" : "Calculá el envío con tu CP";
  if (deliveryBadge) {
    deliveryBadge.dataset.status = "pending";
    deliveryBadge.textContent = hasPostalCode ? "Entrega por confirmar" : "Ingresá tu CP";
  }
}

function showDemoNotice() {
  if (!toast) return;
  window.clearTimeout(toastHideTimer);
  toast.textContent = "La compra todavía no está habilitada. Esta es una tienda de demostración.";
  toast.classList.add("is-visible");
  toastHideTimer = window.setTimeout(() => {
    if (toast.textContent.includes("La compra todavía no está habilitada")) {
      toast.classList.remove("is-visible");
    }
  }, 3600);
}

/* Local presentation contract for a FUTURE verified, authorized shipping
   adapter. An event is NOT proof of backend authority by itself. The adapter
   must validate public origin/store, query Logistics, and normalize results.
   This site does not register any producer for this event while inactive.
   detail: { authority:"protocol-data-logistics", status:"resolved",
             postalCode:"1414", freeShipping:boolean,
             shippingLabel?:"Envío $...", deliveryLabel?:"Llega mañana" }.
   Delayed quotes for another CP must never affect the active session.
*/
function onShippingQuote(event) {
  const q = event.detail;
  const currentCP = String(getSessionLocation()?.postalCode || "").trim().toUpperCase();
  if (!q || q.authority !== "protocol-data-logistics" || q.status !== "resolved") return;
  if (!currentCP || String(q.postalCode || "").trim().toUpperCase() !== currentCP) return;
  if (shippingLabel) {
    if (q.freeShipping === true) shippingLabel.textContent = "Envío gratis";
    else if (typeof q.shippingLabel === "string" && q.shippingLabel.trim()) shippingLabel.textContent = q.shippingLabel.trim().slice(0, 80);
    else shippingLabel.textContent = "Costo de envío a confirmar";
  }
  if (deliveryBadge) {
    const label = typeof q.deliveryLabel === "string" ? q.deliveryLabel.trim().slice(0, 40) : "";
    deliveryBadge.textContent = label || "Entrega por confirmar";
    deliveryBadge.dataset.status = label ? "resolved" : "pending";
  }
}

function onPaymentTerms(event) {
  // Payment instalment terms come from the future commercial/payment adapter,
  // never from Logistics. They stay unclaimed until a verified offer exists.
  const data = event.detail;
  if (!data || data.authority !== "checkout-provider" || data.status !== "resolved") return;
  if (typeof data.label === "string" && data.label.trim() && installmentsLabel) {
    installmentsLabel.textContent = data.label.trim().slice(0, 110);
  }
}

sticky?.setAttribute("aria-hidden", "true");
if (sticky) sticky.inert = true;
resetShippingDisplay();
scheduleVisibilityUpdate();
window.addEventListener("scroll", scheduleVisibilityUpdate, { passive: true });
window.addEventListener("resize", scheduleVisibilityUpdate);
window.addEventListener("pageshow", scheduleVisibilityUpdate);
window.addEventListener("web-de-navidad:location-change", resetShippingDisplay);
window.addEventListener("santa-clausula:shipping-quote", onShippingQuote);
window.addEventListener("santa-clausula:payment-terms", onPaymentTerms);
checkoutButton?.addEventListener("click", showDemoNotice);
