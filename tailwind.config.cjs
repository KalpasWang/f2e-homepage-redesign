/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans TC"', "sans-serif"],
      monument: ['"Monument Extended"', "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      pilot: ['"Pilot Command Italic"', "sans-serif"],
    },
    colors: {
      "neutral-1": "#ffffff",
      "neutral-2": "#858993",
      "neutral-3": "#151f3f",
      "neutral-4": "#0e1835",
      "neutral-5": "#06102b",
      "primary-1": "#9da4ff",
      "primary-2": "#dcdeff",
      "primary-3": "#6e77e9",
      "green-1": "#55ffad",
      "yellow-1": "#ffe34e",
      "yellow-2": "#fff385",
      "gradient-a1": "#9da4ff",
      "gradient-a2": "#6e77e9",
      "gradient-b1": "#9da4ff",
      "gradient-b2": "#55ffad",
      "gradient-c1": "#313a65",
      "gradient-c2": "#6e77e9",
    },
    boxShadow: {
      DEFAULT: "0 0 10px 0 rgb(0 0 0 / 0.6)",
    },
    fontSize: {
      xs: [
        "0.75rem", // 12px
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem", // 14px
        {
          lineHeight: "1.125rem",
        },
      ],
      base: [
        "1rem", // 16px
        {
          lineHeight: "1.25rem",
        },
      ],
      lg: [
        "1.25rem", // 20px
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.5rem", // 24px
        {
          lineHeight: "2.25rem",
        },
      ],
      "2xl": [
        "2rem", // 32px
        {
          lineHeight: "3rem",
        },
      ],
      "3xl": [
        "2.5rem", // 40px
        {
          lineHeight: "3.75rem",
        },
      ],
      "3xl": [
        "3rem", // 48px
        {
          lineHeight: "4.5rem",
        },
      ],
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      padding: {
        15: "3.75rem", // 60px
        25: "6.25rem", // 100px
        30: "7.5rem", // 120px
      },
      margin: {
        15: "3.75rem", // 60px
        25: "6.25rem", // 100px
        30: "7.5rem", // 120px
      },
      height: {
        "2px": "2px",
      },
      letterSpacing: {
        20: "0.2rem",
        80: "0.8rem",
      },
      rotate: {
        16.6: "16.6deg",
        20: "20deg",
      },
    },
  },
  plugins: [],
};
