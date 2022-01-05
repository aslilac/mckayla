import { Readable, Writable } from "stream";

export class Reservoir {
	#chunks: Array<[unknown, Writable]>;

	constructor(pairs: Array<[Readable, Writable]>) {
		this.#chunks = [];

		for (const [i, o] of pairs) {
			i.on("data", (chunk: unknown) => this.#chunks.push([chunk, o]));
		}
	}

	drain() {
		this.#chunks.forEach(([data, target]) => target.write(data));
	}
}
