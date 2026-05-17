const catalogShell = document.querySelector(".catalog-shell");

if (catalogShell) {
  const slides = Array.from(document.querySelectorAll(".catalog-slide"));
  const dots = Array.from(document.querySelectorAll(".mobile-dots button"));
  let current = Number(new URLSearchParams(window.location.search).get("page")) || 1;
  current = Math.min(Math.max(current, 1), slides.length);

  const setSlide = (next) => {
    current = ((next - 1 + slides.length) % slides.length) + 1;
    document.body.dataset.current = String(current);
    slides.forEach((slide) => slide.classList.toggle("is-active", Number(slide.dataset.slide) === current));
    dots.forEach((dot) => dot.classList.toggle("is-active", Number(dot.dataset.jump) === current));
    history.replaceState(null, "", `?page=${String(current).padStart(2, "0")}`);
  };

  document.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => setSlide(current + Number(button.dataset.dir)));
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => setSlide(Number(dot.dataset.jump)));
  });

  let startX = 0;
  catalogShell.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });

  catalogShell.addEventListener("pointerup", (event) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 52) {
      setSlide(current + (delta < 0 ? 1 : -1));
    }
  });

  setSlide(current);
}

const menuButton = document.querySelector(".hamburger, .hotspot-menu");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    window.location.href = "./catalog.html?page=04";
  });
}
