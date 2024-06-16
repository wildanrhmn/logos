import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ABBC86',
        secondary: '#467048',
        tertiary: '#FFB71D',
        logo: '#2EC76F',
        border: {
          DEFAULT: '#D9D9D9',
          dark: '#9D9D9D',
          light: '#EEEEEE',
        }
      },
      boxShadow: {
        'loginform': '5px 8px 4px 0px #00000066'
      }
    },
  },
  plugins: [],
};
export default config;
