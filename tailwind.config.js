/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gBold: ["Geometria-Bold", "sans-serif"],
        gBoldItalic: ["Geometria-BoldItalic", "sans-serif"],
        gExtraBold: ["Geometria-ExtraBold", "sans-serif"],
        gExtraBoldItalic: ["Geometria-ExtraBoldItalic", "sans-serif"],
        gExtraLight: ["Geometria-ExtraLight", "sans-serif"],
        gExtraLightItalic: ["Geometria-ExtraLightItalic", "sans-serif"],
        gHeavy: ["Geometria-Heavy", "sans-serif"],
        gHeavyItalic: ["Geometria-HeavyItalic", "sans-serif"],
        gItalic: ["Geometria-Italic", "sans-serif"],
        gLight: ["Geometria-Light", "sans-serif"],
        gLightItalic: ["Geometria-LightItalic", "sans-serif"],
        gMediumItalic: ["Geometria-MediumItalic", "sans-serif"],
        gThin: ["Geometria-Thin", "sans-serif"],
        gThinItalic: ["Geometria-ThinItalic", "sans-serif"],
        gGeometria: ["Geometria", "sans-serif"],
      },
    },
  },
  plugins: [],
}

