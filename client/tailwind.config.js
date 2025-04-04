// tailwind.config.js
import animatePlugin from 'tailwindcss-animate';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        accent: '#facc15',
      },
      borderRadius: {
        xl: '1rem',
      },

    },
  },
  plugins: [animatePlugin],
}

