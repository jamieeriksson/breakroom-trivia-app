module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    colors: {
      red: "#CF5C36",
      blue: {
        light: "#657ED4",
        dark: "#3626A7",
      },
      green: "#26AC1B",
      black: "#0D0106",
      white: "#FBFBFF",
      transparent: "transparent",
      gray: {
        light: "#EBEBFD",
        54: "#545454",
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      cursive: ["Architects Daughter", "cursive"],
      capital: ["Bebas Neue", "cursive"],
    },
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        title: ["Fjalla One", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
