/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cafe: {
          bg: '#0B0F19',
          card: '#121826',
          cardHover: '#182032',
          surface: '#1A2234',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#F97316',
          accentHover: '#FB923C',
          accentMuted: 'rgba(249, 115, 22, 0.15)',
          muted: '#94A3B8',
          subtle: '#64748B',
          text: '#F8FAFC',
        }
      },
      fontFamily: {
        serif: ['Lora', 'Merriweather', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['VT323', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
