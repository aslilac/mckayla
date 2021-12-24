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

// const [ref, iter] = run(range(5));
// for (const each of iter) {
// 	console.log(each);
// }
// console.log(ref); // should be -1
