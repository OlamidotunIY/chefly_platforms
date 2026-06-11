import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components"
import { AppRouting } from "./routing"
import { Toaster, TooltipProvider } from "@workspace/ui/components"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <AppRouting />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
