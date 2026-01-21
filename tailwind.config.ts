import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          blue: '#00ffff',
          green: '#00ff00',
          orange: '#ff6600',
          yellow: '#ffff00',
        },
        retro: {
          black: '#0a0a0a',
          dark: '#1a1a2e',
          purple: '#16213e',
          blue: '#0f3460',
          accent: '#e94560',
        },
        garage: {
          metal: '#2d3436',
          chrome: '#dfe6e9',
          rust: '#d63031',
          oil: '#2d3436',
        },
      },
      fontFamily: {
        racing: ['var(--font-racing)', 'sans-serif'],
        digital: ['var(--font-digital)', 'monospace'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'race-stripe': 'race-stripe 1s linear infinite',
        'garage-open': 'garage-open 0.5s ease-out',
        'turbo-spin': 'turbo-spin 0.5s ease-out',
        'unlock-glow': 'unlock-glow 1s ease-in-out',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        'race-stripe': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 0' },
        },
        'garage-open': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'turbo-spin': {
          '0%': { transform: 'rotate(0deg) scale(0.8)', opacity: '0' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '1' },
        },
        'unlock-glow': {
          '0%': { boxShadow: '0 0 5px #ff00ff' },
          '50%': { boxShadow: '0 0 30px #ff00ff, 0 0 60px #00ffff' },
          '100%': { boxShadow: '0 0 5px #ff00ff' },
        },
      },
      backgroundImage: {
        'racing-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'neon-gradient': 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)',
        'chrome-gradient': 'linear-gradient(180deg, #f5f5f5 0%, #c0c0c0 50%, #a0a0a0 100%)',
      },
    },
  },
  plugins: [],
}
export default config
