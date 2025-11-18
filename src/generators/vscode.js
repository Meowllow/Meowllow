import fs from "fs-extra";
import path from "path";

/**
 * Generate full VS Code themes for all flavors in the palette.
 *
 * @param {object} palette - your Meowllow palette loaded from YAML
 */
export async function generateVSCodeThemes(palette) {
  const outDir = path.join("vscode");
  await fs.ensureDir(outDir);

  for (const [flavor, colors] of Object.entries(palette)) {
    const theme = buildTheme(flavor, colors);
    const filePath = path.join(outDir, `meowllow-${flavor}.json`);

    await fs.writeJson(filePath, theme, { spaces: 2 });
    console.log(`✓ Generated ${filePath}`);
  }
}

/**
 * Build one VS Code theme JSON structure for a single flavor.
 */
function buildTheme(flavor, c) {
  const bg = c.bg;
  const text = c.text;
  const acc = c.accents;

  return {
    name: `Meowllow ${capitalize(flavor)}`,
    type: isLight(bg.base) ? "light" : "dark",

    colors: {
      "editor.background": bg.base,
      "editor.foreground": text.main,
      "editor.selectionBackground": bg.surface2,
      "editor.lineHighlightBackground": bg.surface1,
      "editorCursor.foreground": acc.peri,
      "editorLineNumber.activeForeground": acc.peri,
      "editorLineNumber.foreground": text.sub1,

      "activityBar.background": bg.crust,
      "sideBar.background": bg.mantle,
      "sideBar.foreground": text.sub0,
      "statusBar.background": bg.crust,

      "tab.activeBackground": bg.base,
      "tab.inactiveBackground": bg.mantle,
      "tab.activeForeground": text.main,
      "tab.inactiveForeground": text.sub1,
      "tab.border": bg.mantle
    },

    tokenColors: [
      // comments
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: text.overlay0, fontStyle: "italic" }
      },

      // strings
      {
        scope: ["string", "constant.character.escape"],
        settings: { foreground: acc.peach }
      },

      // numbers
      {
        scope: ["constant.numeric"],
        settings: { foreground: acc.pink }
      },

      // keywords
      {
        scope: ["keyword", "storage.type"],
        settings: { foreground: acc.peri }
      },

      // control keywords (if, for, return)
      {
        scope: ["keyword.control"],
        settings: { foreground: acc.peri, fontStyle: "italic" }
      },

      // functions
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call.identifier"
        ],
        settings: { foreground: acc.lilac, fontStyle: "italic" }
      },

      // variables
      {
        scope: ["variable", "identifier"],
        settings: { foreground: text.main }
      },

      // constants
      {
        scope: ["constant", "constant.other"],
        settings: { foreground: acc.cream }
      },

      // classes / types
      {
        scope: ["entity.name.type", "support.class", "support.type"],
        settings: { foreground: acc.mint }
      },

      // operators + punctuation
      {
        scope: ["keyword.operator", "punctuation"],
        settings: { foreground: text.sub1 }
      },

      // attributes (HTML, XML)
      {
        scope: ["entity.other.attribute-name"],
        settings: { foreground: acc.aqua }
      }
    ]
  };
}

/**
 * Light/dark detection based on YIQ brightness.
 */
function isLight(hex) {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
