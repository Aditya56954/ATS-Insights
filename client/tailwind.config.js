/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        ledger: "#EFEBE1",
        ink: "#1F2421",
        inkfade: "#5B6660",
        rule: "#D8D3C7",
        signal: "#C98A2C",
        signalDark: "#A8701E",
        pass: "#2F6F4E",
        fail: "#B8463A",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
