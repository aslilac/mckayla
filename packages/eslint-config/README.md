![screenshot of a basic configuration example](https://cdn.mckayla.cloud/-/24418eea266d464e8b31e58b4af90ac1/eslintrc.webp)

<!--
https://ray.so/?title=.eslintrc.json&theme=midnight&spacing=64&background=true&darkMode=true&code=ewoJImV4dGVuZHMiOiBbIm1ja2F5bGEiXQp9&language=json
-->

## Usage

-   Add the package as a dependency to your project

```sh
npm add eslint-config-mckayla
```

-   Update your .eslintrc.json

```json
{
	"extends": ["mckayla"]
}
```

-   If you use TSX, you'll want to use the TSX config variant

```json
{
	"extends": ["mckayla/tsx"]
}
```
