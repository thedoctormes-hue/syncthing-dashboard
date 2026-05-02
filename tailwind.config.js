/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0f',
        emerald: '#00FFFF',
        pink: '#FF00FF',
        success: '#00FF00',
        warning: '#FFFF00',
        gray: {
          300: '#d1d5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
        }
      }
    }
  },
  plugins: []
}