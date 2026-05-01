(function () {
  function hideLoader() {
    const loader = document.getElementById("lts-loader");
    if (!loader) return;

    loader.classList.add("lts-hidden");

    window.setTimeout(function () {
      loader.remove();
    }, 700);
  }

  window.addEventListener("load", function () {
    window.setTimeout(hideLoader, 450);
  });
})();