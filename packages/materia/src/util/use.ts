export function use<T>(initialValue: T, ...transformers: Array<(x: T) => void>): T {
	return transformers.reduce((value, transformer) => {
		transformer(value);
		return value;
	}, initialValue);
}
