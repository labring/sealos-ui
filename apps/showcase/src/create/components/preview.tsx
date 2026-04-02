import * as React from "react"
import { Grip, Info, TriangleAlert } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { COMPONENT_ITEMS } from "@/create/constants"
import { useDesignSystem } from "@/create/design-system-provider"
import type { BaseColor, ComponentItem, DemoItem, StyleName, ThemeName } from "@/create/types"
import { PreviewSwitcher } from "@/create/components/preview-switcher"
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DateRangePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Loading,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Step,
  StepIndicator,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from "@labring/sealos-ui"

const PREVIEW_GROUPS: Record<Exclude<DemoItem, "component-lab">, {
  title: string
  description: string
  items: ComponentItem[]
}> = {
  "preview-01": {
    title: "Foundations",
    description: "Action, input and selection controls rendered from real source exports.",
    items: [
      "button",
      "input",
      "select",
      "button-group",
      "textarea",
      "checkbox",
      "slider",
    ],
  },
  "preview-02": {
    title: "Data and Navigation",
    description: "Data display, structure and movement components from src/components/ui.",
    items: [
      "table",
      "tabs",
      "breadcrumb",
      "card",
      "avatar",
      "pagination",
      "progress",
    ],
  },
  "preview-03": {
    title: "Overlay and Feedback",
    description: "Confirmation, overlays and transient feedback primitives.",
    items: [
      "alert-dialog",
      "dialog",
      "drawer",
      "popover",
      "sonner",
      "tooltip",
    ],
  },
}

const PREVIEW_INDEX: Record<Exclude<DemoItem, "component-lab">, string> = {
  "preview-01": "01",
  "preview-02": "02",
  "preview-03": "03",
}

type PreviewStyleConfig = {
  canvasClass: string
  cardClass: string
  cardHeaderClass: string
  cardInnerClass: string
  railCardClass: string
  sectionBadgeClass: string
}

type PreviewThemeConfig = {
  canvasOverlayClass: string
  sectionBadgeClass: string
  countBadgeClass: string
  openButtonClass: string
  chipActiveClass: string
}

type PreviewBaseColorConfig = {
  canvasOverlayClass: string
  cardToneClass: string
  innerToneClass: string
  railToneClass: string
  badgeToneClass: string
  chipToneClass: string
}

const BODY_FONT = {
  geist: "\"Geist Variable\", ui-sans-serif, system-ui",
  inter: "Inter, \"Helvetica Neue\", ui-sans-serif",
  "dm-sans": "\"DM Sans\", \"Helvetica Neue\", ui-sans-serif",
} as const

const HEADING_FONT = {
  geist: "\"Geist Variable\", ui-sans-serif, system-ui",
  manrope: "Manrope, \"Avenir Next\", ui-sans-serif",
  sora: "Sora, \"Avenir Next\", ui-sans-serif",
} as const

const RADIUS_CLASS = {
  default: "rounded-2xl",
  soft: "rounded-3xl",
  sharp: "rounded-md",
} as const

const THEME_BUTTON_CLASS = {
  blue: "bg-blue-600 hover:bg-blue-600/90 text-white",
  green: "bg-emerald-600 hover:bg-emerald-600/90 text-white",
  amber: "bg-amber-500 hover:bg-amber-500/90 text-amber-950",
  violet: "bg-violet-600 hover:bg-violet-600/90 text-white",
} as const

