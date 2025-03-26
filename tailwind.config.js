/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  prefix: "ptn-",
  content: ["./index.html", "./test.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        border: "hsl(var(--border))",

        nps_accent_1: "hsl(var(--nps-accent-1))",
        nps_accent_2: "hsl(var(--nps-accent-2))",
        nps_card: "hsl(var(--nps-card))",
        nps_bubble: "hsl(var(--nps-bubble))",
        nps_text_muted: "hsl(var(--nps-text-muted))",

        esignpro_accent_1: "hsl(var(--esignpro-accent-1))",
        esignpro_accent_2: "hsl(var(--esignpro-accent-2))",
        esignpro_card: "hsl(var(--esignpro-card))",
        esignpro_text_muted: "hsl(var(--esignpro-text-muted))",

        proteanplus_accent_1: "hsl(var(--proteanplus-accent-1))",
        proteanplus_accent_2: "hsl(var(--proteanplus-accent-2))",
        proteanplus_card: "hsl(var(--proteanplus-card))",
        proteanplus_text_muted: "hsl(var(--proteanplus-text-muted))",

        proteanx_accent_1: "hsl(var(--proteanx-accent-1))",
        proteanx_accent_2: "hsl(var(--proteanx-accent-2))",
        proteanx_card: "hsl(var(--proteanx-card))",
        proteanx_text_muted: "hsl(var(--proteanx-text-muted))",
      },
      animation: {
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "text-slide":
          "text-slide 17.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "text-slide": {
          "0%, 11.43%": {
            transform: "translateY(0%)",
          },
          "14.28%, 25.71%": {
            transform: "translateY(-13.5%)",
          },
          "28.57%, 40%": {
            transform: "translateY(-28%)",
          },
          "42.85%, 54.28%": {
            transform: "translateY(-43%)",
          },
          "57.14%, 68.57%": {
            transform: "translateY(-57%)",
          },
          "71.42%, 82.85%": {
            transform: "translateY(-72%)",
          },
          "85.71%, 97.14%": {
            transform: "translateY(-87%)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
