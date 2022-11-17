export default {
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["**/build/**", "**/dist/**", "**/target/**"],
	extends: ["eslint:recommended", "prettier"],
	reportUnusedDisableDirectives: true,
	env: {
		es2020: true,
		browser: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.ts?(x)"],
			parserOptions: {
				project: "tsconfig.json",
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			rules: {
				"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-misused-promises": "off",
				"@typescript-eslint/no-namespace": "off",
				"@typescript-eslint/no-shadow": "error",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/prefer-readonly": "error",
				"@typescript-eslint/prefer-ts-expect-error": "error",
				"@typescript-eslint/restrict-template-expressions": [
					"error",
					{ allowNumber: true, allowBoolean: true },
				],
				"@typescript-eslint/strict-boolean-expressions": "off",
				"no-promise-executor-return": "off",
				"no-shadow": "off",
			},
		},
		{
			files: ["__tests__/**/*.*", "*.spec.*", "*.test.*"],
			extends: ["plugin:jest/recommended"],
			env: { "jest/globals": true },
		},
	],
	rules: {
		"eqeqeq": ["error", "always", { null: "ignore" }],
		"no-alert": "error",
		"no-console": "error",
		"no-constructor-return": "error",
		"no-lonely-if": "error",
		"no-promise-executor-return": "error",
		"no-shadow": "error",
		"no-template-curly-in-string": "error",
		"no-unreachable-loop": "error",
		"no-warning-comments": [
			"error",
			{
				terms: ["@nocommit"],
				location: "anywhere",
			},
		],
		"prefer-const": "error",
		"require-await": "error",
		"require-yield": "error",
		"symbol-description": "error",
		"yoda": "error",
	},
} as ESLint.Config;
