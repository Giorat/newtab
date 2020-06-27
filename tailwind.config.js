module.exports = {
  purge: {
    enabled: process.env.TAILWIND_PURGE,
    content: ['./public/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  },
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
