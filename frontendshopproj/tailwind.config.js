// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-to-orange": "linear-gradient(to right, #393E46, #D65A31)",
      },
    },
  },
  plugins: [],
};
