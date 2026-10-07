(function () {
  // Language switcher logic
  const langButtons = document.querySelectorAll(".lang-btn");
  const body = document.body;

  const themeButtons = document.querySelectorAll(".theme-btn");
  const companyLogo = document.querySelector(".company-logo");

  function setTheme(theme) {
    const isLight = theme === "light";
    body.classList.toggle("theme-light", isLight);
    companyLogo.src = isLight ? "./img/logo.png" : "./img/logo2.png";
    themeButtons.forEach((btn) => {
      const isActive = btn.dataset.theme === theme;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
    localStorage.setItem("marcone_theme_pref", theme);
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
  });

  const savedTheme = localStorage.getItem("marcone_theme_pref");
  setTheme(savedTheme === "light" ? "light" : "dark");

  function setLanguage(lang) {
    if (lang === "en") {
      body.classList.add("lang-en");
      body.classList.remove("lang-pt");
      document.documentElement.lang = "en";
    } else {
      body.classList.add("lang-pt");
      body.classList.remove("lang-en");
      document.documentElement.lang = "pt-BR";
    }
    // update active button style
    langButtons.forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    localStorage.setItem("marcone_lang_pref", lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  // load saved preference
  const savedLang = localStorage.getItem("marcone_lang_pref");
  if (savedLang && (savedLang === "pt" || savedLang === "en")) {
    setLanguage(savedLang);
  } else {
    // default portuguese already set
    setLanguage("pt");
  }

  // hover effect on cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.transition = "transform 0.2s ease, border-color 0.2s";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0px)";
    });
  });
})();
