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
    'bg-red-300',
    'text-teal-500',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

