import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  darkMode: 'class',
  theme: {
    hljs: {
      theme: 'github-dark',
    },
    screens: {
      md: '767px',
      lg: '1056px',
      xl: '1440px',
      '2xl': '1919px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-highlightjs'),
  ],
};
export default config;
