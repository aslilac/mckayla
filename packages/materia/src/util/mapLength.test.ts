import { mapLength } from "@mckayla/materia";

/**
 * An alternative to `new Array(length).map`, since that doesn't actually work
 */
test("mapLength", () => {
	const x = mapLength(5, (i) => i);

	expect(x).toEqual([0, 1, 2, 3, 4]);
});
