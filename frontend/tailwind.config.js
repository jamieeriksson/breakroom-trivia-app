const { faBalanceScale } = require("@fortawesome/free-solid-svg-icons");

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
        medium: "#D7D7E9",
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
      filter: {
        // defaults to {}
        none: "none",
        grayscale: "grayscale(1)",
        invert: "invert(1)",
        sepia: "sepia(1)",
      },
      backdropFilter: {
        // defaults to {}
        none: "none",
        blur: "blur(20px)",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        cursive: ["Architects Daughter", "cursive"],
        capital: ["Bebas Neue", "cursive"],
      },
      borderRadius: {
        xl: "25px",
      },
      keyframes: {
        roundtime: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        grow: {
          "0%": { opacity: 0 },
          "50%": { opacity: "5%" },
          "100%": { opacity: 0, transform: "scale(1, 1)" },
        },
        twist: {
          "0%": { transform: "rotate(12deg)" },
          "50%": { transform: "rotate(-12deg)" },
          "100%": { transform: "rotate(12deg)" },
        },
      },
      animation: {
        timer: "roundtime 90s steps(1000, end) forwards",
        "grow-early": "grow 30s -5s backwards infinite",
        "grow-normal": "grow 30s -2s backwards infinite",
        "grow-less-delayed": "grow 30s 5s backwards infinite",
        "grow-delayed": "grow 30s 7s backwards infinite",
        twist: "twist 2s infinite",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
      },
      inset: {
        1: "1%",
        2: "2%",
        5: "5%",
        6: "6%",
        8: "8%",
        10: "10%",
        12: "12%",
        16: "16%",
        24: "24%",
        "1/2": "50%",
        "-1": "-1%",
        "-2": "-2%",
        "-5": "-5%",
        "-6": "-6%",
        "-8": "-8%",
        "-10": "-10%",
        "-12": "-12%",
      },
      rotate: {
        "-25": "-25deg",
        "-7": "-7deg",
        "-12": "-12deg",
        "-15": "-15deg",
        12: "12deg",
        15: "15deg",
        7: "7deg",
        25: "25deg",
      },
    },
  },
  variants: {
    filter: ["responsive"], // defaults to ['responsive']
    backdropFilter: ["responsive"], // defaults to ['responsive']
  },
  plugins: [require("tailwindcss-filters"), require("tailwind-scrollbar")],
};