const THEME_CLASS: Record<ThemeName, PreviewThemeConfig> = {
  blue: {
    canvasOverlayClass:
      "before:bg-[radial-gradient(circle_at_0%_100%,rgba(37,99,235,0.18),transparent_48%)]",
    sectionBadgeClass: "border-blue-300/85 bg-blue-50 text-blue-700",
    countBadgeClass: "border-blue-200/90 bg-blue-100/80 text-blue-700",
    openButtonClass: "border-blue-300/75 text-blue-700 hover:bg-blue-50",
    chipActiveClass: "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.28)]",
  },
  green: {
    canvasOverlayClass:
      "before:bg-[radial-gradient(circle_at_0%_100%,rgba(5,150,105,0.18),transparent_48%)]",
    sectionBadgeClass: "border-emerald-300/85 bg-emerald-50 text-emerald-700",
    countBadgeClass: "border-emerald-200/90 bg-emerald-100/80 text-emerald-700",
    openButtonClass: "border-emerald-300/75 text-emerald-700 hover:bg-emerald-50",
    chipActiveClass: "bg-emerald-600 text-white shadow-[0_8px_16px_rgba(5,150,105,0.28)]",
  },
  amber: {
    canvasOverlayClass:
      "before:bg-[radial-gradient(circle_at_0%_100%,rgba(217,119,6,0.20),transparent_48%)]",
    sectionBadgeClass: "border-amber-300/90 bg-amber-50 text-amber-800",
    countBadgeClass: "border-amber-200/90 bg-amber-100/80 text-amber-800",
    openButtonClass: "border-amber-300/80 text-amber-800 hover:bg-amber-50",
    chipActiveClass: "bg-amber-500 text-amber-950 shadow-[0_8px_16px_rgba(217,119,6,0.28)]",
  },
  violet: {
    canvasOverlayClass:
      "before:bg-[radial-gradient(circle_at_0%_100%,rgba(124,58,237,0.18),transparent_48%)]",
    sectionBadgeClass: "border-violet-300/85 bg-violet-50 text-violet-700",
    countBadgeClass: "border-violet-200/90 bg-violet-100/80 text-violet-700",
    openButtonClass: "border-violet-300/75 text-violet-700 hover:bg-violet-50",
    chipActiveClass: "bg-violet-600 text-white shadow-[0_8px_16px_rgba(124,58,237,0.28)]",
  },
}

const BASE_COLOR_CLASS: Record<BaseColor, PreviewBaseColorConfig> = {
  neutral: {
    canvasOverlayClass: "after:bg-transparent",
    cardToneClass: "",
    innerToneClass: "",
    railToneClass: "",
    badgeToneClass: "",
    chipToneClass: "",
  },
  slate: {
    canvasOverlayClass:
      "after:bg-[radial-gradient(circle_at_100%_0%,rgba(71,85,105,0.12),transparent_44%)]",
    cardToneClass: "border-slate-300/90",
    innerToneClass: "",
    railToneClass: "border-slate-300/90",
    badgeToneClass: "text-slate-700",
    chipToneClass: "text-slate-700",
  },
  stone: {
    canvasOverlayClass:
      "after:bg-[radial-gradient(circle_at_100%_0%,rgba(120,113,108,0.16),transparent_44%)]",
    cardToneClass: "border-stone-300/90",
    innerToneClass: "",
    railToneClass: "border-stone-300/90",
    badgeToneClass: "text-stone-700",
    chipToneClass: "text-stone-700",
  },
}

const STYLE_CLASS: Record<StyleName, PreviewStyleConfig> = {
  luma: {
    canvasClass: [
      "bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_88%_100%,rgba(16,185,129,0.10),transparent_32%),radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.34)_1px,transparent_0)]",
      "[background-size:100%_100%,100%_100%,24px_24px]",
      "bg-slate-50/70",
    ].join(" "),
    cardClass:
      "border bg-background/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.14)]",
    cardHeaderClass: "bg-gradient-to-r from-muted/65 via-muted/35 to-muted/15",
    cardInnerClass: "bg-gradient-to-b from-background via-background to-muted/20",
    railCardClass: "border bg-background/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
    sectionBadgeClass: "border-border/70 bg-background/85 text-foreground",
  },
  nova: {
    canvasClass: [
      "bg-[radial-gradient(circle_at_10%_0%,rgba(14,165,233,0.14),transparent_36%),radial-gradient(circle_at_90%_100%,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_1px_1px,rgba(51,65,85,0.24)_1px,transparent_0)]",
      "[background-size:100%_100%,100%_100%,26px_26px]",
      "bg-slate-100/75",
    ].join(" "),
    cardClass:
      "border bg-white/95 shadow-[0_12px_32px_rgba(30,41,59,0.14)] hover:shadow-[0_24px_48px_rgba(30,41,59,0.18)]",
    cardHeaderClass: "bg-gradient-to-r from-white via-slate-50 to-slate-100/80",
    cardInnerClass: "bg-white",
    railCardClass: "border bg-white/95 shadow-[0_12px_32px_rgba(30,41,59,0.14)]",
    sectionBadgeClass: "border-slate-300/80 bg-white text-slate-700",
  },
  vega: {
    canvasClass: [
      "bg-[linear-gradient(140deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.88)_100%),radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.30)_1px,transparent_0)]",
      "[background-size:100%_100%,22px_22px]",
      "bg-zinc-100/70",
    ].join(" "),
    cardClass:
      "border bg-white/90 shadow-[0_10px_24px_rgba(63,63,70,0.12)] hover:shadow-[0_20px_40px_rgba(63,63,70,0.16)]",
    cardHeaderClass: "bg-gradient-to-r from-zinc-100/90 via-white to-zinc-100/70",
    cardInnerClass: "bg-gradient-to-b from-white to-zinc-50/70",
    railCardClass: "border bg-white/90 shadow-[0_10px_24px_rgba(63,63,70,0.12)]",
    sectionBadgeClass: "border-zinc-300/75 bg-white/90 text-zinc-700",
  },
}

