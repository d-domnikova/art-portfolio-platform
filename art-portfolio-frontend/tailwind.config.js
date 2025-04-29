/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'smoky' : '#0d0809',
      'bone' : "#cacab9",
      'cardinal': "#c4313b",
    },
    fontFamily: {
      'body' : ['"Noto Sans"']
    },
    extend: {
    },
  },
  plugins: [],
}