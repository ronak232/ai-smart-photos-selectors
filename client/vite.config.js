import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/PostPal-Intelligent-Photo-Selector/",
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    cors: {
      origin: "https://ronak232.github.io/PostPal-Intelligent-Photo-Selector",
      credentials: true,
    },
  },
});
