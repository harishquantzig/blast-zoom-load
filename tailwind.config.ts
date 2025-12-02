import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-float": {
          "0%, 100%": { 
            transform: "translateY(0) scale(1)",
            filter: "drop-shadow(0 0 30px hsl(180 100% 50%)) drop-shadow(0 0 60px hsl(180 100% 60%))"
          },
          "25%": { 
            transform: "translateY(-20px) scale(1.05)",
            filter: "drop-shadow(0 0 40px hsl(200 100% 50%)) drop-shadow(0 0 80px hsl(220 100% 60%))"
          },
          "50%": { 
            transform: "translateY(0) scale(1)",
            filter: "drop-shadow(0 0 30px hsl(260 100% 60%)) drop-shadow(0 0 60px hsl(280 100% 50%))"
          },
          "75%": { 
            transform: "translateY(20px) scale(0.95)",
            filter: "drop-shadow(0 0 40px hsl(320 100% 50%)) drop-shadow(0 0 80px hsl(340 100% 60%))"
          },
        },
        "color-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "25%": { filter: "hue-rotate(60deg)" },
          "50%": { filter: "hue-rotate(120deg)" },
          "75%": { filter: "hue-rotate(180deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "zoom-through-gate": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "40%": { transform: "scale(2)", opacity: "1" },
          "70%": { transform: "scale(15)", opacity: "0.8" },
          "100%": { transform: "scale(50)", opacity: "0" },
        },
        "shockwave": {
          "0%": { transform: "scale(0)", opacity: "1", borderWidth: "8px" },
          "100%": { transform: "scale(3)", opacity: "0", borderWidth: "1px" },
        },
        "particle-burst": {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "1" },
          "100%": { transform: "var(--particle-end)", opacity: "0" },
        },
        "screen-shake": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5px, -5px)" },
          "20%": { transform: "translate(5px, 5px)" },
          "30%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(5px, -5px)" },
          "50%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "70%": { transform: "translate(-2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "90%": { transform: "translate(-1px, -1px)" },
        },
        "flash": {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-float": "pulse-float 3s ease-in-out infinite",
        "color-shift": "color-shift 4s linear infinite",
        "zoom-through-gate": "zoom-through-gate 3.5s ease-in forwards",
        "shockwave": "shockwave 1.5s ease-out forwards",
        "particle-burst": "particle-burst 2s ease-out forwards",
        "screen-shake": "screen-shake 0.8s ease-out",
        "flash": "flash 1s ease-out forwards",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
