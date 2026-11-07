// site.js — shared interactions
document.addEventListener("DOMContentLoaded", () => {
  const yy = document.getElementById("yy");
  if (yy) yy.textContent = new Date().getFullYear();

  // dark-mode toggle: flips whatever is showing now and remembers the choice
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      const next = isDark ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // homepage: show the header name only after the big intro name scrolls away
  const introName = document.querySelector(".intro-name");
  const header = document.querySelector(".site-header");
  if (introName && header && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      header.classList.toggle("brand-hidden", e.isIntersecting);
    }, { rootMargin: "-64px 0px 0px 0px" }).observe(introName);
  }

  // scroll-reveal (only when the head script enabled .anim;
  // armReveals is re-run after data.js content is inserted)
  const animate = document.documentElement.classList.contains("anim");
  const io = animate
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" })
    : null;

  function armReveals() {
    document.querySelectorAll(".reveal:not([data-observed])").forEach((el) => {
      el.dataset.observed = "1";
      if (io) io.observe(el); else el.classList.add("is-in");
    });
  }

  armReveals();
  document.addEventListener("content-rendered", armReveals);
});
