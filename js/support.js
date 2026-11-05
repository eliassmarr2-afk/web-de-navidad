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