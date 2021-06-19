// import { findInPackageRoot } from "./findInPackageRoot";
// import { findInWorkspaceRoot } from "./findInWorkspaceRoot";

export type Config = {
	name: string;
	email: string;
};

export type Report = {
	message: string;
};

export interface FileHandle {
	lines: () => any;
	json: () => any;
}

export interface Context {
	config: Config;

	open: (file: string) => FileHandle;

	fix: (fixer: () => void) => void;
	report: (report: Report) => void;
}

export interface GitContext extends Context {}
export interface ModuleContext extends Context {}
export interface WorkspaceContext extends Context {}
