import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  cn,
} from "@labring/sealos-ui"

function Picker(props: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu {...props} />
}

function PickerTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      className={cn(
        "relative inline-flex w-full cursor-pointer items-center gap-2 rounded-xl border bg-background px-3 py-2.5 text-sm text-foreground transition hover:bg-muted/60 data-[state=open]:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuTrigger>
  )
}

function PickerContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      className={cn(
        "min-w-52 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl",
        className
      )}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function PickerGroup(props: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup {...props} />
}

function PickerItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        "rounded-lg px-2.5 py-2 text-sm font-medium focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function PickerRadioGroup(props: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup {...props} />
}

function PickerRadioItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  return (
    <DropdownMenuRadioItem
      className={cn(
        "rounded-lg px-2.5 py-2 text-sm font-medium focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function PickerSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator className={cn("bg-border", className)} {...props} />
}

function PickerShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return <DropdownMenuShortcut className={cn("text-muted-foreground", className)} {...props} />
}

export {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerShortcut,
  PickerTrigger,
}
