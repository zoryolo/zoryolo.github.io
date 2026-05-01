const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const heroSlides = document.querySelectorAll(".hero-slide");
const revealNodes = document.querySelectorAll(".reveal");

const carouselTrack = document.getElementById("carousel-track");
const carouselDots = document.getElementById("carousel-dots");
const carouselCounter = document.getElementById("carousel-counter");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

const featuredImages = [
  { src: "images/inicio1.png", alt: "Vista principal de Los Tresoles" },
  { src: "images/sol5.png", alt: "Vista exterior panorámica" },
  { src: "images/exterior3.png", alt: "Espacio exterior de la casa" },
  { src: "images/luna3.png", alt: "Zona interior acogedora" }
];

let heroIndex = 0;
let carouselIndex = 0;

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 8) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
  }, 5600);
}

function renderCarousel() {
  if (!carouselTrack || !carouselDots || !carouselCounter) return;

  carouselTrack.innerHTML = "";
  carouselDots.innerHTML = "";

  featuredImages.forEach((item, index) => {
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = index === 0 ? "eager" : "lazy";
    if (index === carouselIndex) image.classList.add("is-active");
    carouselTrack.appendChild(image);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a imagen ${index + 1}`);
    if (index === carouselIndex) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      carouselIndex = index;
      updateCarousel();
    });
    carouselDots.appendChild(dot);
  });

  updateCarousel();
}

function updateCarousel() {
  const images = carouselTrack ? carouselTrack.querySelectorAll("img") : [];
  const dots = carouselDots ? carouselDots.querySelectorAll("button") : [];

  images.forEach((image, index) => {
    image.classList.toggle("is-active", index === carouselIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === carouselIndex);
  });

  if (carouselCounter) {
    carouselCounter.textContent = `${carouselIndex + 1} / ${featuredImages.length}`;
  }
}

if (carouselPrev && carouselNext) {
  carouselPrev.addEventListener("click", () => {
    carouselIndex = (carouselIndex - 1 + featuredImages.length) % featuredImages.length;
    updateCarousel();
  });

  carouselNext.addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % featuredImages.length;
    updateCarousel();
  });
}

if (featuredImages.length > 0) {
  renderCarousel();
  setInterval(() => {
    carouselIndex = (carouselIndex + 1) % featuredImages.length;
    updateCarousel();
  }, 5200);
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const fullSrc = item.dataset.full;
    const caption = item.dataset.caption || "";
    const image = item.querySelector("img");

    if (!fullSrc || !lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = fullSrc;
    lightboxImage.alt = image ? image.alt : caption;
    lightboxCaption.textContent = caption;
    lightbox.showModal();
  });
});

function closeLightbox() {
  if (lightbox && lightbox.open) {
    lightbox.close();
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    const dimensions = lightbox.getBoundingClientRect();
    const outside =
      event.clientX < dimensions.left ||
      event.clientX > dimensions.right ||
      event.clientY < dimensions.top ||
      event.clientY > dimensions.bottom;

    if (outside) closeLightbox();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
