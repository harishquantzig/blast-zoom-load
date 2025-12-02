import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import image from "../assets/background.png"

export const ExplosionLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "zooming" | "done">("loading");

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPhase("zooming");
    }, 4000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (phase === "zooming") {
      const doneTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2000);

      return () => clearTimeout(doneTimer);
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
    >
      {/* Subtle radial glow behind logo */}
      <div 
        className={`absolute w-[500px] h-[500px] rounded-full transition-all duration-1000 ${
          phase === "zooming" ? "opacity-0 scale-150" : "opacity-30"
        }`}
        style={{
          background: "radial-gradient(circle, hsl(200 100% 50% / 0.2) 0%, hsl(200 100% 50% / 0.05) 50%, transparent 70%)",
        }}
      />

      {/* Main logo with pulsating float and color shift */}
      <div
        className={`relative z-10 ${
          phase === "loading" 
            ? "animate-pulse-float" 
            : phase === "zooming" 
              ? "animate-zoom-through-gate" 
              : "opacity-0"
        }`}
      >
        <img
          src={logo}
          alt="Logo"
          className={`w-56 h-auto md:w-72 ${phase === "loading" ? "animate-color-shift" : ""}`}
        />
      </div>

      {/* Loading text with pulsating dots */}
      {phase === "loading" && (
        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-primary"
                style={{
                  animation: "pulse-float 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm tracking-widest uppercase font-medium animate-pulse">
            Entering Gateway
          </p>
        </div>
      )}
    </div>
  );
};
