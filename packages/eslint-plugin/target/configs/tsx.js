"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    extends: [
        "plugin:@mckayla/ts",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/strict",
        "prettier/react",
    ],
    settings: { react: { version: "detect" } },
    rules: {
        "react-hooks/exhaustive-deps": "off",
    },
};
