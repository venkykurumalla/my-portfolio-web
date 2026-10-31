// Central design tokens — the single source for colors, radii, blur and shadows.
// `applyTokens()` injects them as CSS custom properties before React renders,
// so index.css and components only ever reference var(--token).

export const colors = {
  bg: "#05060A",
  blue: "#3B82F6",
  violet: "#8B5CF6",
  cyan: "#22D3EE",
  pink: "#F472B6",
};

export const radii = {
  card: "28px",
  cardLg: "32px",
  chip: "16px",
  pill: "9999px",
};

export const blur = {
  glass: "14px",
  glassMobile: "10px",
  nav: "16px",
  navScrolled: "16px",
};

export const ease = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
};

const dark = {
  "--bg": colors.bg,
  "--fg": "#F4F6FB",
  "--fg-muted": "rgba(226, 232, 245, 0.72)",
  "--fg-dim": "rgba(226, 232, 245, 0.62)",
  "--glass-fill": "rgba(255, 255, 255, 0.07)",
  "--glass-fill-strong": "rgba(255, 255, 255, 0.12)",
  "--glass-tint": "rgba(5, 6, 10, 0.32)",
  "--glass-border-hi": "rgba(255, 255, 255, 0.55)",
  "--glass-border-lo": "rgba(255, 255, 255, 0.08)",
  "--glass-specular": "rgba(255, 255, 255, 0.1)",
  "--glass-shadow":
    "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 60px -18px rgba(0,0,0,0.65), 0 6px 18px rgba(0,0,0,0.3)",
  "--sheen": "rgba(255, 255, 255, 0.2)",
  "--aurora-opacity": "0.6",
  "--grain-opacity": "0.05",
  "--aurora-blue": colors.blue,
  "--aurora-violet": colors.violet,
  "--aurora-cyan": colors.cyan,
  "--aurora-pink": colors.pink,
};

const light = {
  "--bg": "#EDF0FA",
  "--fg": "#0B1020",
  "--fg-muted": "rgba(11, 16, 32, 0.72)",
  "--fg-dim": "rgba(11, 16, 32, 0.64)",
  "--glass-fill": "rgba(255, 255, 255, 0.55)",
  "--glass-fill-strong": "rgba(255, 255, 255, 0.78)",
  "--glass-tint": "rgba(255, 255, 255, 0.35)",
  "--glass-border-hi": "rgba(255, 255, 255, 1)",
  "--glass-border-lo": "rgba(255, 255, 255, 0.5)",
  "--glass-specular": "rgba(255, 255, 255, 0.7)",
  "--glass-shadow":
    "inset 0 1px 0 rgba(255,255,255,0.9), 0 24px 60px -20px rgba(60,72,140,0.35), 0 6px 18px rgba(60,72,140,0.12)",
  "--sheen": "rgba(255, 255, 255, 0.9)",
  "--aurora-opacity": "0.5",
  "--grain-opacity": "0.035",
  "--aurora-blue": "#93B8FF",
  "--aurora-violet": "#C4B0FF",
  "--aurora-cyan": "#9BE9F7",
  "--aurora-pink": "#F9B6D6",
};

const shared = {
  "--blue": colors.blue,
  "--violet": colors.violet,
  "--cyan": colors.cyan,
  "--pink": colors.pink,
  "--r-card": radii.card,
  "--r-card-lg": radii.cardLg,
  "--r-chip": radii.chip,
  "--r-pill": radii.pill,
  "--blur-glass": blur.glass,
  "--blur-nav": blur.nav,
  "--blur-nav-scrolled": blur.navScrolled,
};

const toRule = (selector, vars) =>
  `${selector}{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}}`;

export function applyTokens() {
  const css = [
    toRule(":root", { ...shared, ...dark }),
    toRule(':root[data-theme="light"]', light),
    // Lighter blur on small screens keeps scrolling at 60fps.
    `@media (max-width:768px){:root{--blur-glass:${blur.glassMobile};--blur-nav:${blur.glassMobile};--blur-nav-scrolled:${blur.glassMobile}}}`,
  ].join("\n");

  const style = document.createElement("style");
  style.id = "design-tokens";
  style.textContent = css;
  document.head.prepend(style);
}
