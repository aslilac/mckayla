export function time(t: number, emoji = "⏱") {
	console.log(`${emoji}  Done in ${(t / 1000).toFixed(2)}s`);
}