const COMPONENT_LABELS = COMPONENT_ITEMS.reduce(
  (accumulator, item) => {
    accumulator[item.id] = item.label
    return accumulator
  },
  {} as Record<ComponentItem, string>
)

const WIDE_COMPONENTS = new Set<ComponentItem>([
  "table",
  "tabs",
  "form",
  "calendar",
  "date-range-picker",
  "scroll-area",
  "card",
])

const ADVANCED_COMPONENTS: ComponentItem[] = [
  "date-range-picker",
  "calendar",
  "pagination",
  "stepper",
  "button-group",
  "loading",
  "sonner",
  "drawer",
  "dialog",
  "alert-dialog",
  "popover",
  "dropdown-menu",
  "scroll-area",
  "form",
]

function isInteractivePanTarget(target: HTMLElement) {
  return Boolean(
    target.closest(
      [
        "button",
        "a",
        "input",
        "textarea",
        "select",
        "label",
        "[role='button']",
        "[role='link']",
        "[role='checkbox']",
        "[role='switch']",
        "[role='tab']",
        "[role='menuitem']",
        "[contenteditable='true']",
        "[data-no-pan='true']",
      ].join(",")
    )
  )
}

function sourcePath(component: ComponentItem) {
  return `src/components/ui/${component}.tsx`
}

function PaginationDemo() {
  const [page, setPage] = React.useState(2)
  return <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
}

function FormDemo({ primaryClass }: { primaryClass: string }) {
  const form = useForm<{ teamName: string }>({
    defaultValues: {
      teamName: "sealos-ui",
    },
  })

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit((values) => {
          toast.success(`Saved ${values.teamName}`)
        })}
      >
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem className="gap-2 rounded-xl p-4">
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This uses the library's Form primitives.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={primaryClass} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

function SonnerDemo({ primaryClass }: { primaryClass: string }) {
  return (
    <div className="space-y-3">
      <Button
        className={primaryClass}
        onClick={() => {
          toast("Component toast", {
            description: "Rendered via Toaster from src/components/ui/sonner.tsx",
          })
        }}
      >
        Trigger Toast
      </Button>
      <Toaster theme="light" />
    </div>
  )
}

