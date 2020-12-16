declare global {
	namespace ESLint {
		interface Plugin {
			configs: Record<string, Config>;
			rules: Record<string, RuleFactory<string>>;
		}

		type Config = {};

		type RuleFactory<Message extends string> = {
			meta: RuleMeta<Message>;
			create: (cx: RuleContext<Message>) => Rule;
		};

		type RuleMeta<Message extends string> = {
			type: "layout";
			docs: RuleDocsMeta;
			messages: Record<Message, string>;
			fixable: "code";
			schema: [];
		};

		type RuleDocsMeta = {
			description: string;
			category: "Layout";
			recommended: boolean;
		};

		type RuleContext<Message extends string> = {
			report: (report: RuleReport<Message>) => void;
		};

		type RuleReport<Message extends string> = {
			node: AstNode;
			messageId: Message;
			data?: Record<string, string>;
		};

		type Rule = {
			[NodeType in keyof AstNodeMap]: (node: AstNodeMap[NodeType]) => void;
		};

		interface AstNodeMap {
			ImportDeclaration: ImportDeclaration;
			Program: Program;
		}

		type AstNode = AstNodeMap[keyof AstNodeMap];

		type Identifier = {
			type: "Identifier";
			name: string;
		};

		type ImportDeclaration = {
			type: "ImportDeclaration";
			parent: Program; // maybe not the most correct, but
			source: {
				value: string;
			};
			specifiers: Array<ImportDeclarationSpecifier>;
		};

		type ImportDeclarationSpecifier =
			| ImportSpecifier
			| ImportNamespaceSpecifier
			| ImportDefaultSpecifier;

		type ImportSpecifier = {
			type: "ImportSpecifier";
			imported: Identifier;
			local: Identifier;
		};

		type ImportNamespaceSpecifier = {
			type: "ImportNamespaceSpecifier";
			local: Identifier;
		};

		type ImportDefaultSpecifier = {
			type: "ImportDefaultSpecifier";
			local: Identifier;
		};

		type Program = {
			type: "Program";
			body: AstNode[];
		};
	}
}

export {};
