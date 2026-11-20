export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Palette drawn from the AMAYAS roundel: the dusty-rose disc, the
         * near-black wordmark and the warm ivory of the collection photography.
         * Deep wine replaces pink as the primary action colour so the
         * storefront feels like an evening-wear atelier rather than a beauty bar.
         */
        brand: {
          50: '#FCF6F4',
          100: '#F7E9E7',
          200: '#EFD5D3',
          300: '#E0B6B8',
          400: '#C98B9A', // sampled from the logo disc
          500: '#B06B7C',
          600: '#7C2D3F', // primary CTA (8.1:1 on white)
          700: '#652334',
          800: '#4E1A28',
          900: '#37111B',
          950: '#230A11',
        },
        // Warm near-black ink for editorial copy.
        ink: '#241318',
        'ink-soft': '#7A5C64',
        // Page + section surfaces.
        cream: '#FCF9F5',
        blush: '#F8EFED',
        sand: '#F1E6DA',
        // Muted sage for in-stock / success cues.
        leaf: {
          50: '#F3F5F0',
          100: '#E6EBE2',
          500: '#6B7D62',
          600: '#55664D',
          700: '#3F4D39',
        },
        // Antique gold hairlines and small details.
        gold: {
          100: '#FBF3E2',
          200: '#F2E2BE',
          300: '#E4CB93',
          400: '#C9A464',
          500: '#B08A43',
          600: '#8E6B2F',
        },
      },
      fontFamily: {
        // High-contrast editorial serif, geometric sans, calligraphic accent.
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      boxShadow: {
        soft: '0 18px 45px -22px rgba(55, 17, 27, 0.32)',
        card: '0 2px 18px -6px rgba(36, 19, 24, 0.12)',
        glow: '0 24px 65px -30px rgba(124, 45, 63, 0.45)',
        plate: '0 30px 80px -40px rgba(35, 10, 17, 0.55)',
      },
      borderRadius: {
        blob: '0.9rem',
        arch: '46% 46% 0.9rem 0.9rem',
      },
      letterSpacing: {
        luxe: '0.28em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.07) translateY(-1.5%)' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.45s ease-out both',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
        kenburns: 'kenburns 7s ease-out both',
        'line-grow': 'line-grow 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
