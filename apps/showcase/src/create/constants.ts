import type {
  BaseColor,
  ChartColor,
  ComponentItem,
  DemoItem,
  DesignState,
  FontBody,
  FontHeading,
  IconLibrary,
  MenuAccent,
  RadiusName,
  StyleName,
  ThemeName,
} from "./types"

export const DEMO_ITEMS: Array<{ id: DemoItem; title: string; detail: string }> = [
  {
    id: "preview-01",
    title: "Foundations",
    detail: "Inputs, actions, and basic form controls",
  },
  {
    id: "preview-02",
    title: "Data & Navigation",
    detail: "Table, tabs, cards and navigation primitives",
  },
  {
    id: "preview-03",
    title: "Overlays & Feedback",
    detail: "Dialogs, drawers, pickers and realtime feedback",
  },
  {
    id: "component-lab",
    title: "Components",
    detail: "Advanced and composite components",
  },
]

export const STYLE_OPTIONS: Array<{ value: StyleName; label: string }> = [
  { value: "luma", label: "Luma" },
  { value: "nova", label: "Nova" },
  { value: "vega", label: "Vega" },
]

export const BASE_COLOR_OPTIONS: Array<{ value: BaseColor; label: string }> = [
  { value: "neutral", label: "Neutral" },
  { value: "slate", label: "Slate" },
  { value: "stone", label: "Stone" },
]

export const THEME_OPTIONS: Array<{ value: ThemeName; label: string }> = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "violet", label: "Violet" },
]

export const CHART_COLOR_OPTIONS: Array<{ value: ChartColor; label: string }> = [
  { value: "emerald", label: "Emerald" },
  { value: "cyan", label: "Cyan" },
  { value: "rose", label: "Rose" },
]

export const FONT_HEADING_OPTIONS: Array<{ value: FontHeading; label: string }> = [
  { value: "geist", label: "Geist" },
  { value: "manrope", label: "Manrope" },
  { value: "sora", label: "Sora" },
]

export const FONT_BODY_OPTIONS: Array<{ value: FontBody; label: string }> = [
  { value: "geist", label: "Geist" },
  { value: "inter", label: "Inter" },
  { value: "dm-sans", label: "DM Sans" },
]

export const ICON_LIBRARY_OPTIONS: Array<{ value: IconLibrary; label: string }> = [
  { value: "hugeicons", label: "Hugeicons" },
  { value: "lucide", label: "Lucide" },
  { value: "tabler", label: "Tabler" },
]

export const RADIUS_OPTIONS: Array<{ value: RadiusName; label: string }> = [
  { value: "default", label: "Default" },
  { value: "soft", label: "Soft" },
  { value: "sharp", label: "Sharp" },
]

export const MENU_ACCENT_OPTIONS: Array<{ value: MenuAccent; label: string }> = [
  { value: "subtle", label: "Subtle" },
  { value: "bold", label: "Bold" },
]

export const COMPONENT_ITEMS: Array<{ id: ComponentItem; label: string }> = [
  { id: "alert", label: "Alert" },
  { id: "alert-dialog", label: "Alert Dialog" },
  { id: "avatar", label: "Avatar" },
  { id: "badge", label: "Badge" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "button", label: "Button" },
  { id: "button-group", label: "Button Group" },
  { id: "calendar", label: "Calendar" },
  { id: "card", label: "Card" },
  { id: "checkbox", label: "Checkbox" },
  { id: "date-range-picker", label: "Date Range Picker" },
  { id: "dialog", label: "Dialog" },
  { id: "drawer", label: "Drawer" },
  { id: "dropdown-menu", label: "Dropdown Menu" },
  { id: "form", label: "Form" },
  { id: "input", label: "Input" },
  { id: "label", label: "Label" },
  { id: "loading", label: "Loading" },
  { id: "pagination", label: "Pagination" },
  { id: "popover", label: "Popover" },
  { id: "progress", label: "Progress" },
  { id: "radio-group", label: "Radio Group" },
  { id: "scroll-area", label: "Scroll Area" },
  { id: "select", label: "Select" },
  { id: "separator", label: "Separator" },
  { id: "skeleton", label: "Skeleton" },
  { id: "slider", label: "Slider" },
  { id: "sonner", label: "Sonner" },
  { id: "stepper", label: "Stepper" },
  { id: "switch", label: "Switch" },
  { id: "table", label: "Table" },
  { id: "tabs", label: "Tabs" },
  { id: "textarea", label: "Textarea" },
  { id: "tooltip", label: "Tooltip" },
]

export const INITIAL_DESIGN_STATE: DesignState = {
  item: "preview-01",
  componentItem: "button",
  style: "luma",
  baseColor: "neutral",
  theme: "blue",
  chartColor: "emerald",
  heading: "geist",
  font: "geist",
  iconLibrary: "hugeicons",
  radius: "default",
  menuAccent: "subtle",
  previewMode: "desktop",
}
