/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← Includes .ts and .tsx files
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        primary: '#d1fae5',
        secondary: '#10b981',
        accent: '#ffbf93',
      },
    },
  },
  plugins: [],
}