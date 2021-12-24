import { asyncThread, thread } from "@mckayla/materia";

test("thread", async () => {
	let i = 0;
	thread(function* () {
		while (++i < 5) yield;
	});
	expect(i).toBe(5);
});

test("asyncThread", async () => {
	let i = 0;
	await asyncThread(async function* () {
		while (++i < 5) yield;
	});
	expect(i).toBe(5);
});
