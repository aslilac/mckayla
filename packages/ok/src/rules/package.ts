import { ModuleContext, WorkspaceContext } from "../base/context";

export const workspace = (cx: WorkspaceContext) => {
	cx.find("package.json")
		.json()
		.requireKeys(["private", "workspaces"])
		.sortKeys(["private", "workspaces", "devDependencies", "scripts"]);
};

const REQUIRED = 0;

export const module = (cx: ModuleContext) => {
	const pkg = cx.find("package.json").json();

	name: REQUIRED;

	pkg.requireKeys([
		"name",
		"version",
		"author",
		"description",
		"license",
		"main",
		"types",
		"homepage",
		"repository",
		"bugs",
	]).sortKeys([
		"private",
		"name",
		"version",
		"author",
		"description",
		"license",
		"main",
		"bin",
		"browser",
		"renderer",
		"types",
		"homepage",
		"repository",
		"bugs",
		"keywords",
		"targets",
		"browserslist",
		"config",
		"dependencies",
		"devDependencies",
		"scripts",
	]);

	pkg.setKey("author", `${cx.config.name} <${cx.config.email}>`);
	pkg.setKey("license", "MIT");
};
