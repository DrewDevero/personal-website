import { useState, lazy, Suspense } from "react";
import type { Route } from "./+types/home";
import PortfolioOverlay from "../components/PortfolioOverlay";

const FourDScene = lazy(() => import("../components/FourDScene"));

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Drew Devero — 4D Creative Technologist Portfolio" },
    {
      name: "description",
      content:
        "Alston Drew Devero-Belfon: Full Stack Engineer, AI Researcher, and Creative Technologist. Explore an interactive 4D portfolio.",
    },
  ];
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#030308] flex flex-col items-center justify-center gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-purple-400 border-l-transparent animate-spin" />
        <div
          className="absolute inset-4 rounded-full border border-t-transparent border-r-blue-400 border-b-transparent border-l-blue-400 animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-white/50 text-xs font-mono uppercase tracking-[0.3em] mb-1">
          Projecting 4D Space
        </p>
        <p className="text-white/20 text-[10px] font-mono">
          Initializing dimensional renderer...
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [wRotation, setWRotation] = useState(0);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030308]">
      <Suspense fallback={<LoadingScreen />}>
        <FourDScene activeSection={activeSection} wRotation={wRotation} />
      </Suspense>
      <PortfolioOverlay
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        wRotation={wRotation}
        setWRotation={setWRotation}
      />
    </div>
  );
}
