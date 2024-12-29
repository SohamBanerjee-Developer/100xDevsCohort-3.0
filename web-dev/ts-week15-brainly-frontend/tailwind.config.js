/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          600: "rgb(80, 70, 228)",
          300: "rgb(224, 231, 255)",
          500: "rgb(92, 86, 192)"
        },
        white:{
          200: "rgb(236, 235, 254)"
        }
      }
    },
  },
  plugins: [],
}

