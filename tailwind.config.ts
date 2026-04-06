import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbfd",
          100: "#d6f4fb",
          200: "#b0e8f8",
          300: "#78d6f3",
          400: "#3abce9",
          500: "#13a0d2",
          600: "#0f82af",
          700: "#12698e",
          800: "#155571",
          900: "#15475f",
          950: "#082335",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(19, 160, 210, 0.28)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.65", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
