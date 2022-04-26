module.exports = {
  mode: "JIT",
  darkMode: "class",
  // purge: {
  //   content: ["./public/**/*.html", "./src/**/*.{astro,js,ts}"],
  //   safelist: ["dark"],
  // },
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
