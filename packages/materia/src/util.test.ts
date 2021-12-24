import { thread } from "vexd";

test("thread", async () => {
	let i = 0;
	await thread(() => ++i < 5);
	expect(i).toBe(5);
});
