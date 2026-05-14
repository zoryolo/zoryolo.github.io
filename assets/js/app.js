(function () {
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  const currentYearEls = document.querySelectorAll("[data-current-year]");
  currentYearEls.forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  function normalizePath(path) {
    if (!path) return "/";
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  }

  const currentRoute = normalizePath(window.location.pathname);
  document.querySelectorAll("[data-route]").forEach((link) => {
    const targetRoute = normalizePath(link.getAttribute("data-route"));
    if (targetRoute === currentRoute) {
      link.classList.add("active");
    }
  });

  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const mobilePanel = document.getElementById("mobile-panel");
  const mobileBackdrop = document.getElementById("mobile-backdrop");
  const siteHeader = document.querySelector(".site-header");
  const isHomePage = document.body.dataset.page === "home";
  const whatsappNumber = "34609829072";
  const reviewCatalog = {
    es: [
      {
        author: "Enrique",
        rating: 5,
        text: "Lugar excepcional, apartado del ruido y la aglomeración. Mercedes, la casera, un encanto. Si quieres o tienes que desconectar, este es el sitio."
      },
      {
        author: "Carmen",
        rating: 5,
        text: "Apartamento con encanto a las afueras de Silleda, muy recomendable para ir en familia: amplio, muy limpio, con todas las comodidades y jardines preciosos."
      },
      {
        author: "María",
        rating: 5,
        text: "La dueña muy amable y el apartamento cómodo en un enclave tranquilo y cuidado, ideal para descansar y céntrico para hacer excursiones."
      },
      {
        author: "Clara",
        rating: 5,
        text: "Maravilloso lugar y maravillosa Mercedes. Un sitio extraordinario, perfecto para descansar y conectar."
      },
      {
        author: "Mónica",
        rating: 5,
        text: "El apartamento limpísimo, el trato de la dueña inmejorable y el entorno precioso. Volveremos."
      },
      {
        author: "Alfonso",
        rating: 5,
        text: "Mercedes es un encanto, todo amabilidad. Es la segunda vez que venimos."
      }
    ],
    en: [
      {
        author: "Enrique",
        rating: 5,
        text: "Lugar excepcional, apartado del ruido y la aglomeración. Mercedes, la casera, un encanto. Si quieres o tienes que desconectar, este es el sitio."
      },
      {
        author: "Carmen",
        rating: 5,
        text: "Apartamento con encanto a las afueras de Silleda, muy recomendable para ir en familia: amplio, muy limpio, con todas las comodidades y jardines preciosos."
      },
      {
        author: "María",
        rating: 5,
        text: "La dueña muy amable y el apartamento cómodo en un enclave tranquilo y cuidado, ideal para descansar y céntrico para hacer excursiones."
      },
      {
        author: "Clara",
        rating: 5,
        text: "Maravilloso lugar y maravillosa Mercedes. Un sitio extraordinario, perfecto para descansar y conectar."
      },
      {
        author: "Mónica",
        rating: 5,
        text: "El apartamento limpísimo, el trato de la dueña inmejorable y el entorno precioso. Volveremos."
      },
      {
        author: "Alfonso",
        rating: 5,
        text: "Mercedes es un encanto, todo amabilidad. Es la segunda vez que venimos."
      }
    ]
  };

  if (menuOpen && mobilePanel) {
    menuOpen.setAttribute("aria-expanded", "false");
    menuOpen.setAttribute("aria-controls", "mobile-panel");
    menuOpen.setAttribute("aria-label", isEnglish ? "Open menu" : "Abrir menú");
    mobilePanel.setAttribute("aria-hidden", "true");
  }

  function isMenuVisible() {
    return Boolean(mobilePanel && mobilePanel.classList.contains("open"));
  }

  function openMenu() {
    if (!mobilePanel || !mobileBackdrop || !menuOpen) return;
    mobilePanel.classList.add("open");
    mobileBackdrop.classList.add("show");
    menuOpen.classList.add("is-open");
    menuOpen.setAttribute("aria-expanded", "true");
    menuOpen.setAttribute("aria-label", isEnglish ? "Close menu" : "Cerrar menú");
    mobilePanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!mobilePanel || !mobileBackdrop) return;
    mobilePanel.classList.remove("open");
    mobileBackdrop.classList.remove("show");
    if (menuOpen) {
      menuOpen.classList.remove("is-open");
      menuOpen.setAttribute("aria-expanded", "false");
      menuOpen.setAttribute("aria-label", isEnglish ? "Open menu" : "Abrir menú");
    }
    mobilePanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  if (menuOpen && mobilePanel && mobileBackdrop) {
    menuOpen.addEventListener("click", () => {
      if (isMenuVisible()) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);
  document.querySelectorAll("#mobile-panel a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuVisible()) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isMenuVisible()) {
      closeMenu();
    }
  });

  function initHomeHeaderScroll() {
    if (!isHomePage || !siteHeader) return;

    const updateHeaderState = () => {
      const isScrolled = window.scrollY > 20;
      siteHeader.classList.toggle("scrolled", isScrolled);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  function initMobileStickyCta() {
    const existing = document.getElementById("mobile-sticky-cta");
    if (existing) return;

    const assistantAnchor = isEnglish ? "#stay-assistant" : "#asistente-estancia";
    const datesHref = isHomePage ? assistantAnchor : `${isEnglish ? "/en/" : "/"}${assistantAnchor}`;
    const whatsappText = isEnglish
      ? "Hello, I would like to check dates at Los Tres Soles."
      : "Hola, quiero consultar fechas en Los Tres Soles.";

    const bar = document.createElement("div");
    bar.id = "mobile-sticky-cta";
    bar.className = "mobile-sticky-cta";
    bar.innerHTML = `
      <a class="mobile-sticky-cta__btn sticky-action-dates" href="${datesHref}" ${isHomePage ? `data-assistant-jump="${assistantAnchor}"` : ""}>
        <span class="action-icon action-icon--dates" aria-hidden="true">${getActionIconMarkup("dates")}</span>
        <span>${isEnglish ? "Dates" : "Fechas"}</span>
      </a>
      <a class="mobile-sticky-cta__btn sticky-action-whatsapp" href="${buildWhatsappUrl(whatsappText)}" target="_blank" rel="noopener noreferrer">
        <span class="action-icon action-icon--whatsapp" aria-hidden="true">${getActionIconMarkup("whatsapp")}</span>
        <span>WhatsApp</span>
      </a>
      <a class="mobile-sticky-cta__btn sticky-action-call" href="tel:+34609829072" aria-label="${isEnglish ? "Call Los Tres Soles" : "Llamar a Los Tres Soles"}">
        <span class="action-icon action-icon--call" aria-hidden="true">${getActionIconMarkup("call")}</span>
        <span>${isEnglish ? "Call" : "Llamar"}</span>
      </a>
    `;
    document.body.appendChild(bar);
  }

  function buildWhatsappUrl(message) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function getActionIconMarkup(type) {
    if (type === "whatsapp") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.5 3.5A11.8 11.8 0 0 0 12 .2C5.5.2.2 5.5.2 12c0 2.1.6 4.1 1.6 5.9L.1 23.8l6-1.6a11.7 11.7 0 0 0 5.9 1.6c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.3-8.5Zm-8.5 18a9.8 9.8 0 0 1-5-1.4l-.3-.2-3.6 1 .9-3.5-.2-.4a9.8 9.8 0 1 1 8.2 4.5Zm5.3-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.1-.4.2-.7 0a8 8 0 0 1-2.3-1.4 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5l.3-.4c.1-.2 0-.4 0-.5l-1-2.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.4-1.1 1.1-1.1 2.8s1.2 3.3 1.4 3.5a10.6 10.6 0 0 0 4 3.4c2.6 1.1 2.6.8 3.1.8s1.8-.7 2-1.4c.3-.7.3-1.3.2-1.4 0-.2-.3-.3-.6-.5Z"/></svg>';
    }
    if (type === "maps") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.5A7.5 7.5 0 0 0 4.5 10c0 5.2 6 11.2 7.5 12.5 1.5-1.3 7.5-7.3 7.5-12.5A7.5 7.5 0 0 0 12 2.5Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"/></svg>';
    }
    if (type === "call") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.2 15.2c-1.2 0-2.3-.2-3.4-.6a1 1 0 0 0-1 .2l-2.2 2.2A15.5 15.5 0 0 1 7 10.4l2.2-2.2a1 1 0 0 0 .2-1A10.6 10.6 0 0 1 8.8 3 1 1 0 0 0 7.8 2H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3.8a1 1 0 0 0-1-1Z"/></svg>';
    }
    if (type === "dates") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v13.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5V6a2 2 0 0 1 2-2h3V2Zm13 8H4v9.5c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V10Z"/></svg>';
    }
    if (type === "mail") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2 1.1V8l7 4.4L19 8V6.6l-7 4.3-7-4.3Z"/></svg>';
    }
    return "";
  }

  function addActionIcon(link, type) {
    if (!link || link.querySelector(".action-icon")) return;
    const icon = document.createElement("span");
    icon.className = `action-icon action-icon--${type}`;
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = getActionIconMarkup(type);
    link.prepend(icon);
  }

  function markActionLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me/"]');
    whatsappLinks.forEach((link) => {
      link.classList.add("action-link", "action-whatsapp");
      addActionIcon(link, "whatsapp");
      if (!link.getAttribute("target")) link.setAttribute("target", "_blank");
      if (!link.getAttribute("rel")) link.setAttribute("rel", "noopener noreferrer");
      if (!link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", isEnglish ? "Open WhatsApp chat" : "Abrir chat de WhatsApp");
      }
      if (link.classList.contains("btn")) link.classList.add("btn-whatsapp");
    });

    const mapLinks = document.querySelectorAll('a[href*="maps.google.com"], a[href*="maps.app.goo.gl"]');
    mapLinks.forEach((link) => {
      link.classList.add("action-link", "action-maps");
      addActionIcon(link, "maps");
      if (!link.getAttribute("target")) link.setAttribute("target", "_blank");
      if (!link.getAttribute("rel")) link.setAttribute("rel", "noopener noreferrer");
      if (!link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", isEnglish ? "Open map location" : "Abrir ubicación en el mapa");
      }
      if (link.classList.contains("btn")) link.classList.add("btn-maps");
    });

    const callLinks = document.querySelectorAll('a[href^="tel:"]');
    callLinks.forEach((link) => {
      link.classList.add("action-link", "action-call");
      addActionIcon(link, "call");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      if (!link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", isEnglish ? "Call by phone" : "Llamar por teléfono");
      }
      if (link.classList.contains("btn")) link.classList.add("btn-call");
    });

    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailLinks.forEach((link) => {
      link.classList.add("action-link", "action-mail");
      addActionIcon(link, "mail");
      if (!link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", isEnglish ? "Send email" : "Enviar email");
      }
      if (link.classList.contains("btn")) link.classList.add("btn-mail");
    });
  }

  function initAssistantJumpLinks() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-assistant-jump]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetSelector = link.getAttribute("data-assistant-jump");
        if (!targetSelector) return;

        const target = document.querySelector(targetSelector);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });

        const heading = target.querySelector("h2");
        if (!heading) return;
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      });
    });
  }

  function initApartmentContextCtas() {
    const ctas = document.querySelectorAll(".js-wa-apartment");
    if (!ctas.length) return;

    ctas.forEach((cta) => {
      const apartment = cta.getAttribute("data-apartment");
      if (!apartment) return;

      const message = isEnglish
        ? `Hello, I would like to check availability for the ${apartment} apartment at Los Tres Soles.\nPreferred apartment: ${apartment}\nThank you.`
        : `Hola, quiero consultar disponibilidad para el apartamento ${apartment} en Los Tres Soles.\nApartamento preferido: ${apartment}\nGracias.`;

      cta.href = buildWhatsappUrl(message);
    });
  }

  function initApartmentCollapsibles() {
    const cards = document.querySelectorAll(".apartment-collapsible");
    if (!cards.length) return;

    const labelOpen = isEnglish ? "Hide" : "Ocultar";
    const labelClosed = isEnglish ? "Show" : "Mostrar";

    cards.forEach((card, idx) => {
      const toggle = card.querySelector("[data-apartment-toggle]");
      const content = card.querySelector("[data-apartment-content]");
      const label = card.querySelector("[data-apartment-toggle-label]");
      const icon = card.querySelector("[data-apartment-toggle-icon]");
      if (!toggle || !content) return;

      if (!content.id) {
        content.id = `apartment-collapsible-content-${idx + 1}`;
      }
      toggle.setAttribute("aria-controls", content.id);

      function setExpanded(expanded) {
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        content.hidden = !expanded;
        card.classList.toggle("is-collapsed", !expanded);
        if (label) label.textContent = expanded ? labelOpen : labelClosed;
        if (icon) icon.textContent = expanded ? "−" : "+";
      }

      const isInitiallyExpanded = toggle.getAttribute("aria-expanded") !== "false";
      setExpanded(isInitiallyExpanded);

      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        setExpanded(!isExpanded);
      });
    });
  }

  function initStayAssistant() {
    const form = document.querySelector("[data-stay-assistant]");
    if (!form) return;

    const whatsappLink = form.querySelector("[data-assistant-whatsapp]");
    const feedback = form.querySelector("[data-assistant-feedback]");
    const previewWrap = form.querySelector("[data-assistant-summary]");
    const preview = form.querySelector("[data-assistant-preview]");
    const checkin = form.querySelector('[name="checkin"]');
    const checkout = form.querySelector('[name="checkout"]');
    const guests = form.querySelector('[name="guests"]');
    const stayType = form.querySelector('[name="stayType"]');
    const apartment = form.querySelector('[name="apartment"]');

    if (!whatsappLink || !feedback || !preview || !previewWrap) return;

    const fallbackText = isEnglish ? "to be confirmed" : "por confirmar";
    const defaultStayType = isEnglish ? "to be confirmed" : "por confirmar";
    const defaultApartment = isEnglish ? "not sure, I would like a recommendation" : "no lo sé, me gustaría recomendación";
    let hasAttemptedWhatsapp = false;

    function getValue(input) {
      return input && typeof input.value === "string" ? input.value.trim() : "";
    }

    function buildAssistantPayload() {
      const checkinValue = getValue(checkin);
      const checkoutValue = getValue(checkout);
      const stayTypeValue = getValue(stayType);
      const apartmentValue = getValue(apartment);
      const guestsRaw = getValue(guests);
      const guestsNumber = Number.parseInt(guestsRaw, 10);

      const dateFrom = checkinValue || fallbackText;
      const dateTo = checkoutValue || fallbackText;
      const guestsValue = Number.isInteger(guestsNumber) && guestsNumber > 0 ? String(guestsNumber) : fallbackText;
      const stayValue = stayTypeValue || defaultStayType;
      const apartmentValueText = apartmentValue || defaultApartment;

      const errors = [];
      const hasCheckin = Boolean(checkinValue);
      const hasCheckout = Boolean(checkoutValue);

      if (!hasCheckin || !hasCheckout) {
        errors.push(
          isEnglish
            ? "Please check dates: both check-in and check-out are required."
            : "Revisa las fechas: la entrada y la salida son obligatorias."
        );
      }

      if (hasCheckin && hasCheckout) {
        const checkinDate = new Date(checkinValue);
        const checkoutDate = new Date(checkoutValue);
        if (checkinDate > checkoutDate) {
          errors.push(
            isEnglish
              ? "Please check dates: check-out cannot be earlier than check-in."
              : "Revisa las fechas: la salida no puede ser anterior a la entrada."
          );
        }
      }

      if (guestsRaw && !(Number.isInteger(guestsNumber) && guestsNumber > 0)) {
        errors.push(
          isEnglish
            ? "Please check guests: it must be 1 or more."
            : "Revisa las personas: debe ser 1 o más."
        );
      }

      const message = isEnglish
        ? `Hello, I would like to check availability at Los Tres Soles.\nDates: ${dateFrom} to ${dateTo}\nGuests: ${guestsValue}\nStay type: ${stayValue}\nPreferred apartment: ${apartmentValueText}\nThank you.`
        : `Hola, quiero consultar disponibilidad en Los Tres Soles.\nFechas: ${dateFrom} a ${dateTo}\nPersonas: ${guestsValue}\nTipo de estancia: ${stayValue}\nApartamento preferido: ${apartmentValueText}\nGracias.`;

      return {
        message,
        errors,
        hasBothDates: hasCheckin && hasCheckout
      };
    }

    function renderAssistantResult(showErrors) {
      const payload = buildAssistantPayload();
      preview.textContent = payload.message;
      whatsappLink.href = buildWhatsappUrl(payload.message);

      if (payload.errors.length) {
        previewWrap.hidden = true;
        if (showErrors) {
          feedback.textContent = payload.errors.join(" ");
          feedback.classList.add("assistant-feedback--error");
        } else {
          feedback.textContent = "";
          feedback.classList.remove("assistant-feedback--error");
        }
        return false;
      }

      previewWrap.hidden = !payload.hasBothDates;
      feedback.textContent = "";
      feedback.classList.remove("assistant-feedback--error");
      return true;
    }

    whatsappLink.addEventListener("click", (event) => {
      hasAttemptedWhatsapp = true;
      const isValid = renderAssistantResult(true);
      if (!isValid) {
        event.preventDefault();
      }
    });

    [checkin, checkout, guests, stayType, apartment].forEach((field) => {
      if (!field) return;
      field.addEventListener("input", () => renderAssistantResult(hasAttemptedWhatsapp));
      field.addEventListener("change", () => renderAssistantResult(hasAttemptedWhatsapp));
    });

    renderAssistantResult(false);
  }

  function initLocationPlanSelector() {
    const selectors = document.querySelectorAll("[data-plan-selector]");
    if (!selectors.length) return;

    selectors.forEach((selector) => {
      const buttons = selector.querySelectorAll("[data-plan-btn]");
      const panels = selector.querySelectorAll("[data-plan-panel]");
      if (!buttons.length || !panels.length) return;

      function setActive(targetId) {
        buttons.forEach((button) => {
          const isActive = button.getAttribute("data-plan-btn") === targetId;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        panels.forEach((panel) => {
          panel.hidden = panel.getAttribute("data-plan-panel") !== targetId;
        });
      }

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const targetId = button.getAttribute("data-plan-btn");
          if (!targetId) return;
          setActive(targetId);
        });
      });
    });
  }

  function initMobileStickyCtaVisibility() {
    const bar = document.getElementById("mobile-sticky-cta");
    if (!bar) return;

    const hero = document.querySelector(".hero-banner");
    if (!hero) {
      bar.classList.remove("mobile-sticky-cta--hidden");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldHide = entry.isIntersecting && entry.intersectionRatio > 0.18;
        bar.classList.toggle("mobile-sticky-cta--hidden", shouldHide);
      },
      { threshold: [0, 0.18, 0.35, 0.6, 1] }
    );

    observer.observe(hero);
  }

  function attachSwipeNavigation(target, config) {
    if (!target) return;

    const minSwipe = Number.isFinite(config?.minSwipe) ? config.minSwipe : 34;
    const flickDistance = Number.isFinite(config?.flickDistance) ? config.flickDistance : 16;
    const maxFlickMs = Number.isFinite(config?.maxFlickMs) ? config.maxFlickMs : 220;
    const onPrev = typeof config?.onPrev === "function" ? config.onPrev : null;
    const onNext = typeof config?.onNext === "function" ? config.onNext : null;
    const onAfter = typeof config?.onAfter === "function" ? config.onAfter : null;
    const allowSwipe = typeof config?.allowSwipe === "function" ? config.allowSwipe : () => true;

    let startX = 0;
    let startY = 0;
    let startAt = 0;
    let tracking = false;
    let horizontalIntent = false;

    target.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length !== 1) return;
        if (!allowSwipe()) return;
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startAt = Date.now();
        tracking = true;
        horizontalIntent = false;
      },
      { passive: true }
    );

    target.addEventListener(
      "touchmove",
      (event) => {
        if (!tracking) return;
        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (!horizontalIntent) {
          if (absX > 10 && absX > absY * 1.1) {
            horizontalIntent = true;
          } else if (absY > 12 && absY > absX) {
            tracking = false;
            return;
          }
        }

        if (horizontalIntent) event.preventDefault();
      },
      { passive: false }
    );

    target.addEventListener(
      "touchend",
      (event) => {
        if (!tracking) return;
        tracking = false;
        if (!allowSwipe()) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const elapsed = Date.now() - startAt;

        if (absX <= absY) return;

        const isRegularSwipe = absX >= minSwipe;
        const isQuickFlick = absX >= flickDistance && elapsed <= maxFlickMs;
        if (!isRegularSwipe && !isQuickFlick) return;

        if (deltaX < 0) {
          if (onNext) onNext();
        } else if (onPrev) {
          onPrev();
        }
        if (onAfter) onAfter();
      },
      { passive: true }
    );

    target.addEventListener(
      "touchcancel",
      () => {
        tracking = false;
        horizontalIntent = false;
      },
      { passive: true }
    );
  }

  function showSwipeHint(container, config) {
    if (!container) return;
    const forceShow = Boolean(config?.forceShow);
    if (!forceShow && !window.matchMedia("(pointer: coarse)").matches) return;

    const text = config?.text || (isEnglish ? "Swipe to continue" : "Desliza para continuar");
    const storageKey = config?.storageKey || "";

    if (storageKey) {
      try {
        if (window.sessionStorage.getItem(storageKey) === "1") return;
      } catch (error) {
        // ignore storage failures (private mode or blocked storage)
      }
    }

    let hint = container.querySelector(".swipe-hint");
    if (!hint) {
      hint = document.createElement("p");
      hint.className = "swipe-hint";
      hint.innerHTML = '<span class="swipe-hint__icon" aria-hidden="true">↔</span><span class="swipe-hint__text"></span>';
      container.appendChild(hint);
    }

    const textNode = hint.querySelector(".swipe-hint__text");
    if (textNode) textNode.textContent = text;

    if (storageKey) {
      try {
        window.sessionStorage.setItem(storageKey, "1");
      } catch (error) {
        // ignore storage failures
      }
    }

    const previousTimer = Number.parseInt(hint.dataset.hideTimer || "0", 10);
    if (previousTimer) window.clearTimeout(previousTimer);

    hint.classList.add("is-visible");
    const hide = () => {
      hint.classList.remove("is-visible");
    };

    const hideTimer = window.setTimeout(hide, 3000);
    hint.dataset.hideTimer = String(hideTimer);

    if (hint.dataset.dismissBound !== "1") {
      const dismissOnInteraction = () => hide();
      container.addEventListener("touchstart", dismissOnInteraction, { passive: true });
      container.addEventListener("pointerdown", dismissOnInteraction, { passive: true });
      hint.dataset.dismissBound = "1";
    }
  }

  function initHomeCarousel() {
    const image = document.getElementById("featured-image");
    const prev = document.getElementById("featured-prev");
    const next = document.getElementById("featured-next");
    const indicators = document.getElementById("featured-indicators");
    const counter = document.getElementById("featured-counter");
    const carousel = document.getElementById("featured-carousel");

    if (!image || !prev || !next || !indicators || !counter || !carousel) return;

    const exteriorFilenames = [
      "exterior1.jpg",
      "exterior2.jpg",
      "exterior3.jpg",
      "exterior4.jpg",
      "exterior5.jpg",
      "exterior6.jpg",
      "exterior7.jpg",
      "exterior8.jpg",
      "exterior9.jpg",
      "exterior10.jpg",
      "exteriorestrella1.jpg",
      "exteriorluna1.jpg",
      "exteriorluna2.jpg",
      "exteriorluna3.jpg",
      "exteriorluna4.jpg",
      "exteriorsol1.jpg"
    ];

    const carouselImageVersion = "20260514-1";
    const items = exteriorFilenames.map((filename, idx) => ({
      url: `/images-web/${filename}?v=${carouselImageVersion}`,
      alt: isEnglish
        ? `Exterior photo ${idx + 1} of Los Tres Soles`
        : `Foto exterior ${idx + 1} de Los Tres Soles`
    }));

    let index = 0;
    let timer = null;
    let pauseTimeout = null;
    const pauseMs = 8000;
    let lightboxDialog = null;
    let lightboxImage = null;
    let lightboxPrev = null;
    let lightboxNext = null;
    let lightboxClose = null;
    let lightboxCounter = null;

    function render() {
      image.src = items[index].url;
      image.alt = items[index].alt;
      counter.textContent = `${index + 1} / ${items.length}`;

      indicators.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
      });
    }

    function goTo(targetIndex) {
      index = (targetIndex + items.length) % items.length;
      render();
    }

    function buildIndicators() {
      indicators.innerHTML = "";
      items.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", isEnglish ? `Go to image ${idx + 1}` : `Ir a imagen ${idx + 1}`);
        dot.addEventListener("click", () => {
          goTo(idx);
          pauseAutoplay();
        });
        indicators.appendChild(dot);
      });
    }

    function nextSlide() {
      goTo(index + 1);
    }

    function prevSlide() {
      goTo(index - 1);
    }

    function startAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, 5200);
    }

    function pauseAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (pauseTimeout) clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        startAutoplay();
      }, pauseMs);
    }

    function resetLightboxZoomState() {
      if (!lightboxImage) return;
      lightboxImage.style.transform = "scale(1)";
      lightboxImage.style.transformOrigin = "center center";
      lightboxImage.classList.remove("zoomed");
    }

    function renderLightbox() {
      if (!lightboxImage || !lightboxCounter) return;
      lightboxImage.src = items[index].url;
      lightboxImage.alt = items[index].alt;
      lightboxCounter.textContent = `${index + 1} / ${items.length}`;
      resetLightboxZoomState();
    }

    function closeLightbox() {
      if (lightboxDialog && lightboxDialog.open) lightboxDialog.close();
    }

    function initCarouselLightbox() {
      const existing = document.getElementById("featured-lightbox");
      lightboxDialog = existing || document.createElement("dialog");

      if (!existing) {
        lightboxDialog.id = "featured-lightbox";
        lightboxDialog.className = "lightbox";
        lightboxDialog.innerHTML =
          '<div class="lightbox-body lightbox-body--carousel">' +
          `<button class="lightbox-close" aria-label="${isEnglish ? "Close" : "Cerrar"}">✕</button>` +
          `<button class="lightbox-nav lightbox-nav--prev" aria-label="${isEnglish ? "Previous image" : "Imagen anterior"}">‹</button>` +
          '<img src="" alt="" />' +
          `<button class="lightbox-nav lightbox-nav--next" aria-label="${isEnglish ? "Next image" : "Imagen siguiente"}">›</button>` +
          '<p class="lightbox-counter"></p>' +
          "</div>";
        document.body.appendChild(lightboxDialog);
      }

      lightboxImage = lightboxDialog.querySelector("img");
      const lightboxBody = lightboxDialog.querySelector(".lightbox-body");
      lightboxPrev = lightboxDialog.querySelector(".lightbox-nav--prev");
      lightboxNext = lightboxDialog.querySelector(".lightbox-nav--next");
      lightboxClose = lightboxDialog.querySelector(".lightbox-close");
      lightboxCounter = lightboxDialog.querySelector(".lightbox-counter");

      if (!lightboxImage || !lightboxBody || !lightboxPrev || !lightboxNext || !lightboxClose || !lightboxCounter) return;

      initDialogImageZoom(lightboxDialog, lightboxImage);

      const goPrevInLightbox = () => {
        prevSlide();
        renderLightbox();
        pauseAutoplay();
      };

      const goNextInLightbox = () => {
        nextSlide();
        renderLightbox();
        pauseAutoplay();
      };

      if (lightboxDialog.dataset.carouselSwipeBound !== "1") {
        attachSwipeNavigation(lightboxBody, {
          minSwipe: 30,
          flickDistance: 14,
          maxFlickMs: 240,
          onNext: goNextInLightbox,
          onPrev: goPrevInLightbox,
          allowSwipe: () => lightboxDialog.open && !lightboxImage.classList.contains("zoomed")
        });
        lightboxDialog.dataset.carouselSwipeBound = "1";
      }

      if (lightboxDialog.dataset.carouselBound === "1") return;
      lightboxDialog.dataset.carouselBound = "1";

      lightboxClose.addEventListener("click", closeLightbox);
      lightboxPrev.addEventListener("click", (event) => {
        event.stopPropagation();
        goPrevInLightbox();
      });
      lightboxNext.addEventListener("click", (event) => {
        event.stopPropagation();
        goNextInLightbox();
      });

      lightboxDialog.addEventListener("click", (event) => {
        const rect = lightboxDialog.getBoundingClientRect();
        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;
        if (outside) closeLightbox();
      });

      window.addEventListener("keydown", (event) => {
        if (!lightboxDialog || !lightboxDialog.open) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrevInLightbox();
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNextInLightbox();
        }
      });
    }

    prev.addEventListener("click", () => {
      prevSlide();
      pauseAutoplay();
    });

    next.addEventListener("click", () => {
      nextSlide();
      pauseAutoplay();
    });

    attachSwipeNavigation(carousel, {
      minSwipe: 30,
      flickDistance: 14,
      maxFlickMs: 240,
      onNext: nextSlide,
      onPrev: prevSlide,
      onAfter: pauseAutoplay
    });

    let wheelLocked = false;
    carousel.addEventListener("wheel", (event) => {
      const dominantHorizontal =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) || (event.shiftKey && Math.abs(event.deltaY) > 0);
      if (!dominantHorizontal || wheelLocked) return;

      event.preventDefault();
      wheelLocked = true;
      setTimeout(() => {
        wheelLocked = false;
      }, 280);

      const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (movement > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      pauseAutoplay();
    }, { passive: false });

    buildIndicators();
    goTo(0);
    startAutoplay();
    initCarouselLightbox();
    showSwipeHint(carousel, {
      text: isEnglish ? "Swipe to browse photos" : "Desliza para ver más fotos",
      storageKey: "hint-home-carousel-swipe"
    });
    image.classList.add("zoomable-image");
    image.addEventListener("click", () => {
      if (!lightboxDialog) return;
      renderLightbox();
      lightboxDialog.showModal();
      const lightboxBody = lightboxDialog.querySelector(".lightbox-body");
      showSwipeHint(lightboxBody, {
        text: isEnglish ? "Swipe or use arrows" : "Desliza o usa las flechas",
        forceShow: true
      });
      pauseAutoplay();
    });
  }

  function initReviewsCarousel() {
    const root = document.querySelector("[data-reviews-carousel]");
    if (!root) return;

    const viewport = root.querySelector("[data-reviews-viewport]");
    const track = root.querySelector("[data-reviews-track]");
    const dotsWrap = root.querySelector("[data-reviews-dots]");
    const prevBtn = root.querySelector("[data-reviews-prev]");
    const nextBtn = root.querySelector("[data-reviews-next]");
    if (!viewport || !track || !dotsWrap || !prevBtn || !nextBtn) return;

    const reviews = reviewCatalog[isEnglish ? "en" : "es"] || reviewCatalog.es;
    if (!reviews.length) return;

    viewport.setAttribute("aria-roledescription", isEnglish ? "carousel" : "carrusel");
    viewport.setAttribute("aria-live", "polite");

    track.innerHTML = "";
    reviews.forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";
      card.innerHTML = `
        <div class="review-card__head">
          <p class="review-card__author-head">${review.author}</p>
          <p class="review-card__stars-head" aria-label="${isEnglish ? `${review.rating} out of 5 stars` : `${review.rating} de 5 estrellas`}">${"★".repeat(review.rating)}</p>
        </div>
        <p class="review-card__text">"${review.text}"</p>
      `;
      track.appendChild(card);
    });

    const cards = Array.from(track.querySelectorAll(".review-card"));
    let pageIndex = 0;

    function getVisibleCards() {
      const rawValue = Number.parseInt(getComputedStyle(root).getPropertyValue("--reviews-visible"), 10);
      return Number.isFinite(rawValue) && rawValue > 0 ? rawValue : 1;
    }

    function getPageCount() {
      return Math.max(1, Math.ceil(cards.length / getVisibleCards()));
    }

    function getPageOffset(currentPage) {
      const firstCardIndex = Math.min(cards.length - 1, currentPage * getVisibleCards());
      const targetCard = cards[firstCardIndex];
      return targetCard ? targetCard.offsetLeft : 0;
    }

    function buildDots(pageCount) {
      dotsWrap.innerHTML = "";
      for (let idx = 0; idx < pageCount; idx += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "reviews-carousel__dot";
        dot.setAttribute("aria-label", isEnglish ? `Go to review page ${idx + 1}` : `Ir a la página ${idx + 1} de reseñas`);
        dot.addEventListener("click", () => {
          pageIndex = idx;
          render();
        });
        dotsWrap.appendChild(dot);
      }
    }

    function render() {
      const pageCount = getPageCount();
      if (pageIndex > pageCount - 1) {
        pageIndex = pageCount - 1;
      }
      if (pageIndex < 0) {
        pageIndex = 0;
      }

      const offsetX = getPageOffset(pageIndex);
      track.style.transform = `translateX(${-offsetX}px)`;

      const dots = dotsWrap.querySelectorAll(".reviews-carousel__dot");
      dots.forEach((dot, idx) => {
        const active = idx === pageIndex;
        dot.setAttribute("aria-current", active ? "true" : "false");
      });

      prevBtn.disabled = pageIndex === 0;
      nextBtn.disabled = pageIndex >= pageCount - 1;
    }

    function nextPage() {
      pageIndex += 1;
      render();
    }

    function prevPage() {
      pageIndex -= 1;
      render();
    }

    prevBtn.addEventListener("click", prevPage);
    nextBtn.addEventListener("click", nextPage);

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPage();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevPage();
      } else if (event.key === "Home") {
        event.preventDefault();
        pageIndex = 0;
        render();
      } else if (event.key === "End") {
        event.preventDefault();
        pageIndex = getPageCount() - 1;
        render();
      }
    });

    viewport.addEventListener(
      "touchstart",
      (event) => {
        const firstTouch = event.changedTouches[0];
        touchStartX = firstTouch.clientX;
        touchStartY = firstTouch.clientY;
      },
      { passive: true }
    );

    viewport.addEventListener("touchend", (event) => {
      const lastTouch = event.changedTouches[0];
      const deltaX = lastTouch.clientX - touchStartX;
      const deltaY = lastTouch.clientY - touchStartY;
      const minSwipe = 40;

      if (Math.abs(deltaX) < minSwipe || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX < 0) {
        nextPage();
      } else {
        prevPage();
      }
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const pageCount = getPageCount();
        buildDots(pageCount);
        render();
      }, 100);
    });

    buildDots(getPageCount());
    render();
  }

  function initDialogImageZoom(dialog, imageElement) {
    if (!dialog || !imageElement || imageElement.dataset.zoomReady === "1") return;

    let scale = 1;
    const minScale = 1;
    const maxScale = 3;
    const step = 0.2;

    function applyScale() {
      imageElement.style.transform = `scale(${scale})`;
      imageElement.classList.toggle("zoomed", scale > 1.01);
    }

    function resetZoom() {
      scale = 1;
      imageElement.style.transformOrigin = "center center";
      applyScale();
    }

    function setOriginFromPointer(event) {
      const rect = imageElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      imageElement.style.transformOrigin = `${Math.min(Math.max(x, 0), 100)}% ${Math.min(Math.max(y, 0), 100)}%`;
    }

    imageElement.addEventListener("click", (event) => {
      setOriginFromPointer(event);
      scale = scale > 1.01 ? 1 : 2;
      applyScale();
    });

    imageElement.addEventListener("wheel", (event) => {
      event.preventDefault();
      setOriginFromPointer(event);
      const direction = event.deltaY < 0 ? 1 : -1;
      scale = Math.min(maxScale, Math.max(minScale, scale + direction * step));
      applyScale();
    }, { passive: false });

    dialog.addEventListener("close", resetZoom);
    imageElement.dataset.zoomReady = "1";
    resetZoom();
  }

  function initGlobalImageLightbox() {
    const existing = document.getElementById("image-zoom");
    const dialog = existing || document.createElement("dialog");

    if (!existing) {
      dialog.id = "image-zoom";
      dialog.className = "lightbox";
      dialog.innerHTML =
        '<div class="lightbox-body lightbox-body--carousel">' +
        `<button class="lightbox-close" aria-label="${isEnglish ? "Close" : "Cerrar"}">✕</button>` +
        `<button class="lightbox-nav lightbox-nav--prev" aria-label="${isEnglish ? "Previous image" : "Imagen anterior"}">‹</button>` +
        '<img src="" alt="" />' +
        `<button class="lightbox-nav lightbox-nav--next" aria-label="${isEnglish ? "Next image" : "Imagen siguiente"}">›</button>` +
        '<p class="lightbox-counter"></p>' +
        "</div>";
      document.body.appendChild(dialog);
    }

    const body = dialog.querySelector(".lightbox-body");
    const imgEl = dialog.querySelector("img");
    const closeBtn = dialog.querySelector(".lightbox-close");
    const prevBtn = dialog.querySelector(".lightbox-nav--prev");
    const nextBtn = dialog.querySelector(".lightbox-nav--next");
    const counter = dialog.querySelector(".lightbox-counter");
    if (!body || !imgEl || !closeBtn || !prevBtn || !nextBtn || !counter) return;
    initDialogImageZoom(dialog, imgEl);

    let lightboxItems = [];
    let lightboxIndex = 0;

    function resetDialogZoom() {
      imgEl.style.transform = "scale(1)";
      imgEl.style.transformOrigin = "center center";
      imgEl.classList.remove("zoomed");
    }

    function renderImage() {
      if (!lightboxItems.length) return;
      const current = lightboxItems[lightboxIndex];
      if (!current) return;

      imgEl.src = current.url;
      imgEl.alt = current.alt || (isEnglish ? "Enlarged image" : "Imagen ampliada");
      counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
      prevBtn.hidden = lightboxItems.length <= 1;
      nextBtn.hidden = lightboxItems.length <= 1;
      counter.hidden = lightboxItems.length <= 1;
      resetDialogZoom();
    }

    function goTo(index) {
      if (!lightboxItems.length) return;
      lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
      renderImage();
    }

    function nextImage() {
      goTo(lightboxIndex + 1);
    }

    function prevImage() {
      goTo(lightboxIndex - 1);
    }

    function buildItemFromImage(image) {
      return {
        image,
        url: image.currentSrc || image.src,
        alt: image.alt || ""
      };
    }

    function getGalleryForImage(image) {
      const apartmentCard = image.closest(".apartment-collapsible");
      if (!apartmentCard) return [buildItemFromImage(image)];

      const groupedImages = Array.from(apartmentCard.querySelectorAll("[data-apartment-content] img"))
        .filter((candidate) => !candidate.closest("#featured-carousel") && !candidate.closest(".gallery-item"))
        .map(buildItemFromImage);

      return groupedImages.length ? groupedImages : [buildItemFromImage(image)];
    }

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    closeBtn.addEventListener("click", closeDialog);
    prevBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      prevImage();
    });
    nextBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      nextImage();
    });

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) closeDialog();
    });

    window.addEventListener("keydown", (event) => {
      if (!dialog.open) return;
      if (event.key === "Escape") {
        closeDialog();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevImage();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      }
    });

    attachSwipeNavigation(body, {
      minSwipe: 30,
      flickDistance: 14,
      maxFlickMs: 240,
      onNext: nextImage,
      onPrev: prevImage,
      allowSwipe: () => dialog.open && lightboxItems.length > 1 && !imgEl.classList.contains("zoomed")
    });

    const candidates = document.querySelectorAll("main img");
    candidates.forEach((img) => {
      if (img.closest(".gallery-item")) return;
      if (img.closest("#featured-carousel")) return;
      if (img.closest("#lightbox")) return;
      if (img.closest("#image-zoom")) return;

      img.classList.add("zoomable-image");
      img.addEventListener("click", () => {
        lightboxItems = getGalleryForImage(img);
        const startIndex = lightboxItems.findIndex((item) => item.image === img);
        lightboxIndex = startIndex >= 0 ? startIndex : 0;
        renderImage();
        dialog.showModal();
        showSwipeHint(body, {
          text: isEnglish ? "Swipe to see next photo" : "Desliza para ver la siguiente foto",
          storageKey: "hint-apartment-lightbox-swipe"
        });
      });
    });
  }

  function initGalleryLightbox() {
    const dialog = document.getElementById("lightbox");
    const body = dialog ? dialog.querySelector(".lightbox-body") : null;
    const img = document.getElementById("lightbox-image");
    const tag = document.getElementById("lightbox-tag");
    const text = document.getElementById("lightbox-text");
    const close = document.getElementById("lightbox-close");
    const items = Array.from(document.querySelectorAll(".gallery-item"));

    if (!dialog || !body || !img || !tag || !text || !close || items.length === 0) return;
    body.classList.add("lightbox-body--carousel");
    initDialogImageZoom(dialog, img);

    let prevBtn = document.getElementById("lightbox-prev");
    let nextBtn = document.getElementById("lightbox-next");
    let counter = dialog.querySelector(".lightbox-counter");

    if (!prevBtn) {
      prevBtn = document.createElement("button");
      prevBtn.id = "lightbox-prev";
      prevBtn.type = "button";
      prevBtn.className = "lightbox-nav lightbox-nav--prev";
      prevBtn.setAttribute("aria-label", isEnglish ? "Previous image" : "Imagen anterior");
      prevBtn.textContent = "‹";
      body.appendChild(prevBtn);
    }

    if (!nextBtn) {
      nextBtn = document.createElement("button");
      nextBtn.id = "lightbox-next";
      nextBtn.type = "button";
      nextBtn.className = "lightbox-nav lightbox-nav--next";
      nextBtn.setAttribute("aria-label", isEnglish ? "Next image" : "Imagen siguiente");
      nextBtn.textContent = "›";
      body.appendChild(nextBtn);
    }

    if (!counter) {
      counter = document.createElement("p");
      counter.className = "lightbox-counter";
      body.appendChild(counter);
    }

    const galleryItems = items.map((item) => {
      const sourceImg = item.querySelector("img");
      return {
        full: item.dataset.full || "",
        caption: item.dataset.caption || "",
        category: item.dataset.category || "",
        alt: sourceImg ? sourceImg.alt : item.dataset.caption || ""
      };
    });

    let currentIndex = 0;

    function renderFromIndex(index) {
      if (!galleryItems.length) return;
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const current = galleryItems[currentIndex];
      const hasCategory = current.category.trim().length > 0;
      const hasCaption = current.caption.trim().length > 0;
      img.src = current.full;
      img.alt = current.alt;
      tag.textContent = current.category;
      text.textContent = current.caption;
      tag.hidden = !hasCategory;
      text.hidden = !hasCaption;
      counter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      prevBtn.hidden = galleryItems.length <= 1;
      nextBtn.hidden = galleryItems.length <= 1;
      counter.hidden = galleryItems.length <= 1;
    }

    function openAt(index) {
      renderFromIndex(index);
      dialog.showModal();
      showSwipeHint(body, {
        text: isEnglish ? "Swipe or use arrows" : "Desliza o usa las flechas",
        forceShow: true
      });
    }

    function goPrev() {
      renderFromIndex(currentIndex - 1);
    }

    function goNext() {
      renderFromIndex(currentIndex + 1);
    }

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    close.addEventListener("click", closeDialog);
    prevBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      goPrev();
    });
    nextBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      goNext();
    });

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        openAt(index);
      });
    });

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) closeDialog();
    });

    window.addEventListener("keydown", (event) => {
      if (!dialog.open) return;
      if (event.key === "Escape") {
        closeDialog();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    });

    attachSwipeNavigation(body, {
      minSwipe: 30,
      flickDistance: 14,
      maxFlickMs: 240,
      onNext: goNext,
      onPrev: goPrev,
      allowSwipe: () => dialog.open && galleryItems.length > 1 && !img.classList.contains("zoomed")
    });
  }

  initHomeCarousel();
  initReviewsCarousel();
  initGalleryLightbox();
  initGlobalImageLightbox();
  initMobileStickyCta();
  markActionLinks();
  initAssistantJumpLinks();
  initApartmentContextCtas();
  initApartmentCollapsibles();
  initStayAssistant();
  initLocationPlanSelector();
  initMobileStickyCtaVisibility();
  initHomeHeaderScroll();
})();
