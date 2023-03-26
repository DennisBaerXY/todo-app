/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	plugins: [require("daisyui")],

	daisyui: {
		prefix: "",
		themes: ["bumblebee", "dark", "cupcake"],
		darkTheme: "dark",
	},
};
