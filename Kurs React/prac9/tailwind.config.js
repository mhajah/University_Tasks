/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hover:bg-blue-100',
    'hover:bg-yellow-100',
    'hover:bg-teal-100',
    'text-blue-500',
    'text-teal-500',
  ],

  theme: {
    extend: {},
    fontFamily: {
      'outfit': ['Outfit', 'sans-serif'],
    }
  },

  plugins: [],
}