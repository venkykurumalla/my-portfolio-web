import { useEffect } from "react";

/**
 * TasteRevealObserver
 * 
 * Directly adapted from the official Taste Skill runtime engine (tasteskill.dev).
 * Automatically monitors elements with `data-reveal` and `data-reveal="clip"` attributes
 * and safely applies `data-revealed` when they scroll into the viewport,
 * triggering hardware-accelerated CSS transitions with zero re-renders.
 */
export default function TasteRevealObserver() {
  useEffect(() => {
    const attachObserver = () => {
      const elements = document.querySelectorAll("[data-reveal]:not([data-revealed])");
      if (!elements.length) return;

      if (!("IntersectionObserver" in window)) {
        elements.forEach((el) => el.setAttribute("data-revealed", ""));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-revealed", "");
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );

      elements.forEach((el) => observer.observe(el));
      return observer;
    };

    const observer = attachObserver();

    // Re-check dynamically mounted content (e.g. tab switches or page layout changes)
    const mutationObserver = new MutationObserver(() => {
      attachObserver();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
