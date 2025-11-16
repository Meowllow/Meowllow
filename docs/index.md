---
title: Home
layout: default
---

<section class="h-screen flex items-center justify-between px-16"
         style="background-color: var(--bg-base); color: var(--text-main);">

  <!-- TITLE -->
  <div>
    <h1 class="text-8xl font-extrabold text-transparent bg-clip-text mb-6"
        style="background-image: linear-gradient(
            to right,
            var(--gradient-1),
            var(--gradient-2),
            var(--gradient-3)
        );">
      Meowllow
    </h1>

    <p class="text-xl max-w-md" style="color: var(--text-sub0);">
      &gt; A soft, mellow, soothing color theme inspired by creamy pastels
      and cozy coding sessions.
    </p>

    <!-- Flavors Button -->
    <div class="mt-6">
      <a href="/flavors"
        class="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow-lg
                hover:brightness-110 transition-all duration-200"
        style="background-color: var(--bg-surface0); color: var(--text-main);">
        See Flavors
      </a>
    </div>
  </div>

  <!-- TERMINAL -->
  <div id="terminal-wrapper" style="perspective:800px;">
    <div id="terminal-tilt" style="will-change: transform;">
      <div id="terminal"
          class="w-[520px] h-[380px] rounded-2xl shadow-xl border transition-transform duration-300"
          style="background-color: var(--bg-mantle); border-color: var(--bg-surface1); display:flex; flex-direction:column;">

        <!-- Header -->
        <div id="terminal-header"
            class="flex items-center gap-2 px-4 py-2"
            style="background-color: var(--bg-surface0);">
          <span class="w-3 h-3 rounded-full" style="background: var(--accent-peach);"></span>
          <span class="w-3 h-3 rounded-full" style="background: var(--accent-cream);"></span>
          <span class="w-3 h-3 rounded-full" style="background: var(--accent-mint);"></span>

          <span class="ml-3 text-sm" style="color: var(--text-sub1);">
            meowllow.sh
          </span>
        </div>

        <!-- Terminal body -->
        <div id="terminal-output"
            class="font-mono text-sm p-4 leading-relaxed"
            style="
                color: var(--text-main);
                white-space: pre-wrap;
                overflow-y: auto;
                flex: 1;
                scrollbar-width: none;
                padding-bottom: 2rem;
            ">
          <span id="terminal-cursor">█</span>
        </div>

      </div>
    </div>
  </div>

  <!-- JAPANESE -->
  <div class="vertical-title" style="
      writing-mode: vertical-rl;       /* vertical text, top-to-bottom right-to-left */
      font-size: 6rem;                 /* adjust size as needed */
      font-weight: 800;
      text-orientation: upright;       /* keep characters upright */
      background: linear-gradient(to bottom, var(--gradient-1), var(--gradient-2), var(--gradient-3));
      -webkit-background-clip: text;
      color: transparent;
      margin-left: 1rem;
  ">
    ミャウロウ
  </div>

</section>

<style>
#terminal-output::-webkit-scrollbar { display:none; }

#terminal-header {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

#terminal {
  transform-style: preserve-3d;
}
#terminal:hover {
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
}

#cursor,
#terminal-cursor {
  display:inline-block;
  width:0.6ch;
  animation: blink 1s step-start infinite;
  color: var(--accent-peri);
}

