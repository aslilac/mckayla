"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {};
exports.default = {
    meta: {
        type: "layout",
        docs: {
            description: "Organize imports in a reasonable way",
            category: "Layout",
            recommended: true,
        },
        messages,
        fixable: "code",
        schema: [],
    },
    create(context) {
        return {
            Program(node) {
                node.body.forEach(() => { });
            },
            ImportDeclaration(node) {
                // console.log(node);
                console.log(`"${node.source.value}"`);
                // const validationState = {
                // 	defaultImport: null,
                // 	namespacedImport: null,
                // 	namedImports: [],
                // };
                node.specifiers.forEach((spec) => {
                    if (spec.type === "ImportSpecifier") {
                        if (spec.imported.type === "Identifier") {
                            console.log(`{ ${spec.imported.name} }`);
                            return;
                        }
                        else {
                            console.log("-----weird import-----");
                        }
                    }
                    else if (spec.type === "ImportNamespaceSpecifier") {
                        if (spec.local.type === "Identifier") {
                            console.log(`* as ${spec.local.name}`);
                            console.log(node.parent.body);
                            return;
                        }
                        else {
                            console.log("-----weird namespace import-----");
                        }
                    }
                    else if (spec.type === "ImportDefaultSpecifier") {
                        if (spec.local.type === "Identifier") {
                            console.log(spec.local.name);
                            return;
                        }
                        else {
                            console.log("-----weird default import-----");
                        }
                    }
                    console.log(spec);
                });
                // console.log(node.specifiers);
            },
        };
    },
};
