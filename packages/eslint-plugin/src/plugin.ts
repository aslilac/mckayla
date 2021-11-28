import ts from "./configs/ts";
import tsx from "./configs/tsx";

import rules from "./rules";

export = {
	rules,
	configs: {
		ts,
		tsx,
	},
} as ESLint.Plugin;
