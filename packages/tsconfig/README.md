![screenshot of a basic configuration example](https://cdn.mckayla.cloud/-/50c0c54daa194ebca0f9841dc8507e5c/tsconfig.webp)

<!--
https://ray.so/?title=tsconfig.json&theme=midnight&spacing=64&background=true&darkMode=true&code=ewoJImV4dGVuZHMiOiAiQG1ja2F5bGEvdHNjb25maWciLAoJImNvbXBpbGVyT3B0aW9ucyI6IHsKCQkib3V0RGlyIjogIi4vYnVpbGQvIiwKCQkidHlwZXMiOiBbXSwKCQkiYmFzZVVybCI6ICIuIgoJfSwKCSJpbmNsdWRlIjogWyIuL3NyYy8qKi8qIl0KfQ&language=json
-->

## Usage

-   Add the package as a dependency to your project

```sh
npm add @mckayla/tsconfig
```

-   Update your tsconfig.json

```json
{
	"extends": "@mckayla/tsconfig",
	"compilerOptions": {
		"outDir": "./build/",
		"types": [],
		"baseUrl": "."
	},
	"include": ["./src/**/*"]
}
```
