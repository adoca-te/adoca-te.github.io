(() => {
  const WHATSAPP = document.body.dataset.whatsapp;      // ex.: 351912345678

  /* Header: sombra ao fazer scroll */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Logo → voltar ao início da página */
  document.querySelector(".site-header .brand").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
  });

  /* Menu mobile */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("open", !open);
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    }
  });

  /* Filtros da galeria */
  const chips = document.querySelectorAll(".chip");
  const cakes = document.querySelectorAll(".cake");
  const moreBtn = document.getElementById("ver-mais");
  let filter = "todos";
  let expanded = false;

  // Em "Todos" mostra só os primeiros 15 até carregar em "Ver mais"; os filtros mostram tudo.
  const applyFilter = () => {
    cakes.forEach((cake) => {
      const match = filter === "todos" || cake.dataset.cat.split(" ").includes(filter);
      const collapsed = filter === "todos" && !expanded && cake.hasAttribute("data-extra");
      cake.hidden = !match || collapsed;
    });
    moreBtn.hidden = filter !== "todos" || expanded;
  };

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", String(c === chip));
      });
      filter = chip.dataset.filter;
      applyFilter();
    })
  );
  moreBtn.addEventListener("click", () => { expanded = true; applyFilter(); });
  applyFilter();

  /* Lightbox */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbTitle = document.getElementById("lb-title");
  const lbSub = document.getElementById("lb-sub");
  const lbFlavour = document.getElementById("lb-flavour");
  const lbDots = document.getElementById("lb-dots");
  const lbStory = document.getElementById("lb-story");
  const prev = lb.querySelector(".lb-prev");
  const next = lb.querySelector(".lb-next");
  let images = [];
  let idx = 0;
  let currentTitle = "";

  const show = (i) => {
    idx = (i + images.length) % images.length;
    lbImg.src = `assets/img/${images[idx]}.webp`;
    [...lbDots.children].forEach((d, n) => d.classList.toggle("on", n === idx));
  };

  document.querySelectorAll(".cake-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const cake = btn.closest(".cake");
      images = btn.dataset.images.split(",");
      currentTitle = cake.querySelector("h3").textContent;
      lbTitle.textContent = currentTitle;
      lbSub.textContent = cake.querySelector(".cake-sub").textContent;
      lbFlavour.textContent = cake.querySelector(".cake-flavour").textContent;
      lbStory.textContent = cake.querySelector(".cake-story")?.textContent || "";
      lbImg.alt = btn.querySelector("img").alt;
      lbDots.innerHTML = images.length > 1 ? images.map(() => "<span></span>").join("") : "";
      prev.hidden = next.hidden = images.length < 2;
      show(0);
      lb.showModal();
    })
  );

  prev.addEventListener("click", () => show(idx - 1));
  next.addEventListener("click", () => show(idx + 1));
  lb.querySelector(".lb-close").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  // swipe em telemóvel
  let x0 = null;
  lbImg.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener("touchend", (e) => {
    if (x0 === null || images.length < 2) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // "Quero um bolo assim" → preenche a ideia no formulário
  document.getElementById("lb-order").addEventListener("click", () => {
    lb.close();
    const ideia = document.getElementById("f-ideia");
    if (!ideia.value) ideia.value = `Gostava de um bolo parecido com o "${currentTitle}".`;
  });

  /* Formulário → WhatsApp */
  const form = document.getElementById("order-form");
  const err = document.getElementById("form-error");
  const dateInput = document.getElementById("f-data");
  const minDate = new Date(Date.now() + 5 * 864e5);
  dateInput.min = minDate.toISOString().split("T")[0];

  const buildMessage = () => {
    const d = Object.fromEntries(new FormData(form));
    const data = d.data ? new Date(d.data + "T12:00").toLocaleDateString("pt-PT") : "";
    const lines = [
      `• Nome: ${d.nome}`,
      `• Ocasião: ${d.ocasiao}`,
      `• Data: ${data}`,
      d.pessoas && `• Nº de pessoas: ${d.pessoas}`,
      `• Local: ${d.local}`,
      d.sabor && `• Sabor: ${d.sabor}`,
      d.ideia && `• Ideia: ${d.ideia}`,
    ];
    return "Olá Adoça-te! 🎂 Gostava de fazer uma encomenda:\n\n" + lines.filter(Boolean).join("\n");
  };

  const validate = () => {
    let ok = true;
    ["f-nome", "f-ocasiao", "f-data"].forEach((id) => {
      const el = document.getElementById(id);
      const bad = !el.value.trim();
      el.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    err.hidden = ok;
    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener");
  });

  document.getElementById("ano").textContent = new Date().getFullYear();
})();
