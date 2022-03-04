module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    namedGroups: ["foo", "bar"],
    extend: {
      boxShadow: {
        '3xl': '0px 3px 16px 5px rgba(125,125,125,0.6)',
        'stylish': '0px 5px 20px 1px rgba(0,0,0,0.4)'
      },
      screens: {
        '3xl': '1700px',
      },
      colors: {
        'main': '#0F224E',
        'secondary': '#F5BE3A',
        'third': '#242526',
        'beige': '#fdf4e3',
        'ciel': '#0098B0',
        'light': '#005832',
        'na3ne3i': '#059669',
        'cool': '#22BF79',
        'icy': '#44A4F4',
        'trendy': '#98DBD3'
      }
    },
  },
  plugins: [
    require("tailwindcss-named-groups"),
  ],
}
