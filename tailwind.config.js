const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9F9F9',
        surface: '#FFFFFF',
        'surface-alt': '#F5F5F4',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'accent-blue': '#003DA5',
        'accent-purple': '#6D28D9',
        'accent-emerald': '#5A9A80',
        'accent-amber': '#D97706',
        'accent-rose': '#E11D48',
        'border-color': '#E5E5E5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      boxShadow: {
        'card': '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px rgba(50,50,93,0.08)',
        'card-hover': '0 2px 4px rgba(15,23,42,0.08), 0 8px 24px rgba(50,50,93,0.12)',
        'slab': '0 1px 2px rgba(15,23,42,0.04), 0 2px 8px rgba(50,50,93,0.06), 0 8px 24px rgba(50,50,93,0.04)',
        'nav': '0 1px 0 rgba(15,23,42,0.04)',
        'nav-scroll': '0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(50,50,93,0.06)',
        'cta': '0 2px 4px rgba(0,61,165,0.25), 0 8px 20px rgba(0,61,165,0.2), 0 20px 48px rgba(0,61,165,0.15)',
        'cta-hover': '0 4px 8px rgba(0,61,165,0.3), 0 12px 28px rgba(0,61,165,0.25), 0 28px 56px rgba(0,61,165,0.18)',
      },
      letterSpacing: {
        'display': '-0.03em',
        'heading': '-0.02em',
        'label': '0.12em',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'ribbon-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'ribbon-shimmer': 'ribbon-shimmer 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
