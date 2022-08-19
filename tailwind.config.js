/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        l_green: '#069255',    // xanh lục
        l_green_light: '#5EB891', //xanh lục nhạt
        l_cyan: '#28A745',     // xanh lá mạ
        l_grey: '#EFEFEF',     // xám nhạt
        l_gray: '#AAAAAA',     // xám đậm
        l_orange: '#FFC634',   // cam
        l_red: '#DC3545',      // đỏ
      }
    },
  },
  plugins: [],
  important: true,
}
