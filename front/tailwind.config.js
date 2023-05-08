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
        'custom-gray': 'rgba(158, 155, 155, 0.87)',
      },
      backgroundImage: {
        'after-noon': "url('/images/bgafternoon.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
        'container-height2': '80vh',
      },
      backgroundColor: {
        'board-color': 'rgba(255, 255, 255, 0.73)',
      },
      borderColor: {
        'custom-gray': 'rgba(158, 155, 155, 0.37)',
      },
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
