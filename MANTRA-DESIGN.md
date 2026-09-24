---
version: alpha
name: mantra-design-system
description: Mantra by Yooga — a StencilJS component library built on a soft-rounded, multi-palette foundation. A neutral-first canvas hosts six semantic palettes (primary/blue, secondary/magenta, neutral/grey, success/green, warning/yellow, critical/red). Poppins at three weights (400/500/600) carries the full hierarchy. Components ship in four sizes and up to six palette variants, making the system well-suited for SaaS dashboards, data-entry flows, and enterprise product UIs.

colors:
  # --- Neutral (Grey) ---
  canvas: "#ffffff"
  surface-soft: "#f5f6f6"
  surface-subtle: "#e5e7e8"
  surface-muted: "#ced2d3"
  surface-mid: "#abb2b5"
  ink-muted: "#5f676c"
  ink-secondary: "#575e63"
  ink-tertiary: "#4b5053"
  ink-body: "#424648"
  ink: "#3a3d3f"
  ink-strong: "#242628"
  ink-black: "#000000"

  # --- Primary (Blue) ---
  primary-50: "#f1f9fe"
  primary-100: "#e1f1fd"
  primary-200: "#bde3fa"
  primary-300: "#83cef6"
  primary-400: "#41b5ef"
  primary-500: "#19a1e6"
  primary-600: "#0b7cbe"
  primary-700: "#0a639a"
  primary-800: "#0d547f"
  primary-900: "#114769"
  primary-950: "#0b2c46"
  primary: "#19a1e6"
  on-primary: "#ffffff"

  # --- Secondary (Magenta) ---
  secondary-50: "#fdf2f6"
  secondary-100: "#fce7f0"
  secondary-200: "#fbcfe1"
  secondary-300: "#faa7c7"
  secondary-400: "#f45b93"
  secondary-500: "#ee467f"
  secondary-600: "#dd255a"
  secondary-700: "#c01642"
  secondary-800: "#9e1638"
  secondary-900: "#841732"
  secondary-950: "#510618"
  secondary: "#ee467f"
  on-secondary: "#ffffff"

  # --- Success (Green) ---
  success-50: "#f0fdf5"
  success-100: "#dcfcea"
  success-200: "#bbf7d6"
  success-300: "#85f0b7"
  success-400: "#49df90"
  success-500: "#20bf6b"
  success-600: "#15a459"
  success-700: "#148148"
  success-800: "#16653c"
  success-900: "#145334"
  success-950: "#052e1a"
  success: "#20bf6b"
  on-success: "#ffffff"

  # --- Warning (Yellow) ---
  warning-50: "#fdfde9"
  warning-100: "#fdfbc4"
  warning-200: "#fbf38d"
  warning-300: "#f9e54b"
  warning-400: "#f5d31a"
  warning-500: "#f1c40f"
  warning-600: "#c59009"
  warning-700: "#9d670b"
  warning-800: "#825211"
  warning-900: "#6f4314"
  warning-950: "#412307"
  warning: "#f1c40f"
  on-warning: "#ffffff"

  # --- Critical (Red) ---
  critical-50: "#fff1f1"
  critical-100: "#ffe1e1"
  critical-200: "#ffc8c8"
  critical-300: "#ffa2a1"
  critical-400: "#fe5a59"
  critical-500: "#f73d3c"
  critical-600: "#e41f1e"
  critical-700: "#c01615"
  critical-800: "#9f1615"
  critical-900: "#831a19"
  critical-950: "#480707"
  critical: "#f73d3c"
  on-critical: "#ffffff"

  # --- Semantic aliases ---
  disabled-bg: "#ced2d3"
  disabled-text: "#f5f6f6"
  selected: "#0d547f"
  placeholder: "#abb2b5"
  hairline: "#e5e7e8"
  hairline-strong: "#ced2d3"
  elevation-low: "0px 0px 1px 0px rgba(0,0,0,0.05), 0px 2px 4px 0px rgba(0,0,0,0.05)"

