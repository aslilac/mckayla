export function dbg<T>(val: T, ...context: unknown[]) {
	console.log(val, ...context);
	return val;
}
