import fs from "fs-extra";
import path from "path";

export async function generateVSCodeThemes(palette) {
  const outDir = path.join("../vscode");
  await fs.ensureDir(outDir);

  for (const [flavor, colors] of Object.entries(palette)) {
    const theme = buildTheme(flavor, colors);
    const filePath = path.join(outDir, `meowllow-${flavor}.json`);

    await fs.writeJson(filePath, theme, { spaces: 2 });
    console.log(`✓ Generated ${filePath}`);
  }
}

function buildTheme(flavor, c) {
  const bg = c.bg;
  const text = c.text;
  const acc = c.accents;

  const isLightTheme = isLight(bg.base);
  const type = isLightTheme ? "light" : "dark";

  // helpers
  const selection = isLightTheme
    ? hexWithAlpha(acc.peri, 0.15)
    : hexWithAlpha(acc.peri, 0.2);
  const highlight = hexWithAlpha(acc.peri, 0.12);

  // common UI colors (workbench + editor)
  const colors = {
    "editor.background": bg.base,
    "editor.foreground": text.main,
    "editorCursor.foreground": acc.peri,
    "editorLineNumber.foreground": text.sub1,
    "editorLineNumber.activeForeground": acc.peri,

    "editor.selectionBackground": selection,
    "editor.selectionHighlightBackground": highlight,
    "editor.findMatchBackground": hexWithAlpha(acc.cream || acc.glimmer || acc.peach, 0.22),
    "editor.findMatchHighlightBackground": hexWithAlpha(acc.accentBright || acc.peri, 0.16),
    "editor.wordHighlightBackground": hexWithAlpha(acc.mint || acc.leaflight, 0.12),
    "editor.wordHighlightStrongBackground": hexWithAlpha(acc.peach, 0.12),

    "editorBracketMatch.background": hexWithAlpha(acc.peri, 0.12),
    "editorBracketMatch.border": acc.peri,

    "editorGutter.modifiedBackground": acc.mint,
    "editorGutter.addedBackground": acc.mint,
    "editorGutter.deletedBackground": acc.ember || "#E06C75",

    "activityBar.background": bg.crust,
    "activityBar.foreground": text.sub0,
    "activityBarBadge.background": acc.peri,
    "activityBarBadge.foreground": bg.base,

    "sideBar.background": bg.mantle,
    "sideBar.foreground": text.sub0,

    "statusBar.background": bg.crust,
    "titleBar.activeBackground": bg.crust,
    "titleBar.activeForeground": text.main,
    "titleBar.inactiveBackground": bg.mantle,
    "titleBar.inactiveForeground": text.sub1,

    "tab.activeBackground": bg.base,
    "tab.inactiveBackground": bg.mantle,
    "tab.activeForeground": text.main,
    "tab.inactiveForeground": text.sub1,
    "tab.border": bg.mantle,

    "button.background": hexWithAlpha(acc.peri, 0.14),
    "button.foreground": text.main,

    "badge.background": acc.peri,
    "badge.foreground": bg.base,

    "input.background": bg.surface0,
    "input.foreground": text.main,

    // diagnostics
    "editorError.foreground": acc.ember || "#F26868",
    "editorWarning.foreground": acc.honey || "#E6B85A",
    "editorInfo.foreground": acc.skybell || acc.peri,
    "editorHint.foreground": acc.leaflight || acc.mint,
  };

  // token colors (textmate scopes)
  const tokenColors = [
    // comments
    {
      scope: ["comment", "punctuation.definition.comment", "comment.block.documentation"],
      settings: { foreground: text.overlay0, fontStyle: "italic" }
    },

    // keywords & storage
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: acc.peri, fontStyle: "italic" }
    },

    // control keywords (if, for, return)
    {
      scope: ["keyword.control"],
      settings: { foreground: acc.peri, fontStyle: "italic" }
    },

    // strings & template
    {
      scope: ["string", "constant.other.symbol", "string.quoted.template"],
      settings: { foreground: acc.peach }
    },

    // numbers & numeric constants
    {
      scope: ["constant.numeric", "constant.numeric.integer", "constant.numeric.float", "constant.character.escape"],
      settings: { foreground: acc.pink }
    },

    // functions (declaration + calls)
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "meta.function-call.identifier",
        "variable.function"
      ],
      settings: { foreground: acc.lilac, fontStyle: "italic" }
    },

    // methods
    {
      scope: ["entity.name.method", "meta.method-call"],
      settings: { foreground: acc.lilac }
    },

    // classes / types / interfaces
    {
      scope: ["entity.name.type", "support.class", "support.type", "storage.type.class", "entity.name.namespace"],
      settings: { foreground: acc.mint }
    },

    // constants / enums
    {
      scope: ["constant", "constant.other", "variable.other.constant", "support.constant"],
      settings: { foreground: acc.cream }
    },

    // variables, identifiers, parameters
    {
      scope: ["variable", "identifier", "variable.parameter", "variable.other.property"],
      settings: { foreground: text.main }
    },

    // properties / object keys / json keys
    {
      scope: ["meta.object-literal.key", "support.type.property-name", "entity.name.tag.xml", "punctuation.definition.tag.xml", "meta.structure.dictionary.json string.quoted.double.json"],
      settings: { foreground: acc.aqua }
    },

    // attributes (HTML, XML)
    {
      scope: ["entity.other.attribute-name", "meta.attribute"],
      settings: { foreground: acc.aqua }
    },

    // CSS properties & selectors
    {
      scope: ["support.type.property-name.css", "support.constant.property-value.css", "entity.name.tag.css"],
      settings: { foreground: acc.peri }
    },

    // punctuation / operators
    {
      scope: ["keyword.operator", "punctuation", "punctuation.definition.tag"],
      settings: { foreground: text.sub1 }
    },

    // regex
    {
      scope: ["string.regexp", "constant.other.regex"],
      settings: { foreground: acc.aqua }
    },

    // markup (bold/italic)
    {
      scope: ["markup.bold", "markup.italic"],
      settings: { fontStyle: "italic", foreground: acc.lilac }
    }
  ];

  // semantic token colors so LSP + semantic highlighting get consistent colors
  const semanticTokenColors = {
    "variable": text.main,
    "variable.readonly": hexOrFallback(acc.cream, text.main),
    "parameter": acc.aqua,
    "property": acc.aqua,
    "function": acc.lilac,
    "method": acc.lilac,
    "enumMember": acc.cream,
    "class": acc.mint,
    "type": acc.mint,
    "interface": acc.mint,
    "namespace": acc.peri,
    "keyword": acc.peri,
    "comment": { "foreground": text.overlay0, "fontStyle": "italic" },
    "string": acc.peach,
    "number": acc.pink,
    "regexp": acc.aqua,
    "operator": text.sub1
  };

  // final theme object
  return {
    name: `Meowllow ${capitalize(flavor)}`,
    type,
    colors,
    semanticTokenColors,
    tokenColors,
    // prompt VS Code to prefer semantic tokens when available
    semanticHighlighting: true,
    // small metadata
    publisher: "meowllow",
    // description from user (keeps your theme description)
    description: "A soft, mellow, and soothing color theme inspired by creamy pastels and cozy coding sessions."
  };
}

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

function hexWithAlpha(hex, alpha) {
  if (!hex || typeof hex !== "string") return hex;
  const h = hex.replace("#", "");
  if (h.length !== 6) return `#${h}`;
  const a = Math.round(alpha * 255);
  const aHex = a.toString(16).padStart(2, "0").toUpperCase();
  return `#${h.toUpperCase()}${aHex}`;
}

function hexOrFallback(primary, fallback) {
  return primary || fallback;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