function ComponentDemo({
  component,
  primaryClass,
}: {
  component: ComponentItem
  primaryClass: string
}) {
  if (component === "alert") {
    return (
      <Alert>
        <Info className="size-4" />
        <AlertTitle>Deployment queued</AlertTitle>
        <AlertDescription>Runtime will restart automatically after migration.</AlertDescription>
      </Alert>
    )
  }

  if (component === "alert-dialog") {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Alert Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (component === "avatar") {
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
      </div>
    )
  }

  if (component === "badge") {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    )
  }

  if (component === "breadcrumb") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  if (component === "button") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button className={primaryClass}>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    )
  }

  if (component === "button-group") {
    return (
      <ButtonGroup>
        {[
          <Button key="left" variant="outline">
            Left
          </Button>,
          <Button key="middle" variant="outline">
            Middle
          </Button>,
          <Button key="right" variant="outline">
            Right
          </Button>,
        ]}
      </ButtonGroup>
    )
  }

  if (component === "calendar") {
    return <Calendar className="rounded-xl border" mode="single" selected={new Date()} />
  }

  if (component === "card") {
    return (
      <Card className="w-full max-w-[360px] overflow-hidden">
        <CardHeader className="gap-1.5 p-4 pb-3">
          <CardTitle>Runtime Summary</CardTitle>
          <CardDescription className="leading-snug">
            Card primitives from src/components/ui/card.tsx.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-3xl font-semibold leading-none tracking-tight">US$12.94</p>
        </CardContent>
      </Card>
    )
  }

  if (component === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <Checkbox id="cb-a" defaultChecked />
        <Label htmlFor="cb-a">Enable autoscaling</Label>
      </div>
    )
  }

  if (component === "date-range-picker") {
    return <DateRangePicker />
  }

  if (component === "dialog") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Package</DialogTitle>
            <DialogDescription>Dialog from src/components/ui/dialog.tsx.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button className={primaryClass}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (component === "drawer") {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Project Settings</DrawerTitle>
            <DrawerDescription>Drawer from src/components/ui/drawer.tsx.</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 py-3 text-sm text-muted-foreground">Workspace policy and quota settings.</div>
          <DrawerFooter>
            <Button className={primaryClass}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  if (component === "dropdown-menu") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Move</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (component === "form") {
    return <FormDemo primaryClass={primaryClass} />
  }

  if (component === "input") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        <Input placeholder="Workspace name" />
        <Input placeholder="team@labring.com" type="email" />
      </div>
    )
  }

  if (component === "label") {
    return (
      <div className="grid gap-2">
        <Label htmlFor="label-demo">Email</Label>
        <Input id="label-demo" placeholder="name@example.com" />
      </div>
    )
  }

  if (component === "loading") {
    return (
      <div className="relative h-20 rounded-xl border bg-muted/30">
        <Loading fixed={false} size="sm" />
      </div>
    )
  }

  if (component === "pagination") {
    return <PaginationDemo />
  }

  if (component === "popover") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <p className="text-sm">Popover content from src/components/ui/popover.tsx.</p>
        </PopoverContent>
      </Popover>
    )
  }

  if (component === "progress") {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Migration</span>
          <span>68%</span>
        </div>
        <Progress value={68} />
      </div>
    )
  }

  if (component === "radio-group") {
    return (
      <RadioGroup defaultValue="team">
        <div className="flex items-center gap-2">
          <RadioGroupItem id="rg-team" value="team" />
          <Label htmlFor="rg-team">Team Plan</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="rg-pro" value="pro" />
          <Label htmlFor="rg-pro">Pro Plan</Label>
        </div>
      </RadioGroup>
    )
  }

  if (component === "scroll-area") {
    return (
      <ScrollArea className="h-28 rounded-xl border">
        <div className="space-y-2 p-3 text-sm">
          {Array.from({ length: 8 }).map((_, index) => (
            <p key={index}>Scrollable row {index + 1}</p>
          ))}
        </div>
      </ScrollArea>
    )
  }

  if (component === "select") {
    return (
      <Select defaultValue="starter">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  if (component === "separator") {
    return (
      <div className="space-y-2 text-sm">
        <p>Above separator</p>
        <Separator />
        <p>Below separator</p>
      </div>
    )
  }

  if (component === "skeleton") {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-4 w-[65%]" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (component === "slider") {
    return <Slider defaultValue={[30, 70]} max={100} min={0} step={1} />
  }

  if (component === "sonner") {
    return <SonnerDemo primaryClass={primaryClass} />
  }

  if (component === "stepper") {
    return (
      <Stepper activeStep={1}>
        <Step>
          <StepIndicator>1</StepIndicator>
          <span className="mt-1 text-xs">Init</span>
        </Step>
        <Step>
          <StepIndicator>2</StepIndicator>
          <span className="mt-1 text-xs">Build</span>
        </Step>
        <Step>
          <StepIndicator>3</StepIndicator>
          <span className="mt-1 text-xs">Deploy</span>
        </Step>
      </Stepper>
    )
  }

  if (component === "switch") {
    return (
      <div className="flex items-center gap-2">
        <Switch defaultChecked />
        <Label>Enable metrics</Label>
      </div>
    )
  }

  if (component === "table") {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>api-gateway</TableCell>
            <TableCell>
              <Badge variant="secondary">Healthy</Badge>
            </TableCell>
            <TableCell>24ms</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>workspace-core</TableCell>
            <TableCell>
              <Badge variant="outline">Syncing</Badge>
            </TableCell>
            <TableCell>63ms</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  if (component === "tabs") {
    return (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
        <TabsContent className="text-sm text-muted-foreground" value="overview">
          Overview tab content.
        </TabsContent>
        <TabsContent className="text-sm text-muted-foreground" value="network">
          Network tab content.
        </TabsContent>
      </Tabs>
    )
  }

  if (component === "textarea") {
    return <Textarea placeholder="Describe your deployment plan..." />
  }

  if (component === "tooltip") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip from src/components/ui/tooltip.tsx.</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Alert>
      <TriangleAlert className="size-4" />
      <AlertTitle>Missing demo</AlertTitle>
      <AlertDescription>No demo configured for {component}.</AlertDescription>
    </Alert>
  )
}

function GalleryCard({
  component,
  primaryClass,
  radiusClass,
  headingStyle,
  styleConfig,
  baseColorConfig,
}: {
  component: ComponentItem
  primaryClass: string
  radiusClass: string
  headingStyle?: React.CSSProperties
  styleConfig: PreviewStyleConfig
  baseColorConfig: PreviewBaseColorConfig
}) {
  const maxWidthClass = WIDE_COMPONENTS.has(component) ? "max-w-[620px]" : "max-w-[360px]"

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden transition-all duration-200 motion-reduce:transition-none hover:-translate-y-0.5",
        styleConfig.cardClass,
        baseColorConfig.cardToneClass,
        radiusClass
      )}
    >
      <CardHeader className={cn("gap-1 rounded-t-[inherit] px-4 py-3", styleConfig.cardHeaderClass)}>
        <div className="flex items-start gap-2">
          <div>
            <CardTitle className="text-base" style={headingStyle}>
              {COMPONENT_LABELS[component]}
            </CardTitle>
            <CardDescription className="font-mono text-[11px]">
              {sourcePath(component)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[170px] items-center justify-center px-4 pb-5 pt-3">
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-center rounded-xl px-3 py-3",
            styleConfig.cardInnerClass,
            baseColorConfig.innerToneClass,
            maxWidthClass
          )}
        >
          <ComponentDemo component={component} primaryClass={primaryClass} />
        </div>
      </CardContent>
    </Card>
  )
}

