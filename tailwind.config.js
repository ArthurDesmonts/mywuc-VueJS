/** @type {import('tailwindcss').Config} */
module.exports = {
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
          100: 'color(display-p3 0.14 0.298 0.511)',
        },
        customBlack: {
          100: 'color(display-p3 0.067 0.067 0.067)',
          200: 'color(display-p3 0.098 0.098 0.098)',
        },
        customWhite: {
          100: 'color(display-p3 0.933 0.933 0.926)',
        },
        customGrey: {
          500: 'color(display-p3 0.706 0.706 0.706)',
          200: 'color(display-p3 0.707 0.7 0.735)',
        },
      },
      fontFamily: {
        customInknut: ['Inknut Antiqua', 'serif'],
        customPlayfair: ['Playfair Display', 'serif'],
        customTeko: ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

