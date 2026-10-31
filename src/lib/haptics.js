// Light haptic tick on Android (navigator.vibrate). iOS Safari doesn't support it; calls are no-ops there.
export const haptic = (ms = 8) => {
  try { if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) navigator.vibrate?.(ms); } catch { /* unsupported */ }
};

export function initHaptics() {
  const onClick = (e) => {
    if (e.target.closest?.("a.btn, button, [role='tab'], .m-press")) haptic(8);
  };
  document.addEventListener("click", onClick, { capture: true, passive: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
