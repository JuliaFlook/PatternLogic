(() => {
  const viewer = document.querySelector(".sheet-viewer");
  const imgEl = document.getElementById("svImg");
  const titleEl = document.getElementById("svTitle");
  const openEl = document.getElementById("svOpen");

  const isPdf = src => /\.pdf$/i.test(src || "");

  document.querySelectorAll(".sheet").forEach(sheet => {
    const img = sheet.querySelector(".sheet-thumb");
    const hoverSrc = img?.dataset.hover;
    const baseSrc = img?.src;

    // preload hover image
    if (hoverSrc) {
      const pre = new Image();
      pre.src = hoverSrc;

      sheet.addEventListener("mouseenter", () => {
        img.src = hoverSrc;
      });

      sheet.addEventListener("mouseleave", () => {
        img.src = baseSrc;
      });
    }

    sheet.addEventListener("click", () => {
      const src = sheet.dataset.src;
      const title = sheet.dataset.title || "";

      if (!src) return;

      if (isPdf(src)) {
        window.open(src, "_blank", "noopener");
        return;
      }

      titleEl.textContent = title;
      imgEl.src = src;
      openEl.href = src;

      viewer.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  viewer.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) {
      viewer.hidden = true;
      imgEl.src = "";
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && !viewer.hidden) {
      viewer.hidden = true;
      imgEl.src = "";
      document.body.style.overflow = "";
    }
  });
})();
