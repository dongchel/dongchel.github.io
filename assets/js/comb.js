// comb.js — animated "frequency comb" hero canvas
// Draws a field of spectral comb lines whose envelope breathes like a
// mode-locked laser spectrum, with a faint traveling interference wave.
(function () {
  const canvas = document.getElementById("comb");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const wrap = canvas.parentElement;

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let t = 0;
  let mx = 0.5, my = 0.35;
  let targetMx = 0.5, targetMy = 0.35;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    w = wrap.clientWidth;
    h = wrap.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onMove(e) {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - r.left;
    const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) - r.top;
    if (Number.isFinite(x) && Number.isFinite(y)) {
      targetMx = Math.min(Math.max(x / r.width, 0), 1);
      targetMy = Math.min(Math.max(y / r.height, 0), 1);
    }
  }

  const NLINES = 64;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    mx += (targetMx - mx) * 0.04;
    my += (targetMy - my) * 0.04;

    const baseY = h * 0.62;
    const spacing = w / (NLINES - 1);
    const parallax = (mx - 0.5) * 26;

    // envelope: gaussian-ish pulse that drifts + breathes
    const center = NLINES / 2 + Math.sin(t * 0.15) * 6;
    const width = 13 + Math.sin(t * 0.08) * 2.4;

    ctx.lineCap = "round";

    for (let i = 0; i < NLINES; i++) {
      const dx = i - center;
      const envelope = Math.exp(-(dx * dx) / (2 * width * width));
      const x = i * spacing + parallax * (i / NLINES);
      const jitter = Math.sin(t * 1.4 + i * 0.5) * 3;
      const lineH = 14 + envelope * (h * 0.34) + jitter * envelope;
      const alpha = 0.08 + envelope * 0.46;

      const hue = 232 + envelope * 40; // blue -> violet across the comb
      ctx.strokeStyle = `hsla(${hue}, 90%, ${58 - envelope * 8}%, ${alpha})`;
      ctx.lineWidth = 1.6 + envelope * 1.6;

      ctx.beginPath();
      ctx.moveTo(x, baseY + my * 24);
      ctx.lineTo(x, baseY + my * 24 - lineH);
      ctx.stroke();
    }

    // faint traveling interference wave beneath the comb
    ctx.beginPath();
    ctx.strokeStyle = "rgba(124,92,255,0.16)";
    ctx.lineWidth = 1.4;
    for (let x = 0; x <= w; x += 6) {
      const y =
        baseY + my * 24 + 34 +
        Math.sin(x * 0.02 + t * 1.1) * 10 +
        Math.sin(x * 0.007 - t * 0.6) * 14;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    t += reduceMotion ? 0 : 0.016;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: true });

  resize();
  requestAnimationFrame(draw);
})();
