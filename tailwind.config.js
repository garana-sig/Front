/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        wonderland: ['Wonderland', 'sans-serif'], // Define la fuente personalizada
        soligand: ['Soligand', 'sans-serif' ],
        meditative: ['Meditative', 'sans-serif' ]
      },
    
    },
  },
  plugins: [],
}

