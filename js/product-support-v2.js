(() => {
  "use strict";

  /*
   * SANTA CLAUSULA / Product Inquiry V2 (Case C)
   * One UI controller for the existing landing-product support button.
   * DESIGN ONLY: this module does not create Support Cases, transmit PII,
   * send messages, synthesize operator replies or persist a fake conversation.
   * Product data below is presentational, NOT proof of an Order or buyer.
   */
  const byId = (id) => document.getElementById(id);
  const openButton = byId("productSupportButton");
  const backdrop = byId("productSupportBackdrop");
  const sheet = byId("productSupportSheet");
  const closeButton = byId("closeProductSupport");
  const form = byId("productSupportForm");
  const name = byId("productSupportName");
  const email = byId("productSupportEmail");
  const message = byId("productSupportMessage");
  const image = byId("supportProductImage");
  const title = byId("supportProductTitle");
  const offer = byId("supportProductOffer");
  const feedback = byId("productSupportFeedback");

  if (!openButton || !backdrop || !sheet || !closeButton ||
      !form || !name || !email || !message || !image || !title || !offer || !feedback) return;

  let previousFocus = null;

  // Commerce Adapter seam. All values are read from the current product page
  // for visual display only. Backend must later resolve canonical Product /
  // Offer identifiers from its own trusted Shopify/Commerce data sources.
  function readProductPreview() {
    const product = byId("productImage");
    const selected = document.querySelector("#offerList .product-combo-card.is-selected");
    const selectedTitle = selected?.querySelector(".product-combo-card__content h3");
    return {
      title: byId("productTitle")?.textContent?.trim() || "Producto consultado",
      image: product?.currentSrc || product?.src || "./assets/proyector-navideno-producto.webp",
      offerLabel: selected
        ? "Oferta seleccionada: " + (selectedTitle?.textContent?.trim() || "Combo")
        : "Producto consultado"
    };
  }

  function clearFeedback() {
    feedback.hidden = true;
    feedback.textContent = "";
  }

  function refreshProduct() {
    const context = readProductPreview();
    title.textContent = context.title;
    offer.textContent = context.offerLabel;
    image.alt = context.title;
    image.src = context.image;
  }

  function open() {
    previousFocus = document.activeElement;
    refreshProduct();
    clearFeedback();
    backdrop.hidden = false;
    document.body.classList.add("product-inquiry-modal-open");
    openButton.setAttribute("aria-expanded", "true");
    closeButton.focus({ preventScroll: true });
  }

  function close() {
    backdrop.hidden = true;
    document.body.classList.remove("product-inquiry-modal-open");
    openButton.setAttribute("aria-expanded", "false");
    form.reset();
    clearFeedback();
    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus({ preventScroll: true });
    }
  }

  openButton.setAttribute("aria-controls", "productSupportSheet");
  openButton.setAttribute("aria-haspopup", "dialog");
  openButton.setAttribute("aria-expanded", "false");
  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });

  sheet.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(sheet.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'
    )).filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  for (const input of [name, email, message]) {
    input.addEventListener("input", clearFeedback);
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!name.value.trim()) {
      name.setCustomValidity("Ingresá tu nombre y apellido.");
      name.reportValidity();
      return;
    }
    name.setCustomValidity("");
    if (!email.value.trim() || !email.checkValidity()) {
      email.setCustomValidity("Ingresá un correo electrónico válido.");
      email.reportValidity();
      return;
    }
    email.setCustomValidity("");
    if (!message.value.trim()) {
      message.setCustomValidity("Escribí tu consulta sobre este producto.");
      message.reportValidity();
      return;
    }
    message.setCustomValidity("");

    // Explicitly NO fake success, form submission, redirect or user message
    // storage. The preview link opens a separately labeled static fixture.
    feedback.textContent =
      "Esta función todavía está en modo demostración. No se creó una conversación, " +
      "no se envió el mensaje ni se guardaron tus datos. Podés revisar el diseño " +
      "desde «Ver vista previa del chat».";
    feedback.hidden = false;
  });
  name.addEventListener("input", () => name.setCustomValidity(""));
  email.addEventListener("input", () => email.setCustomValidity(""));
  message.addEventListener("input", () => message.setCustomValidity(""));
})();