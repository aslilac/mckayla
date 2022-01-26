import { Readable } from "stream";

export class Capture {
	#chunks: Array<Buffer>;

	constructor(stream: Readable) {
		this.#chunks = [];
		stream.on("data", (chunk: Buffer) => this.#chunks.push(chunk));
	}

	drain() {
		return Buffer.concat(this.#chunks);
	}
}
