/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0f172a",
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
          glow: "rgba(59, 130, 246, 0.5)",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          dark: "#6d28d9",
          glow: "rgba(139, 92, 246, 0.5)",
        },
        accent: {
          cyan: "#22d3ee",
          emerald: "#10b981",
          rose: "#f43f5e",
          amber: "#f59e0b",
        },
        danger: "#ef4444",
        warning: "#f59e0b",
        success: "#10b981",
        info: "#06b6d4",
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'cyber-gradient': 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
