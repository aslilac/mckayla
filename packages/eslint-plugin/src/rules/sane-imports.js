const assert = require("assert");

module.exports = {
	meta: {
		type: "layout",

		docs: {
			description: "disallow unnecessary semicolons",
			category: "Possible Errors",
			recommended: true,
			url: "https://eslint.org/docs/rules/no-extra-semi",
		},
		// fixable: "code",
		schema: [], // no options
	},

	create(context) {
		// declare the state of the rule
		return {
			ImportDeclaration(node) {
				// console.log(node);
				console.log(`"${node.source.value}"`);

				const validationState = {
					defaultImport: null,
					namespacedImport: null,
					namedImports: [],
				};

				node.specifiers.forEach((spec) => {
					if (spec.type === "ImportSpecifier") {
						if (spec.imported.type === "Identifier") {
							console.log(`{ ${spec.imported.name} }`);
							return;
						} else {
							console.log("-----weird import-----");
						}
					} else if (spec.type === "ImportNamespaceSpecifier") {
						if (spec.local.type === "Identifier") {
							console.log(`* as ${spec.local.name}`);
							console.log(node.parent.body);
							return;
						} else {
							console.log("-----weird namespace import-----");
						}
					} else if (spec.type === "ImportDefaultSpecifier") {
						if (spec.local.type === "Identifier") {
							console.log(spec.local.name);
							return;
						} else {
							console.log("-----weird default import-----");
						}
					}

					console.log(spec);
				});

				// console.log(node.specifiers);
			},
			// ImportSpecifier(node) {
			// 	console.log(node);
			// },
			// ImportDefaultSpecifier(node) {
			// 	console.log(node);
			// },
			// ImportNamespaceSpecifier(node) {
			// 	console.log(node);
			// },
		};
	},
};
