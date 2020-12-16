import { findInPackageRoot } from "./findInPackageRoot";
import { findInWorkspaceRoot } from "./findInWorkspaceRoot";

export type Config = {
	name: string;
	email: string;
};

export type Report = {
	message: string;
};

export type ModuleContext = {
	config: Config;

	find: typeof findInPackageRoot;

	fix: (fixer: () => void) => void;
	report: (report: Report) => void;
};

export type WorkspaceContext = {
	find: typeof findInWorkspaceRoot;

	fix: (fixer: () => void) => void;
	report: (report: Report) => void;
};
