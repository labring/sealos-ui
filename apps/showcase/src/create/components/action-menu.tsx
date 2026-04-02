import * as React from "react"
import { Search } from "lucide-react"

import { COMPONENT_ITEMS, DEMO_ITEMS } from "@/create/constants"
import { useDesignSystem } from "@/create/design-system-provider"
import type { ComponentItem, DemoItem } from "@/create/types"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Separator,
  cn,
} from "@labring/sealos-ui"

interface ActionMenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerClassName?: string
}

export function ActionMenu({ open, onOpenChange, triggerClassName }: ActionMenuProps) {
  const { state, updateState } = useDesignSystem()
  const [query, setQuery] = React.useState("")

  const normalizedQuery = query.trim().toLowerCase()

  const previewItems = React.useMemo(() => {
    return DEMO_ITEMS.filter((item) => {
      if (!normalizedQuery) {
        return true
      }
      return (
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.detail.toLowerCase().includes(normalizedQuery) ||
        item.id.includes(normalizedQuery)
      )
    })
  }, [normalizedQuery])

  const componentItems = React.useMemo(() => {
    return COMPONENT_ITEMS.filter((item) => {
      if (!normalizedQuery) {
        return true
      }
      return item.label.toLowerCase().includes(normalizedQuery) || item.id.includes(normalizedQuery)
    })
  }, [normalizedQuery])

  const choosePreview = (item: DemoItem) => {
    updateState({ item })
    onOpenChange?.(false)
  }

  const chooseComponent = (item: ComponentItem) => {
    updateState({ item: "component-lab", componentItem: item })
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("justify-start", triggerClassName)} size="sm" variant="outline">
          <Search className="size-4" />
          Navigate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Navigate</DialogTitle>
          <DialogDescription>
            Jump between preview pages and every component exported from `src/components/ui`.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Search preview or component..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <div className="grid max-h-[22rem] grid-cols-2 gap-3 overflow-auto rounded-xl border bg-muted/40 p-2">
            <div className="flex flex-col gap-1">
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Previews
              </p>
              {previewItems.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "cursor-pointer rounded-lg px-2.5 py-2 text-left transition-colors",
                    state.item === item.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  )}
                  onClick={() => choosePreview(item.id)}
                  type="button"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </button>
              ))}
            </div>

            <React.Fragment>
              <Separator className="col-span-2 my-0 md:hidden" />
              <div className="flex flex-col gap-1">
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Components
                </p>
                {componentItems.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      "cursor-pointer rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                      state.componentItem === item.id && state.item === "component-lab"
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    )}
                    onClick={() => chooseComponent(item.id)}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </React.Fragment>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
