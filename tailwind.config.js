module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 3px 16px 5px rgba(125,125,125,0.6)',
        stylish: '0px 5px 20px 1px rgba(0,0,0,0.4)',
        form:
          'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        btn: 'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px',
        float: '0 8px 55px 0 rgb(0 0 0 / 16%)'
      },
      screens: {
        '3xl': '1700px'
      },
      colors: {
        main: '#0F224E',
        secondary: '#F5BE3A',
        third: '#242526',
        beige: '#F2E6DC',
        ciel: '#0098B0',
        light: '#0E5052',
        na3ne3i: '#196266',
        cool: '#22BF79',
        icy: '#44A4F4',
        trendy: '#98DBD3',
        rainy: '#B8C8DD',
        cleangray: '#F5F5F5',
        orange:'#F9BF87',
        pinky: '#F7B1A2'
      }
    }
  },
  plugins: [],
}
