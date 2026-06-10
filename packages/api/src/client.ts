import { client } from "./generated/client.gen";

client.setConfig({
  baseUrl: "http://localhost:5000",
  credentials: "include",
});

export { client };
export {
  createClient,
  createConfig,
  type Client,
} from "./generated/client";
export type { ClientOptions as ClientConfigOptions } from "./generated/client";
