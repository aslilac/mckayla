/**
 * A utility function that allows you to write for loops in a more modern, iterator style
 */
export function* range(j: number, start: number = 0, step: number = 1) {
	console.assert(step > 0, "Range step must be greater than 0");

	for (let i = start; i < j; i += step) {
		yield i;
	}
}

/**
 * A utility function that allows you to write for loops in a more modern, iterator style
 */
export function* invRange(j: number, end: number = 0, step: number = 1) {
	console.assert(step > 0, "Range step must be greater than 0");

	for (let i = j; i > end; i -= step) {
		yield i;
	}
}
