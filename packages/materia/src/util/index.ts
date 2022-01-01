export * from "./array";
export * from "./thread";
export * from "./use";

export const randomFloatLessThanMagnitude = (x: number) =>
	Math.floor(Math.random() * x * 2 - x);
