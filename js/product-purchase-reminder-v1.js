(() => {
  "use strict";

  /* SANTA CLAUSULA — Purchase Reminder V1.
     One-off requested email only; no marketing enrollment, no browser persistence.
     Backend activation is intentionally separate from this UI delivery. */
  const securityRow = document.getElementById("commercialSecurityRow");
  const stack = securityRow && securityRow.closest(".commercial-info-stack");
  if (!stack || document.getElementById("purchaseReminderOpen")) return;

  const clock = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>';
  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 6 6 6-6 6"></path></svg>';
  const divider = document.createElement("div");
  divider.className = "commercial-divider purchase-reminder-divider";
  divider.setAttribute("aria-hidden", "true");
  const opener = document.createElement("button");
  opener.id = "purchaseReminderOpen";
  opener.className = "commercial-action-row purchase-reminder-entry";
  opener.type = "button";
  opener.setAttribute("aria-haspopup", "dialog");
  opener.setAttribute("aria-controls", "purchaseReminderDialog");
  opener.innerHTML = [
    '<span class="commercial-action-row__icon purchase-reminder-entry__icon" aria-hidden="true">',clock,'</span>',
    '<span class="commercial-action-row__content purchase-reminder-entry__copy">',
    '<strong>Programá un recordatorio para comprar este producto</strong>',
    '<span>Elegí cuándo querés recibir un correo</span>',
    '</span><span class="commercial-row-chevron" aria-hidden="true">',chevron,'</span>'
  ].join("");
  securityRow.insertAdjacentElement("afterend", divider);
  divider.insertAdjacentElement("afterend", opener);

  const backdrop = document.createElement("div");
  backdrop.id = "purchaseReminderBackdrop";
  backdrop.className = "purchase-reminder-backdrop";
  backdrop.hidden = true;
  backdrop.innerHTML = [
    '<section class="purchase-reminder-sheet" id="purchaseReminderDialog" role="dialog" aria-modal="true" aria-labelledby="purchaseReminderTitle" aria-describedby="purchaseReminderDescription">',
    '<div class="purchase-reminder-sheet__handle" aria-hidden="true"></div>',
    '<div class="purchase-reminder-sheet__top"><div class="purchase-reminder-sheet__heading">',
    '<span class="purchase-reminder-sheet__clock" aria-hidden="true">',clock,'</span>',
    '<h2 id="purchaseReminderTitle">Recordame comprar</h2>',
    '</div><button type="button" class="purchase-reminder-sheet__close" id="purchaseReminderClose" aria-label="Cerrar recordatorio">×</button></div>',
    '<p id="purchaseReminderDescription" class="purchase-reminder-sheet__description">Te enviaremos un único correo en el día y horario que elijas para que puedas volver a este producto.</p>',
    '<form id="purchaseReminderForm" novalidate>',
    '<label for="purchaseReminderEmail">Correo electrónico</label>',
    '<input id="purchaseReminderEmail" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" placeholder="tuemail@ejemplo.com" required />',
    '<div class="purchase-reminder-sheet__grid">',
    '<div><label for="purchaseReminderDate">Fecha</label><input id="purchaseReminderDate" name="date" type="date" required /></div>',
    '<div><label for="purchaseReminderTime">Horario</label><input id="purchaseReminderTime" name="time" type="time" step="900" required /></div>',
    '</div>',
    '<p class="purchase-reminder-sheet__zone">Horario de Argentina (GMT−3).</p>',
    '<p class="purchase-reminder-sheet__privacy">Usaremos tu correo únicamente para este recordatorio. No te suscribiremos a promociones. El correo incluirá una opción para cancelar.</p>',
    '<p id="purchaseReminderStatus" class="purchase-reminder-sheet__status" role="status" aria-live="polite" hidden></p>',
    '<button class="purchase-reminder-sheet__submit" id="purchaseReminderSubmit" type="submit">Programar recordatorio</button>',
    '</form></section>'
  ].join("");
  document.body.appendChild(backdrop);

  const dialog = backdrop.querySelector("#purchaseReminderDialog");
  const closeButton = backdrop.querySelector("#purchaseReminderClose");
  const form = backdrop.querySelector("#purchaseReminderForm");
  const email = backdrop.querySelector("#purchaseReminderEmail");
  const date = backdrop.querySelector("#purchaseReminderDate");
  const time = backdrop.querySelector("#purchaseReminderTime");
  const status = backdrop.querySelector("#purchaseReminderStatus");
  const submit = backdrop.querySelector("#purchaseReminderSubmit");
  let lastFocus = null;
  let submitting = false;

  function dateParts(d) {
    const fields = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(d);
    const value = Object.fromEntries(fields.map((p) => [p.type, p.value]));
    return { date: value.year + "-" + value.month + "-" + value.day,
      time: value.hour + ":" + value.minute, year: Number(value.year) };
  }

  function cutoffFor(now) {
    const year = dateParts(now).year;
    const current = new Date(year + "-12-25T23:59:00-03:00");
    return now < current ? year + "-12-25" : (year + 1) + "-12-25";
  }

  function prepareScheduleInputs() {
    const now = new Date();
    const earliest = new Date(now.getTime() + 30 * 60 * 1000);
    const suggested = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const min = dateParts(earliest);
    const choice = dateParts(suggested);
    date.min = min.date;
    date.max = cutoffFor(now);
    if (!date.value || date.value < date.min || date.value > date.max) {
      date.value = choice.date <= date.max ? choice.date : date.max;
    }
    if (!time.value) {
      const quarter = Math.ceil((Number(choice.time.slice(3)) || 0) / 15) * 15;
      const hr = (Number(choice.time.slice(0, 2)) + Math.floor(quarter / 60)) % 24;
      time.value = String(hr).padStart(2, "0") + ":" + String(quarter % 60).padStart(2, "0");
    }
  }

  function message(text, isError) {
    status.hidden = false;
    status.textContent = text;
    status.dataset.error = String(Boolean(isError));
  }

  function open() {
    lastFocus = document.activeElement;
    prepareScheduleInputs();
    status.hidden = true;
    backdrop.hidden = false;
    document.body.classList.add("purchase-reminder-open");
    if (!window.SantaClausulaReminderAdapter || typeof window.SantaClausulaReminderAdapter.create !== "function") {
      message("Funcionalidad en preparación: todavía no está habilitado el envío de recordatorios. Este formulario no guarda tu correo.", true);
    }
    email.focus();
  }

  function close() {
    if (submitting) return;
    backdrop.hidden = true;
    document.body.classList.remove("purchase-reminder-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function validSchedule() {
    const local = date.value + "T" + time.value;
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local)) return null;
    const chosen = new Date(local + ":00-03:00");
    if (!Number.isFinite(chosen.getTime()) ||
        chosen.getTime() < Date.now() + 15 * 60 * 1000 ||
        date.value > cutoffFor(new Date())) return null;
    return local;
  }

  opener.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key !== "Tab") return;
    const items = Array.from(dialog.querySelectorAll("button:not([disabled]), input:not([disabled])"));
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    const value = email.value.trim();
    if (!value || value.length > 254 || !email.checkValidity()) {
      message("Ingresá un correo electrónico válido.", true);
      email.focus();
      return;
    }
    const scheduledLocal = validSchedule();
    if (!scheduledLocal) {
      message("Elegí una fecha y hora futuras, al menos 15 minutos desde ahora y dentro de la temporada.", true);
      date.focus();
      return;
    }

    // The browser never records an email, schedules a timer or calls a
    // server without an explicitly installed, validated Reminder API adapter.
    const adapter = window.SantaClausulaReminderAdapter;
    if (!adapter || typeof adapter.create !== "function") {
      message("El envío de recordatorios todavía no está habilitado. No guardamos tu correo ni programamos ningún email.", true);
      return;
    }

    const selectedCombo = document.querySelector("#offerList .product-combo-card.is-selected");
    const pageProductId = new URLSearchParams(window.location.search).get("id") || "prod-002";
    const request = {
      site: "santa-clausula",
      productId: pageProductId,
      offerId: selectedCombo ? selectedCombo.dataset.comboId || null : null,
      productTitle: (document.getElementById("productTitle")?.textContent || "").trim().slice(0, 180),
      email: value,
      scheduledLocal,
      timezone: "America/Argentina/Buenos_Aires",
      purpose: "one-off-purchase-reminder",
      consentVersion: "santa-reminder-v1-2026-11-04"
    };
    submitting = true;
    submit.disabled = true;
    submit.textContent = "Procesando…";
    status.hidden = true;
    try {
      const response = await adapter.create(request);
      if (response?.status === "verification_required") {
        message("Te enviamos un correo para verificar la dirección. El recordatorio se programará cuando la confirmes.", false);
        form.reset();
      } else if (response?.status === "scheduled") {
        message("Recordatorio confirmado para la fecha y hora elegidas. Revisá tu correo.", false);
        form.reset();
      } else {
        message("No pudimos confirmar el recordatorio. No lo consideres programado; volvé a intentarlo.", true);
      }
    } catch {
      message("No pudimos programar el recordatorio. No se confirmó ningún envío; intentá más tarde.", true);
    } finally {
      submitting = false;
      submit.disabled = false;
      submit.textContent = "Programar recordatorio";
    }
  });
})();
