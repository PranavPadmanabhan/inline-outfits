/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        lightGray: "rgba(0,0,0,0.6)",
        lightRed: "#FF000080",
        thin_border: 'rgba(0, 0, 0, 0.2)'
      },
      fontFamily: {
        MuseoModerno: ['MuseoModerno']
      },
      boxShadow: {
        ds: "0px 0px 210px 68px rgba(255,255,255,1)",
        modal_header: "0px 0px 36px rgba(0, 0, 0, 0.25)"
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-500px 0",
          },
          "100%": {
            backgroundPosition: "500px 0",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(90deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "75%": {
            transform: "rotate(270deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
        rotate: "rotate 1.3s linear infinite",
      },
    },


  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
