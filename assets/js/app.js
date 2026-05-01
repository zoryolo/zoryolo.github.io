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
        dot.setAttribute("aria-label", `Ir a imagen ${idx + 1}`);
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
        '<button class="lightbox-close" aria-label="Cerrar">✕</button>' +
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
})();