typography:
  display-lg:
    fontFamily: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "88px (desktop) / 42px (mobile)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0
  display-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "72px (desktop) / 36px (mobile)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0
  display-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "56px (desktop) / 32px (mobile)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: 0
  heading-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "46px (desktop) / 28px (mobile)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  heading-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "36px (desktop) / 24px (mobile)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  heading-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "30px (desktop) / 20px (mobile)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  heading-xs:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "28px (desktop) / 20px (mobile)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  title-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "24px (desktop) / 18px (mobile)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "18px (desktop) / 16px (mobile)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "16px (desktop) / 14px (mobile)"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  subtitle-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "24px (desktop) / 18px (mobile)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  subtitle-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "18px (desktop) / 16px (mobile)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  subtitle-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "16px (desktop) / 14px (mobile)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "18px (desktop) / 16px (mobile)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "16px (desktop) / 14px (mobile)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label-lg:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  label-md:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  label-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  label-xs:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  sm: 2px
  md: 12px
  lg: 20px
  circular: 400px
  circle: 50%

spacing:
  base: 8px
  xxxs: 8px
  xxs: 16px
  xs: 24px
  sm: 32px
  md: 40px
  lg: 48px
  xl: 56px
  xxl: 64px
  xxxl: 72px
  hg: 80px
  xh: 96px
  xxh: 120px
  xxxh: 160px

components:
  # --- Buttons ---
  button-regular:
    tag: "mnt-button"
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    sizes: "tiny | small | medium | large"
    palette: "primary | secondary | neutral | success | warning | critical"
  button-emphasis:
    tag: "mnt-button[variant=emphasis]"
    backgroundColor: "{colors.primary-500}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    sizes: "tiny | small | medium | large"
    palette: "primary | secondary | neutral | success | warning | critical"
  button-stroke:
    tag: "mnt-button[variant=stroke]"
    backgroundColor: transparent
    textColor: "{colors.primary-700}"
    border: "1px solid {colors.primary-700}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    palette: "primary | secondary | neutral | success | warning | critical"
  button-plain:
    tag: "mnt-button[variant=plain]"
    backgroundColor: transparent
    textColor: "{colors.primary-700}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    palette: "primary | secondary | neutral | success | warning | critical"
  button-filter:
    tag: "mnt-button[variant=filter]"
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-link:
    tag: "mnt-button[variant=link]"
    backgroundColor: transparent
    textColor: "{colors.primary-700}"
    typography: "{typography.label-md}"
  button-disabled:
    backgroundColor: "{colors.disabled-bg}"
    textColor: "{colors.disabled-text}"
    rounded: "{rounded.md}"
  button-loading:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"

  # --- Badge ---
  badge:
    tag: "mnt-badge"
    typography: "{typography.label-sm}"
    rounded: "{rounded.circular}"
    sizes: "tiny | small | medium | large"
    palette: "primary | secondary | neutral | success | warning | critical"
  badge-default:
    backgroundColor: "{colors.primary-100}"
    textColor: "{colors.primary-800}"
  badge-highlight:
    backgroundColor: "{colors.primary-200}"
    textColor: "{colors.primary-800}"
  badge-emphasis:
    backgroundColor: "{colors.primary-700}"
    textColor: "{colors.on-primary}"

  # --- Tag ---
  tag:
    tag: "mnt-tag"
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    sizes: "tiny | small | medium | large"
  tag-selected:
    backgroundColor: "{colors.primary-100}"
    textColor: "{colors.primary-800}"
    rounded: "{rounded.md}"
  tag-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.disabled-text}"
    rounded: "{rounded.md}"

  # --- Icon ---
  icon:
    tag: "mnt-icon"
    sizes: "tiny=12px | small=16px | medium=24px | large=32px | doubleLarge=64px"
    backgrounds: "circle | rounded | square"
    animations: "spin | pulse"
  icon-large:
    tag: "mnt-icon-large"
    sizes: "tiny=32px | small=48px | medium=64px | large=96px | doubleLarge=128px"

  # --- Switch ---
  switch:
    tag: "mnt-switch"
    backgroundColor: "{colors.surface-subtle}"
    checkedColor: "{colors.primary-500}"
    thumbColor: "{colors.canvas}"
    types: "checkbox | radio"
  switch-disabled:
    backgroundColor: "{colors.disabled-bg}"
    thumbColor: "{colors.canvas}"

  # --- Steps ---
  steps:
    tag: "mnt-steps"
    orientations: "horizontal | vertical"
    statuses: "done | active | disabled"
  step-done:
    backgroundColor: "{colors.primary-700}"
    textColor: "{colors.on-primary}"
  step-active:
    backgroundColor: "{colors.primary-500}"
    textColor: "{colors.on-primary}"
  step-disabled:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-muted}"

  # --- Tabs ---
  tab-item:
    tag: "mnt-tab-item"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-md}"
    orientations: "horizontal | vertical"
  tab-item-selected:
    textColor: "{colors.primary-700}"
    borderBottom: "2px solid {colors.primary-700}"
  tab-item-disabled:
    textColor: "{colors.disabled-text}"
  tab-item-group:
    tag: "mnt-tab-item-group"
    orientations: "horizontal | vertical"

  # --- Tooltip ---
  tooltip:
    tag: "mnt-tooltip"
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    positions: "top | bottom | left | right"
    padding: "6px 10px"

  # --- Fields (Inputs) ---
  field-text:
    tag: "mnt-field-text"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.placeholder}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    sizes: "small | medium | large"
    states: "default | error | success"
  field-text-focus:
    borderColor: "{colors.primary-500}"
  field-text-error:
    borderColor: "{colors.critical-600}"
  field-text-success:
    borderColor: "{colors.success-600}"
  field-text-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-muted}"

  field-number:
    tag: "mnt-field-number"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    variants: "default | plain | simple"
    sizes: "small | medium | large"
  field-number-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-muted}"

  field-date:
    tag: "mnt-field-date"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    sizes: "small | medium | large"
  field-date-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-muted}"

  filter-search:
    tag: "mnt-filter-search"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    sizes: "tiny | small | medium | large"

  # --- Date Picker ---
  date-picker:
    tag: "mnt-date-picker"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    selectedDayBg: "{colors.primary-500}"
    selectedDayText: "{colors.on-primary}"
    rangeBg: "{colors.primary-100}"
    modes: "single | range"
    rounded: "{rounded.md}"

  # --- Options List ---
  options-list:
    tag: "mnt-options-list"
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    selectedBg: "{colors.primary-100}"
    selectedText: "{colors.primary-800}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    elevation: "{colors.elevation-low}"

  # --- Messages ---
  message-highlight:
    tag: "mnt-message-highlight"
    rounded: "{rounded.md}"
    types: "default | emphasis"
    palette: "primary | secondary | neutral | success | warning | critical"
    aligns: "left | center | right"
  message-highlight-default:
    backgroundColor: "{colors.primary-50}"
    textColor: "{colors.primary-900}"
    borderLeft: "4px solid {colors.primary-500}"
  message-highlight-emphasis:
    backgroundColor: "{colors.primary-500}"
    textColor: "{colors.on-primary}"
  message-inline:
    tag: "mnt-message-inline"
    typography: "{typography.label-sm}"
    variants: "neutral | success | error"
  message-inline-neutral:
    textColor: "{colors.ink-muted}"
  message-inline-success:
    textColor: "{colors.success-700}"
  message-inline-error:
    textColor: "{colors.critical-700}"

  # --- Loading State ---
  loading-state:
    tag: "mnt-loading-state"
    colors: "neutral | primary | secondary | success | warning | error"
  loading-state-primary:
    spinnerColor: "{colors.primary-500}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"

  # --- Brand & Illustration ---
  brand:
    tag: "mnt-brand"
    description: "SVG brand logos by name. Accepts height and color overrides."
  illustration:
    tag: "mnt-illustration"
    description: "SVG illustration assets by name. Requires explicit width and height."
