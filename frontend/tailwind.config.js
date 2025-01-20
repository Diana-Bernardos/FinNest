/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cambridge-blue': '#90C5B0',
        'verdigris': '#67A39F',
        'ash-gray': '#CAD7D4',
        'indigo': '#155470',
        'platinum': '#DCE0DE',
      },
    },
  },
  plugins: [],
}

