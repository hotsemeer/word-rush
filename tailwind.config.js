/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,vue}'],
  theme: {
    fontFamily: {
      sans: ['Pangolin', 'sans-serif'],
      serif: ['Bungee', 'serif'],
      pangolin: ['Pangolin', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
}
