module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 3px 16px 5px rgba(125,125,125,0.6)',
        'stylish': '0px 5px 20px 1px rgba(125,125,125,0.6)'
      },
      screens: {
        '3xl': '1700px',
      },
      colors: {
        'main': '#0f172a',
        'secondary': '#F5BE3A',
        'third': '#242526',
        'beige': '#fdf4e3',
        'ciel': '#c1d8f0'
      }
    },
  },
  plugins: [],
}
