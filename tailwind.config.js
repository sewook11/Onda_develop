module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ["1.25rem", "1.5rem"], // 20px / 24px
        sm: ["1.5rem", "1.75rem"], // 24px / 28px
        md: ["1.75rem", "2rem"], // 28px / 32px
        lg: ["2rem", "2.25rem"], // 32px / 36px
        xl: ["2.25rem", "2.5rem"], // 36px / 40px
        "2xl": ["2.5rem", "2.75rem"], // 40px / 44px
        "3xl": ["2.75rem", "3rem"], // 44px / 48px
      },
      colors: {
        main: "#333333",

        primary: {
          DEFAULT: "#FFB347",
          light: "#FFC97C",
          deep: "#F69306",
        },

        // Sub Colors
        "sub-green": "#7FB77E",
        "sub-blue": "#B3CDE0",

        // Accent Colors
        "accent-red": "#FF4B4A",
        "accent-blue": "#2D60FF",
        "accent-main": "#F26B38",
        "accent-purple": "#476CFF",

        // Gray Scale
        "gray-800": "#222222",
        "gray-700": "#555555",
        "gray-600": "#888888",
        "gray-500": "#C3C3C3",
        "gray-400": "#DEDEDE",
        "gray-300": "#E8E9EF",
        "gray-200": "#F5F7FA",
        "gray-100": "#FAFBFC",
      },
      fontFamily: {
        sans: ["Noto Sans Korean", "sans-serif"],
      },
    },
  },
  plugins: [],
};
