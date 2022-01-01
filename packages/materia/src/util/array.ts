import { range } from "../iterators";

export function mapLength<T>(length: number, map: (index: number, arr: T[]) => T) {
	const arr = new Array<T>(length);

	for (const i of range(length)) {
		arr[i] = map(i, arr);
	}

	return arr;
}

export const pickOne = <T>(list: T[]): T =>
	list[Math.floor(Math.random() * list.length)]!;
