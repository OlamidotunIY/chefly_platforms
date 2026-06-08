# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Monorepo commands

Run these commands from the repository root.

### Install dependencies

```bash
pnpm install
```

### Run tasks with Turbo

```bash
# Start all apps in development mode
pnpm dev

# Build all apps and packages
pnpm build

# Run checks across the monorepo
pnpm lint
pnpm typecheck
pnpm format
```

Use a Turbo filter to run a task for one workspace:

```bash
pnpm turbo dev --filter=@chefly/web
pnpm turbo build --filter=@chefly/web
pnpm turbo lint --filter=@workspace/ui
```

Include a workspace and all of its dependencies by adding `...`:

```bash
pnpm turbo build --filter=@chefly/web...
```

### Create an app or package

Create a new app from the existing web app:

```bash
pnpm turbo gen workspace \
  --name @chefly/admin \
  --type app \
  --destination apps/admin \
  --copy @chefly/web
```

Create an empty shared package:

```bash
pnpm turbo gen workspace \
  --name @workspace/utils \
  --type package \
  --destination packages/utils \
  --empty
```

Every workspace should have a unique `name` in its `package.json` and should
live under `apps/` or `packages/`.

### Manage dependencies

Install an external dependency in an app or package:

```bash
pnpm --filter @chefly/web add axios
pnpm --filter @workspace/ui add class-variance-authority
```

Install a development dependency:

```bash
pnpm --filter @chefly/web add -D vitest
```

Install a dependency at the monorepo root:

```bash
pnpm add -Dw prettier
```

Connect one workspace to another:

```bash
pnpm --filter @chefly/web add '@chefly/api@workspace:*'
```

Always include `@workspace:*` when adding a local package. Without it, pnpm may
try to download the package from the npm registry instead of linking the local
workspace.

Remove a dependency:

```bash
pnpm --filter @chefly/web remove axios
```

Run a script directly in one workspace:

```bash
pnpm --filter @chefly/web dev
pnpm --filter @workspace/ui typecheck
```

## Adding components

To add components to your app, run the following command from the repository
root:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
