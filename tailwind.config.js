/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			screens: {
				"-2xl": { max: "1535px" },
				// => @media (max-width: 1536px) { ... }
				"-xl": { max: "1279px" },
				// => @media (max-width: 1279px) { ... }
				"-lg": { max: "1023px" },
				// => @media (max-width: 1023px) { ... }
				"-md": { max: "768px" },
				// => @media (max-width: 769px) { ... }
				"-sm": { max: "639px" },
				// => @media (max-width: 639px) { ... }
				tablet: { min: "639px", max: "1023px" },
				// => @media (width: > 639 <= 1023) { ... }
			},
			animation: {
				"rotate-left-right": "rotate-left-right 2s infinite linear",
			},
			keyframes: {
				"rotate-left-right": {
					"0%, 100%": { rotate: "-45deg" },
					"50%": { rotate: "0deg" },
				},
			},
		},
	},
	plugins: [],
}
