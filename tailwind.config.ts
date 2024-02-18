import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": "0px 0px 5px 1.2px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        primary: "#30A46C",
      },
      margin: {
        "13": "3.25rem",
      },
    },
  },
  plugins: [require("@sira-ui/tailwind")],
};
export default config;
