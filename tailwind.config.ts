import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'codeblock': ['var(--font-jetbrains-mono)'],
      },
      screens: {
        'max-xl': {'max': '1440px'},
        'min-xl': {'min': '1441px'},
        'max-lg': {'max': '970px'},
        'min-lg': {'min': '971px'},
        'max-md': {'max': '614px'},
        'min-md': {'min': '615px'},
        'max-sm': {'max': '364px'},
        'min-sm': {'min': '365px'},
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      container: (theme) => ({
        center: true,
        screens : {
          'custom-lg' : '970px'
        },
      }),
      fontSize: {
        'header-lg': 'clamp(3rem, 7.5vw, 4.5rem)',
        'header-md': 'clamp(1rem, 2vw, 1.25rem)',
      },
      width: {
        '2/3': '66.6666%',
        '3/5': '60%'
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography({ target: 'modern' }),
    plugin(({ addVariant, addUtilities, theme }) => {
      /** dark mode */
      addVariant('dark', ['[data-theme="dark"] &', '.dark &']);
      /** inline code */
      addVariant('not-in-pre', '&:not(pre *)');

      /** animated underline */
      addUtilities({
        '.animated-underline': {
          'background-image': `linear-gradient(to right, transparent, transparent), linear-gradient(to right, ${theme('colors.zinc.900')}, ${theme('colors.zinc.900')}, ${theme('colors.zinc.900')})`,
          'background-size': '100% 0.1em, 0 0.1em',
          'background-position': '100% 100%, 0 100%',
          'background-repeat': 'no-repeat',
          'transition': 'background-size 300ms',
          '.dark &': {
            'background-image': `linear-gradient(to right, transparent, transparent), linear-gradient(to right, ${theme('colors.zinc.100')}, ${theme('colors.zinc.100')}, ${theme('colors.zinc.100')})`,
          }
        },
        '.animated-underline:hover, .animated-underline:focus': {
          'background-size': '0 0.1em, 100% 0.1em',
        },
      });

      /** color palette */
      addUtilities({
        '.color-primary': {
          color: theme('colors.zinc.900'),
          '.dark &': {
            color: theme('colors.zinc.100'),
          },
        },
        '.color-secondary': {
          color: theme('colors.zinc.500'),
          '.dark &': {
            color: theme('colors.zinc.400'),
          },
        },
        '.color-tertiary': {
          color: theme('colors.zinc.400'),
          '.dark &': {
            color: theme('colors.zinc.500'),
          },
        },
        '.bg-primary': {
          backgroundColor: theme('colors.zinc.100'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.900'),
          },
        },
        '.bg-secondary': {
          backgroundColor: theme('colors.zinc.400'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.600'),
          },
        },
        '.bg-tertiary': {
          backgroundColor: theme('colors.zinc.600'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.500'),
          },
        },
        '.bg-inactive': {
          backgroundColor: theme('colors.zinc.200'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.800'),
          },
        },
        '.border-base': {
          borderColor: theme('colors.zinc.300'),
          '.dark &': {
            borderColor: theme('colors.zinc.700'),
          },
        },
        '.color-invert': {
          color: theme('colors.zinc.100'),
          '.dark &': {
            color: theme('colors.zinc.900'),
          },
        },
        '.bg-invert': { 
          backgroundColor: theme('colors.zinc.900'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.100'),
          },
        },
      });
    }),
  ]
};

export default config;
