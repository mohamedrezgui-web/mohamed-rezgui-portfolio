(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("#site-nav");
  const menuIcon = document.querySelector("[data-menu-icon]");

  function closeMenu() {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Apri il menu");
    if (menuIcon) menuIcon.textContent = "+";
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      siteNav.classList.toggle("is-open", !isOpen);
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Apri il menu" : "Chiudi il menu");
      if (menuIcon) menuIcon.textContent = isOpen ? "+" : "×";
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.matchMedia("(min-width: 681px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks
    .filter((link) => link.getAttribute("href")?.startsWith("#"))
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const currentId = `#${entry.target.id}`;
        for (const link of navLinks) {
          if (link.getAttribute("href") === currentId) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        }
      }
    }, { rootMargin: "-30% 0px -60% 0px" });

    for (const section of sections) sectionObserver.observe(section);
  }
})();
