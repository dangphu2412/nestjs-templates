// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    variables: {
      'header-height': '12rem',
      'footer-height': '6rem'
    },
    colors: {
      success: colors.green['500'],
      primary: '#cb0c9f',
      disable: colors.gray['500'],
      white: '#ffffff',
      black: '#000000'
    }
  },
  plugins: []
};
