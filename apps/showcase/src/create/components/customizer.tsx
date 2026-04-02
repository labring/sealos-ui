import * as React from "react"
import { Copy, RefreshCcw, Sparkles } from "lucide-react"

import {
  BASE_COLOR_OPTIONS,
  FONT_BODY_OPTIONS,
  RADIUS_OPTIONS,
  STYLE_OPTIONS,
  THEME_OPTIONS,
} from "@/create/constants"
import { useDesignSystem } from "@/create/design-system-provider"
import { ActionMenu } from "@/create/components/action-menu"
import { MainMenu } from "@/create/components/main-menu"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerTrigger,
} from "@/create/components/picker"
import { useTheme } from "@/components/theme-provider"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ScrollArea,
  cn,
} from "@labring/sealos-ui"

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
}

function optionLabel<T extends string>(
  options: Array<{ value: T; label: string }>,
  value: T
) {
  const target = options.find((option) => option.value === value)
  if (target) {
    return target.label
  }
  return value
}

function SettingPicker<T extends string>({
  label,
  value,
  options,
  onValueChange,
  indicator,
}: {
  label: string
  value: T
  options: Array<{ value: T; label: string }>
  onValueChange: (value: T) => void
  indicator?: React.ReactNode
}) {
  return (
    <Picker>
      <PickerTrigger className="pr-12">
        <div className="flex flex-col text-left">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="text-sm font-semibold text-foreground">{optionLabel(options, value)}</span>
        </div>
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
          {indicator}
        </div>
      </PickerTrigger>
      <PickerContent align="start" side="right">
        <PickerRadioGroup value={value} onValueChange={(next) => onValueChange(next as T)}>
          <PickerGroup>
            {options.map((option) => (
              <PickerRadioItem key={option.value} value={option.value}>
                {option.label}
              </PickerRadioItem>
            ))}
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
  )
}

const THEME_DOT_CLASS = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
} as const

const BASE_DOT_CLASS = {
  neutral: "bg-zinc-400",
  slate: "bg-slate-400",
  stone: "bg-stone-400",
} as const

const MENU_ACCENT_WRAPPER = {
  subtle: "border-border",
  bold: "border-primary/50",
} as const

export function Customizer() {
  const { state, canRedo, canUndo, redo, reset, undo, updateState } = useDesignSystem()
  const { theme } = useTheme()

  const [isActionMenuOpen, setIsActionMenuOpen] = React.useState(false)
  const [copyLabel, setCopyLabel] = React.useState("Copy Preset")

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.altKey) {
        return
      }

      const key = event.key.toLowerCase()
      const withCommand = event.metaKey || event.ctrlKey

      if (withCommand) {
        if (key === "p") {
          event.preventDefault()
          setIsActionMenuOpen(true)
          return
        }

        if (key === "z") {
          event.preventDefault()
          if (event.shiftKey) {
            redo()
          } else {
            undo()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [redo, undo])

  const copyPreset = async () => {
    const presetText = JSON.stringify(state, null, 2)
    await navigator.clipboard.writeText(presetText)
    setCopyLabel("Copied")
    window.setTimeout(() => setCopyLabel("Copy Preset"), 1200)
  }

  return (
    <Card
      className={cn(
        "h-full min-h-0 w-full max-w-[248px] shrink-0 overflow-hidden rounded-3xl border bg-card/95 text-foreground shadow-xl backdrop-blur",
        MENU_ACCENT_WRAPPER[state.menuAccent]
      )}
    >
      <CardHeader className="border-b p-2">
        <MainMenu onNavigate={() => setIsActionMenuOpen(true)} />
      </CardHeader>

      <CardContent className="min-h-0 flex-1 p-0">
        <ScrollArea className="h-full px-2 pb-2">
          <div className="flex flex-col gap-2 pt-1.5">
            <SettingPicker
              label="Style"
              value={state.style}
              options={STYLE_OPTIONS}
              onValueChange={(value) => updateState({ style: value })}
              indicator={<span className="text-xs font-semibold uppercase">S</span>}
            />

            <SettingPicker
              label="Base Color"
              value={state.baseColor}
              options={BASE_COLOR_OPTIONS}
              onValueChange={(value) => updateState({ baseColor: value })}
              indicator={
                <span className={cn("block size-3 rounded-full", BASE_DOT_CLASS[state.baseColor])} />
              }
            />

            <SettingPicker
              label="Theme"
              value={state.theme}
              options={THEME_OPTIONS}
              onValueChange={(value) => updateState({ theme: value })}
              indicator={
                <span className={cn("block size-3 rounded-full", THEME_DOT_CLASS[state.theme])} />
              }
            />

            <SettingPicker
              label="Radius"
              value={state.radius}
              options={RADIUS_OPTIONS}
              onValueChange={(value) => updateState({ radius: value })}
              indicator={<span className="text-xs font-semibold">◜</span>}
            />

            <SettingPicker
              label="Font"
              value={state.font}
              options={FONT_BODY_OPTIONS}
              onValueChange={(value) => updateState({ font: value })}
              indicator={<span className="text-xs font-semibold">Aa</span>}
            />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t p-2">
        <div className="grid w-full grid-cols-2 gap-2">
          <ActionMenu
            open={isActionMenuOpen}
            onOpenChange={setIsActionMenuOpen}
            triggerClassName="w-full"
          />
          <Button onClick={copyPreset} size="sm" variant="outline">
            <Copy className="size-3.5" />
            {copyLabel}
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-2">
          <Button onClick={reset} size="sm" variant="outline">
            <RefreshCcw className="size-3.5" />
            Reset
          </Button>
        </div>

        <div className="flex w-full items-center gap-1 rounded-xl border bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground">
          <Sparkles className="size-3.5" />
          {canUndo || canRedo ? "History available" : "History empty"} · {theme}
        </div>
      </CardFooter>
    </Card>
  )
}
