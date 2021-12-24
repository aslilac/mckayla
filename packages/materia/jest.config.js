module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["<rootDir>/target/"],
	moduleNameMapper: {
		"^@mckayla/materia$": "<rootDir>/src/main.ts",
	},
};