---

## Overview

**Mantra** is Yooga's StencilJS design system. It runs a **neutral-first white canvas** (`{colors.canvas}` — #ffffff) as the base surface, with `{colors.surface-soft}` (#f5f6f6) for secondary regions and cards. Six semantic palettes — primary (blue), secondary (magenta), neutral (grey), success (green), warning (yellow), critical (red) — share a consistent 50–950 shade ladder that powers every component variant.

**Poppins** is the single typeface, used at three weights: 400 (regular body and subtitles), 500 (medium, used sparingly), and 600 (semi-bold for all labels, titles, and headings). The weight-600/weight-400 pairing is the system's typographic signature.

Components ship with **four size tiers** (tiny, small, medium, large) and **six palette variants** (primary, secondary, neutral, success, warning, critical), enabling systematic palette-switching across badge, button, and message components without any custom overrides.

Border radius follows three semantic values: `{rounded.sm}` (2px) for inline elements and tight inputs, `{rounded.md}` (12px) for all interactive cards and standard fields, and `{rounded.circular}` (400px) for badges and pill-shaped elements.

**Key Characteristics:**
- `{colors.canvas}` (#ffffff) is always the base. No dark-mode hero bands — the system is light-first.
- Six semantic palettes share the same shade ladder; swapping `color="primary"` to `color="critical"` recolors a component without any other change.
- Poppins 600 for all labels and interactive elements; 400 for body and subtitles. Weight 500 exists in the scale but is rarely applied.
- `{rounded.md}` (12px) is the dominant border radius — soft and modern, not rectangular nor pill-shaped.
- The `mnt-` prefix namespaces every web component tag.
- Elevation is used only at the `low` level (subtle shadow) — the system avoids deep shadows.

---

## Colors

### Palettes

The system defines six palettes, each with 11 shades (50–950). Use shade **500** as the mid-point brand color, **700–800** for accessible text on light backgrounds, **50–100** for tinted surfaces, and **950** for pressed/darkest states.

#### Primary — Blue
| Shade | Hex | Role |
|---|---|---|
| 50 | #f1f9fe | Tinted surface, message-highlight background |
| 100 | #e1f1fd | Badge default background, selected tag |
| 200 | #bde3fa | Badge highlight background |
| 300 | #83cef6 | Range selection soft fill |
| 400 | #41b5ef | Hover accents |
| **500** | **#19a1e6** | **Brand color — buttons emphasis, spinner, selected border** |
| 600 | #0b7cbe | Pressed state |
| **700** | **#0a639a** | **Accessible text on light, stroke button color** |
| 800 | #0d547f | Selected text, badge emphasis text |
| 900 | #114769 | Pressed text |
| 950 | #0b2c46 | Deepest pressed / strong emphasis |

#### Secondary — Magenta
| Shade | Hex |
|---|---|
| 50 | #fdf2f6 |
| 500 | #ee467f |
| 700 | #c01642 |
| 950 | #510618 |

#### Neutral — Grey
| Token | Hex | Role |
|---|---|---|
| `{colors.canvas}` | #ffffff | Default page surface |
| `{colors.surface-soft}` | #f5f6f6 | Cards, secondary backgrounds |
| `{colors.surface-subtle}` | #e5e7e8 | Tag background, hairline dividers |
| `{colors.surface-muted}` | #ced2d3 | Disabled backgrounds, stronger hairlines |
| `{colors.ink-muted}` | #5f676c | Placeholder text, muted labels |
| `{colors.ink}` | #3a3d3f | Primary body text |
| `{colors.ink-strong}` | #242628 | Tooltip background, high-contrast text |
| `{colors.ink-black}` | #000000 | Maximum contrast |

#### Success — Green
| Shade | Hex | Role |
|---|---|---|
| 50 | #f0fdf5 | Success surface |
| 500 | #20bf6b | Success brand |
| 700 | #148148 | Success text, inline message |

#### Warning — Yellow
| Shade | Hex | Role |
|---|---|---|
| 50 | #fdfde9 | Warning surface |
| 500 | #f1c40f | Warning brand |
| 700 | #9d670b | Warning text |

#### Critical — Red
| Shade | Hex | Role |
|---|---|---|
| 50 | #fff1f1 | Critical/error surface |
| 500 | #f73d3c | Critical brand |
| 700 | #c01615 | Error text, inline message |

### Semantic Aliases
- **`{colors.disabled-bg}`** (#ced2d3): Background for any disabled interactive element.
- **`{colors.disabled-text}`** (#f5f6f6): Text color on a disabled element.
- **`{colors.placeholder}`** (#abb2b5): Input placeholder text.
- **`{colors.hairline}`** (#e5e7e8): Thin 1px separator — table rows, section dividers.
- **`{colors.hairline-strong}`** (#ced2d3): Slightly heavier separator — input borders at rest.
- **`{colors.elevation-low}`**: `0px 0px 1px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.05)` — the only box shadow in the system (dropdowns, floating panels).

---

## Typography

### Font Family
**Poppins** is the single typeface for the entire system (both heading and body). The fallback stack is `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

Three weights are active:
- **400 (regular)** — body text, subtitles, form values, placeholder
- **500 (medium)** — selective usage, mostly intermediate states
- **600 (semi-bold)** — all labels, titles, headings, button labels

### Hierarchy

| Token | Desktop Size | Mobile Size | Weight | Line Height | Use |
|---|---|---|---|---|---|
| `{typography.display-lg}` | 88px | 42px | 600 | 1.1 | Hero — page-level display |
| `{typography.display-md}` | 72px | 36px | 600 | 1.1 | Large section display |
| `{typography.display-sm}` | 56px | 32px | 600 | 1.15 | Section-level display |
| `{typography.heading-lg}` | 46px | 28px | 600 | 1.2 | Page H1 |
| `{typography.heading-md}` | 36px | 24px | 600 | 1.25 | Section H2 |
| `{typography.heading-sm}` | 30px | 20px | 600 | 1.3 | Sub-section H3 |
| `{typography.heading-xs}` | 28px | 20px | 600 | 1.3 | H4 / card group title |
| `{typography.title-lg}` | 24px | 18px | 600 | 1.4 | Card titles, dialog headings |
| `{typography.title-md}` | 18px | 16px | 600 | 1.4 | List group titles, form section labels |
| `{typography.title-sm}` | 16px | 14px | 600 | 1.5 | Component section labels |
| `{typography.subtitle-lg}` | 24px | 18px | 400 | 1.5 | Subheadings (regular weight) |
| `{typography.subtitle-md}` | 18px | 16px | 400 | 1.5 | Field group descriptions |
| `{typography.subtitle-sm}` | 16px | 14px | 400 | 1.5 | Secondary descriptions |
| `{typography.body-lg}` | 18px | 16px | 400 | 1.6 | Lead paragraphs |
| `{typography.body-md}` | 16px | 14px | 400 | 1.6 | Default body, input values |
| `{typography.body-sm}` | 12px | 12px | 400 | 1.5 | Footnotes, legal, captions |
| `{typography.label-lg}` | 16px | 16px | 600 | 1.4 | Large action labels |
| `{typography.label-md}` | 14px | 14px | 600 | 1.4 | Standard button label, tab label |
| `{typography.label-sm}` | 12px | 12px | 600 | 1.4 | Badge label, small chip |
| `{typography.label-xs}` | 11px | 11px | 600 | 1.4 | Tiny badge, micro label |

### Principles
- **600/400 contrast** is the editorial signature. Weight 500 exists but is reserved for intermediate UI states, not primary typography.
- **No italic, no uppercase transformation** in the core system — all-caps usage is avoided.
- **Letter-spacing stays at 0** across all tokens — Poppins has a well-balanced character width that doesn't need tracking adjustments.
- **Responsive sizes** — display and heading tokens have separate desktop and mobile values; label and body tokens use a single size across breakpoints.

---

## Layout

### Spacing System
- **Base unit:** 8px grid.
- Tokens: `{spacing.xxxs}` 8px · `{spacing.xxs}` 16px · `{spacing.xs}` 24px · `{spacing.sm}` 32px · `{spacing.md}` 40px · `{spacing.lg}` 48px · `{spacing.xl}` 56px · `{spacing.xxl}` 64px · `{spacing.xxxl}` 72px · `{spacing.hg}` 80px · `{spacing.xh}` 96px · `{spacing.xxh}` 120px · `{spacing.xxxh}` 160px.
- Also available: half-grid combo values (4px, 12px, 20px, 28px, 36px, 44px, 52px) for fine-grained padding within components.

### Grid
- **12-column grid**, column ratio = `100% / 12`.
- **Max content width:** typically 1280–1440px centered.
- No rigid section-band rhythm enforced at the system level — product teams define page layout.

---

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body text, headings, icon-only areas |
| Hairline | 1px `{colors.hairline}` or `{colors.hairline-strong}` | Input borders, table dividers, card outlines |
| Low elevation | `{colors.elevation-low}` box-shadow | Dropdowns (options-list), floating tooltips |

The system **does not use deep or colored shadows**. Depth is achieved through surface contrast (white card on grey background) and the single low elevation shadow.

---

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Rarely used — only when flush edges are explicitly needed |
| `{rounded.sm}` | 2px | Small badges in tight contexts, minimal rounding |
| `{rounded.md}` | 12px | **Default** — all buttons, input fields, cards, panels |
| `{rounded.lg}` | 20px | Large cards, modal dialogs |
| `{rounded.circular}` | 400px | Badge pill shape — the system's pill radius |
| `{rounded.circle}` | 50% | Avatar, circular icon button |

`{rounded.md}` (12px) is the dominant radius — it defines the system's soft, approachable personality. Rectangular elements (`{rounded.none}`) are the exception, not the rule.

---

## Components

### Buttons

**`button-regular`** (`mnt-button`) — The default action button. Background `{colors.surface-soft}` (#f5f6f6), colored text at palette shade 700 (e.g. `{colors.primary-700}` for `color="primary"`), label in `{typography.label-md}` (14px / 600), `{rounded.md}` (12px) corners. Available in four sizes (tiny, small, medium, large) and six palette variants.

**`button-emphasis`** (`mnt-button[variant=emphasis]`) — The primary CTA. Background fills with the palette's 500 shade (e.g. `{colors.primary}` #19a1e6 for primary), text is `{colors.on-primary}` (white). Same rounding and size options as regular.

**`button-stroke`** (`mnt-button[variant=stroke]`) — Outlined button. Transparent background, 1px border at palette 700, matching text color. Provides clear secondary hierarchy below emphasis.

**`button-plain`** (`mnt-button[variant=plain]`) — Text-only button without background or border. Uses palette 700 for text color. Minimal visual weight — used for tertiary actions.

**`button-filter`** (`mnt-button[variant=filter]`) — A compact filter/chip button. Neutral grey background, ink text, used inside filter bars and tag selections.

**`button-link`** (`mnt-button[variant=link]`) — Inline link-styled action. Transparent, uses palette 700 text color, no padding box. Sits inside body copy or form messages.

**Disabled state:** Any button with `disabled` prop takes `{colors.disabled-bg}` background and `{colors.disabled-text}` text — palette is overridden.

**Loading state:** The button shows a spinner (`mnt-icon[icon=loading]`) and freezes its width to prevent layout shift while loading.

**Icon support:** Buttons accept `iconLeft` and `iconRight` props. Icon sizes scale with the button `size` prop: tiny=14px, small=16px, medium=18px, large=20px.

---

### Badge

**`badge`** (`mnt-badge`) — A small inline label used to communicate status, count, or category. Three tone variants:
- **`badge-default`** (`tone="default"`): Tinted — `{colors.primary-100}` background, `{colors.primary-800}` text.
- **`badge-highlight`** (`tone="highlight"`): Stronger tint — `{colors.primary-200}` background, `{colors.primary-800}` text.
- **`badge-emphasis`** (`tone="emphasis"`): Filled — `{colors.primary-700}` background, white text.

Typography: `{typography.label-xs}` to `{typography.label-sm}` depending on size. Border radius: `{rounded.circular}` (400px pill). Sizes: tiny, small, medium, large.

Optional `icon` prop renders an `mnt-icon` inline left of the label.

---

### Tag

**`tag`** (`mnt-tag`) — A removable or selectable chip. Default state: `{colors.surface-subtle}` background, `{colors.ink}` text. Sizes: tiny, small, medium, large. States:
- **`tag-selected`**: `{colors.primary-100}` background, `{colors.primary-800}` text.
- **`tag-disabled`**: `{colors.surface-soft}` background, muted text.

Tags emit a `tagRemoved` event with the `tagId` and `label` payload. The removal uses a two-phase animation (fade + collapse) with a 450ms total duration.

---

### Icon

**`mnt-icon`** — The standard icon component. Renders SVG icons from the `icon-base` registry. Sizes map to fixed pixel values: tiny=12px, small=16px, medium=24px, large=32px, doubleLarge=64px. Accepts an arbitrary `number` for custom sizes.

Optional `background` prop wraps the icon in a shaped container (`circle`, `rounded`, `square`). Supports `animation` prop for `spin` (loading spinner) and `pulse` effects.

**`mnt-icon-large`** — For large decorative icon use. Sizes: tiny=32px, small=48px, medium=64px, large=96px, doubleLarge=128px.

**Important:** Only use icon names that exist in the `icon-base` registry — do not hardcode unsupported icon names.

---

### Switch

**`mnt-switch`** — A toggle control. Supports two behavioral types:
- `type="checkbox"` (default): independent on/off toggle.
- `type="radio"`: exclusive selection within a group (requires `name` prop).

Optional `label` and `description` props render text beside the toggle. Checked state fills the track with `{colors.primary-500}`. Disabled state dims with `{colors.disabled-bg}`. Emits `switchChange` with `{ checked, value, id, name }`.

---

### Steps

**`mnt-steps`** — A progress indicator for multi-step flows. Accepts an array of step objects (`{ id, label, status, icon }`). The `activeStepId` prop controls the active step.

Step statuses:
- **`step-done`**: `{colors.primary-700}` filled circle, white icon/number.
- **`step-active`**: `{colors.primary-500}` filled circle, white icon/number.
- **`step-disabled`**: `{colors.surface-subtle}` circle, `{colors.ink-muted}` text.

Orientations: `horizontal` (left-to-right linear flow) or `vertical` (top-to-bottom stacked list).

---

### Tabs

**`mnt-tab-item`** — A single tab. Default state: `{colors.ink-muted}` text, `{typography.label-md}`. Selected: `{colors.primary-700}` text with a 2px solid bottom/left border (depending on orientation). Disabled: `{colors.disabled-text}`.

**`mnt-tab-item-group`** — Manages a group of tabs, emitting `tabChange` on selection. Accepts a `tabs` array and `selectedId`. Orientations: `horizontal` or `vertical`.

---

### Tooltip

**`mnt-tooltip`** — A contextual hint that wraps its trigger slot. Background `{colors.ink-strong}` (#242628), text `{colors.canvas}` (white), `{typography.body-sm}` (12px / 400), `{rounded.sm}` (2px). Positions: `top`, `bottom`, `left`, `right`. Padding: 6px × 10px.

---

### Field — Text

**`mnt-field-text`** — A labeled text input. Default: white background, `{colors.hairline-strong}` 1px border, `{rounded.sm}` corners, `{typography.body-md}` for values, `{colors.placeholder}` for placeholder. Sizes: small, medium, large.

States:
- **Focus**: border transitions to `{colors.primary-500}`.
- **Error** (`state="error"`): border to `{colors.critical-600}`; optional `inlineMessage` renders below via `mnt-message-inline[variant=error]`.
- **Success** (`state="success"`): border to `{colors.success-600}`.
- **Disabled**: `{colors.surface-soft}` background, `{colors.ink-muted}` text.

Optional `iconLeft` / `iconRight` props embed an `mnt-icon` inside the input. `hasActionButton` and `hasInfoButton` props add trailing action slots.

---

### Field — Number

**`mnt-field-number`** — A numeric stepper input. Variants:
- **`default`**: visible border, increment/decrement buttons.
- **`plain`**: borderless, minimalist.
- **`simple`**: text-only number with minimal controls.

Sizes: small, medium, large. Accepts `min`, `max`, and `step` props. Disabled behavior matches `field-text`.

---

### Field — Date

**`mnt-field-date`** — A text input with an attached date picker (`mnt-date-picker`). Sizes: small, medium, large. Passes `datePickerConfig` (a `DatePickerBaseProps` object) to control picker behavior (mode, min/max date, locale, etc.).

---

### Filter Search

**`mnt-filter-search`** — A search-style input designed for filter bars. Same visual structure as `field-text` but optimized for filtering contexts. Sizes: tiny, small, medium, large.

---

### Date Picker

**`mnt-date-picker`** — A calendar panel for date selection. Two modes:
- `single`: selects one date.
- `range`: selects a start and end date.

Selected day: `{colors.primary-500}` background, white text. Range fill: `{colors.primary-100}`. `{rounded.md}` on the panel. Supports `locale`, `firstDayOfWeek`, `disablePastDates`, `minDate`, `maxDate`. Emits `dateSelected` with `{ date, range, formattedDate, mode }`.

---

### Options List

**`mnt-options-list`** — A floating dropdown list for select-style inputs. Background `{colors.canvas}`, low elevation shadow. Selected row: `{colors.primary-100}` background, `{colors.primary-800}` text. `{rounded.md}` corners. Accepts items as a JSON string or a direct array (supports Angular property binding). Emits `optionSelected` with `{ value, label }`.

---

### Message — Highlight

**`mnt-message-highlight`** — A prominent alert or information panel. Two types:
- **`default`**: tinted — `{colors.primary-50}` background, `{colors.primary-900}` text, 4px solid left border at palette 500.
- **`emphasis`**: filled — palette 500 background, white text.

Available in all six palette variants. Props: `text` (required), `headline` (optional), `icon` (defaults to semantic icon per variant), `fullWidth`, `marginBottom`, `align` (left / center / right). Leading icons auto-map: success → check-circle, critical → error-circle, warning → warning-circle, others → info-circle.

---

### Message — Inline

**`mnt-message-inline`** — A compact inline feedback message (used below form fields). Three variants:
- **`neutral`**: `{colors.ink-muted}` text.
- **`success`**: `{colors.success-700}` text.
- **`error`**: `{colors.critical-700}` text.

Props: `label`, `icon`, `hasPadding`. Typography: `{typography.label-sm}` (12px / 600).

---

### Loading State

**`mnt-loading-state`** — A spinner with optional label. Six color variants: neutral, primary, secondary, success, warning, error. The spinner fills with the palette's 500 shade. Label renders in `{typography.label-md}`. The component does not enforce a fixed size — it inherits its container.

---

### Brand

**`mnt-brand`** — Renders SVG brand logos by name (key from the `BRANDS` registry). Accepts `height` and `color` props. Use this component for partner or internal brand marks — do not inline SVG manually.

---

### Illustration

**`mnt-illustration`** — Renders SVG illustration assets by name (key from the `ILLUSTRATIONS` registry). Requires explicit `width` and `height` props. Use for empty states, onboarding, and contextual decorative imagery.

---

## Do's and Don'ts

### Do
- Use `{colors.canvas}` (#ffffff) as the default page surface.
- Apply palette variants through the `color` prop — never hardcode hex values in components.
- Use `{rounded.md}` (12px) as the default border radius for all interactive elements.
- Set button labels and interactive text in Poppins 600 (`{typography.label-md}`).
- Use `mnt-message-inline` below form fields for validation feedback, not raw text.
- Keep the `mnt-` prefix on every custom element tag.
- Use only icon names that exist in the `icon-base` registry.
- Use `mnt-brand` and `mnt-illustration` for logos and illustrations — never inline SVG.

### Don't
- Don't hardcode color hex values — always use the token system or palette shade references.
- Don't use pill radius (`{rounded.circular}`) for buttons or input fields — that belongs only to badges.
- Don't mix multiple palette colors on the same interactive surface — one palette per component instance.
- Don't bold body text — weight 400 is the body voice; weight 600 is only for labels and headings.
- Don't add deep shadows — only `{colors.elevation-low}` is permitted; no colored or large shadows.
- Don't add comments or TODOs in component code — deliver production-ready code only.
- Don't use inline styles — all styling must go through SCSS and the token system.
- Don't use element IDs in reusable components — use classes with the `mnt-` prefix.

---

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Display/heading tokens switch to mobile sizes; single-column layouts; steps collapse to vertical if horizontal doesn't fit |
| Tablet | 768–1024px | Two-column grids; tab groups may scroll horizontally |
| Desktop | 1024–1440px | Full layout; display tokens at desktop sizes |
| Wide | > 1440px | Content fixed at max-width; gutters absorb remaining space |

### Touch Targets
- All interactive components (buttons, switches, tab items) maintain a minimum 44×44px effective touch area regardless of visual size.
- `field-text`, `field-number`, `field-date` all have minimum heights of 44px at `size="small"`.

### Collapsing Strategy
- Steps with `orientation="horizontal"` may wrap or switch to `vertical` at narrow widths.
- Tab groups scroll horizontally on mobile rather than wrapping.
- Message highlights with `fullWidth` stretch to 100% of their container at all breakpoints.

---

## Iteration Guide

1. Reference a component by its YAML key (`{component.button-emphasis}`, `{component.badge}`) or by its tag (`mnt-button`, `mnt-badge`).
2. New components default to `{rounded.md}` (12px). Use `{rounded.circular}` only for badge/pill shapes, `{rounded.circle}` only for avatars.
3. Variants (`-disabled`, `-selected`, `-emphasis`) are documented as separate entries in the `components:` block.
4. Use token references (`{colors.primary-500}`) instead of inline hex values.
5. The component file structure is mandatory: `.tsx` + `.types.ts` + `.scss` + `.stories.ts` + `.spec.tsx`. Never deliver a component missing any of these.
6. All SCSS goes through the token system in `src/shared/theme/tokens/`. Never hardcode values.
7. Add new icons to `icon-base` before using them in a component — do not reference non-existent icons.

---

## Known Gaps

- Dark mode is not part of the current system — all tokens assume a light-surface context.
- Animation and transition timings are not formally tokenized (only the tag removal animation is documented at 450ms).
- The `mnt-checkbox` and `mnt-radio` components lack `.types.ts` files — their props are not formally typed in the current codebase.
- Form validation states beyond `field-text` focus/error/success have not been extracted across all field components.
- The `options-list` floating panel positioning logic (viewport edge detection) is not documented here.
- `mnt-brand` and `mnt-illustration` asset registries (`BRANDS`, `ILLUSTRATIONS`) require separate discovery — the full list of available names is not captured in this file.
