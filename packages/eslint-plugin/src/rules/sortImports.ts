import { Rule } from "eslint";
import { ImportDeclaration } from "estree";

const messages = {};

const defaultOptions = [["@.+/.+", "[A-Z][a-z].+"], ["./*"]];

function printImportDeclaration(node: ImportDeclaration) {
	// @ts-expect-error
	let x = `import ${node.importKind === "type" ? "type " : ""}`;

	const namespace = node.specifiers.find(
		(specifier) => specifier.type === "ImportNamespaceSpecifier",
	);
	const def = node.specifiers.find(
		(specifier) => specifier.type === "ImportDefaultSpecifier",
	);
	const destructured = node.specifiers.filter(
		(specifier) => specifier.type === "ImportSpecifier",
	);

	if (namespace) x += `* as ${namespace.local.name}`;
	if (def) x += def.local.name;

	if (destructured.length > 0)
		x += `${def ? ", " : ""}{ ${destructured
			.map((specifier) => specifier.local.name)
			.join(",")} }`;

	x += `${namespace || def || destructured.length > 0 ? " from " : ""}${
		node.source.raw
	}`;

	return x;
}

export const sortImports: Rule.RuleModule = {
	meta: {
		type: "layout",

		docs: {
			description: "Organize imports in a reasonable way",
			category: "Layout",
			recommended: true,
		},

		messages,
		fixable: "code",
		schema: [], // no options
	},

	create(context) {
		return {
			Program(node) {
				// node.body.forEach(() => {});
			},

			ImportDeclaration(node) {
				console.log(printImportDeclaration(node));
				// console.log(node);
				// console.log(`"${node.source.value}"`);
				// // const validationState = {
				// // 	defaultImport: null,
				// // 	namespacedImport: null,
				// // 	namedImports: [],
				// // };
				// node.specifiers.forEach((spec) => {
				// 	if (spec.type === "ImportSpecifier") {
				// 		if (spec.imported.type === "Identifier") {
				// 			console.log(`{ ${spec.imported.name} }`);
				// 			return;
				// 		} else {
				// 			console.log("-----weird import-----");
				// 		}
				// 	} else if (spec.type === "ImportNamespaceSpecifier") {
				// 		if (spec.local.type === "Identifier") {
				// 			console.log(`* as ${spec.local.name}`);
				// 			//@ts-expect-error
				// 			console.log(node.parent.body);
				// 			return;
				// 		} else {
				// 			// console.log("-----weird namespace import-----");
				// 		}
				// 	} else if (spec.type === "ImportDefaultSpecifier") {
				// 		if (spec.local.type === "Identifier") {
				// 			// console.log(spec.local.name);
				// 			return;
				// 		} else {
				// 			// console.log("-----weird default import-----");
				// 		}
				// 	}
				// 	// console.log(spec);
				// });
				// console.log(node.specifiers);
			},
			ImportSpecifier(node) {
				// console.log("ImportSpecifier", node);
			},
			ImportDefaultSpecifier(node) {
				// console.log("ImportDefaultSpecifier", node);
			},
			ImportNamespaceSpecifier(node) {
				// console.log("ImportNamespaceSpecifier", node);
			},
		};
	},
};
