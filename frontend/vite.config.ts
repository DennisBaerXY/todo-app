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
	},
});
