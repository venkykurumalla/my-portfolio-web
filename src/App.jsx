import { Suspense, lazy } from "react";
import SmoothScroll from "./components/SmoothScroll";
import DesktopApp from "./DesktopApp";
import { useMediaQuery } from "./lib/useMediaQuery";

// Phones get their own, app-like experience (separate component tree and animations);
// tablets and desktops keep the original layout. The mobile code is a separate chunk.
const MobileApp = lazy(() => import("./mobile/MobileApp"));

export default function App() {
  const isPhone = useMediaQuery("(max-width: 767px)");
  return (
    <SmoothScroll>
      {isPhone ? (
        <Suspense fallback={<div style={{ minHeight: "100svh" }} aria-hidden="true" />}>
          <MobileApp />
        </Suspense>
      ) : (
        <DesktopApp />
      )}
    </SmoothScroll>
  );
}
