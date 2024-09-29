import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const {
  default: flattenColorPalette,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seance: "#61346B",
        mediumpurple: "#9567E0",
        darkviolet: "#8800C7",
        mediumorchid: "#A44CD3",
        plum: "#E090DF",
        lavenderpink: "#FBBEDE",
        razzmatazz: "#D90077",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  // eslint-disable-next-line prefer-const
  let allColors = flattenColorPalette(theme("colors"));
  // eslint-disable-next-line prefer-const
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config;

