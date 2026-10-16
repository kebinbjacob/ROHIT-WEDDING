/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          lightest: '#F6FBF8',
          light: '#E6F7F0',
          DEFAULT: '#C6EBD9',
          pastel: '#B2E2D0',
          border: '#C2DFD4',
          dark: '#73BFA2',
        },
        teal: {
          vibrant: '#0D9488',
          DEFAULT: '#0D6E63',
          dark: '#0A5C53',
          deep: '#07433D',
          darkest: '#05312C',
          forest: '#0B3B36',
        },
        spruce: {
          DEFAULT: '#1F4E47',
          muted: '#366961',
        },
        gold: {
          light: '#EEDCB8',
          DEFAULT: '#C5A880',
          rich: '#D4AF37',
          dark: '#9A7E5E',
          shimmer: '#F2E5C9'
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'mint-card': '0 20px 50px -10px rgba(10, 92, 83, 0.12), 0 10px 20px -5px rgba(10, 92, 83, 0.06)',
        'teal-glow': '0 0 25px rgba(13, 148, 136, 0.25)',
        'inner-mint': 'inset 0 0 35px rgba(178, 226, 208, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
      }
    },
  },
  plugins: [],
}
