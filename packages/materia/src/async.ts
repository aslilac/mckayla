type RunRef<R> = {
	readonly errors: unknown[];
	readonly result: R;
};

function* $run<T, R, U>(iter: Iterator<T, R, U>, ref: any) {
	do {
		try {
			const n = iter.next();

			// This sucks?? Why does it need to have === true??
			if (n.done === true) {
				ref.result = n.value;
				return;
			}

			yield n.value;
		} catch (error) {
			console.log(error);
			ref.errors.push(error);
			continue;
		}
	} while (true);
}

function run<T, R, N>(iter: Iterator<T, R, N>): [RunRef<R>, Generator<T, void, unknown>] {
	const ref: any = { errors: [] };
	return [ref, $run(iter, ref)];
}

export function nextYield<T, R, N>(iterator: Iterator<T, R, N>, n: N): T {
	const next = iterator.next(n);

	// This sucks?? Why does it need to have === true??
	if (next.done === true) {
		throw new Error("Iterator is already exhausted");
	}

	return next.value;
}

function* hi(j: number) {
	for (let i = 0; i < j; i++) {
		yield i;
	}

	console.log("returning");
	return -1;
}

export function of<T, R, N>(iter: Iterator<T, R, N | undefined>, body: (each: T) => N) {
	let previous: N | undefined;

	do {
		const next = iter.next(previous);

		if (next.done === true) {
			return next.value;
		}

		previous = body(next.value);
	} while (true);
}

export function* range(j: number) {
	for (let i = 0; i < j; i++) {
		// if (i % 2 === 0) {
		//     throw new Error(`I hate even numbers, such as ${i} :)`);
		// }

		yield i;
	}

	return -1;
}

// const [ref, iter] = run(range(5));
// for (const each of iter) {
// 	console.log(each);
// }
// console.log(ref); // should be -1
