/** @type {import('tailwindcss').Config} */
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
      },
      backgroundImage: {
        'after-noon': "url('/images/bgafternoon.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        'login-custom': '10%',
      },
      minHeight: {
        'container-height': '90vh',
      },
    },
  },
  plugins: [],
};
