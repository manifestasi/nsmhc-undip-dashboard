import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B97345",
        secondary: "#F2A263",
        success: "#00A846",
        'brown-extreme-dark': "#2C2C2C",
        'brown-very-dark': "#8D4D24",
        'brown-darker': "#454545",
        'brown-lighter': "#FFF4E2",
        'brown-light': "#FFECCE",
        'white': "#FFFFFF",
        'white-dark': "#F4F4F4",
        'blue': "#609FF1",
      },
    },
  },

  plugins: [heroui()],

} satisfies Config;
