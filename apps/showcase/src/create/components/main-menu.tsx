import * as React from "react"
import {
  Menu,
  Redo2,
  RefreshCcw,
  Search,
  Undo2,
} from "lucide-react"

import { useDesignSystem } from "@/create/design-system-provider"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerSeparator,
  PickerShortcut,
  PickerTrigger,
} from "@/create/components/picker"
import { cn } from "@labring/sealos-ui"

const APPLE_PLATFORM_REGEX = /Mac|iPhone|iPad|iPod/

export function MainMenu({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const [isMac, setIsMac] = React.useState(false)
  const { canUndo, canRedo, undo, redo, reset } = useDesignSystem()

  React.useEffect(() => {
    const platform = navigator.platform
    const userAgent = navigator.userAgent
    setIsMac(APPLE_PLATFORM_REGEX.test(platform || userAgent))
  }, [])

  return (
    <Picker>
      <PickerTrigger className={cn("w-full pr-3", className)}>
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-sm font-semibold">Menu</span>
          <Menu className="size-4 text-muted-foreground" />
        </div>
      </PickerTrigger>
      <PickerContent align="start" className="min-w-56" sideOffset={8}>
        <PickerGroup>
          <PickerItem onClick={onNavigate}>
            <Search className="size-4" />
            Navigate...
            <PickerShortcut>{isMac ? "⌘P" : "Ctrl+P"}</PickerShortcut>
          </PickerItem>
        </PickerGroup>
        <PickerSeparator />
        <PickerGroup>
          <PickerItem disabled={canUndo === false} onClick={undo}>
            <Undo2 className="size-4" />
            Undo
            <PickerShortcut>{isMac ? "⌘Z" : "Ctrl+Z"}</PickerShortcut>
          </PickerItem>
          <PickerItem disabled={canRedo === false} onClick={redo}>
            <Redo2 className="size-4" />
            Redo
            <PickerShortcut>{isMac ? "⇧⌘Z" : "Ctrl+Shift+Z"}</PickerShortcut>
          </PickerItem>
          <PickerItem onClick={reset}>
            <RefreshCcw className="size-4" />
            Reset
          </PickerItem>
        </PickerGroup>
      </PickerContent>
    </Picker>
  )
}
