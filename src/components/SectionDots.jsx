import { sections, useActiveSection } from "../lib/useActiveSection";
import { scrollToTarget } from "../lib/motion";

export default function SectionDots() {
  const active = useActiveSection();
  return (
    <nav aria-label="Section progress" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col gap-3.5">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="section-dot"
              aria-label={`Go to ${s.label}`}
              aria-current={active === s.id}
              onClick={() => scrollToTarget(`#${s.id}`)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
