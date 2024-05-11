/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,html}"
  ],
  theme: {
    extend: {
      fontFamily:{
        main: ['Inter, Arial, sans-serif'] 
      }
    },
  },
  plugins: [],
}

