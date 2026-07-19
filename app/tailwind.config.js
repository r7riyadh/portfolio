/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        "ink-black": { "50": "#ebf2f9", "100": "#d8e5f3", "200": "#b1cbe7", "300": "#8ab1db", "400": "#6397cf", "500": "#3c7dc3", "600": "#30649c", "700": "#244b75", "800": "#18324e", "900": "#0c1927", "950": "#08121b" },
        "prussian-blue": { "50": "#eef1f7", "100": "#dce3ef", "200": "#b9c6df", "300": "#96aacf", "400": "#738ebf", "500": "#5071af", "600": "#405b8c", "700": "#304469", "800": "#202d46", "900": "#101723", "950": "#0b1018" },
        "dusk-blue": { "50": "#eff2f6", "100": "#dee5ed", "200": "#bdcbdb", "300": "#9cb1c9", "400": "#7b97b7", "500": "#5b7da4", "600": "#486484", "700": "#364b63", "800": "#243242", "900": "#121921", "950": "#0d1217" },
        "dusty-denim": { "50": "#eff2f5", "100": "#e0e5eb", "200": "#c0cad8", "300": "#a1b0c4", "400": "#8296b0", "500": "#627c9d", "600": "#4f637d", "700": "#3b4a5e", "800": "#27313f", "900": "#14191f", "950": "#0e1116" },
        "alabaster-grey": { "50": "#f3f3f1", "100": "#e6e7e4", "200": "#cecfc9", "300": "#b5b7ae", "400": "#9c9f93", "500": "#838778", "600": "#696c60", "700": "#4f5148", "800": "#353630", "900": "#1a1b18", "950": "#121311" }
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}
