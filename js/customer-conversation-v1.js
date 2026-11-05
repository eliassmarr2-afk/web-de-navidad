(() => {
  "use strict";

  // Case A public UI: visual preview only. No customer session exists here.
  // The future Protocol Data adapter will replace this view controller after
  // an explicit security/capability review.
  const preview = document.getElementById("conversationDemo");
  const empty = document.getElementById("conversationEmpty");
  if (!preview || !empty) return;

  const isPreview = new URLSearchParams(window.location.search).get("demo") === "1";
  preview.hidden = !isPreview;
  empty.hidden = isPreview;
  document.body.dataset.conversationMode = isPreview ? "visual-preview" : "unavailable";

  // This route currently has no authorized bearer capability consumer.
  // A URL fragment should not remain in browser history in demo mode.
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
})();
