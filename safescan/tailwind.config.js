/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        modalHover: "#2C3E54",
      },
      fontFamily: {
        gantari: ['Gantari', 'sans-serif'],
        arialRounded: ['"Arial Rounded MT Bold"', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
