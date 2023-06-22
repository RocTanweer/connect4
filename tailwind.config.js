/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple1: "#7945ff",
      purple2: "#5c2dd5",
      red: "#fd6687",
      yellow: "#ffce67",
      white: "#ffffff",
      black: {
        100: "#0000000",
        50: "#00000080",
      },
    },
    fontFamily: {
      main: ["Space Grotesk", "sans-serif"],
    },
    extend: {
      content: {
        plyrright: "url(./src/assets/plyrright.svg)",
      },
    },
  },
  plugins: [],
};
