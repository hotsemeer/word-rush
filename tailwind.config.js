/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{ts,vue}'],
  theme: {
    fontFamily: {
      sans: ['Bungee', 'sans-serif'],
      serif: ['Black Ops One', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
