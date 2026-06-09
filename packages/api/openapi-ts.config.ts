import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input:
    process.env.CHEFLY_OPENAPI_URL ?? "http://localhost:5000/openapi.json",
  output: {
    path: "src/generated",
    postProcess: ["prettier"],
  },
  plugins: ["@hey-api/client-fetch", "@hey-api/sdk"],
});
