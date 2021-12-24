export function pipe<T, X>(initialValue: T, transformer: (x: T) => X): X {
	return transformer(initialValue);
}

// console.log(pipe("hello", (x) => x.length));

// async function asyncPipe<T, X, Y>(
// 	initialValue: T,
// 	transformer: (x: T) => Promise<X> | X,
// 	transformer2: (x: X) => Promise<Y> | Y,
// ): Promise<Y> {
// 	return transformer2(await transformer(initialValue));
// }

// console.log(
// 	asyncPipe(
// 		4,
// 		(x) => Promise.resolve(x),
// 		(x) => x + 5,
// 	),
// );

// type TransformerList<A, B, C, D, E, F> = [
// 	(x: A) => B,
// 	(x: B) => C,
// 	(x: C) => D,
// 	(x: D) => E,
// 	(x: E) => F,
// 	// [K in keyof L]: (x: L[K]) => L[K + 1]
// ];

// function reallyPipe<A, B, C, D, E, F>(
// 	initialValue: A,
// 	...transformers: TransformerList<A, B, C, D, E, F>
// ): F {
// 	return transformers.reduce((value: any, transformer) => {
// 		return transformer(value as unknown as any) as unknown as any;
// 	}, initialValue) as unknown as any;
// }

// const a = reallyPipe(
// 	0,
// 	(x) => "f",
// 	(x) => x.length,
// 	(x) => x + 5,
// 	(x) => [x] as const,
// 	(x) => [[[x]]] as const,
// );

export function use<T>(initialValue: T, ...transformers: Array<(x: T) => void>): T {
	return transformers.reduce((value, transformer) => {
		transformer(value);
		return value;
	}, initialValue);
}

// console.log(
// 	use(
// 		document.createElement("main"),
// 		(x) => x.innerHTML = "hi",
// 		(x) => x.setAttribute("id", "app"),
// 		(x) => x.style.setProperty("background-color", "red"),
// 		(x) => console.log(x.style.backgroundColor),
// 		console.log,
// 	),
// );

export function safeRun<T>(run: () => T, backup: T): T;
export function safeRun<T, A extends any[]>(
	run: (...args: A) => T,
	backup: T,
	args: A,
): T;
export function safeRun<T, A extends any[]>(
	run: (...args: A) => T,
	backup: T,
	// @ts-expect-error - The overload signatures should prevent this from being an issue
	args: A = [],
) {
	try {
		return run(...args);
	} catch {
		return backup;
	}
}

// console.log(safeRun(() => JSON.parse("[0]") as number[], []));

// console.log(safeRun(JSON.parse, null, ["[f]"]));

export async function thread(runLoop: () => Promise<boolean> | boolean) {
	let exec = true;
	do {
		exec = await Promise.resolve(runLoop());
	} while (exec);
}
