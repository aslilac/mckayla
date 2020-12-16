export default {
	parser: "@typescript-eslint/parser",
	overrides: [
		{
			files: ["*.ts?(x)"],
			parserOptions: {
				project: "tsconfig.json",
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"prettier/@typescript-eslint",
			],
			rules: {
				"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
				"@typescript-eslint/no-explicit-any": "error",
				// I find this entirely too useful to make an error, but it
				// can be useful. Maybe I should leave it a warning and manually
				// disable it with comments.
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/prefer-readonly": "error",
				"@typescript-eslint/prefer-ts-expect-error": "error",
				"@typescript-eslint/strict-boolean-expressions": "error",
			},
		},
		{
			files: ["__tests__/**/*.*", "*.spec.*", "*.test.*"],
			extends: ["plugin:jest/style"],
			env: { "jest/globals": true },
		},
	],
	ignorePatterns: ["build/**/*", "dist/**/*", "target/**/*"],
	extends: ["eslint:recommended", "prettier"],
	reportUnusedDisableDirectives: true,
	env: {
		es2020: true,
		browser: true,
		node: true,
	},
	rules: {
		"class-methods-use-this": "error",
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
