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
  const [phase, setPhase] = useState<"loading" | "exploding" | "done">("loading");
  const [showFlash, setShowFlash] = useState(false);

  const particles = useMemo(() => {
    const colors = [
      "hsl(185, 100%, 50%)",
      "hsl(199, 100%, 50%)",
      "hsl(210, 100%, 60%)",
      "hsl(220, 100%, 70%)",
      "hsl(180, 100%, 60%)",
    ];
    
    return Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * 360;
      const distance = 150 + Math.random() * 300;
      return {
        id: i,
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        size: 4 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      };
    });
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPhase("exploding");
      setShowFlash(true);
    }, 3500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (phase === "exploding") {
      const flashTimer = setTimeout(() => setShowFlash(false), 1000);
      const doneTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 4000);

      return () => {
        clearTimeout(flashTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        phase === "exploding" ? "animate-screen-shake" : ""
      }`}
    >
      {/* Background image */}
      <img 
        src={background} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Radial glow behind logo */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(199, 100%, 50%) 0%, transparent 70%)",
        }}
      />

      {/* Flash overlay */}
      {showFlash && (
        <div className="absolute inset-0 bg-accent animate-flash" />
      )}

      {/* Shockwave rings */}
      {phase === "exploding" && (
        <>
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-primary animate-shockwave"
            style={{ animationDelay: "0s" }}
          />
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-accent animate-shockwave"
            style={{ animationDelay: "0.15s" }}
          />
          <div 
            className="absolute w-[200px] h-[200px] rounded-full border-primary/50 animate-shockwave"
            style={{ animationDelay: "0.3s" }}
          />
        </>
      )}

      {/* Particles */}
      {phase === "exploding" && particles.map((particle) => (
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

      {/* Main logo */}
      <div
        className={`relative z-10 transition-all duration-300 ${
          phase === "loading" 
            ? "animate-pulse-glow" 
            : phase === "exploding" 
              ? "animate-explosion-zoom" 
              : "opacity-0"
        }`}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-48 h-auto md:w-64"
        />
      </div>

      {/* Loading text */}
      {phase === "loading" && (
        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                style={{
                  animation: "pulse-glow 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm tracking-widest uppercase font-medium">
            Initializing
          </p>
        </div>
      )}
    </div>
  );
};
