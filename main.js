document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("active");

      // Prevent body scrolling when menu is open
      if (nav.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    // Close menu when clicking a link (useful for hash links)
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        body.style.overflow = "";
      });
    });
  }

  // 2. Header Scroll Effect (Dynamic Shadow & Blur)
  const header = document.querySelector(".header");
  if (header) {
    // Initial check
    if (window.scrollY > 20) header.classList.add("header--scrolled");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);

        // Clean up classes after animation so hover states work nicely
        entry.target.addEventListener("transitionend", function cleanup(e) {
          if (e.propertyName === "transform" || e.propertyName === "opacity") {
            entry.target.classList.remove("reveal-hidden", "reveal-visible");
            entry.target.removeEventListener("transitionend", cleanup);
          }
        });
      }
    });
  }, observerOptions);

  // Select elements we want to animate on scroll
  const revealElements = document.querySelectorAll(
    ".product-card, .character-card, .about__grid, .packaging__image-wrapper, .game__rules-box, .game__digital",
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });
});
