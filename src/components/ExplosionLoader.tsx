import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export const ExplosionLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"glow" | "warp" | "flash" | "done">("glow");

  useEffect(() => {
    // Phase 1: Portal glow (logo brightens) - 2.5 seconds
    const glowTimer = setTimeout(() => {
      setPhase("warp");
    }, 2500);

    return () => clearTimeout(glowTimer);
  }, []);

  useEffect(() => {
    if (phase === "warp") {
      // Phase 2: Warp/hyperloop motion - 2 seconds
      const warpTimer = setTimeout(() => {
        setPhase("flash");
      }, 2000);

      return () => clearTimeout(warpTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "flash") {
      // Phase 3: Flash then done - 200ms
      const flashTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 200);

      return () => clearTimeout(flashTimer);
    }
  }, [phase, onComplete]);

  // Generate star blast lines - emanating from center like hyperspace
  const starLines = Array.from({ length: 200 }, (_, i) => {
    const angle = Math.random() * 360; // Random angles for natural star distribution
    const wave = Math.floor(i / 30); // Progressive waves
    const delay = wave * 0.25 + Math.random() * 0.15;
    const duration = 0.4 + Math.random() * 0.4;
    const length = 2 + Math.random() * 4; // Start as small dots
    const distance = 5 + Math.random() * 30; // Start close to center
    const size = 1 + Math.random() * 2; // Varying star sizes
    return { angle, delay, duration, length, distance, size, wave };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
      {/* Outer portal glow ring */}
      <div
        className={`absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full transition-all duration-1000 ${
          phase === "glow" ? "animate-portal-pulse" : ""
        } ${phase === "warp" || phase === "flash" ? "opacity-0 scale-[3]" : ""}`}
        style={{
          background: `radial-gradient(circle, 
            transparent 30%, 
            hsl(200 100% 50% / 0.1) 40%, 
            hsl(210 100% 60% / 0.3) 50%, 
            hsl(200 100% 50% / 0.1) 60%, 
            transparent 70%
          )`,
          boxShadow: phase === "glow" 
            ? "0 0 60px hsl(200 100% 50% / 0.5), 0 0 120px hsl(210 100% 60% / 0.3), inset 0 0 60px hsl(200 100% 50% / 0.2)"
            : "none",
          transition: "all 1s ease-out",
        }}
      />

      {/* Inner portal core */}
      <div
        className={`absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full transition-all duration-1000 ${
          phase === "glow" ? "animate-portal-core" : ""
        } ${phase === "warp" || phase === "flash" ? "scale-[5] opacity-0" : ""}`}
        style={{
          background: `radial-gradient(circle, 
            hsl(200 100% 70% / 0.1) 0%, 
            hsl(210 100% 50% / 0.2) 40%, 
            hsl(220 100% 40% / 0.3) 70%, 
            transparent 100%
          )`,
        }}
      />

      {/* Star blast lines - shooting outward like hyperspace stars */}
      {(phase === "warp" || phase === "flash") && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {starLines.map((star, i) => (
            <div
              key={i}
              className="absolute animate-star-blast"
              style={{
                width: `${star.size}px`,
                height: `${star.length}px`,
                background: "white",
                borderRadius: "50% 50% 50% 50% / 20% 20% 80% 80%",
                boxShadow: "0 0 4px white, 0 0 8px white",
                transform: `rotate(${star.angle}deg) translateY(-${star.distance}px)`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                transformOrigin: "center center",
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Central tunnel effect during warp */}
      {(phase === "warp" || phase === "flash") && (
        <div
          className="absolute w-full h-full animate-tunnel-zoom"
          style={{
            background: `radial-gradient(circle at center, 
              hsl(210 100% 50% / 0.8) 0%, 
              hsl(200 100% 40% / 0.5) 20%, 
              hsl(220 80% 20% / 0.3) 50%, 
              transparent 70%
            )`,
          }}
        />
      )}

      {/* Gateway logo - acts as mask/focal point */}
      <div
        className={`relative z-10 transition-all ${
          phase === "glow"
            ? "animate-logo-brighten"
            : phase === "warp"
            ? "animate-logo-zoom-in"
            : "opacity-0"
        }`}
      >
        <img
          src={logo}
          alt="Gateway Logo"
          className="w-48 h-auto md:w-64"
          style={{
            filter: phase === "glow"
              ? "drop-shadow(0 0 20px hsl(200 100% 50%)) drop-shadow(0 0 40px hsl(210 100% 60%))"
              : phase === "warp"
              ? "drop-shadow(0 0 40px hsl(200 100% 70%)) drop-shadow(0 0 80px hsl(180 100% 80%))"
              : "none",
          }}
        />
      </div>

      {/* Subtle white flash overlay */}
      {phase === "flash" && (
        <div
          className="absolute inset-0 z-20 animate-portal-flash"
          style={{
            background: "radial-gradient(circle, hsl(0 0% 100% / 0.9) 0%, hsl(0 0% 100% / 0.5) 40%, transparent 80%)",
          }}
        />
      )}

      {/* Loading text */}
      {phase === "glow" && (
        <div className="absolute bottom-20 flex flex-col items-center gap-4 z-10">
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: "hsl(200 100% 60%)",
                  boxShadow: "0 0 10px hsl(200 100% 50%)",
                  animation: "pulse-float 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>
          <p 
            className="text-sm tracking-widest uppercase font-medium animate-pulse"
            style={{ color: "hsl(200 100% 70%)" }}
          >
            Initializing Gateway
          </p>
        </div>
      )}
    </div>
  );
};
