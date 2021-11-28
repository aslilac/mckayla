#!/usr/bin/env node
import * as fs from "fs/promises";
import * as path from "path";
import fetch from "node-fetch";
import { is, oneOf } from "succulent";

type ArtifactName =
	| ".github/workflows/main.yml"
	| ".eslintrc.json"
	| ".gitignore"
	| ".prettierrc.json"
	| "CODE_OF_CONDUCT.md"
	| "jest.config.js"
	| "LICENSE"
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
	artifact(".github/workflows/main.yml"),
	artifact(".eslintrc.json"),
	artifact(".gitignore"),
	artifact(".prettierrc.json"),
	artifact("jest.config.js"),
	artifact("tsconfig.build.json"),
	artifact("tsconfig.json"),

	// Files in aslilac/aslilac
	artifact("CODE_OF_CONDUCT.md", { repo: "aslilac/aslilac" }),
	artifact("LICENSE", { repo: "aslilac/aslilac" }),
]);

const [artifactName] = process.argv.slice(2);

async function placeFile(artifactName: ArtifactName) {
	const source = artifactSources.get(artifactName)!;

	const response = await fetch(source);
	const content = new Uint8Array(await response.arrayBuffer());

	const outputPath = path.join(process.cwd(), artifactName);
	await fs.writeFile(outputPath, content);
}

async function main() {
	if (!is(artifactName, oneOf(artifactSources.keys()))) {
		throw new Error("Invalid file name!");
	}

	placeFile(artifactName);
}

// if (module === require.main) {
main();
// }
