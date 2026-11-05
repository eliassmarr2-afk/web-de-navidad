(() => {
  "use strict";

  /*
   * SANTA CLAUSULA — Customer Conversation Visual V1 (Case A + B).
   * DESIGN PREVIEW ONLY: the "buyer-verified" URL is a static example,
   * never proof of a purchase, ownership, token or authorization.
   * No network requests, no state storage, no live customer messages.
   */
  const demo = document.getElementById("conversationDemo");
  const empty = document.getElementById("conversationEmpty");
  if (!demo || !empty) return;

  const requested = new URLSearchParams(window.location.search).get("demo");
  const mode = requested === "1" ? "general"
    : requested === "buyer-pending" ? "buyer-pending"
    : requested === "buyer-verified" ? "buyer-verified"
    : null;

  // The route does not consume capabilities yet. No hash-based possession
  // should accidentally look like an authenticated customer conversation.
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  const isPreview = mode !== null;
  demo.hidden = !isPreview;
  empty.hidden = isPreview;
  document.body.dataset.conversationMode = isPreview ? "visual-preview" : "unavailable";
  if (!isPreview) return;

  document.body.dataset.conversationExample = mode;
  const subtitle = document.getElementById("conversationSubtitle");
  const reason = document.getElementById("conversationContextReason");
  const status = document.getElementById("conversationContextStatus");
  const customer = document.getElementById("conversationSampleCustomer");
  const support = document.getElementById("conversationSampleSupport");
  const pending = document.getElementById("conversationBuyerPending");
  const verified = document.getElementById("conversationBuyerVerified");

  if (pending) pending.hidden = mode !== "buyer-pending";
  if (verified) verified.hidden = mode !== "buyer-verified";

  const isBuyer = mode !== "general";
  if (subtitle) subtitle.textContent = mode === "buyer-verified"
    ? "Consulta sobre tu pedido (ejemplo)"
    : mode === "buyer-pending"
      ? "Consulta de pedido · Sin verificar"
      : "Consulta general";
  if (reason) reason.textContent = isBuyer
    ? "Motivo: Consulta sobre mi pedido"
    : "Motivo: Cambios y devoluciones";
  if (status) status.textContent = "En proceso (ejemplo)";
  if (customer) customer.textContent = isBuyer
    ? "Hola, quería consultar cómo va mi compra."
    : "Hola, quería consultar sobre las opciones de devolución.";
  if (support) support.textContent = mode === "buyer-verified"
    ? "¡Hola! Podemos ayudarte con el pedido asociado a esta consulta."
    : mode === "buyer-pending"
      ? "¡Hola! Podemos ayudarte. Primero necesitaremos verificar los datos de tu compra."
      : "¡Hola! Recibimos tu consulta. Vamos a ayudarte con la información correspondiente.";

  document.querySelectorAll("[data-conversation-preview]").forEach((anchor) => {
    if (anchor.getAttribute("data-conversation-preview") === mode) {
      anchor.setAttribute("aria-current", "page");
    } else {
      anchor.removeAttribute("aria-current");
    }
  });
})();