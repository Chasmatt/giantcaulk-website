/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Sampled from the wireframes — deep navy + steel blue + concrete grays.
        navy: {
          DEFAULT: "#132A4A",
          deep: "#0C1E38",
          soft: "#243B5D",
        },
        steel: {
          DEFAULT: "#3E6491",
          deep: "#2C4A6E",
        },
        concrete: {
          50: "#F5F6F7",
          100: "#EBEDEF",
          200: "#D6DADE",
          300: "#B4BBC4",
          400: "#8993A0",
          500: "#5F6B7A",
          600: "#3E4A5A",
        },
      },
      fontFamily: {
        // "GIANT CAULK" wordmark + "PRECISION CAULKING" hero display face.
        display: ["Bebas Neue", "Impact", "sans-serif"],
        // "LASTING PROTECTION" hero serif + About Us headings + nav.
        serif: ["Playfair Display", "Georgia", "serif"],
        // Body copy.
        body: ["IBM Plex Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
