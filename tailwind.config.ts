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
        "portal-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "0.5",
          },
          "50%": { 
            transform: "scale(1.1)",
            opacity: "0.8",
          },
        },
        "portal-core": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "0.3",
          },
          "50%": { 
            transform: "scale(1.15)",
            opacity: "0.6",
          },
        },
        "logo-brighten": {
          "0%": { 
            opacity: "0.3",
            transform: "scale(0.95)",
          },
          "50%": { 
            opacity: "0.7",
            transform: "scale(1)",
          },
          "100%": { 
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "logo-zoom-in": {
          "0%": { 
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": { 
            transform: "scale(3)",
            opacity: "0.8",
          },
          "100%": { 
            transform: "scale(20)",
            opacity: "0",
          },
        },
        "star-blast": {
          "0%": { 
            opacity: "0",
            height: "2px",
          },
          "15%": { 
            opacity: "1",
            height: "4px",
          },
          "50%": {
            opacity: "1",
            height: "80px",
          },
          "100%": { 
            opacity: "0",
            height: "150px",
            transform: "rotate(var(--angle)) translateY(-600px)",
          },
        },
        "tunnel-zoom": {
          "0%": { 
            transform: "scale(0.5)",
            opacity: "0",
          },
          "30%": { 
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": { 
            transform: "scale(3)",
            opacity: "0",
          },
        },
        "portal-flash": {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "pulse-float": {
          "0%, 100%": { 
            transform: "translateY(0) scale(1)",
            opacity: "0.6",
          },
          "50%": { 
            transform: "translateY(-5px) scale(1.1)",
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "portal-pulse": "portal-pulse 2s ease-in-out infinite",
        "portal-core": "portal-core 2.5s ease-in-out infinite",
        "logo-brighten": "logo-brighten 2.5s ease-out forwards",
        "logo-zoom-in": "logo-zoom-in 2s ease-in forwards",
        "star-blast": "star-blast 0.6s ease-out forwards",
        "tunnel-zoom": "tunnel-zoom 2s ease-out forwards",
        "portal-flash": "portal-flash 0.2s ease-out forwards",
        "pulse-float": "pulse-float 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
