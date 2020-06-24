module.exports = {
  purge: {
    enabled: true,
    content: ["./public/**/*.html", "./src/**/*.tsx", "./src/**/*.jsx"],
  },
  theme: {
    extend: {
      fontSize:{
        '7xl': '5rem',
        '8xl': '6rem'
      },
    },
  },
  variants: {},
  plugins: [],
};
