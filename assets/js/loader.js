(function () {
  const MIN_VISIBLE_MS = 850;
  const FADE_MS = 420;
  const startAt = performance.now();

  function hideSiteLoader() {
    const loader = document.getElementById("site-loader");
    if (!loader) return;

    const elapsed = performance.now() - startAt;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    window.setTimeout(function () {
      loader.classList.add("site-loader--hidden");

      window.setTimeout(function () {
        loader.setAttribute("aria-hidden", "true");
        loader.style.pointerEvents = "none";
        loader.style.display = "none";
      }, FADE_MS + 40);
    }, wait);
  }

  if (document.readyState === "complete") {
    hideSiteLoader();
  } else {
    window.addEventListener("load", hideSiteLoader, { once: true });
  }
})();
