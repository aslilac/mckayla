import test from "./configs/test";
import ts from "./configs/ts";
import tsx from "./configs/tsx";

import saneImports from "./rules/sane-imports";

export = {
	rules: {
		"sane-imports": saneImports,
	},
	configs: {
		test,
		ts,
		tsx,
	},
} as ESLint.Plugin;
