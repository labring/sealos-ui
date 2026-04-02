import { useDesignSystem } from "@/create/design-system-provider"
import { Button, cn } from "@labring/sealos-ui"

const PREVIEW_SWITCHER_ITEMS = [
  { value: "preview-01", label: "01" },
  { value: "preview-02", label: "02" },
  { value: "preview-03", label: "03" },
] as const

export function PreviewSwitcher() {
  const { state, updateState } = useDesignSystem()

  return (
    <div className="absolute right-3 bottom-3 z-20">
      <div className="flex items-center gap-1 rounded-xl border bg-background/95 p-1 shadow-lg backdrop-blur">
        {PREVIEW_SWITCHER_ITEMS.map((item) => (
          <Button
            key={item.value}
            className={cn(
              "h-8 min-w-8 px-2 text-xs",
              state.item === item.value ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
            size="sm"
            variant="ghost"
            onClick={() => updateState({ item: item.value })}
          >
            {item.label}
          </Button>
        ))}
        <Button
          className={cn(
            "h-8 px-2 text-xs",
            state.item === "component-lab" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
          size="sm"
          variant="ghost"
          onClick={() => updateState({ item: "component-lab" })}
        >
          Components
        </Button>
      </div>
    </div>
  )
}
