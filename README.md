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

---

MIT
