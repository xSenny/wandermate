const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5A987D"
        },
        secondary: {
          DEFAULT: "#A1BF41",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        primary: ["primary", "sans-serif"],
        secondary: ["secondary", "sans-serif"],
        descrieri: ["descrieri", "sans-serif"],
      }
    },
  },
  plugins: [],
})