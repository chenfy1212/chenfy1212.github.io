(function () {
  const content = window.SITE_CONTENT;
  const services = document.querySelector("#service-list");
  const filters = document.querySelector("#project-filters");
  const projects = document.querySelector("#project-list");
  const processes = document.querySelector("#process-list");
  const lightbox = document.querySelector("#lightbox");

  services.innerHTML = content.services.map(item => `
    <article class="service-card reveal">
      <span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p><i>↗</i>
    </article>`).join("");

  filters.innerHTML = content.categories.map((item, index) => `
    <button class="filter${index === 0 ? " active" : ""}" data-filter="${item.id}">${item.label}</button>`).join("");

  function renderProjects(filter = "all") {
    const visible = content.projects.filter(item => filter === "all" || item.category === filter);
    projects.innerHTML = visible.map(item => `
      <button class="project-card ${item.size || "standard"} reveal" data-image="${item.image}" data-title="${item.title}" data-category="${item.categoryLabel}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="project-overlay"></span>
        <span class="project-meta"><small>${item.categoryLabel}</small><strong>${item.title}</strong></span>
        <i>查看项目</i>
      </button>`).join("");
    observeReveals();
  }
  renderProjects();

  processes.innerHTML = content.process.map(item => `
    <article class="process-item reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join("");

  filters.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    filters.querySelectorAll("button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });

  projects.addEventListener("click", event => {
    const card = event.target.closest(".project-card");
    if (!card) return;
    lightbox.querySelector("img").src = card.dataset.image;
    lightbox.querySelector("img").alt = card.dataset.title;
    lightbox.querySelector("strong").textContent = card.dataset.title;
    lightbox.querySelector("span").textContent = card.dataset.category;
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
  });

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
  }
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.closest(".lightbox-close")) closeLightbox();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.addEventListener("click", () => { menuButton.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); });

  function observeReveals() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(item => observer.observe(item));
  }
  observeReveals();
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
