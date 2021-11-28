import { ESLint } from "eslint";

import { sortImports } from "./sortImports";

const sample = `
import 'hi';
import hey from 'hey';
import { friend } from 'friend';
import React, { useEffect } from 'react';
import * as fs from 'fs';
import type { FC } from 'react';
import type * as x from 'x';
import type y from 'y';
`;

describe("@mckayla/imports", () => {
	const eslint = new ESLint({
		plugins: { "@mckayla/eslint-plugin": { rules: { "sort-imports": sortImports } } },

		useEslintrc: false,
		baseConfig: {
			parser: "@typescript-eslint/parser",
			plugins: ["@mckayla"],
			rules: { "@mckayla/sort-imports": "error" },
		},
	});

	test("hi", async () => {
		const [result] = (await eslint.lintText(sample)) as [ESLint.LintResult];
		console.log(result);
		expect(result.output).toBe(undefined);
	});
});
