import { useState, useCallback } from "react";
import { ExplosionLoader } from "@/components/ExplosionLoader";
import logo from "@/assets/logo.png";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <ExplosionLoader onComplete={handleLoadComplete} />}
      
      <div 
        className={`min-h-screen flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <main className="flex flex-col items-center gap-8 px-4">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <img 
              src={logo} 
              alt="Gateway Logo" 
              className="w-32 h-auto md:w-40 explosion-glow"
            />
          </div>
          
          <div 
            className="text-center space-y-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
              Gateway
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Your portal to infinite possibilities
            </p>
          </div>
          
          <div 
            className="flex gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-all hover:scale-105">
              Learn More
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
