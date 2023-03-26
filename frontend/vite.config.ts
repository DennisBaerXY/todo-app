import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		// Uses a Proxy to target local backend
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				// remove /api
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
