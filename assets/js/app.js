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

    function renderAssistantResult() {
      const payload = buildAssistantPayload();
      preview.textContent = payload.message;
      whatsappLink.href = buildWhatsappUrl(payload.message);

      if (payload.errors.length) {
        previewWrap.hidden = true;
        feedback.textContent = payload.errors.join(" ");
        feedback.classList.add("assistant-feedback--error");
        return false;
      }

      previewWrap.hidden = !payload.hasBothDates;
      feedback.textContent = "";
      feedback.classList.remove("assistant-feedback--error");
      return true;
    }

    whatsappLink.addEventListener("click", (event) => {
      const isValid = renderAssistantResult();
      if (!isValid) {
        event.preventDefault();
      }
    });

    [checkin, checkout, guests, stayType, apartment].forEach((field) => {
      if (!field) return;
      field.addEventListener("input", renderAssistantResult);
      field.addEventListener("change", renderAssistantResult);
    });

    renderAssistantResult();
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

  function initHomeCarousel() {
    const image = document.getElementById("featured-image");
    const prev = document.getElementById("featured-prev");
    const next = document.getElementById("featured-next");
    const indicators = document.getElementById("featured-indicators");
    const counter = document.getElementById("featured-counter");
    const carousel = document.getElementById("featured-carousel");

    if (!image || !prev || !next || !indicators || !counter || !carousel) return;

    const items = [
      {
        url: "/images-web/apartamentos2.jpg",
        alt: isEnglish ? "Apartments at Los Tres Soles" : "Apartamentos de Los Tres Soles"
      },
      {
        url: "/images-web/exterior1.jpg",
        alt: isEnglish ? "Exterior of Los Tres Soles" : "Exterior de Los Tres Soles"
      },
      {
        url: "/images-web/exterior2.jpg",
        alt: isEnglish ? "Exterior of the property" : "Exterior de la finca"
      },
      {
        url: "/images-web/exterior3.jpg",
        alt: isEnglish ? "Outdoor area of Los Tres Soles" : "Zona exterior de Los Tres Soles"
      },
      {
        url: "/images-web/exterior4.jpg",
        alt: isEnglish ? "Rural setting around the house" : "Entorno exterior de la casa rural"
      },
      {
        url: "/images-web/tressoles1.jpg",
        alt: isEnglish ? "Details of Los Tres Soles" : "Detalle de Los Tres Soles"
      },
      {
        url: "/images-web/tressoles2.jpg",
        alt: isEnglish ? "Property view" : "Vista de la propiedad"
      },
      {
        url: "/images-web/tressoles4.jpg",
        alt: isEnglish ? "Corner of Los Tres Soles" : "Rincón de Los Tres Soles"
      },
      {
        url: "/images-web/apartamentos4.jpg",
        alt: isEnglish ? "Apartments inside the estate" : "Apartamentos en la finca"
      },
      {
        url: "/images-web/apartamentos1.jpg",
        alt: isEnglish ? "Garden area by the apartments" : "Zona ajardinada de apartamentos"
      },
      {
        url: "/images-web/lostressoles.jpg",
        alt: "Los Tres Soles"
      }
    ];

    let index = 0;
    let timer = null;
    let pauseTimeout = null;
    const pauseMs = 8000;

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

    prev.addEventListener("click", () => {
      prevSlide();
      pauseAutoplay();
    });

    next.addEventListener("click", () => {
      nextSlide();
      pauseAutoplay();
    });

    let touchStartX = 0;
    let touchStartY = 0;
    carousel.addEventListener("touchstart", (event) => {
      const firstTouch = event.changedTouches[0];
      touchStartX = firstTouch.clientX;
      touchStartY = firstTouch.clientY;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
      const lastTouch = event.changedTouches[0];
      const deltaX = lastTouch.clientX - touchStartX;
      const deltaY = lastTouch.clientY - touchStartY;
      const minSwipe = 45;

      if (Math.abs(deltaX) < minSwipe || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      pauseAutoplay();
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
        '<div class="lightbox-body">' +
        `<button class="lightbox-close" aria-label="${isEnglish ? "Close" : "Cerrar"}">✕</button>` +
        '<img src="" alt="" />' +
        "</div>";
      document.body.appendChild(dialog);
    }

    const imgEl = dialog.querySelector("img");
    const closeBtn = dialog.querySelector(".lightbox-close");
    if (!imgEl || !closeBtn) return;
    initDialogImageZoom(dialog, imgEl);

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    closeBtn.addEventListener("click", closeDialog);
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
      if (event.key === "Escape") closeDialog();
    });

    const candidates = document.querySelectorAll("main img");
    candidates.forEach((img) => {
      if (img.closest(".gallery-item")) return;
      if (img.closest("#lightbox")) return;
      if (img.closest("#image-zoom")) return;

      img.classList.add("zoomable-image");
      img.addEventListener("click", () => {
        imgEl.src = img.currentSrc || img.src;
        imgEl.alt = img.alt || (isEnglish ? "Enlarged image" : "Imagen ampliada");
        dialog.showModal();
      });
    });
  }

  function initGalleryLightbox() {
    const dialog = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-image");
    const tag = document.getElementById("lightbox-tag");
    const text = document.getElementById("lightbox-text");
    const close = document.getElementById("lightbox-close");
    const items = document.querySelectorAll(".gallery-item");

    if (!dialog || !img || !tag || !text || !close || items.length === 0) return;
    initDialogImageZoom(dialog, img);

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    close.addEventListener("click", closeDialog);

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const full = item.dataset.full;
        const caption = item.dataset.caption || "";
        const category = item.dataset.category || "";
        const sourceImg = item.querySelector("img");

        img.src = full;
        img.alt = sourceImg ? sourceImg.alt : caption;
        tag.textContent = category;
        text.textContent = caption;

        dialog.showModal();
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
      if (event.key === "Escape") closeDialog();
    });
  }

  initHomeCarousel();
  initGalleryLightbox();
  initGlobalImageLightbox();
  initMobileStickyCta();
  markActionLinks();
  initAssistantJumpLinks();
  initApartmentContextCtas();
  initStayAssistant();
  initLocationPlanSelector();
  initMobileStickyCtaVisibility();
  initHomeHeaderScroll();
})();
