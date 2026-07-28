import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        card: "var(--card)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          2: "var(--rule-2)",
        },
        accent: "var(--accent)",
        fail: {
          DEFAULT: "var(--fail)",
          bg: "var(--fail-bg)",
          rule: "var(--fail-rule)",
        },
        warn: {
          DEFAULT: "var(--warn)",
          bg: "var(--warn-bg)",
          rule: "var(--warn-rule)",
        },
        pass: {
          DEFAULT: "var(--pass)",
          bg: "var(--pass-bg)",
          rule: "var(--pass-rule)",
        },
        info: {
          DEFAULT: "var(--info)",
          bg: "var(--info-bg)",
          rule: "var(--info-rule)",
        },
        navy: {
          DEFAULT: "var(--navy)",
          600: "var(--navy-600)",
          900: "var(--navy-900)",
        },
        blue: {
          DEFAULT: "var(--blue)",
          50: "var(--blue-50)",
          200: "var(--blue-200)",
        },
      },
      fontFamily: {
        sans: ["var(--sans)"],
        mono: ["var(--mono)"],
      },
      spacing: {
        "rail-web": "var(--rail-web)",
        "rail-site": "var(--rail-site)",
        nav: "var(--nav)",
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      boxShadow: {
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
      },
    },
  },
  plugins: [],
};

export default config;
