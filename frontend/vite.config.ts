import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		host: true, // bind to all network interfaces
		port: parseInt(process.env.VITE_APP_PORT) || 3000,
		proxy: {
			"/api": {
				target: process.env.VITE_APP_BACKEND_URL || "http://backend:8080", // use environment variables or default value
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
