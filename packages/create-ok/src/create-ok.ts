#!/usr/bin/env node
import chalk from "chalk";
import * as fs from "fs/promises";
import * as path from "path";
import fetch from "node-fetch";

type ArtifactUrlOptions = { repo?: string; branch?: string; baseUrl?: string };

function artifactParser(artifactName: string): [base: string, version: string] {
	const split = artifactName.split("@");

	if (split.length > 2) {
		throw new Error(`Too many version tags in ${artifactName}!`);
	}

	const [baseArtifactName, version] = split;
	const versionBase = version ? `@${version}` : ".";

	return [baseArtifactName!, versionBase];
}

function artifact(
	baseArtifactName: string,
	versionBase: string,
	options: ArtifactUrlOptions = {},
): string {
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

const artifactNames = process.argv.slice(2);

async function placeFile(artifactName: string) {
	const [baseArtifactName, versionBase] = artifactParser(artifactName);
	const artifactSource = artifact(baseArtifactName, versionBase);

	const artifactDir = path.dirname(artifactName);
	const isDirectory = await fs.stat(artifactDir).then(
		(dirStats) => dirStats.isDirectory(),
		() => false,
	);

	if (!isDirectory) {
		await fs.mkdir(artifactDir, { recursive: true });
	}

	const response = await fetch(artifactSource);

	if (!response.ok) {
		console.error(chalk.red("error:"), "Unknown file name:", artifactName);
		return;
	}

	const content = new Uint8Array(await response.arrayBuffer());

	const outputPath = path.join(process.cwd(), baseArtifactName);
	await fs.writeFile(outputPath, content);
}

function main() {
	for (const artifactName of artifactNames) {
		placeFile(artifactName);
	}
}

// if (module === require.main) {
main();
// }
