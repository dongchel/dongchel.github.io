// site.js — shared interactions
document.addEventListener("DOMContentLoaded", () => {
  const yy = document.getElementById("yy");
  if (yy) yy.textContent = new Date().getFullYear();

  // scroll-reveal (armReveals is re-run after data.js content is inserted)
  const io = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  function armReveals() {
    document.querySelectorAll(".reveal:not([data-observed])").forEach((el) => {
      el.dataset.observed = "1";
      if (io) io.observe(el); else el.classList.add("is-in");
    });
    document.querySelectorAll("[data-stagger]:not([data-staggered])").forEach((group) => {
      group.dataset.staggered = "1";
      Array.from(group.children).forEach((child, i) => {
        child.style.transitionDelay = (i * 60) + "ms";
      });
    });
  }

  armReveals();
  document.addEventListener("content-rendered", armReveals);
});
