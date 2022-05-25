#!/usr/bin/env node
import chalk from "chalk";
import * as fs from "fs/promises";
import * as path from "path";
import fetch from "node-fetch";
import { is, oneOf } from "succulent";

const artifactSources = new Set<string>([
	".clang-format",
	".github/workflows/main.yml",
	".eslintrc.json",
	".gitignore",
	".prettierignore",
	".prettierrc.json",
	".stylelintrc.json",
	".swift-format.json",
	"Cargo.toml",
	"CODE_OF_CONDUCT.md",
	"deno.jsonc",
	"imports.json@deno",
	"jest.config.js",
	"LICENSE",
	"package.json",
	"tsconfig.build.json",
	"tsconfig.json",
]);

type ArtifactUrlOptions = { repo?: string; branch?: string; baseUrl?: string };

function artifact(artifactName: string, options: ArtifactUrlOptions = {}): string {
	const split = artifactName.split("@");

	if (split.length > 2) {
		throw new Error(`Too many version tags in ${artifactName}!`);
	}

	const [baseArtifactName, version] = split;
	const versionBase = version ? `@${version}` : ".";

	const {
		repo = "aslilac/mckayla",
		branch = "main",
		baseUrl = options.repo ? "./" : "./packages/create-ok/static",
	} = options;

	return path.join(
		"https://github.com/",
		repo,
		"raw",
		branch,
		baseUrl,
		versionBase,
		baseArtifactName!,
	);
}

const options = {
	force: false,
};

const artifactNames = process.argv.slice(2).filter((option) => {
	switch (option) {
		case "-f":
		case "--force":
			options.force = true;
			return false;
	}

	return true;
});

async function placeFile(artifactName: string) {
	const artifactSource = artifact(artifactName);

	const artifactDir = path.dirname(artifactName);
	const isDirectory = await fs.stat(artifactDir).then(
		(dirStats) => dirStats.isDirectory(),
		() => false,
	);

	if (!isDirectory) {
		await fs.mkdir(artifactDir, { recursive: true });
	}

	const response = await fetch(artifactSource);
	const content = new Uint8Array(await response.arrayBuffer());

	const outputPath = path.join(process.cwd(), artifactName);
	await fs.writeFile(outputPath, content);
}

async function main() {
	for (const artifactName of artifactNames) {
		if (!options.force && !is(artifactName, oneOf(artifactSources.keys()))) {
			console.error(chalk.red("error:"), "Unknown file name:", artifactName);
			console.info("You can skip this check by running the command with `--force`");
			continue;
		}

		placeFile(artifactName);
	}
}

// if (module === require.main) {
main();
// }
