(() => {
  "use strict";

  // SANTA CLAUSULA / Support Start Case A — UI-only.
  // No network calls, session persistence, token creation or simulated case creation.
  const form = document.getElementById("supportStartForm");
  const subject = document.getElementById("supportSubject");
  const otherField = document.getElementById("supportOtherField");
  const otherInput = document.getElementById("supportOther");
  const message = document.getElementById("supportMessage");
  const feedback = document.getElementById("supportFeedback");

  if (!form || !subject || !otherField || !otherInput || !message || !feedback) return;

  function resetFeedback() {
    feedback.hidden = true;
    feedback.textContent = "";
  }

  function syncOtherField() {
    const show = subject.value === "otro";
    otherField.hidden = !show;
    otherInput.required = show;
    otherInput.disabled = !show;
    if (!show) otherInput.value = "";
    resetFeedback();
  }

  syncOtherField();
  // SDS-LOG-02: receive only an allowlisted topic label from the tracking UI.
  // Never transfer order identifiers, tracking access or customer data.
  // Preparing a form is NOT opening a case or executing an operation.
  const trackingIntents=Object.freeze({
    change_delivery_address:{
      subject:"envio",
      draft:"Quiero consultar cómo cambiar mi dirección de entrega."
    },
    change_products:{
      subject:"pedido",
      draft:"Necesito consultar si puedo cambiar o agregar productos a mi pedido."
    },
    report_error:{
      subject:"pedido",
      draft:"Quiero reportar un inconveniente con mi pedido."
    },
    cancel_purchase:{
      subject:"cambios",
      draft:"Quiero consultar cómo solicitar la cancelación de mi compra."
    }
  });
  const topic=new URLSearchParams(window.location.search).get("motivo");
  if(Object.hasOwn(trackingIntents,topic)){
    const intent=trackingIntents[topic];
    subject.value=intent.subject;
    syncOtherField();
    if(!message.value.trim())message.value=intent.draft;
  }
  subject.addEventListener("change", syncOtherField);
  for (const field of form.querySelectorAll("input, select, textarea")) {
    field.addEventListener("input", resetFeedback);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!message.value.trim()) {
      message.setCustomValidity("Escribí el motivo de tu consulta.");
      message.reportValidity();
      message.addEventListener("input", () => message.setCustomValidity(""), { once: true });
      return;
    }
    feedback.textContent =
      "Esta es una vista de demostración. No se creó ningún caso, no se enviaron tus datos ni se guardó el mensaje. Podés utilizar «Ver vista previa del chat» para revisar el diseño.";
    feedback.hidden = false;
    // Public start, capability delivery and first message are reserved for the
    // authorized Protocol Data Support boundary, NOT implemented in this module.
  });
})();