function GalleryPage({
  item,
  primaryClass,
  radiusClass,
  headingStyle,
  styleConfig,
  themeConfig,
  baseColorConfig,
}: {
  item: DemoItem
  primaryClass: string
  radiusClass: string
  headingStyle?: React.CSSProperties
  styleConfig: PreviewStyleConfig
  themeConfig: PreviewThemeConfig
  baseColorConfig: PreviewBaseColorConfig
}) {
  if (item === "component-lab") {
    return null
  }

  const group = PREVIEW_GROUPS[item]
  const gridClass = "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4">
      <div className="flex items-end justify-between gap-4 px-1">
        <div className="space-y-1.5">
          <Badge
            className={cn(
              "rounded-full px-2.5 py-0 text-[10px] font-semibold tracking-[0.14em]",
              styleConfig.sectionBadgeClass,
              themeConfig.sectionBadgeClass,
              baseColorConfig.badgeToneClass
            )}
            variant="outline"
          >
            CANVAS {PREVIEW_INDEX[item]}
          </Badge>
          <h3 className="text-xl font-semibold" style={headingStyle}>
            {group.title}
          </h3>
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </div>
        <Badge className={cn(baseColorConfig.badgeToneClass, themeConfig.countBadgeClass)} variant="outline">
          {group.items.length} components
        </Badge>
      </div>
      <div className={cn("grid gap-5 justify-items-center", gridClass)}>
        {group.items.map((component) => (
          <div key={component} className="w-full max-w-[430px]">
            <GalleryCard
              baseColorConfig={baseColorConfig}
              component={component}
              headingStyle={headingStyle}
              primaryClass={primaryClass}
              radiusClass={radiusClass}
              styleConfig={styleConfig}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function ComponentLab({
  primaryClass,
  radiusClass,
  headingStyle,
  styleConfig,
  themeConfig,
  baseColorConfig,
}: {
  primaryClass: string
  radiusClass: string
  headingStyle?: React.CSSProperties
  styleConfig: PreviewStyleConfig
  themeConfig: PreviewThemeConfig
  baseColorConfig: PreviewBaseColorConfig
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 py-4">
      <div className="flex items-end justify-between gap-4 px-1">
        <div className="space-y-1.5">
          <Badge
            className={cn(
              "rounded-full px-2.5 py-0 text-[10px] font-semibold tracking-[0.14em]",
              styleConfig.sectionBadgeClass,
              themeConfig.sectionBadgeClass,
              baseColorConfig.badgeToneClass
            )}
            variant="outline"
          >
            COMPONENTS
          </Badge>
          <h3 className="text-xl font-semibold" style={headingStyle}>
            Advanced Components
          </h3>
          <p className="text-sm text-muted-foreground">
            Extra components beyond base shadcn primitives, including date picking, step flows and composite patterns.
          </p>
        </div>
        <Badge className={cn(baseColorConfig.badgeToneClass, themeConfig.countBadgeClass)} variant="outline">
          {ADVANCED_COMPONENTS.length} components
        </Badge>
      </div>

      <div className="grid gap-5 justify-items-center grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {ADVANCED_COMPONENTS.map((component) => (
          <div key={component} className="w-full max-w-[430px]">
            <GalleryCard
              baseColorConfig={baseColorConfig}
              component={component}
              headingStyle={headingStyle}
              primaryClass={primaryClass}
              radiusClass={radiusClass}
              styleConfig={styleConfig}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Preview() {
  const { state } = useDesignSystem()

  const zoom = 90
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isDraggingCanvas, setIsDraggingCanvas] = React.useState(false)

  const dragContextRef = React.useRef({
    pointerStartX: 0,
    pointerStartY: 0,
    offsetStartX: 0,
    offsetStartY: 0,
  })

  const primaryClass = THEME_BUTTON_CLASS[state.theme]
  const radiusClass = RADIUS_CLASS[state.radius]
  const styleConfig = STYLE_CLASS[state.style]
  const themeConfig = THEME_CLASS[state.theme]
  const baseColorConfig = BASE_COLOR_CLASS[state.baseColor]

  const bodyStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      fontFamily: BODY_FONT[state.font],
    }
  }, [state.font])

  const headingStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      fontFamily: HEADING_FONT[state.heading],
    }
  }, [state.heading])

  const onCanvasMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return
    }

    const target = event.target as HTMLElement
    if (isInteractivePanTarget(target)) {
      return
    }

    setIsDraggingCanvas(true)
    dragContextRef.current = {
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
      offsetStartX: offset.x,
      offsetStartY: offset.y,
    }
  }

  const onCanvasMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingCanvas) {
      return
    }

    const deltaX = event.clientX - dragContextRef.current.pointerStartX
    const deltaY = event.clientY - dragContextRef.current.pointerStartY

    setOffset({
      x: dragContextRef.current.offsetStartX + deltaX,
      y: dragContextRef.current.offsetStartY + deltaY,
    })
  }

  const stopCanvasDragging = () => {
    setIsDraggingCanvas(false)
  }

  const sceneWidth = "w-[1360px]"

  return (
    <div className="relative flex h-[calc(100svh-2rem)] min-h-[680px] min-w-0 flex-1 overflow-hidden rounded-3xl border bg-background ring-1 ring-border">
      <div
        className={cn(
          "relative flex-1 overflow-hidden",
          "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
          "after:pointer-events-none after:absolute after:inset-0 after:content-['']",
          styleConfig.canvasClass,
          themeConfig.canvasOverlayClass,
          baseColorConfig.canvasOverlayClass,
          isDraggingCanvas ? "cursor-grabbing" : "cursor-grab"
        )}
        style={bodyStyle}
        onMouseDown={onCanvasMouseDown}
        onMouseLeave={stopCanvasDragging}
        onMouseMove={onCanvasMouseMove}
        onMouseUp={stopCanvasDragging}
      >
        <div className="pointer-events-none absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border bg-background/95 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
          <Grip className="size-3.5" />
          Drag to pan
        </div>

        <div
          className={cn("absolute top-4 left-4 pb-24", sceneWidth)}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          {state.item === "component-lab" ? (
            <ComponentLab
              baseColorConfig={baseColorConfig}
              headingStyle={headingStyle}
              primaryClass={primaryClass}
              radiusClass={radiusClass}
              styleConfig={styleConfig}
              themeConfig={themeConfig}
            />
          ) : (
            <GalleryPage
              baseColorConfig={baseColorConfig}
              headingStyle={headingStyle}
              item={state.item}
              primaryClass={primaryClass}
              radiusClass={radiusClass}
              styleConfig={styleConfig}
              themeConfig={themeConfig}
            />
          )}
        </div>
      </div>

      <PreviewSwitcher />
    </div>
  )
}
