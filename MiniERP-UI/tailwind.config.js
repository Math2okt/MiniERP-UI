/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lila: "#C5A3FF",
        lilaClaro: "#E7D5FF",
        lavanda: "#A2B9EE",
        celeste: "#89CFF0",
        menta: "#AFF8D8",
        mentaClaro: "#DFFEF3",
      },
      fontFamily: {
        arimo: ["Arimo", "sans-serif"],
      }
    },
  },
  plugins: [],
}


