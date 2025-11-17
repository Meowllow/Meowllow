---
title: Home
layout: default
---

<!-- Cleaned hero section — behavior preserved, unnecessary inline styles removed -->
<section id="hero" class="hero">
  <div class="hero-inner">

    <!-- LEFT: Title + CTA -->
    <div class="hero-left">
      <h1 class="hero-title">Meowllow</h1>

      <p class="hero-sub">A soft, mellow, soothing color theme inspired by creamy pastels
        and cozy coding sessions.</p>

      <div class="cta-wrap">
        <a href="{{ '/flavors' | relative_url }}" class="cta">See Flavors</a>
      </div>
    </div>

    <!-- MIDDLE: Terminal -->
    <div id="terminal-wrapper" class="terminal-wrapper">
      <div id="terminal-tilt" class="terminal-tilt">
        <div id="terminal" class="terminal-card">

          <div id="terminal-header" class="terminal-header">
            <span class="dot dot-peach"></span>
            <span class="dot dot-cream"></span>
            <span class="dot dot-mint"></span>
            <span class="terminal-host">meowllow.sh</span>
          </div>

          <div id="terminal-output" class="terminal-output font-mono">
            <span id="terminal-cursor">█</span>
          </div>

        </div>
      </div>
    </div>

    <!-- RIGHT: Vertical Japanese title -->
    <div id="vertical-title" class="vertical-title">ミャウロウ</div>

  </div>
</section>

<style>
  /* Layout base */
  #hero {
    background-color: var(--bg-base);
    color: var(--text-main);
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .hero-inner {
    display: flex;
    align-items: center;
    gap: 2rem;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .hero-left {
    flex: 1 1 360px;
    min-width: 240px;
    max-width: 50rem;
  }

  /* Title */
  .hero-title {
    font-weight: 800;
    margin: 0 0 0.75rem 0;
    font-size: clamp(2.5rem, 8vw, 8rem);
    line-height: 0.95;
    background-image: linear-gradient(to right, var(--accents-peri), var(--accents-cream), var(--accents-pink));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-sub {
    margin: 0 0 1rem 0;
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    max-width: 42rem;
    color: var(--text-sub0);
  }

  .cta-wrap {
    margin-top: 0.75rem;
  }

  .cta {
    display: inline-block;
    padding: 0.65rem 1.25rem;
    font-weight: 600;
    border-radius: 0.6rem;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    text-decoration: none;
    background-color: var(--bg-surface0);
    color: var(--text-main);
  }

  /* Terminal */
  .terminal-wrapper {
    flex: 0 1 clamp(260px, 38vw, 520px);
    min-width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 900px;
    margin: 0 auto;
  }

  .terminal-tilt {
    will-change: transform;
    width: 100%;
  }

  .terminal-card {
    width: 100%;
    height: clamp(220px, 40vh, 380px);
    border-radius: 1rem;
    box-shadow: 0 18px 40px rgba(7, 11, 21, 0.12);
    border: 1px solid var(--bg-surface1);
    display: flex;
    flex-direction: column;
    background-color: var(--bg-mantle);
    transition: transform 0.25s ease;
  }

  .terminal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--bg-surface0);
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .dot {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
  }

  .dot-peach {
    background: var(--accents-peach);
  }

  .dot-cream {
    background: var(--accents-cream);
  }

  .dot-mint {
    background: var(--accents-mint);
  }

  .terminal-host {
    margin-left: 0.6rem;
    font-size: 0.9rem;
    color: var(--text-sub1);
  }

  .terminal-output {
    font-size: clamp(0.7rem, 1.4vw, 0.92rem);
    padding: 1rem 1rem 2rem 1rem;
    color: var(--text-main);
    white-space: pre-wrap;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: none;
    text-align: left !important;
  }

  #terminal-output::-webkit-scrollbar {
    display: none;
  }

  /* cursor animation */
  #cursor,
  #terminal-cursor {
    display: inline-block;
    width: 0.6ch;
    animation: blink 1s step-start infinite;
    color: var(--accents-peri);
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* hover shadow */
  .terminal-card:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    transform-origin: center;
  }

  /* Vertical title */
  .vertical-title {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-weight: 800;
    margin-left: 2rem;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-image: linear-gradient(to bottom, var(--accents-peri), var(--accents-cream), var(--accents-pink));
    font-size: clamp(2.5rem, 6vw, 6rem);
    line-height: 0.95;
    flex: 0 0 auto;
  }

  /* Responsive tweaks */
  @media (min-width:1600px) {
    #hero {
      padding-left: clamp(3rem, 4vw, 6rem);
      padding-right: clamp(3rem, 4vw, 6rem);
    }

    .hero-left {
      max-width: 60rem;
    }
  }

  @media (max-width:1024px) {
    .hero-inner {
      gap: 1.25rem;
      justify-content: space-between;
    }

    .vertical-title {
      font-size: clamp(2.2rem, 5.5vw, 4.25rem);
    }
  }

  @media (min-width:769px) and (max-width:1024px) {
    .vertical-title {
      display: none;
    }
  }

  @media (max-width:768px) {
    #hero {
      align-items: center;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    .hero-inner {
      align-items: center;
      text-align: center;
    }

    .hero-left {
      order: 1;
      width: 100%;
      max-width: 42rem;
    }

    .terminal-wrapper {
      order: 2;
      width: 92%;
      min-width: unset;
      margin-top: 0.25rem;
    }

    #vertical-title {
      display: block !important;
      order: 3 !important;
      flex: 0 0 100% !important;
      align-self: center !important;
      writing-mode: horizontal-tb !important;
      text-orientation: initial !important;
      white-space: normal !important;
      text-align: center !important;
      margin: 1rem 0 0 0 !important;
      font-size: clamp(1.6rem, 6vw, 2.75rem) !important;
      line-height: 1 !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      color: transparent !important;
      background-image: linear-gradient(to right, var(--accents-peri), var(--accents-cream), var(--accents-pink)) !important;
    }

    .cta {
      padding: 0.6rem 1rem;
    }
  }

  @media (pointer: coarse) {
    .terminal-card {
      transition: none;
    }

    .terminal-card:hover {
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    }
  }

  @media (prefers-reduced-motion: reduce) {

    .terminal-card,
    .terminal-tilt {
      transition: none !important;
      animation: none !important;
    }

    @keyframes blink {
      50% {
        opacity: 1;
      }
    }
  }
