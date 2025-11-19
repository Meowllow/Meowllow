---
title: Flavors
layout: default
permalink: /flavors
---

<!-- Flavors Page with Collapsible Theme Tables -->

<section class="max-w-6xl mx-auto py-24 px-6" style="background-color: var(--bg-base);">

  <h2 class="text-4xl font-bold mb-12 text-center" style="color: var(--text-main);">
    Meowllow Flavors
  </h2>

  <div id="flavor-container" class="space-y-6"></div>

</section>

<style>
/* Collapsible details */
.flavor-details {
  border: 1px solid var(--text-overlay0);
  border-radius: 1rem;
  background: var(--bg-surface0);
  overflow: hidden;
  transition: border-color .3s ease;
}

.flavor-details[open] {
  border-color: var(--accents-peri);
}

/* Summary header */
.flavor-summary {
  cursor: pointer;
  user-select: none;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flavor-summary h3 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-main);
}

/* The content wrapper has padding only when expanded */
.flavor-content {
  padding: 1rem 1.25rem 1.5rem;
}

/* Table */
.color-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0;
}

.color-table th {
  text-align: left;
  padding: 0.5rem;
  color: var(--text-sub0);
}

.color-table td {
  padding: 0.5rem;
  border-top: 1px solid var(--bg-surface1);
}

.color-preview {
  width: 32px;
  height: 32px;
  border-radius: 1rem;
  border: 1px solid var(--bg-surface1);
}

/* Click-to-copy cells */
.copy-cell {
  cursor: pointer;
  position: relative;
  transition: opacity .15s;
}

.copy-cell:hover {
  opacity: 0.75;
}

/* Small copied flash */
.copy-cell.copied {
  animation: copiedFlash .5s ease;
}

/* Tooltip bubble */
.copy-tip {
  position: absolute;
  top: -1.6rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accents-peri);
  color: var(--bg-base);
  padding: 0.2rem 0.45rem;
  font-size: 0.75rem;
  border-radius: 0.35rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease, transform .25s ease;
  white-space: nowrap;
}

.copy-tip.show {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

@keyframes copiedFlash {
  from { background: var(--accents-peri); color: var(--bg-base); }
  to   { background: transparent; }
}
</style>


<script>
// FLAVOR DEFINITIONS
const flavors = {
  purr: {
    title: "Purr",
    vars: {
      "Crust": "#201E27",
      "Mantle": "#24212B",
      "Base": "#2B2833",
      "Surface 0": "#4A4557",
      "Surface 1": "#5C586A",
      "Surface 2": "#6E687D",

      "Text": "#ECE7EE",
      "Subtext 0": "#D9D4DE",
      "Subtext 1": "#B7B0C0",
      "Overlay 0": "#7A7485",

      "Peach": "#F2B8B2",
      "Mint": "#8FCFA0",
      "Cream": "#F8EAA3",
      "Periwinkle": "#B4C5ED",
      "Pink": "#F5C2E7",
      "Lilac": "#BFA8F6",
      "Aqua": "#8EE8E4",

      "Error": "#F26D6D",
      "Warning": "#E6B85A",
      "Info": "#6EA6F6",
      "Hint": "#A9DDBB",
      "Muted": "#3B3740",
      "Accent Bright": "#CDE8F2",
    }
  },

  slumber: {
    title: "Slumber",
    vars: {
      "Crust": "#1F1D25",
      "Mantle": "#242128",
      "Base": "#2A272E",
      "Surface 0": "#4A4553",
      "Surface 1": "#575268",
      "Surface 2": "#6E6A86",

      "Text": "#F6EDE6",
      "Subtext 0": "#D8D0C8",
      "Subtext 1": "#AFA9B8",
      "Overlay 0": "#6E6A86",

      "Peach": "#EE99A0",
      "Mint": "#8FCF98",
      "Cream": "#F9E2AF",
      "Periwinkle": "#9FBCE8",
      "Pink": "#F5BDE6",
      "Lilac": "#C7B0F0",
      "Aqua": "#99E1C9",

      "Error": "#E46A6A",
      "Warning": "#E5B76E",
      "Info": "#7FA6F7",
      "Hint": "#A6D1A1",
      "Muted": "#3B3640",
      "Accent Bright": "#CFEFF0",
    }
  },

  sunbeam: {
    title: "Sunbeam",
    vars: {
      "Crust": "#F8F4F0",
      "Mantle": "#F9F6F2",
      "Base": "#FDFBF8",
      "Surface 0": "#F2ECE4",
      "Surface 1": "#E8E1DA",
      "Surface 2": "#DFD8CF",

      "Text": "#423F3A",
      "Subtext 0": "#6D6863",
      "Subtext 1": "#8E8982",
      "Overlay 0": "#B0A9A3",

      "Peach": "#E88E86",
      "Mint": "#5FA872",
      "Cream": "#E6B450",
      "Periwinkle": "#7E9CD6",
      "Pink": "#E59BCF",
      "Lilac": "#AB91E4",
      "Aqua": "#5EC2B8",

      "Error": "#C94B4B",
      "Warning": "#C98939",
      "Info": "#5279C6",
      "Hint": "#81B580",
      "Muted": "#DDD7D1",
      "Accent Bright": "#FFF3E1",
    }
  }
};

// Generate RGB from HEX
function hexToRgbObj(hex) {
  const h = hex.replace('#','');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return { r, g, b, str: `rgb(${r}, ${g}, ${b})` };
}

function rgbToHslObj(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), str: `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)` };
}

// Build flavor tables
const container = document.getElementById("flavor-container");

Object.entries(flavors).forEach(([key, flavor]) => {

  // Build rows
  const rows = Object.entries(flavor.vars)
    .map(([name, hex]) => {
      const rgbObj = hexToRgbObj(hex);
      const hslObj = rgbToHslObj(rgbObj.r, rgbObj.g, rgbObj.b);
      const hslStr = `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`;
      return `
        <tr>
          <td><div class="color-preview" style="background:${hex}"></div></td>
          <td>${name}</td>
          <td class="copy-cell" data-copy="${hex}">${hex}</td>
          <td class="copy-cell" data-copy="${rgbObj.str}">${rgbObj.str}</td>
          <td class="copy-cell" data-copy="${hslStr}">${hslStr}</td>
        </tr>
      `;
    })
    .join("");

  // Inject details block
  container.innerHTML += `
    <details class="flavor-details">
      <summary class="flavor-summary">
        <h3>${flavor.title}</h3>
      </summary>

      <div class="flavor-content">
        <table class="color-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Hex</th>
              <th>RGB</th>
              <th>HSL</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </details>
  `;
});

// Click-to-copy
document.addEventListener("click", e => {
  const cell = e.target.closest(".copy-cell");
  if (!cell) return;

  const text = cell.dataset.copy;
  navigator.clipboard.writeText(text);

  // Tooltip element
  let tip = cell.querySelector(".copy-tip");
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "copy-tip";
    tip.textContent = "Copied!";
    cell.style.position = "relative";
    cell.appendChild(tip);
  }

  // Animate tooltip
  tip.classList.add("show");
  setTimeout(() => tip.classList.remove("show"), 900);

  // Flash cell animation
  cell.classList.add("copied");
  setTimeout(() => cell.classList.remove("copied"), 400);
});

</script>
