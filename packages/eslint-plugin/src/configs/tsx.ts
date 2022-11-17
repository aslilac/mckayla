export default {
	extends: ["plugin:@mckayla/ts", "plugin:react/recommended"],
	settings: { react: { version: "detect" } },
	rules: {
		"class-methods-use-this": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
	},
} as ESLint.Config;
