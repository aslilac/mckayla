const test = require("./configs/test");
const ts = require("./configs/ts");
const tsx = require("./configs/tsx");

const saneImports = require("./rules/sane-imports");

module.exports = {
	rules: {
		"sane-imports": saneImports,
	},
	configs: {
		test,
		ts,
		tsx,
	},
};
