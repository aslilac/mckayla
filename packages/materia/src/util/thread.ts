/**
 * Runs a Generator until it's exhausted
 */
export function thread(runLoop: () => Generator) {
	let gen = runLoop();
	do {
		const step = gen.next();
		if (step.done) break;
	} while (true);
}

/**
 * Runs an AsyncGenerator until it's exhausted
 */
export async function asyncThread(runLoop: () => AsyncGenerator) {
	let gen = runLoop();
	do {
		const step = await gen.next();
		if (step.done) break;
	} while (true);
}
