/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  darkMode: 'class', // important!
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};


