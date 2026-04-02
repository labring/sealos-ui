export type DemoItem = "preview-01" | "preview-02" | "preview-03" | "component-lab"

export type ComponentItem =
  | "alert"
  | "alert-dialog"
  | "avatar"
  | "badge"
  | "breadcrumb"
  | "button"
  | "button-group"
  | "calendar"
  | "card"
  | "checkbox"
  | "date-range-picker"
  | "dialog"
  | "drawer"
  | "dropdown-menu"
  | "form"
  | "input"
  | "label"
  | "loading"
  | "pagination"
  | "popover"
  | "progress"
  | "radio-group"
  | "scroll-area"
  | "select"
  | "separator"
  | "skeleton"
  | "slider"
  | "sonner"
  | "stepper"
  | "switch"
  | "table"
  | "tabs"
  | "textarea"
  | "tooltip"

export type StyleName = "luma" | "nova" | "vega"

export type BaseColor = "neutral" | "slate" | "stone"

export type ThemeName = "blue" | "green" | "amber" | "violet"

export type ChartColor = "emerald" | "cyan" | "rose"

export type FontHeading = "geist" | "manrope" | "sora"

export type FontBody = "geist" | "inter" | "dm-sans"

export type IconLibrary = "hugeicons" | "lucide" | "tabler"

export type RadiusName = "default" | "soft" | "sharp"

export type MenuAccent = "subtle" | "bold"

export type PreviewMode = "desktop" | "mobile"

export interface DesignState {
  item: DemoItem
  componentItem: ComponentItem
  style: StyleName
  baseColor: BaseColor
  theme: ThemeName
  chartColor: ChartColor
  heading: FontHeading
  font: FontBody
  iconLibrary: IconLibrary
  radius: RadiusName
  menuAccent: MenuAccent
  previewMode: PreviewMode
}