</style>

<script>
  // Terminal content + typing logic (behavior preserved)
  document.addEventListener("DOMContentLoaded", () => {
    const out = document.getElementById("terminal-output");
    const startupCursor = document.getElementById("terminal-cursor");

    const accent1 = "var(--accents-peri)";
    const accent2 = "var(--accents-cream)";
    const accent3 = "var(--accents-pink)";
    const accent4 = "var(--accents-mint)";
    const accent5 = "var(--accents-aqua)";

    out.innerHTML = "";

    const steps = [
      { cmd: "$ booting meowllow engine…", delay: 600 },
      { out: `<span style="color:${accent1}">› loading palettes</span>  [OK]`, delay: 400 },
      { cmd: "$ generating gradient spectrum…", delay: 300 },
      { out: `\n<span style="color:${accent2}">gradient-1</span>  ████████████ 100%\n<span style="color:${accent3}">gradient-2</span>  ████████████ 100%\n<span style="color:${accent1}">gradient-3</span>  ████████████ 100%`.trim(), delay: 500 },
      { cmd: "$ rendering vibe chart…", delay: 500 },
      { out: `\n<span style="color:${accent4}">pastel-intensity:</span>\n▇▇▇▇▇▇▇▇▇▇▇▇▇▇  98%\n\n<span style="color:${accent5}">coziness-level:</span>\n▇▇▇▇▇▇▇▇▇▇▇    91%\n\n<span style="color:${accent3}">warmth-index:</span>\n▇▇▇▇▇▇▇▇▇      87%`.trim(), delay: 800 },
      { cmd: "$ compiling theme kernel…", delay: 300 },
      { out: "   [■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■] 100%", delay: 600 },
      { cmd: "$ executing startup script…", delay: 400 },
      { out: `\n<span style="color:${accent1}">function</span> <span style="color:${accent3}">applyTheme</span>() {\n    <span style="color:${accent1}">const</span> mood = <span style="color:${accent2}">\"cozy pastel\"</span>;\n    <span style="color:${accent4}">return</span> mood + <span style="color:${accent5}">\" activated ✓\"</span>;\n}`.trim(), delay: 900 },
      { out: `<span style="color:${accent2}">theme ready ✓</span>`, delay: 200 }
    ];

    let i = 0;
    function runStep() {
      if (i >= steps.length) { enableInput(); return; }
      const s = steps[i];
      if (s.cmd) typeLine(s.cmd, next);
      else { out.innerHTML += s.out + "\n\n"; scroll(); next(); }
      function next() { i++; setTimeout(runStep, s.delay); }
    }

    function typeLine(t, done) {
      let k = 0;
      if (startupCursor) startupCursor.style.visibility = "hidden";
      const line = document.createElement("div");
      line.textContent = "";
      out.appendChild(line);
      function tick() {
        if (k < t.length) { line.textContent += t[k++]; scroll(false); setTimeout(tick, 16); }
        else { line.textContent += "\n"; if (startupCursor) startupCursor.style.visibility = ""; scroll(); done(); }
      }
      tick();
    }

    function scroll(smooth = true) { out.scrollTo({ top: out.scrollHeight, behavior: smooth ? "smooth" : "auto" }); }

    runStep();

    function enableInput() {
      if (startupCursor) startupCursor.remove();
      const inputLine = document.createElement("div");
      inputLine.innerHTML = `$ <span class="in"></span><span id="cursor">█</span>`;
      out.appendChild(inputLine);
      const buf = inputLine.querySelector(".in");
      let txt = "";

      document.addEventListener("keydown", e => {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === "Backspace") { e.preventDefault(); txt = txt.slice(0, -1); buf.textContent = txt; scroll(false); }
        else if (e.key === "Enter") {
          e.preventDefault(); const echo = document.createElement("div"); echo.textContent = "$ " + txt; out.insertBefore(echo, inputLine);
          const reply = document.createElement("div"); reply.innerHTML = `<span style="color:${accent2}">meowllow:</span> ok`;
          out.insertBefore(reply, inputLine); txt = ""; buf.textContent = ""; scroll();
        } else if (e.key === " " || e.key.length === 1) { e.preventDefault(); txt += e.key; buf.textContent = txt; scroll(false); }
      });
    }

    const terminal = document.getElementById("terminal"); if (terminal) terminal.setAttribute("tabindex", "0");
  });

  // Terminal tilt: disable on touch/narrow screens (behavior preserved)
  (function setupTilt() {
    const wrapper = document.getElementById("terminal-wrapper");
    const tilt = document.getElementById("terminal-tilt");
    if (!wrapper || !tilt) return;
    const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const narrow = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    if (isCoarse || narrow) { tilt.style.transform = "none"; return; }

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    function animate() { currentX += (targetX - currentX) * 0.15; currentY += (targetY - currentY) * 0.15; tilt.style.transform = `rotateX(${-currentX}deg) rotateY(${currentY}deg)`; requestAnimationFrame(animate); }
    animate();

    wrapper.addEventListener("mousemove", e => {
      const rect = e.currentTarget.getBoundingClientRect();
      targetX = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
      targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    });

    wrapper.addEventListener("mouseleave", () => { targetX = 0; targetY = 0; });

    window.addEventListener('resize', () => {
      const nowCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const nowNarrow = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
      if (nowCoarse || nowNarrow) {
        const clone = wrapper.cloneNode(true);
        wrapper.parentNode.replaceChild(clone, wrapper);
        tilt.style.transform = "none";
      }
    }, { passive: true });
  })();
</script>