// One-shot reveals for phones. Elements marked `data-reveal` are hidden by CSS only on small
// screens (see index.css); this adds `.is-in` once they scroll into view and never takes it back,
// so content can never be left half-faded. CSS also carries a failsafe that shows everything
// after a few seconds if this code never runs.

export function initReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Also reveal anything already scrolled past (deep links, fast flicks).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
  );

  const seen = new WeakSet();
  const scan = () => {
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
      if (!seen.has(el)) { seen.add(el); io.observe(el); }
    });
  };
  scan();
  // Below-the-fold sections are lazy-loaded, so keep watching for new nodes.
  const mo = new MutationObserver(scan);
  mo.observe(document.getElementById("root"), { childList: true, subtree: true });

  return () => { io.disconnect(); mo.disconnect(); };
}

// Calls `cb` the first time `el` is visible (used for counters and the About highlight).
export function onceVisible(el, cb, margin = "-12%") {
  if (!el) return () => {};
  if (!("IntersectionObserver" in window)) { cb(); return () => {}; }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0)) { io.disconnect(); cb(); }
    },
    { rootMargin: `0px 0px ${margin} 0px`, threshold: 0.01 },
  );
  io.observe(el);
  return () => io.disconnect();
}
