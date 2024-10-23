/** @type {import("tailwindcss").Config} */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'font-codeblock': ['var(--font-jetbrains-mono)'],
      },
      screens: {
        'max-lg': {'max': '970px'},
        'max-md': {'max': '614px'},
        'max-sm': {'max': '364px'},
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
    typography({ target: 'modern' }),
    plugin(({ addUtilities, theme }) => addUtilities({
      '.color-primary': {
        color: theme('colors.zinc.900'),
        '@media (prefers-color-scheme: dark)': {
          color: theme('colors.zinc.100'),
        },
      },
      '.color-secondary': {
        color: theme('colors.zinc.600'),
        '@media (prefers-color-scheme: dark)': {
          color: theme('colors.zinc.400'),
        },
      },
      '.color-tertiary': {
        color: theme('colors.zinc.600'),
        '@media (prefers-color-scheme: dark)': {
          color: theme('colors.zinc.500'),
        },
      },
      '.bg-primary': {
        backgroundColor: theme('colors.zinc.900'),
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: theme('colors.zinc.100'),
        },
      },
      '.bg-secondary': {
        backgroundColor: theme('colors.zinc.600'),
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: theme('colors.zinc.400'),
        },
      },
      '.bg-tertiary': {
        backgroundColor: theme('colors.zinc.600'),
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: theme('colors.zinc.500'),
        },
      },
    })),
  ]
};

export default config;
