import "./mobile.css";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { gsap, ScrollTrigger, scrollState } from "../lib/motion";
import { initHaptics } from "../lib/haptics";
import { useActiveSection } from "../lib/useActiveSection";
import Footer from "../components/Footer";
import MobileBackdrop from "./MobileBackdrop";
import { TopBar, TabBar } from "./MobileShell";
import MobileHero from "./MobileHero";
import MobileAbout from "./MobileAbout";
import MobileSkills from "./MobileSkills";
import MobileProjects from "./MobileProjects";
import MobileExperience from "./MobileExperience";
import MobileEducation from "./MobileEducation";
import MobileCertifications from "./MobileCertifications";
import MobileContact from "./MobileContact";

export default function MobileApp() {
  const active = useActiveSection();

  useEffect(() => {
    const stopHaptics = initHaptics();

    // Phones scroll natively (no Lenis), so measure swipe speed here for the marquees.
    let last = window.scrollY;
    const tick = () => {
      const y = window.scrollY;
      scrollState.velocity += (y - last - scrollState.velocity) * 0.2;
      last = y;
    };
    gsap.ticker.add(tick);

    // Re-measure triggers once fonts and the page are fully loaded.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 1200);

    return () => {
      stopHaptics();
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <MobileBackdrop section={active} />
      <TopBar active={active} />
      <main id="main" className="m-main">
        {/* The hero is sticky; the About sheet slides over it ("stacked sheets") */}
        <div className="m-stack-wrap">
          <MobileHero />
          <MobileAbout />
        </div>
        <MobileSkills />
        <MobileProjects />
        <MobileExperience />
        <MobileEducation />
        <MobileCertifications />
        <MobileContact />
      </main>
      <Footer />
      <TabBar active={active} />
    </MotionConfig>
  );
}
