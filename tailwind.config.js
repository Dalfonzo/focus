module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      colors: {
        background: '#19191B',
        white: {
          normal: '#FFFFFF',
          70: 'rgba(255,255,255,0.7)',
          20: 'rgba(255, 255, 255, 0.2)',
          10: 'rgba(255, 255, 255, 0.1)',
        },
        fuchsia: '#fe53bb',
        teal: '#09fbd3',
      },
      boxShadow: {
        hover:
          'rgb(31 47 71 / 25%) 0px 20px 40px, rgb(0 0 0 / 10%) 0px 1px 5px, rgb(255 255 255 / 40%) 0px 0px 0px 0.5px inset',
        container: 'rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset',
      },
      borderWidth: {
        lg: '1rem',
      },
    },
  },
  plugins: [require('daisyui')],
}
