/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins_extralight: ["poppins-extralight"],
        poppins_light: ["poppins-light"],
        poppins_regular: ["poppins-regular"],
        poppins_medium: ["poppins-medium"],
      },
      colors: {
        custom_orange: "#ff6321",
      },
    },
  },
  plugins: [],
};
