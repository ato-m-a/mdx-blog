/** @type {import("tailwindcss").Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#333333'
      },
      screens: {
        'custom-lg' : '992px',
        'max-lg': {'max': '991px'},
        'max-md': {'max': '768px'},
        'max-sm': {'max': '480px'}
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
      }
    }
  },
};

export default config;
