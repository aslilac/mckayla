import { Readable, Writable } from "stream";

export class StreamStorage {
	#chunks: Buffer[];

	constructor(pairs: Array<[Readable, Writable]>) {
		this.#chunks = [];

		for (const [i, o] of pairs) {
			i.on("data", (chunk: unknown) => this.#chunks.push(chunk));
		}
	}

	drain() {
		return Buffer.concat(this.#chunks);
	}
}
