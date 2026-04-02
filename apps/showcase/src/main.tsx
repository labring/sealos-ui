import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@labring/sealos-ui/shadcn.css"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="sealos-showcase-theme" enableKeyboardToggle={false}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
