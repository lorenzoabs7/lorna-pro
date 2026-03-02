/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#220607',
          'surface-light': '#E0D8D2',
          'bg-light': '#E6DED8',
          'text-primary-light': '#1A1A1A',
          'text-secondary-light': '#6B7280',
          'technical-accent-light': '#3A6EA5',
          'positive-signal-light': '#2E7D6B',
          'bg-dark': '#0E0B0C',
          'surface-dark': '#161112',
          'text-primary-dark': '#E6DED8',
          'text-secondary-dark': '#B8B0AB',
          'technical-accent-dark': '#4A82BC',
          'positive-signal-dark': '#3E9A85',
          'critical-emphasis': '#7A1C20'
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['IBM Plex Serif', 'serif'],
        mono: ['IBM Plex Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontFamily: theme('fontFamily.sans'),
            color: theme('colors.brand["text-primary-light"]'),
            h1: {
              color: theme('colors.brand["text-primary-light"]'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.serif')
            },
            h2: { color: theme('colors.brand["text-primary-light"]'), fontWeight: '600' },
            h3: { color: theme('colors.brand["text-primary-light"]'), fontWeight: '600' },
            h4: { color: theme('colors.brand["text-primary-light"]'), fontWeight: '600' },
            strong: { color: theme('colors.brand["text-primary-light"]'), fontWeight: '600' },
            a: {
              color: theme('colors.brand["technical-accent-light"]'),
              textDecoration: 'none'
            },
            'a:hover': { color: theme('colors.brand.primary'), textDecoration: 'underline' },
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.brand["bg-light"]'),
              color: theme('colors.brand["text-primary-light"]'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme('colors.brand["bg-dark"]'),
              color: theme('colors.brand["text-primary-dark"]'),
              fontFamily: theme('fontFamily.mono')
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.brand["text-primary-dark"]'),
            h1: { color: theme('colors.brand["text-primary-dark"]') },
            h2: { color: theme('colors.brand["text-primary-dark"]') },
            h3: { color: theme('colors.brand["text-primary-dark"]') },
            h4: { color: theme('colors.brand["text-primary-dark"]') },
            strong: { color: theme('colors.brand["text-primary-dark"]') },
            a: { color: theme('colors.brand["technical-accent-dark"]') },
            'a:hover': { color: theme('colors.brand.primary') },
            code: {
              backgroundColor: theme('colors.brand["surface-dark"]'),
              color: theme('colors.brand["text-primary-dark"]')
            },
            pre: {
              backgroundColor: theme('colors.brand["surface-dark"]'),
              color: theme('colors.brand["text-primary-dark"]')
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}