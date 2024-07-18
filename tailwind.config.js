/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mouseMemoirs: ["mouseMemoirs", "sans-serif"],
      },
      colors: {
        blue: {
          1: "#001479",
          2: "#2463FF",
          3: "#261676",
          4: "#5DA9EF",
        },
        purple: {
          1: "#483EFF",
          2: "#887DC0",
        },
      },
    },
  },
  plugins: [],
};