# `@chefly/api`

Typed API client shared by the web and mobile apps.

## Generate

From the platform root:

```bash
pnpm api:generate
```

This command reads the backend OpenAPI URL and replaces `src/generated` using
`@hey-api/openapi-ts`. The backend must be running.

## Configure

Set the runtime API URL once when an app starts:

```ts
import { client } from "@chefly/api";

client.setConfig({
  baseUrl: "https://api.example.com",
  credentials: "include",
});
```

Then use the generated SDK:

```ts
import { getCurrentUser, getHealth } from "@chefly/api";
```

By default generation reads `http://localhost:5000/openapi.json`. Set
`CHEFLY_OPENAPI_URL` to use another OpenAPI URL.
