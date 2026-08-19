(function () {
  "use strict";

  /* Año en el footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header: cambia de estilo al hacer scroll */
  var header = document.getElementById("siteHeader");
  var lastY = window.scrollY;
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    var backToTop = document.getElementById("backToTop");
    if (backToTop) {
      if (window.scrollY > 700) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }
    lastY = window.scrollY;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Botón de scroll cue en el hero */
  var scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    scrollCue.addEventListener("click", function () {
      var target = document.getElementById("nosotros");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* Volver arriba */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Animaciones al aparecer (scroll reveal) */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (Array.prototype.indexOf.call(revealEls, el) % 6) * 70;
            setTimeout(function () {
              el.classList.add("in-view");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* Efecto parallax suave en el hero */
  var heroMedia = document.getElementById("heroMedia");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroMedia && !reduceMotion) {
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          heroMedia.style.transform = "translateY(" + y * 0.28 + "px)";
        }
      },
      { passive: true }
    );
  }
})();
