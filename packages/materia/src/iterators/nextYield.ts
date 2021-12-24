/**
 * Takes an iterator and returns the next yielded value.
 * @throws If the iterator is exhausted or if it throws an error
 */
export function nextYield<T, R, N>(iterator: Iterator<T, R, N>, n: N): T {
	const next = iterator.next(n);

	// This sucks?? Why does it need to have === true??
	if (next.done === true) {
		throw new Error("Iterator is already exhausted");
	}

	return next.value;
}
