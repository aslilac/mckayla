export default {
	parser: "@typescript-eslint/parser",
	plugins: ["@mckayla"],
	overrides: [
		{
			files: ["*.ts?(x)"],
			parserOptions: {
				project: "tsconfig.json",
			},
		},
		{
			files: ["__tests__/**/*.*", "*.spec.*", "*.test.*"],
		},
	],
	ignorePatterns: ["build/**/*", "dist/**/*", "target/**/*"],
	reportUnusedDisableDirectives: true,
	env: {
		es2020: true,
		browser: true,
		node: true,
	},
	rules: {
		"@mckayla/sane-imports": "error",
	},
} as ESLint.Config;
