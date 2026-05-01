(function () {
  const page = document.body.dataset.page || "home";
  const currentYearEls = document.querySelectorAll("[data-current-year]");
  currentYearEls.forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const routeByPage = {
    home: "/",
    sobre: "/sobre-la-casa/",
    galeria: "/galeria/",
    ubicacion: "/ubicacion/",
    contacto: "/contacto/",
    privacidad: "/privacidad/",
    terminos: "/terminos/"
  };

  const currentRoute = routeByPage[page] || "/";
  document.querySelectorAll("[data-route]").forEach((link) => {
    if (link.getAttribute("data-route") === currentRoute) {
      link.classList.add("active");
    }
  });

  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const mobilePanel = document.getElementById("mobile-panel");
  const mobileBackdrop = document.getElementById("mobile-backdrop");

  function closeMenu() {
    if (!mobilePanel || !mobileBackdrop) return;
    mobilePanel.classList.remove("open");
    mobileBackdrop.classList.remove("show");
  }

  if (menuOpen && mobilePanel && mobileBackdrop) {
    menuOpen.addEventListener("click", () => {
      mobilePanel.classList.add("open");
      mobileBackdrop.classList.add("show");
    });
  }

  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

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

  function initHomeCarousel() {
    const imageEl = document.getElementById("featured-image");
    const prev = document.getElementById("featured-prev");
    const next = document.getElementById("featured-next");
    const indicators = document.getElementById("featured-indicators");
    const counter = document.getElementById("featured-counter");

    if (!imageEl || !prev || !next || !indicators || !counter) return;

    const items = [
      {
        url: "/images/inicio1.png",
        alt: "Vista exterior de Los Tresoles casa rural con jardín y montañas"
      },
      {
        url: "/images/lostressoles.png",
        alt: "Interior acogedor de Los Tresoles con chimenea y decoración rústica"
      },
      {
        url: "/images/exterior1.png",
        alt: "Dormitorio principal con vistas panorámicas a la sierra"
      },
      {
        url: "/images/tressoles1.png",
        alt: "Terraza exterior con zona de comedor y vistas al valle"
      }
    ];

    let index = 0;
    let timer = null;

    function render() {
      const item = items[index];
      imageEl.src = item.url;
      imageEl.alt = item.alt;
      counter.textContent = `${index + 1} / ${items.length}`;

      indicators.innerHTML = "";
      items.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir a imagen ${idx + 1}`);
        if (idx === index) dot.classList.add("active");
        dot.addEventListener("click", () => {
          index = idx;
          render();
          restart();
        });
        indicators.appendChild(dot);
      });
    }

    function nextSlide() {
      index = (index + 1) % items.length;
      render();
    }

    function prevSlide() {
      index = (index - 1 + items.length) % items.length;
      render();
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, 5200);
    }

    prev.addEventListener("click", () => {
      prevSlide();
      restart();
    });

    next.addEventListener("click", () => {
      nextSlide();
      restart();
    });

    render();
    restart();
  }

  function initGalleryLightbox() {
    const dialog = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-image");
    const tag = document.getElementById("lightbox-tag");
    const text = document.getElementById("lightbox-text");
    const close = document.getElementById("lightbox-close");
    const items = document.querySelectorAll(".gallery-item");

    if (!dialog || !img || !tag || !text || !close || items.length === 0) return;

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

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const toast = document.getElementById("toast");
    if (!form) return;

    const fields = {
      name: form.querySelector("#name"),
      email: form.querySelector("#email"),
      message: form.querySelector("#message")
    };

    function showError(id, msg) {
      const target = form.querySelector(`[data-error='${id}']`);
      if (target) target.textContent = msg;
    }

    function clearErrors() {
      form.querySelectorAll("[data-error]").forEach((el) => {
        el.textContent = "";
      });
    }

    function showToast(message, type) {
      if (!toast) return;
      toast.textContent = message;
      toast.className = `toast ${type} show`;
      setTimeout(() => {
        toast.className = "toast";
      }, 2800);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      let hasError = false;
      const name = fields.name ? fields.name.value.trim() : "";
      const email = fields.email ? fields.email.value.trim() : "";
      const message = fields.message ? fields.message.value.trim() : "";

      if (!name) {
        showError("name", "El nombre es obligatorio");
        hasError = true;
      }

      if (!email) {
        showError("email", "El email es obligatorio");
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showError("email", "Email inválido");
        hasError = true;
      }

      if (!message) {
        showError("message", "El mensaje es obligatorio");
        hasError = true;
      } else if (message.length < 10) {
        showError("message", "El mensaje debe tener al menos 10 caracteres");
        hasError = true;
      }

      if (hasError) {
        showToast("Revisa los campos marcados.", "error");
        return;
      }

      const payload = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name,
        email,
        phone: form.querySelector("#phone")?.value.trim() || "",
        dates: form.querySelector("#dates")?.value.trim() || "",
        message
      };

      try {
        const existing = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
        existing.push(payload);
        localStorage.setItem("contactSubmissions", JSON.stringify(existing));
        form.reset();
        showToast("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.", "success");
      } catch (_err) {
        showToast("Error al enviar el mensaje. Por favor, inténtalo de nuevo.", "error");
      }
    });
  }

  initHomeCarousel();
  initGalleryLightbox();
  initContactForm();
})();
