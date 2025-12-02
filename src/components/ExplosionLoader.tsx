import { useEffect, useState, useMemo } from "react";
import logo from "@/assets/logo.png";
import background from "@/assets/background.png";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export const ExplosionLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "zooming" | "done">("loading");
  const [showFlash, setShowFlash] = useState(false);

  const particles = useMemo(() => {
    const colors = [
      "hsl(180, 100%, 50%)",
      "hsl(200, 100%, 50%)",
      "hsl(260, 100%, 60%)",
      "hsl(320, 100%, 50%)",
      "hsl(280, 100%, 60%)",
    ];
    
    return Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 50) * 360;
      const distance = 100 + Math.random() * 250;
      return {
        id: i,
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        size: 3 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
      };
    });
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPhase("zooming");
      setShowFlash(true);
    }, 4000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (phase === "zooming") {
      const flashTimer = setTimeout(() => setShowFlash(false), 800);
      const doneTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 4500);

      return () => {
        clearTimeout(flashTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        phase === "zooming" ? "animate-screen-shake" : ""
      }`}
    >
      {/* Background image */}
      <img 
        src={background} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Animated radial glow behind logo */}
      <div 
        className={`absolute w-[700px] h-[700px] rounded-full transition-all duration-1000 ${
          phase === "zooming" ? "opacity-60 scale-150" : "opacity-40"
        }`}
        style={{
          background: "radial-gradient(circle, hsl(200 100% 60% / 0.6) 0%, hsl(280 100% 50% / 0.3) 40%, transparent 70%)",
          animation: phase === "loading" ? "color-shift 4s linear infinite" : undefined,
        }}
      />

      {/* Flash overlay */}
      {showFlash && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-flash" />
      )}

      {/* Shockwave rings during zoom */}
      {phase === "zooming" && (
        <>
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-primary animate-shockwave"
            style={{ animationDelay: "0s" }}
          />
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-accent animate-shockwave"
            style={{ animationDelay: "0.2s" }}
          />
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-primary/50 animate-shockwave"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      )}

      {/* Particles burst outward during zoom */}
      {phase === "zooming" && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-particle-burst"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            "--particle-end": `translate(${particle.x}px, ${particle.y}px) scale(0)`,
            animationDelay: `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}

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
                className="w-3 h-3 rounded-full"
                style={{
                  animation: "pulse-float 1.5s ease-in-out infinite, color-shift 3s linear infinite",
                  animationDelay: `${i * 0.25}s`,
                  backgroundColor: "hsl(200, 100%, 50%)",
                  boxShadow: "0 0 15px hsl(200, 100%, 50%)",
                }}
              />
            ))}
          </div>
          <p className="text-primary text-sm tracking-widest uppercase font-medium animate-pulse">
            Entering Gateway
          </p>
        </div>
      )}
    </div>
  );
};
