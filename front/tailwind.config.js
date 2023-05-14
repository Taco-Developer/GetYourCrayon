/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-green': '#084227',
        'main-pink': '#EC8091',
        'main-purple': '#614F89',
        'custom-gray': 'rgba(158, 155, 155, 0.87)',
        'apple-green': '#2FC454',
        'apple-yellow': '#F3BD4D',
        'apple-red': '#EC685D',
      },
      backgroundImage: {
        'after-noon': "url('/images/bgafter.gif')",
        'even-ing': "url('/images/bgevening.gif')",
        'night-ing': "url('/images/bgnight.gif')",
      },
      spacing: {
        10: '10%',
        20: '20%',
        30: '30%',
        40: '40%',
        50: '50%',
        60: '60%',
        70: '70%',
        80: '80%',
        90: '90%',
      },
      minHeight: {
        'container-height': '90vh',
        'container-height2': '73vh',
        'board-height': '63vh',
      },
      backgroundColor: {
        'board-color': 'rgba(255, 255, 255, 0.73)',
      },
      borderColor: {
        'custom-gray': 'rgba(158, 155, 155, 0.37)',
      },
      borderRadius: {
        'profile-img': '70%',
      },
      height: {
        'profile-img': '17vw',
        'profile-menu': '7vh',
        'navbar-profile': '88px',
      },
      width: {
        'profile-img': '17vw',
        'navbar-profile': '88px',
      },
      zIndex: {
        100: 100,
      },

      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: { 'fade-in-up': 'fade-in-up 0.3s ease-out' },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-ssibal': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
