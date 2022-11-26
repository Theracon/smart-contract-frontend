/** @type {import('tailwindcss').Config} */
// @ts-ignore
const { join } = require("path")

module.exports = {
  // content: ["./pages/*.{html,js,jsx}", "./components/*.{html,js,jsx}"],
  content: [
    join(__dirname, "./pages/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./components/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
}
