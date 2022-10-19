/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
    },

    extend: {
      fontSize: {
        e: "36pt",
        f: "48px",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        128: "32rem",
        144: "36rem",
        41: "15px",
        42: "156px",
        43: "90px",
        44: "24px",
        45: "30px",
        46: "900px",
        47: "200px",
      },
    },
  },
  plugins: [],
};
