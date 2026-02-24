import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#F2398A',
          violet: '#9A33FF',
          indigo: '#3A31FF',
          blue: '#246BFF',
          cyan: '#14C7E5',
          dark: '#091426',
          light: '#F5F7FA',
          muted: '#AAB4C2'
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #F2398A 0%, #9A33FF 25%, #3A31FF 55%, #246BFF 75%, #14C7E5 100%)',
        'micro-grid': 'linear-gradient(rgba(170,180,194,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(170,180,194,.08) 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '28px 28px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
