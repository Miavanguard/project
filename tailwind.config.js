/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF6E9',
          100: '#F5EAC8',
          200: '#EBD695',
          300: '#E0C262',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A8842F',
          700: '#846824',
          800: '#5F4A1A',
          900: '#3B2E11',
        },
        ink: {
          50: '#F5F5F7',
          100: '#E2E2E8',
          200: '#C4C4CF',
          300: '#9A9AAB',
          400: '#6E6E82',
          500: '#4A4A5C',
          600: '#333345',
          700: '#23232F',
          800: '#1a1a1a',
          900: '#121212',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', '"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #A8842F 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #C5A059 0%, #F5EAC8 25%, #D4AF37 50%, #F5EAC8 75%, #C5A059 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #121212 0%, #0d0d0d 55%, #000000 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212,175,55,0)' },
        },
      },
    },
  },
  plugins: [],
};
