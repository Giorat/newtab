module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ["./public/**/*.html", "./src/**/*.tsx", "./src/**/*.jsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
