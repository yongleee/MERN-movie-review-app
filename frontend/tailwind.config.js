/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Playfair: ["Playfair Display", "serif"],
        Tinos: ["Tinos", "serif"],
      },
    },
  },
  plugins: [],
};
