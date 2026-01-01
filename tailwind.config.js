/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./**/*.mdx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#F59E0B",

        light: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
        },
        dark: {
          100: "#374151",
          200: "#1F2937",
          300: "#111827",
        },
        skyBlue: "#71a6d2", // rgb(113,166,210)
        forestGreen: "#014421", // rgb(1,68,33)
        limeGreen: "#a6d271", // rgb(166,210,113)
        navy: "#210144", // rgb(33,1,68)
        pink: "#d271a6", // rgb(210,113,166)
        mellowYellow: "#F1D7AA", // rgb(241,215,170)
        mellowGreen: "#C3DCE1", // rgb(195,220,225)
        mellowRed: "#F8DACC",
        default: "#E2E2E2", // rgb(226,226,226)
      },
      fontSize: {
        xxs: "0.625rem", // 10px
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "header-primary": "3rem", // 48px
        "header-secondary": "2.25rem", // 36px
        "subheader-primary": "1.875rem", // 30px
        "subheader-secondary": "1.5rem", // 24px
        "form-value": "1.25rem", // 20px
      },
    },
  },
  plugins: [],
};
