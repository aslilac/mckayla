#!/usr/bin/env node
import { exec } from "./exec";

const [, , command] = process.argv;

type QueueItem = {
	target: "out" | "err";
	buf: Buffer;
};

function queue() {
	const q: QueueItem[] = [];

	return {
		out(buf: Buffer) {
			q.push({ target: "out", buf });
		},

		err(buf: Buffer) {
			q.push({ target: "err", buf });
		},

		flush() {
			q.forEach((segment) => {
				if (segment.target === "out") {
					process.stdout.write(segment.buf);
				}

				if (segment.target === "err") {
					process.stderr.write(segment.buf);
				}
			});
		},
	};
}

export async function session() {
	const tasks = new Map<number, [string, string[]?]>();

	const start = Date.now();

	tasks.set(0, [
		"prettier",
		["--ignore-path", ".gitignore", shouldFix ? "--write" : "--check", "."],
	]);
	tasks.set(1, ["eslint", [/*"--ignore-path", ".gitignore",*/ "."]]);
	tasks.set(2, ["jest", ["--passWithNoTests"]]);
	tasks.set(3, ["tsc", ["-p", ".", "--noEmit"]]);

	function clearOverview() {
		// This is to ensure that our x position is always reset to 0
		if (process.stdout.isTTY) {
			process.stdout.write("\n");
			process.stdout.moveCursor(0, -(tasks.size + 1));
			process.stdout.clearScreenDown();
		}
	}

	function printOverview() {
		if (tasks.size === 0) {
			const end = Date.now();
			logTime(end - start);
		}

		for (const [task, description] of tasks) {
			printCommand(...description);
		}

		if (!process.stdout.isTTY) {
			process.stdout.write("\n");
		}
	}

	for (const [i, description] of tasks) {
		// const d = startTask("sleep", [(i + (Math.random() * 2 - 1)).toPrecision(3)]);
		const d = startTask(...description);
		const chunks = queue();

		d.proc.stdout.on("data", (data) => chunks.out(data));
		d.proc.stderr.on("data", (data) => chunks.err(data));

		d.result.then((exitCode) => {
			clearOverview();
			printCommand(...description, exitCode ? "inverse.red" : "inverse");
			chunks.flush();
			logTime(Date.now() - start, "⏱");
			tasks.delete(i);
			if (process.stdout.isTTY) printOverview();
		});
	}

	printOverview();
}

const shouldFix = Boolean(process.env.CI);

async function main() {
	switch (command) {
		case "session":
			await session();
			break;
		case "doc":
			await exec("typedoc");
			break;
		case "fmt":
			await exec("prettier", ["--ignore-path", ".gitignore", "--write", "."]);
			break;
		case "check":
		case "ci":
			await exec("prettier", [
				"--ignore-path",
				".gitignore",
				shouldFix ? "--write" : "--check",
				".",
			]);
			await exec("eslint", ["--ignore-path", ".gitignore", "."]);
			await exec("jest");
			await exec("tsc", ["-p", ".", "--noEmit"]);
			break;
		case "test":
			await exec("jest");
			break;
		case "-v":
		case "-V":
		case "--version":
			console.log("v0.0.0");
			break;
		default:
			console.log(":p");
	}
}

main();
