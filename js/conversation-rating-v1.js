(() => {
  "use strict";

  /*
   * SANTA CLAUSULA / post-close satisfaction slide.
   * This module is an explicit visual fixture ONLY, active at
   * ?demo=closed-rating. It never reads a case/token or sends data.
   *
   * REAL INTEGRATION RESERVED:
   * - read authorized support-customer case and status=cerrada
   * - block replies before considering a rating
   * - check server-authoritative feedback eligibility for closure cycle
   * - submit through a future Control-approved idempotent CSAT boundary
   */
  const requested = new URLSearchParams(window.location.search).get("demo");
  if (requested !== "closed-rating") return;

  const byId = (id) => document.getElementById(id);
  const backdrop = byId("conversationRatingBackdrop");
  const sheet = byId("conversationRatingSheet");
  const closeButton = byId("conversationRatingClose");
  const reopenButton = byId("conversationReopenRating");
  const form = byId("conversationRatingForm");
  const formView = byId("conversationRatingFormView");
  const finished = byId("conversationRatingFinished");
  const doneButton = byId("conversationRatingDone");
  const skipButton = byId("conversationRatingSkip");
  const submitButton = byId("conversationRatingSubmit");
  const selection = byId("conversationRatingSelection");
  const comment = byId("conversationRatingComment");
  const stars = Array.from(document.querySelectorAll("[data-rating-score]"));
  if (!backdrop || !sheet || !closeButton || !reopenButton || !form ||
      !formView || !finished || !doneButton || !skipButton ||
      !submitButton || !selection || !comment || stars.length !== 5) return;

  const labels = ["", "Muy mala", "Mala", "Regular", "Buena", "Excelente"];
  let selected = 0;
  let previousFocus = null;
  let state = "unrated"; // ephemeral visual state, never a recorded review

  function updateStars() {
    stars.forEach((button) => {
      const score = Number(button.dataset.ratingScore);
      const chosen = score === selected;
      button.classList.toggle("is-lit", score <= selected);
      button.setAttribute("aria-checked", chosen ? "true" : "false");
      // Roving tab focus for accessible single-choice rating input.
      button.tabIndex = chosen || (selected === 0 && score === 1) ? 0 : -1;
    });
    selection.textContent = selected > 0
      ? selected + "/5 · " + labels[selected]
      : "Seleccioná de 1 a 5 estrellas";
    selection.classList.toggle("has-rating", selected > 0);
    submitButton.disabled = selected === 0;
  }

  function resetForm() {
    selected = 0;
    comment.value = "";
    state = "unrated";
    formView.hidden = false;
    finished.hidden = true;
    updateStars();
  }

  function openSlide() {
    previousFocus = document.activeElement;
    resetForm();
    backdrop.hidden = false;
    document.body.dataset.ratingSlide = "open-demo";
    // Avoid opening the soft keyboard or scrolling the chat unexpectedly.
    closeButton.focus({ preventScroll: true });
  }

  function closeSlide() {
    backdrop.hidden = true;
    document.body.dataset.ratingSlide = "closed-demo";
    comment.value = "";
    if (previousFocus && typeof previousFocus.focus === "function" &&
        previousFocus !== document.body) {
      previousFocus.focus({ preventScroll: true });
    } else {
      reopenButton.focus({ preventScroll: true });
    }
  }

  function selectScore(score, setFocus) {
    if (!Number.isInteger(score) || score < 1 || score > 5) return;
    selected = score;
    updateStars();
    if (setFocus) stars[score - 1].focus({ preventScroll: true });
  }

  stars.forEach((button) => {
    button.addEventListener("click", () => selectScore(Number(button.dataset.ratingScore), false));
    button.addEventListener("keydown", (event) => {
      const target = event.key === "ArrowRight" || event.key === "ArrowDown"
        ? Math.min(5, (selected || Number(button.dataset.ratingScore)) + 1)
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? Math.max(1, (selected || Number(button.dataset.ratingScore)) - 1)
          : event.key === "Home" ? 1
          : event.key === "End" ? 5 : null;
      if (target === null) return;
      event.preventDefault();
      selectScore(target, true);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (selected === 0 || state !== "unrated") return;
    // No write, token, email, analytics event or persistence. This is NOT
    // a legitimate backend acknowledgment, even though the UI demonstrates
    // what a future acknowledgment screen could look like.
    state = "simulated-success";
    comment.value = "";
    formView.hidden = true;
    finished.hidden = false;
    doneButton.focus({ preventScroll: true });
  });

  closeButton.addEventListener("click", closeSlide);
  skipButton.addEventListener("click", closeSlide);
  doneButton.addEventListener("click", closeSlide);
  reopenButton.addEventListener("click", openSlide);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeSlide();
  });

  sheet.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSlide();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(sheet.querySelectorAll(
      "button:not([disabled]):not([tabindex='-1']), textarea:not([disabled])"
    )).filter((node) => node.getClientRects().length > 0);
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

  // Auto-open ONLY for an explicit fixture URL. A live case closure requires
  // authorized Support case state and future backend-provided eligibility.
  openSlide();
})();
