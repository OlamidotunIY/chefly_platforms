import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000", // The base URL of your auth server
  plugins: [usernameClient()],
})
