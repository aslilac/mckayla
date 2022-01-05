#!/usr/bin/env node
import { log, Reservoir, TaskList } from "./base";
import { startTask } from "./exec";

const [, , command] = process.argv;

const quiet = process.argv.includes("-q");

export function session(taskDefinitions: Array<[string, string[]]>) {
	const tasks = new Set(taskDefinitions);

	const taskList = new TaskList();
	const start = Date.now();

	for (const [name, args] of tasks) {
		// const d = startTask("sleep", [(i + Math.random() * 1.5).toPrecision(3)]);
		const d = startTask(name, args);
		const taskId = taskList.addTask(name, args.map((arg) => `"${arg}"`).join(" "));
		const storage = new Reservoir([
			[d.proc.stdout, process.stdout],
			[d.proc.stderr, process.stderr],
		]);

		d.result.then((exitCode) => {
			process.exitCode! |= exitCode;
			taskList.completeTask(
				taskId,
				exitCode ? "inverse.red" : quiet ? "inverse.green" : "inverse",
				() => {
					if (exitCode || !quiet) {
						storage.drain();
					}
					if (!quiet && tasks.size > 1) log.time(Date.now() - start);
				},
			);
			if (taskList.taskCount === 0) {
				log.time(Date.now() - start, "🌺");
			}
		}, console.error);
	}
}

const shouldFix = !process.env.CI;

function main() {
	switch (command) {
		case undefined:
		case ".":
			session([
				["prettier", [shouldFix ? "--write" : "--check", "."]],
				["eslint", ["--fix", "."]],
				["jest", []],
				["tsc", ["-p", ".", "--noEmit"]],
			]);
			break;
		case "doc":
			session([["typedoc", []]]);
			break;
		case "fmt":
			session([["prettier", ["--write", "."]]]);
			break;
		case "check":
		case "ci":
			session([
				["prettier", ["--ignore-path", ".gitignore", "--check", "."]],
				["eslint", ["--ignore-path", ".gitignore", "."]],
				["jest", []],
				["tsc", ["-p", ".", "--noEmit", "--pretty"]],
			]);
			break;
		case "test":
			session([["jest", []]]);
			break;
		case "-v":
		case "-V":
		case "--version":
			console.log("ok v0.0.0");
			break;
		default:
			console.log(":p");
	}
}

main();
