/** @type {import("tailwindcss").Config} */
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
        'max-lg': {'max': '970px'},
        'max-md': {'max': '614px'},
        'max-sm': {'max': '364px'},
      },
      colors: {
        background: 'hsl(var(--background))',
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
      addVariant('dark', ['[data-theme="dark"] &', '.dark &']);

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
