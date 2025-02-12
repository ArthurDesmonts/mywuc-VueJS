/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': '0 50px 50px rgba(0, 0, 0, 0.45)',
      },
      colors: {
        customYellow: {
          500: 'color(display-p3 0.996 0.8 0.004)',
          600: 'color(display-p3 1 0.77 0.26)',
        },
        customOrange: {
            500: 'color(display-p3 0.98 0.51 0.23)',
            600: 'color(display-p3 0.9 0.45 0.2)',
        },
        customBlue: {
          900: 'color(display-p3 0.057 0.081 0.122)',
          800: 'color(display-p3 0.078 0.154 0.27)',
          100: 'color(display-p3 0.788 0.898 0.99)',
        },
      },
    },
  },
  plugins: [],
}

