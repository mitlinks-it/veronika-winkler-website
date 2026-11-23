// Mobile navigation, header shadow and contact-form prefill. The site works without JS.
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Header shadow once the page is scrolled
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Preselect the appointment window when coming from a price (e.g. /kontakt/?frist=48-stunden)
  var form = document.querySelector("[data-contact-form]");
  if (form && window.URLSearchParams) {
    var frist = new URLSearchParams(window.location.search).get("frist");
    var select = form.querySelector("#contact-frist");
    if (frist && select && select.querySelector('option[value="' + CSS.escape(frist) + '"]')) {
      select.value = frist;
    }
  }
})();
