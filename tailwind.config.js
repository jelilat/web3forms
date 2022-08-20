/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variant: {
    visibility: ["responsive", "hover", "focus", "click", "group-hover group-click"],
  }
}
