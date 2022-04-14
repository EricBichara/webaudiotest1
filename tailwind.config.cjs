const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	// add daisyUI plugin
	plugins: [require("daisyui")],

	// daisyUI config (optional)
	daisyui: {
		themes: ["synthwave"],
	},
};

module.exports = config;
