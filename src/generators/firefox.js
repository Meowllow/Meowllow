import fs from "fs-extra";
import JsonUrl from "json-url";

const jsonCodec = JsonUrl("lzma");
const accents = ["peach","mint","cream","peri","pink","lilac","aqua","ember","honey","skybell","leaflight","ash","glimmer"];
const capitalize = (s) => typeof s === "string" ? s.charAt(0).toUpperCase() + s.slice(1) : "";
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1],16), g: parseInt(result[2],16), b: parseInt(result[3],16) } : null;
};

export async function generateFirefox(palette) {
  const outputPath = "../Firefox/README.md";

  let md = "# Meowllow for Firefox\n\n## Requirements\n";
  md += "First you need to install the [Firefox Color](https://addons.mozilla.org/en-US/firefox/addon/firefox-color/) extension.\n\n";
  md += "Then click on one of the links below depending on the theme you want.\n\n";

  for (const flavor of Object.keys(palette)) {
    md += `### ${capitalize(flavor)}\n\n`;

    const lib = {};
    Object.entries(palette[flavor]).forEach(([group, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        const rgb = hexToRgb(value);
        if (rgb) lib[`${group}_${key}`] = rgb;
      });
    });

    for (const accent of accents) {
      lib.accent = lib[`accents_${accent}`];

      const theme = {
        colors: {
          frame: lib.bg_crust,
          toolbar: lib.bg_base,
          toolbar_field: lib.bg_mantle,
          tab_background_text: lib.text_main,
          toolbar_text: lib.text_main,
          toolbar_field_text: lib.text_main,
          tab_line: lib.accent,
          popup: lib.bg_base,
          popup_text: lib.text_main,
          button_background_active: lib.bg_surface0,
          frame_inactive: lib.bg_crust,
          icons_attention: lib.accent,
          icons: lib.accent,
          ntp_background: lib.bg_crust,
          ntp_text: lib.text_main,
          popup_border: lib.accent,
          popup_highlight_text: lib.text_main,
          popup_highlight: lib.bg_surface0,
          sidebar_border: lib.accent,
          sidebar_highlight_text: lib.bg_crust,
          sidebar_highlight: lib.accent,
          sidebar_text: lib.text_main,
          sidebar: lib.bg_base,
          tab_background_separator: lib.accent,
          tab_loading: lib.accent,
          tab_selected: lib.bg_base,
          tab_text: lib.text_main,
          toolbar_bottom_separator: lib.bg_base,
          toolbar_field_border_focus: lib.accent,
          toolbar_field_border: lib.bg_base,
          toolbar_field_focus: lib.bg_base,
          toolbar_field_highlight_text: lib.bg_base,
          toolbar_field_highlight: lib.accent,
          toolbar_field_separator: lib.accent,
          toolbar_vertical_separator: lib.accent,
        },
        images: { additional_backgrounds: [], custom_backgrounds: [] },
        title: `Meowllow ${capitalize(flavor)} ${capitalize(accent)}`
      };

      const url = await jsonCodec.compress(theme);
      md += `- [${capitalize(accent)}](https://color.firefox.com/?theme=${url})\n`;
    }

    md += "\n";
  }

  await fs.writeFile(outputPath, md);
  console.log(`✓ Generated ${outputPath}`);
}
