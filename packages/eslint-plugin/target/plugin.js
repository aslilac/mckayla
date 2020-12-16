"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const test_1 = __importDefault(require("./configs/test"));
const ts_1 = __importDefault(require("./configs/ts"));
const tsx_1 = __importDefault(require("./configs/tsx"));
const sane_imports_1 = __importDefault(require("./rules/sane-imports"));
module.exports = {
    rules: {
        "sane-imports": sane_imports_1.default,
    },
    configs: {
        test: test_1.default,
        ts: ts_1.default,
        tsx: tsx_1.default,
    },
};
