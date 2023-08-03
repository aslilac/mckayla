export = {
	extends: ["plugin:@mckayla/ts", "plugin:react/recommended"],
	settings: { react: { version: "detect" } },
	rules: {
		"class-methods-use-this": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
	},
} satisfies ESLint.Config;
