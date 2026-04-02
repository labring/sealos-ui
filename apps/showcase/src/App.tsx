import { DesignSystemProvider } from "@/create/design-system-provider"
import { Customizer } from "@/create/components/customizer"
import { Preview } from "@/create/components/preview"

export function App() {
  return (
    <DesignSystemProvider>
      <main className="h-svh overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] p-4 md:p-5">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-4 md:flex-row md:items-stretch">
          <Customizer />
          <Preview />
        </div>
      </main>
    </DesignSystemProvider>
  )
}

export default App
