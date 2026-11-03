export function emitSiteEvent(name, detail = {}) {
  const event = {
    name,
    detail,
    occurredAt: new Date().toISOString(),
    source: "storefront",
    transport: "local-event-layer",
  };

  window.dispatchEvent(new CustomEvent("web-de-navidad:event", { detail: event }));
  return event;
}
