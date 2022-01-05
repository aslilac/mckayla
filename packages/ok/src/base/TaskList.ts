import chalk from "chalk";

export class TaskList {
	#tasks = new Map<symbol, [name: string, description: string]>();

	get taskCount() {
		return this.#tasks.size;
	}

	#clearList() {
		// This is to ensure that our x position is always reset to 0
		if (process.stdout.isTTY) {
			process.stdout.write("\n");
			process.stdout.moveCursor(0, -(this.#tasks.size + 1));
			process.stdout.clearScreenDown();
		}
	}

	#reprintList() {
		if (process.stdout.isTTY) {
			for (const [name, description] of this.#tasks.values()) {
				this.#printTask(name, description);
			}
		}
	}

	#printTask(name: string, description: string, color = "inverse") {
		if (!process.stdout.isTTY) {
			console.log(`${name}  ${description}`);
			return;
		}

		console.log(chalk`{${color}.bold  ${name} }  ${description}`);
	}

	addTask(name: string, description: string): symbol {
		const taskId = Symbol(name);
		this.#tasks.set(taskId, [name, description]);
		this.#printTask(name, description);
		return taskId;
	}

	completeTask(taskId: symbol, color: string, cb: () => void) {
		const task = this.#tasks.get(taskId);

		if (!task) {
			throw new Error("Cannot complete unregistered task");
		}

		const [name, description] = task;

		this.#clearList();
		this.#printTask(name, description, color);
		cb();
		this.#tasks.delete(taskId);
		this.#reprintList();
	}
}
