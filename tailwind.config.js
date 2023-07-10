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
          SuccessPopper : "url(/svg/orderplaced.svg)",
          
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

      screens: {
        sm400: "400px",
        sm450: "450px",
        sm500: "500px",
        sm550: "550px",
        sm600: "600px",
        sm650: "650px",
        sm700: "700px",
        sm750: "750px",
        md800: "800px",
        md850: "850px",
        md900: "900px",
        md950: "950px",
        md1000: "1000px",
        md1050: "1050px",
        lg1100: "1100px",
        lg1150: "1150px",
        lg1200: "1200px",
        lg1250: "1250px",
        lg1300: "1300px",
        lg1350: "1350px",
        xl1400: "1400px",
        xl1450: "1450px",
        xl1500: "1500px",
        xl1550: "1550px",
        xl1600: "1600px",
        xl1650: "1650px",
        xl1700: "1700px",
        xl1750: "1750px",
        xl1800: "1800px",
        xl1850: "1850px",
        xl1900: "1900px",
        xl1950: "1950px",
        xl2000: "2000px",
        xl2050: "2050px",
        xl2100: "2100px",
        xl2150: "2150px",
        xl2200: "2200px",
        xl2250: "2250px",
        xl2300: "2300px",
        xl2350: "2350px",
        xl2400: "2400px",
        xl2450: "2450px",
        xl2500: "2500px",
        xl2550: "2550px",
        xl2600: "2600px",
        xl2650: "2650px",
        xl2700: "2700px",
        xl2750: "2750px",
        xl2800: "2800px",
        xl2850: "2850px",
        xl2900: "2900px",
        xl2950: "2950px",
        xl3000: "3000px",
        xl3050: "3050px",
    },
    },


  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
