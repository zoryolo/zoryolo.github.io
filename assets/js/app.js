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
    const track = document.getElementById("featured-track");
    const prev = document.getElementById("featured-prev");
    const next = document.getElementById("featured-next");
    const indicators = document.getElementById("featured-indicators");
    const counter = document.getElementById("featured-counter");

    if (!track || !prev || !next || !indicators || !counter) return;

    const items = [
      {
        url: "/images-web/apartamentos2.jpg",
        alt: "Apartamentos de Los Tres Soles"
      },
      {
        url: "/images-web/exterior1.jpg",
        alt: "Exterior de Los Tres Soles"
      },
      {
        url: "/images-web/exterior2.jpg",
        alt: "Exterior de la finca"
      },
      {
        url: "/images-web/exterior3.jpg",
        alt: "Zona exterior de Los Tres Soles"
      },
      {
        url: "/images-web/exterior4.jpg",
        alt: "Entorno exterior de la casa rural"
      },
      {
        url: "/images-web/tressoles1.jpg",
        alt: "Detalle de Los Tres Soles"
      },
      {
        url: "/images-web/tressoles2.jpg",
        alt: "Vista de la propiedad"
      },
      {
        url: "/images-web/tressoles4.jpg",
        alt: "Rincón de Los Tres Soles"
      },
      {
        url: "/images-web/apartamentos4.jpg",
        alt: "Apartamentos en la finca"
      },
      {
        url: "/images-web/apartamentos1.jpg",
        alt: "Zona ajardinada de apartamentos"
      },
      {
        url: "/images-web/lostressoles.jpg",
        alt: "Los Tres Soles"
      }
    ];

    let index = 0;
    let timer = null;
    let scrollTicking = false;

    function buildSlides() {
      track.innerHTML = "";
      items.forEach((item) => {
        const slide = document.createElement("figure");
        slide.className = "carousel-slide";

        const img = document.createElement("img");
        img.src = item.url;
        img.alt = item.alt;
        img.loading = "lazy";
        img.decoding = "async";
        slide.appendChild(img);
        track.appendChild(slide);
      });
    }

    function render() {
      counter.textContent = `${index + 1} / ${items.length}`;

      indicators.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
      });
    }

    function scrollToIndex(targetIndex, behavior = "smooth") {
      index = targetIndex;
      const left = targetIndex * track.clientWidth;
      track.scrollTo({ left, behavior });
      render();
    }

    function getNearestIndex() {
      if (!track.clientWidth) return index;
      const raw = track.scrollLeft / track.clientWidth;
      const nearest = Math.round(raw);
      return Math.max(0, Math.min(items.length - 1, nearest));
    }

    function buildIndicators() {
      indicators.innerHTML = "";
      items.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir a imagen ${idx + 1}`);
        dot.addEventListener("click", () => {
          scrollToIndex(idx);
          restart();
        });
        indicators.appendChild(dot);
      });
    }

    function nextSlide() {
      const target = (index + 1) % items.length;
      scrollToIndex(target);
    }

    function prevSlide() {
      const target = (index - 1 + items.length) % items.length;
      scrollToIndex(target);
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

    track.addEventListener("scroll", () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        index = getNearestIndex();
        render();
        scrollTicking = false;
      });
    });

    window.addEventListener("resize", () => {
      scrollToIndex(index, "auto");
    });

    buildSlides();
    buildIndicators();
    scrollToIndex(0, "auto");
    restart();
  }

  function initGlobalImageLightbox() {
    const existing = document.getElementById("image-zoom");
    const dialog = existing || document.createElement("dialog");

    if (!existing) {
      dialog.id = "image-zoom";
      dialog.className = "lightbox";
      dialog.innerHTML =
        '<div class="lightbox-body">' +
        '<button class="lightbox-close" aria-label="Cerrar">✕</button>' +
        '<img src="" alt="" />' +
        "</div>";
      document.body.appendChild(dialog);
    }

    const imgEl = dialog.querySelector("img");
    const closeBtn = dialog.querySelector(".lightbox-close");
    if (!imgEl || !closeBtn) return;

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
        imgEl.alt = img.alt || "Imagen ampliada";
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
})();
