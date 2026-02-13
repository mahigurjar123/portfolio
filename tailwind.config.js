/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        bounce: "bounce 1s infinite",
      },
    },
  },
  plugins: [],
};