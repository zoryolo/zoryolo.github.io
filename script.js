const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const galleryItems = document.querySelectorAll(".gallery-item");
const reveals = document.querySelectorAll(".reveal");
const heroImages = document.querySelectorAll(".hero-image");

let heroIndex = 0;

const toggleMenu = () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", toggleMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});

if (heroImages.length > 1) {
  setInterval(() => {
    heroImages[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImages[heroIndex].classList.add("is-active");
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
  { threshold: 0.14 }
);

reveals.forEach((node) => revealObserver.observe(node));

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const full = item.dataset.full;
    const caption = item.dataset.caption || "";
    const sourceImage = item.querySelector("img");

    lightboxImage.src = full;
    lightboxImage.alt = sourceImage ? sourceImage.alt : caption;
    lightboxCaption.textContent = caption;

    if (!lightbox.open) {
      lightbox.showModal();
    }
  });
});

const closeLightbox = () => {
  if (lightbox.open) {
    lightbox.close();
  }
};

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

lightbox.addEventListener("click", (event) => {
  const dialogDimensions = lightbox.getBoundingClientRect();
  const outsideDialog =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (outsideDialog) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
