/**
 * Single source of truth for Roadmap colors.
 * 1) APPROVED_CATEGORY_PALETTE – exact tag.value match
 * 2) moduleTheme in each module data file – fallback for unknown tags
 */

export type ModuleTheme = {
  moduleKey: string;
  moduleTitle: string;
  palette: {
    light: { bg: string; text: string };
    dark: { bg: string; text: string };
  };
};

/** [background, text]. text can be "transparent" → use module palette text. */
export type ModePalette = [string, string];

/** Text color for Platform/Pipelines pills when palette specifies "transparent". */
export const TRANSPARENT_PILL_TEXT_LIGHT = "#ffffff";
export const TRANSPARENT_PILL_TEXT_DARK = "#1C2024";

/** Approved category palette. EXACT match on tag.value. Dark mode = mid-spectrum (muted, readable, not glowing). */
export const APPROVED_CATEGORY_PALETTE: Record<
  string,
  { light: ModePalette; dark: ModePalette }
> = {
  "AI & Automation": { light: ["#DAD0F6", "#542FBC"], dark: ["#3D3558", "#B8A8E8"] },
  "Developer Experience": { light: ["#EBEFFF", "#2E1CF3"], dark: ["#363258", "#A89FF5"] },
  Platform: { light: ["#00ADE4", "transparent"], dark: ["#00ADE4", "transparent"] },
  Integrations: { light: ["#E2F5FF", "#0672B6"], dark: ["#1A3045", "#6BB3E8"] },
  Security: { light: ["#EBEFFF", "#2E1CF3"], dark: ["#363258", "#A89FF5"] },
  Authentication: { light: ["#EBEFFF", "#2E1CF3"], dark: ["#363258", "#A89FF5"] },
  "Access Control": { light: ["#FFF1F7", "#9A0041"], dark: ["#4A2838", "#E8A8C4"] },
  "CI/CD": { light: ["#E2F5FF", "#0672B6"], dark: ["#1A3045", "#6BB3E8"] },
  "Core Features": { light: ["#00ADE4", "transparent"], dark: ["#00ADE4", "transparent"] },
  "Orchestration": { light: ["#E2F5FF", "#0672B6"], dark: ["#1A3045", "#6BB3E8"] },
  Pipelines: { light: ["#00ADE4", "transparent"], dark: ["#00ADE4", "transparent"] },
  Governance: { light: ["#EBEFFF", "#2E1CF3"], dark: ["#363258", "#A89FF5"] },
  "Insights & Reporting": { light: ["#01C9CC", "#ECFFFF"], dark: ["#0D3D3E", "#7ED9DB"] },
  "Cost & Optimization": { light: ["#01C9CC", "#ECFFFF"], dark: ["#0D3D3E", "#7ED9DB"] },
  Infrastructure: { light: ["#F6FFF2", "#30841F"], dark: ["#1E3320", "#8ED982"] },
  "Developer Tools": { light: ["#EBEFFF", "#2E1CF3"], dark: ["#363258", "#A89FF5"] },
  "Data & Lifecycle": { light: ["#F6FFF2", "#30841F"], dark: ["#1E3320", "#8ED982"] },
  "Database Support": { light: ["#F6FFF2", "#30841F"], dark: ["#1E3320", "#8ED982"] },
};

/** Default theme for modules not in Groups A–D. Dark = mid-spectrum blue. */
export const DEFAULT_MODULE_THEME: ModuleTheme = {
  moduleKey: "default",
  moduleTitle: "Platform",
  palette: {
    light: { bg: "#E2F5FF", text: "#0672B6" },
    dark: { bg: "#1A3045", text: "#6BB3E8" },
  },
};

/** Resolve pill [bg, text] for a tag. Uses approved palette or module fallback. */
export function getPillColors(
  tagValue: string,
  mode: "light" | "dark",
  modulePalette: { bg: string; text: string }
): { bg: string; text: string } {
  const approved = APPROVED_CATEGORY_PALETTE[tagValue];
  if (approved) {
    const [bg, text] = approved[mode];
    const transparentText =
      mode === "light" ? TRANSPARENT_PILL_TEXT_LIGHT : TRANSPARENT_PILL_TEXT_DARK;
    return {
      bg,
      text: text === "transparent" ? transparentText : text,
    };
  }
  return { bg: modulePalette.bg, text: modulePalette.text };
}

/** Hover border color for a card: pill text for most categories; pill bg for Platform & Pipelines. */
export function getCardHoverBorderColor(
  firstTagValue: string | null,
  firstTagStyle: { bg: string; text: string } | null
): string | null {
  if (firstTagStyle == null) return null;
  const useBg =
    firstTagValue === "Platform" || firstTagValue === "Pipelines";
  return useBg ? firstTagStyle.bg : firstTagStyle.text;
}
