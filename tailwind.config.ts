/** @type {import("tailwindcss").Config} */
import type { Config } from "tailwindcss";
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
      screens: {
        'max-lg': {'max': '970px'},
        'max-md': {'max': '614px'},
        'max-sm': {'max': '364px'},
      },
      container: (theme) => ({
        center: true,
        padding: '1rem',
        screens : {
          'custom-lg' : '970px'
        },
      }),
      spacing: {
        '252': '252px'
      },
      width: {
        '2/3': '66.6666%',
        '3/5': '60%'
      },
    },
  },
  plugins: [
    typography({ target: 'modern' }),
  ]
};

export default config;
