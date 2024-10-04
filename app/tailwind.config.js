/**
 * @type {import('tailwindcss').Config}
 * */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html, tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'serif': 'Helvetica, Arial, serif',
      'mono': ['ui-monospace', 'SFMono-Regular' ],
      'display': ['Oswald', 'ui-rounded' ],
      'body': ['"Open Sans"' ],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

