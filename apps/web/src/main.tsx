import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components"
import { AppRouting } from "./routing"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouting />
    </ThemeProvider>
  </StrictMode>
)
