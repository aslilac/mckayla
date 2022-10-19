export default {
	extends: [
		"plugin:@mckayla/ts",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/strict",
	],
	settings: { react: { version: "detect" } },
	rules: {
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": "off",
	},
} as ESLint.Config;
