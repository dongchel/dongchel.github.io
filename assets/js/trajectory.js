// trajectory.js — hero canvas: a stochastic "quantum trajectory" of a
// damped harmonic oscillator, drawn in phase space (x horizontal, p vertical).
//
// This is a genuine physical picture, not decoration: a weakly-measured /
// laser-cooled oscillator (like the cm-scale torsional oscillator in the
// Optica paper) follows a noisy conditional trajectory in phase space —
// rotating at its natural frequency, damped by feedback/measurement,
// re-excited by residual (thermal/quantum) noise. It settles into a small
// fluctuating orbit rather than collapsing to a point, same as a real
// laser-cooled oscillator's residual noise floor.
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const wrap = canvas.parentElement;

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
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

  // ---- physics: damped stochastic harmonic oscillator in phase space ----
  // dx = omega * p * dt
  // dp = (-omega * x - gamma * p) * dt + sigma * dW
  const omega = 1.6;   // natural (rotation) frequency
  const gamma = 0.55;  // damping / cooling rate
  const sigma = 0.85;  // residual noise (thermal + measurement backaction)
  let x = 1.4, p = 0;

  function gaussian() {
    // Box-Muller
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  const trail = []; // {x, p, e}  e = energy at that point, for color
  const MAX_TRAIL = 260;

  // origin of phase-space plot, in CSS px, set on resize
  let ox = 0, oy = 0, scale = 60;

  function layout() {
    ox = w * 0.62;
    oy = h * 0.56;
    scale = Math.min(w, h) * 0.16;
  }

  // ---- mouse: proximity gently "pokes" the oscillator ----
  let mouseX = null, mouseY = null, mouseActive = false;
  function onMove(e) {
    const r = wrap.getBoundingClientRect();
    const cx = (e.clientX ?? (e.touches && e.touches[0].clientX)) - r.left;
    const cy = (e.clientY ?? (e.touches && e.touches[0].clientY)) - r.top;
    if (Number.isFinite(cx) && Number.isFinite(cy)) {
      mouseX = cx; mouseY = cy; mouseActive = true;
    }
  }
  function onLeave() { mouseActive = false; }

  function step(dt) {
    let fx = omega * p;
    let fp = -omega * x - gamma * p;
    x += fx * dt + 0;
    p += fp * dt + sigma * gaussian() * Math.sqrt(dt);

    // gentle poke toward cursor when it's near the current point
    if (mouseActive && mouseX !== null) {
      const px = ox + x * scale, py = oy - p * scale;
      const dxm = mouseX - px, dym = mouseY - py;
      const d2 = dxm * dxm + dym * dym;
      if (d2 < 130 * 130) {
        const k = 0.06 * (1 - Math.sqrt(d2) / 130);
        x += (-dxm / scale) * k;
        p += (dym / scale) * k;
      }
    }

    // soft clamp so an unlucky noise run can't fling the point off-canvas
    const r = Math.hypot(x, p);
    const RMAX = 2.6;
    if (r > RMAX) { x *= RMAX / r; p *= RMAX / r; }

    const e = x * x + p * p;
    trail.push({ x, p, e });
    if (trail.length > MAX_TRAIL) trail.shift();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // faint axes through the origin
    ctx.strokeStyle = "rgba(20,22,28,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ox - scale * 2.9, oy); ctx.lineTo(ox + scale * 2.9, oy);
    ctx.moveTo(ox, oy - scale * 2.9); ctx.lineTo(ox, oy + scale * 2.9);
    ctx.stroke();

    // faint concentric rings (phase-space "shells")
    ctx.strokeStyle = "rgba(20,22,28,0.045)";
    for (let ring = 1; ring <= 3; ring++) {
      ctx.beginPath();
      ctx.arc(ox, oy, scale * ring * 0.85, 0, Math.PI * 2);
      ctx.stroke();
    }

    // the trajectory trail: fading, color mapped to instantaneous energy
    const n = trail.length;
    for (let i = 1; i < n; i++) {
      const a = trail[i - 1], b = trail[i];
      const age = i / n; // 0 old -> 1 newest
      const px1 = ox + a.x * scale, py1 = oy - a.p * scale;
      const px2 = ox + b.x * scale, py2 = oy - b.p * scale;
      const energyMix = Math.min(b.e / 3.2, 1); // 0 cool -> 1 hot
      const hue = 232 - energyMix * 20;          // blue -> slightly violet-shifted when "hot"
      const alpha = 0.05 + age * 0.5;
      ctx.strokeStyle = `hsla(${hue}, 88%, ${56 - energyMix * 6}%, ${alpha})`;
      ctx.lineWidth = 1.2 + age * 2;
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.stroke();
    }

    // bright current point
    if (n) {
      const last = trail[n - 1];
      const px = ox + last.x * scale, py = oy - last.p * scale;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 9);
      grad.addColorStop(0, "rgba(124,92,255,0.9)");
      grad.addColorStop(1, "rgba(124,92,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3457ff";
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let last = performance ? null : null;
  function frame() {
    if (!reduceMotion) step(0.028);
    draw();
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => { resize(); layout(); });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseleave", onLeave);
  window.addEventListener("touchmove", onMove, { passive: true });

  resize();
  layout();
  // pre-run a bit of physics so the trail isn't empty on first paint
  for (let i = 0; i < 200; i++) step(0.028);
  requestAnimationFrame(frame);
})();