@keyframes blink { 50% { opacity:0; } }
</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("terminal-output");
  const startupCursor = document.getElementById("terminal-cursor");

  const accent1 = "var(--accent-peri)";
  const accent2 = "var(--accent-cream)";
  const accent3 = "var(--accent-pink)";
  const accent4 = "var(--accent-mint)";
  const accent5 = "var(--accent-aqua)";

  out.innerHTML = "";

  const steps = [
    { cmd: "$ booting meowllow engine…", delay: 600 },
    { out:`<span style="color:${accent1}">› loading palettes</span>  [OK]`, delay:400 },
    { cmd:"$ generating gradient spectrum…", delay:300 },
    { out:`
<span style="color:${accent2}">gradient-1</span>  ████████████ 100%
<span style="color:${accent3}">gradient-2</span>  ████████████ 100%
<span style="color:${accent1}">gradient-3</span>  ████████████ 100%`.trim(), delay:500 },
    { cmd:"$ rendering vibe chart…", delay:500 },
    { out:`
<span style="color:${accent4}">pastel-intensity:</span>
▇▇▇▇▇▇▇▇▇▇▇▇▇▇  98%

<span style="color:${accent5}">coziness-level:</span>
▇▇▇▇▇▇▇▇▇▇▇    91%

<span style="color:${accent3}">warmth-index:</span>
▇▇▇▇▇▇▇▇▇      87%`.trim(), delay:800 },
    { cmd:"$ compiling theme kernel…", delay:300 },
    { out:"   [■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■] 100%", delay:600 },
    { cmd:"$ executing startup script…", delay:400 },
    { out:`
<span style="color:${accent1}">function</span> <span style="color:${accent3}">applyTheme</span>() {
    <span style="color:${accent1}">const</span> mood = <span style="color:${accent2}">"cozy pastel"</span>;
    <span style="color:${accent4}">return</span> mood + <span style="color:${accent5}">" activated ✓"</span>;
}`.trim(), delay:900 },
    { out:`<span style="color:${accent2}">theme ready ✓</span>`, delay:200 }
  ];

  let i = 0;
  function runStep() {
    if (i >= steps.length) {
      enableInput();
      return;
    }
    const s = steps[i];

    if (s.cmd) typeLine(s.cmd, next);
    else { out.innerHTML += s.out + "\n\n"; scroll(); next(); }

    function next() { i++; setTimeout(runStep, s.delay); }
  }

  function typeLine(t, done) {
    let k = 0;
    startupCursor.style.visibility = "hidden";

    const line = document.createElement("div");
    line.textContent = "";
    out.appendChild(line);

    function tick() {
      if (k < t.length) {
        line.textContent += t[k++];
        scroll(false);
        setTimeout(tick, 16);
      } else {
        line.textContent += "\n";
        startupCursor.style.visibility = "";
        scroll();
        done();
      }
    }
    tick();
  }

  function scroll(smooth = true) {
    out.scrollTo({
      top: out.scrollHeight,
      behavior: smooth ? "smooth" : "auto"
    });
  }

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

      if (e.key === "Backspace") {
        e.preventDefault();
        txt = txt.slice(0, -1);
        buf.textContent = txt;
        scroll(false);
      } else if (e.key === "Enter") {
        e.preventDefault();

        const echo = document.createElement("div");
        echo.textContent = "$ " + txt;
        out.insertBefore(echo, inputLine);

        const reply = document.createElement("div");
        reply.innerHTML = `<span style="color:${accent2}">meowllow:</span> ok`;
        out.insertBefore(reply, inputLine);

        txt = "";
        buf.textContent = "";
        scroll();
      } else if (e.key === " " || e.key.length === 1) {  // <- include space
        e.preventDefault();  // prevent page scroll
        txt += e.key;
        buf.textContent = txt;
        scroll(false);
      } else if (e.key.length === 1) {
        txt += e.key;
        buf.textContent = txt;
        scroll(false);
      }
    });
  }

});

// TERMINAL TILT
const tilt = document.getElementById("terminal-tilt");
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

function animate() {
  currentX += (targetX - currentX) * 0.15; // smooth easing
  currentY += (targetY - currentY) * 0.15;

  tilt.style.transform = `rotateX(${-currentX}deg) rotateY(${currentY}deg)`;
  requestAnimationFrame(animate);
}
animate();

document.getElementById("terminal-wrapper").addEventListener("mousemove", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  targetX = ((e.clientY - rect.top) / rect.height - 0.5) * 4; // max tilt 4 deg
  targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
});

document.getElementById("terminal-wrapper").addEventListener("mouseleave", () => {
  targetX = 0;
  targetY = 0;
});
</script>
