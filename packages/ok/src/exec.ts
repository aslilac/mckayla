import chalk from "chalk";
import { ChildProcessByStdio, spawn } from "child_process";
import { Readable } from "stream";

type ExecTask = {
	proc: ChildProcessByStdio<null, Readable, Readable>;
	result: Promise<number>;
};

async function time(task: Promise<unknown>, emoji = "🌺") {
	const start = Date.now();
	await task;
	const end = Date.now();

	console.log(`${emoji}  Done in ${(end - start / 1000).toFixed(2)}s`);
}

function printCommand(name: string, args: string[] = [], color = "inverse") {
	if (typeof args === "string") {
		color = args;
		args = [];
	}

	if (!process.stdout.isTTY) {
		console.log(`${name}  ${args.map((arg) => `"${arg}"`).join(" ")}`);
		return;
	}

	console.log(
		chalk`{${color}.bold  ${name} }  ${args
			.map((arg) => chalk`{blackBright "{bold ${arg}}"}`)
			.join(" ")}`,
	);
}

export function startTask(name: string, args: string[] = []): ExecTask {
	const proc = spawn(name, args, {
		shell: true,
		stdio: ["ignore", "pipe", "pipe"],

		// Make sure that variables frequently used for color detection
		// are properly duplicated
		env: {
			...process.env,
			// @ts-expect-error
			FORCE_COLOR: chalk.supportsColor.level,
		},
	});
	const result = new Promise<number>((resolve) =>
		proc.on("close", (exitCode) => resolve(exitCode)),
	);

	return { proc, result };
}

export function exec(name: string, args: string[] = []): Promise<number> {
	printCommand(name, args);
	const task = startTask(name, args);
	time(task);
	return task.result;
}
