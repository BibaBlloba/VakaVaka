/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 20s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        "hero-pattern": "url('assets/blue_bg.png')",
      },
      screens: {
        sm: "480px",
      },
      fontFamily: {
        mainFont: ['"Montserrat"', "sans-serif"],
        h1Font: ['"Rubik"', "sans-serif"],
      },
    },
    plugins: [],
  },
};
