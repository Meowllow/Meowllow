# Meowllow Generators Documentation

This file documents the purpose and output of each generator in the Meowllow project.  
It helps maintain clarity about what each script does and where it outputs its results.

> [!IMPORTANT]
> Most generators output files into *other* Meowllow repositories.  
> Make sure all Meowllow repositories are cloned into the **same parent folder**, or the generators will not be able to write their files.


---

## 0. Build Script (`build.js`)

- **Purpose:** Runs all generators in order.
- **Steps:**
  1. Reads `palette/meowllow.yml` and parses palette.
  2. Calls all generators.
- **Usage:**
  ```bash
  npm run build
  ```

## 1. CSS Generator (`css.js`)

**Function:** `generateCSS(palette)`

- **Input:** `palette` object containing all themes and color values.
- **Output:** `docs/assets/css/flavors.css`
- **Description:**  
  Generates CSS variables for all Meowllow flavors.  
  Each flavor becomes a `[data-theme]` selector, e.g. `html[data-theme="purr"]`.  
  Variables include backgrounds, text colors, accents, and gradients.
- **Usage:**  
  ```js
  import { generateCSS } from "./generators/css.js";
  await generateCSS(palette);
  ```

## 2. Kitty Theme Generator (`kitty.js`)

**Function:** `generateKitty(palette)`

- **Input:** `palette` object.
- **Output:** `../kitty/purr.conf`, `../kitty/slumber.conf`, `../kitty/sunbeam.conf`
- **Description:**  
  Generates configuration files for the Kitty terminal for each flavor.  
  Sets foreground, background, cursor, selection, tab bar, marks, and ANSI colors.  
  Bright colors are included alongside normal accents.
- **Usage:**  
  ```js
  import { generateKitty } from "./generators/kitty.js";
  await generateKitty(palette);
  ```

## 3. Firefox Theme Markdown Generator (`firefox.js`)

**Function:** `generateFirefox(palette)`

- **Input:** `palette` object.
- **Output:** `../firefox/README.md`
- **Description:**  
Generates Markdown links for each flavor and accent to be used with the [Firefox Color](https://addons.mozilla.org/en-US/firefox/addon/firefox-color/) extension.  
Links are compressed JSON using LZMA for Firefox Color.  
Each flavor is a section, each accent is a clickable link.
- **Usage:**  
  ```js
  import { generateFirefox } from "./generators/firefox.js";
  await generateFirefox(palette);
  ```

## 4. VSCode Themes Generator (`vscode.js`)

**Function:** `generateVSCodeThemes(palette)`

- **Input:** `palette` object.
- **Output:** `../vscode/meowllow-purr.json`, `../vscode/meowllow-slumber.json`, `../vscode/meowllow-sunbeam.json`
- **Description:**  
Generates json files used by the VSCode `package.json`.
- **Usage:**  
  ```js
  import { generateVSCodeThemes } from "./generators/vscode.js";
  await generateVSCodeThemes(palette);
  ```

## 5. Neovim Themes Generator (`nvim.js`)

**Function:** `generateNvim(palette)`

- **Input:** `palette` object.
- **Output:** `NOT DONE YET, SEE CODE FOR MORE INFO` 
- **Description:**  
NOT DONE YET, SEE CODE FOR MORE INFO
- **Usage:**  
  ```js
  import { generateNvim } from "./generators/nvim.js";
  await generateNvim(palette);
  ```

