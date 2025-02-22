import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          background: "#0A192F",
          card: "#112240",
          text: "#CCD6F6",
          secondary: "#8892B0",
          accent: "#64FFDA",
        },
        oceanic: {
          background: "#1B1D2A",
          card: "#232635",
          text: "#E0E4F5",
          secondary: "#AAB2D5",
          accent: "#4FB3D8",
        },
        cosmic: {
          background: "#D1E8FF",
          text: "#10151E",
          primary: "#8FA1C4",
          card: "#1C2431",
          accent: "#00A8E8",
        },
        inkpaper: {
          background: "#121821",
          card: "#1A1E27",
          text: "#F5F5F5",
          secondary: "#C0C7D1",
          accent: "#6CA0DC",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
