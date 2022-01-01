#!/usr/bin/env node
import * as fs from "fs/promises";
import * as path from "path";
import fetch from "node-fetch";
import { is, oneOf } from "succulent";

type ArtifactName =
	| ".clang-format"
	| ".github/workflows/main.yml"
	| ".eslintrc.json"
	| ".gitignore"
	| ".prettierignore"
	| ".prettierrc.json"
	| ".stylelintrc.json"
	| ".swift-format.json"
	| "Cargo.toml"
	| "CODE_OF_CONDUCT.md"
	| "jest.config.js"
	| "LICENSE"
	| "package.json"
	| "tsconfig.build.json"
	| "tsconfig.json";

type ArtifactUrlOptions = { repo?: string; baseUrl?: string };
function artifact(
	artifactName: ArtifactName,
	options: ArtifactUrlOptions = {},
): [ArtifactName, string] {
	const {
		repo = "aslilac/mckayla",
		baseUrl = options.repo ? "./" : "./packages/create-ok/static",
	} = options;

	return [
		artifactName,
		path.join("https://github.com/", repo, "raw/main", baseUrl, artifactName),
	];
}

const artifactSources = new Map<ArtifactName, string>([
	// Files from this repo
	artifact(".clang-format"),
	artifact(".github/workflows/main.yml"),
	artifact(".eslintrc.json"),
	artifact(".gitignore"),
	artifact(".prettierignore"),
	artifact(".prettierrc.json"),
	artifact(".stylelintrc.json"),
	artifact(".swift-format.json"),
	artifact("Cargo.toml"),
	artifact("jest.config.js"),
	artifact("package.json"),
	artifact("tsconfig.build.json"),
	artifact("tsconfig.json"),

	// Files in aslilac/aslilac
	artifact("CODE_OF_CONDUCT.md", { repo: "aslilac/aslilac" }),
	artifact("LICENSE", { repo: "aslilac/aslilac" }),
]);

const artifactNames = process.argv.slice(2);

async function placeFile(artifactName: ArtifactName) {
	const source = artifactSources.get(artifactName)!;

	const response = await fetch(source);
	const content = new Uint8Array(await response.arrayBuffer());

	const outputPath = path.join(process.cwd(), artifactName);
	await fs.writeFile(outputPath, content);
}

async function main() {
	for (const artifactName of artifactNames) {
		if (!is(artifactName, oneOf(artifactSources.keys()))) {
			console.error("Invalid file name:", artifactName);
			continue;
		}

		placeFile(artifactName);
	}
}

// if (module === require.main) {
main();
// }
