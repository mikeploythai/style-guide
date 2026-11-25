# @mikeploythai/style-guide

My personal Oxlint, Oxfmt, and TypeScript configurations.

```sh
pnpm add -D @mikeploythai/style-guide oxlint oxfmt
```

```ts
// oxlint.config.ts
import { lint } from "@mikeploythai/style-guide/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig(lint());
```

```ts
// oxfmt.config.ts
import { fmt } from "@mikeploythai/style-guide/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig(fmt());
```

```jsonc
// tsconfig.json
{ "extends": "@mikeploythai/style-guide/tsconfig" }
```

The preset maps `@/*` to your project's `src/*` through `${configDir}`. The shadcn CLI doesn't expand `${configDir}`, so a project that installs components with it sets the alias itself:

```jsonc
// tsconfig.json
{
  "extends": "@mikeploythai/style-guide/tsconfig",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] },
  },
}
```

---

MIT
