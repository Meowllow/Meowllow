import fs from "fs-extra";
import { lighten } from "./color.js";

/**
 * Build the Kitty config from the palette.
 * You can expand or adjust mappings anytime.
 */
function buildKittyConfig(flavor, p) {
  const bg = p.bg;
  const text = p.text;
  const acc = p.accents;

  // Compute bright variants
  const bright = {
    peach: lighten(acc.peach, 0.20),
    mint: lighten(acc.mint, 0.20),
    cream: lighten(acc.cream, 0.20),
    peri: lighten(acc.peri, 0.20),
    pink: lighten(acc.pink, 0.20),
    lilac: lighten(acc.lilac, 0.20),
    aqua: lighten(acc.aqua, 0.20),
  };

  return `# vim:ft=kitty

## name:     Meowllow ${flavor}
## author:   hxpe-dev
## license:  MIT
## upstream: https://github.com/hxpe-dev/meowllow/blob/main/kitty/${flavor}.conf
## blurb:    A soft, mellow, and soothing color theme inspired by creamy pastels and cozy coding sessions.

# --- Core Colors ---
foreground ${text.main}
background ${bg.base}

cursor ${acc.pink}
cursor_text_color ${bg.base}

selection_foreground ${text.main}
selection_background ${bg.surface0}

url_color ${acc.peri}

# --- UI / Window Elements ---
active_border_color ${acc.peri}
inactive_border_color ${bg.surface0}
bell_border_color ${acc.peach}

wayland_titlebar_color ${bg.base}
macos_titlebar_color ${bg.base}

# --- Tab Bar ---
tab_bar_background ${bg.mantle}
active_tab_foreground ${text.main}
active_tab_background ${bg.base}

inactive_tab_foreground ${text.overlay0}
inactive_tab_background ${bg.mantle}

# --- Marks ---
mark1_foreground ${bg.base}
mark1_background ${acc.cream}

mark2_foreground ${bg.base}
mark2_background ${acc.pink}

mark3_foreground ${bg.base}
mark3_background ${acc.aqua}

# --- Standard ANSI Colors ---
# Black / Grey
color0  ${bg.surface0}
color8  ${bg.surface2}

# Red
color1  ${acc.peach}
color9  ${bright.peach}

# Green
color2  ${acc.mint}
color10 ${bright.mint}

# Yellow
color3  ${acc.cream}
color11 ${bright.cream}

# Blue
color4  ${acc.peri}
color12 ${bright.peri}

# Magenta
color5  ${acc.pink}
color13 ${bright.pink}

# Cyan
color6  ${acc.aqua}
color14 ${bright.aqua}

# White
color7  ${text.sub0}
color15 ${text.main}
`;
}

export async function generateKitty(palette) {
  for (const [flavor, values] of Object.entries(palette)) {
    const output = buildKittyConfig(flavor, values);
    // const path = `kitty-${flavor}.conf`; // Used for testing, generates in the root
    const path = `kitty/${flavor}.conf`;

    await fs.ensureFile(path);
    await fs.writeFile(path, output);

    console.log(`✓ Generated kitty/${flavor}.conf`);
  }
}
