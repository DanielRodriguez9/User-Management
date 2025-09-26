/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2AABEE", // azul tipo Telegram
          dark: "#1c8ab7",
        },
        neutral: {
          dark: "#1E1E1E", // fondo oscuro
          light: "#2C2C2C", // tarjetas
        },
        danger: "#DC3545", // rojo para errores
      },
    },
  },
  plugins: [],
};
