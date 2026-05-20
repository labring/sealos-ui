---
name: sealos-design
description: Use when a Sealos developer is designing, implementing, or polishing frontend UI and wants it to match the Sealos product style. Applies to Sealos-style launchers, product consoles, management panels, resource lists, detail pages, tables, forms, dialogs, drawers, empty states, and shared components. Focus on Sealos visual language, interaction density, component behavior, and product tone.
---

# Sealos Design

Design frontend UI that feels native to Sealos. The goal is not to recreate a known page, but to use Sealos visual language in a task-appropriate interface: light surfaces, quiet density, compact controls, resource-native content, restrained motion, and clear operational hierarchy.

## First Moves

1. Identify the surface:
   - Desktop launcher, app dock, app shell, provider console, resource list, resource detail, create/edit form, template gallery, table-heavy admin page, registry tree/table, dialog, drawer, empty state, onboarding guide, code/YAML/CLI block, or shared component.
2. Follow the implementation context:
   - Reuse the current project's components, tokens, theme, icon system, and framework conventions before inventing new primitives.
   - If the surrounding app already has a mature pattern for buttons, tables, tabs, dialogs, drawers, status, pagination, or toasts, extend that pattern.
   - Keep framework boundaries clean. Do not mix UI stacks casually inside one feature.
3. State one design sentence before editing:
   - "This is a Sealos [surface register] for [user/task], so the UI will use [density/surface/control/status/icon/motion cues] in a task-native layout."

Do not make a landing page, hero section, decorative marketing composition, or generic card grid unless the user explicitly asks for a marketing surface.

## Design Goal

Use Sealos style as a design language, not as a fixed layout.

- Extract invariants: light canvas, restrained contrast, compact typography, thin borders, soft depth, black primary actions, white outline secondary actions, small green status dots, muted table headers, exact copy/command affordances, and purposeful icons.
- Separate invariants from situational structure. A Registry tree, Docker command panel, DevBox IDE button, Desktop app grid, or monitoring chart belongs only when the new task has the same job.
- Design the new workflow first. Decide what the user needs to scan, compare, configure, or launch, then apply Sealos spacing, tokens, surfaces, and interaction tone.
- Never reuse product data, namespaces, app labels, command strings, timestamps, or domain-specific structure unless the user asked for that real content.
- If a draft feels like literal pieces stitched from existing Sealos products, redo the information architecture and keep only the shared style cues.

## Product Character

- Utility first: orient the user, show live state, make the next action obvious.
- Calm density: compact controls and tables are good when they help scanning. Avoid oversized empty whitespace.
- Resource-native language: surface resource names, namespaces, tags, versions, runtime icons, status, quotas, ports, image tags, and commands directly.
- Conservative polish: subtle borders, restrained shadows, clear hover/focus, and purposeful icons. No visual theatrics.
- Consistent with the current app first. If an app is Chakra-based, do not introduce a shadcn island casually. If it is shadcn/Tailwind-based, do not import Chakra for one control.

## Surface Registers

Always pick one register before layout decisions. Registers are style lenses, not page recipes. Borrow only the cues that serve the new task.

Desktop launcher:
- Mental image: a light cloud desktop for launching apps. It is spacious, iconic, and OS-like, not analytical.
- Typical cues: almost-white background, configured bottom-cover background image, airy top system bar, balance pill, guide/docs links, user controls, large rounded app icons, soft shadows, and a subtle perspective floor/grid when the product context is Desktop.
- App grid is the primary content only for launcher tasks. Use centered columns, large gaps, and app icons as visual objects: about 64px on small screens and 78px on desktop, radius 18-24px, 1px translucent border, soft shadow.
- App labels are short, centered, about 14px/18px, medium weight, max two lines. Avoid descriptions, metrics, card bodies, and secondary actions under every icon.
- Desktop icon hover may scale slightly, around `1.05`, with a short ease-out transition. The motion should feel responsive, not bouncy.
- The dock is a floating utility affordance only for Desktop/app switching: white/translucent icon tiles around 54px, 16px radius, blur/shadow, optional label tooltip on hover.
- Empty space is part of the design. Do not fill Desktop with KPI cards, tables, provider summaries, or marketing copy.

Provider console:
- Mental image: a quiet light gray work area for managing resources. It is operational and sparse, with task-native controls and list/detail/table surfaces where they help scanning.
- Typical cues: `#FAFAFA` canvas, large top/side padding, simple title header, optional blue documentation link, search/filter controls, and actions on the right. Avoid dark app sidebars unless the real app already has one.
- Primary actions are black or near-black rectangular buttons, usually 40px high with 8-10px radius. Secondary actions are white outline buttons with tiny shadows.
- Lists can use a rounded header strip plus separate rounded resource rows, or one rounded bordered table shell. Choose by scan density and workflow complexity.
- Tables are the main surface. Header text is muted gray, rows are 48-64px, borders are thin, and pagination sits at the bottom right.
- Runtime/resource icons sit in 32-40px light icon tiles with a hairline border. Do not turn them into brand-heavy illustrations.
- Status is compact: usually a small green dot plus text, or a small soft badge. Do not use large colorful pills for ordinary healthy states.
- Metrics are understated: CPU/memory charts are thin blue/green lines with faint grid lines, not large KPI cards.
- Empty space is allowed. Do not feel obligated to fill the viewport with widgets if the real workflow is a sparse list.

Registry console:
- Use this register only for repository/image/tag management or a genuinely tree-like resource hierarchy.
- Cues: left tree navigation, indentation, muted text, ellipsis actions, active rows around `bg-black/5`, and a right-side detail/table workspace.
- A broad soft blue summary panel is appropriate when it summarizes a selected artifact and contains exact copyable commands or addresses. Do not place this panel on unrelated dashboards just because it looks Sealos.
- Docker or shell commands are first-class UI only when the workflow needs them. Use a monospace block, copy icon, exact host/resource string, and visible feedback.
- Version/tag lists belong in a rounded bordered table shell with muted headers, compact rows, bottom pagination, and inline icon actions.

Detail/edit console:
- Use this register for a selected resource with lifecycle actions, configuration, monitoring, networking, logs, or version history.
- Cues: slim tab rail or tabs, white rounded panels, `rounded-xl`, `border-[0.5px]`, `bg-white`, `shadow-xs`, and 24px padding.
- Put resource identity and lifecycle state in the header. Lifecycle actions sit on the right as icon buttons, segmented button groups, or a primary IDE/action button.
- Basic info, monitoring, network, release history, logs, and advanced config should read as operational panels, not analytics cards.
- Monitoring charts are thin and quiet, with subtle grid lines and precise tooltips. Avoid oversized dashboard visuals unless the page is explicitly a monitoring product.

Admin/log/config console:
- Tables are the primary surface. Put filters above the table, keep pagination visible, and make selected/batch state obvious.
- Mapping/config editors should use compact input rows with add/remove actions, not long prose.
- Logs should emphasize time, status, model/channel/resource, token/price/count fields, and a detail affordance.

Use the provider/admin rules only after confirming the surface is not Desktop. Use Desktop launcher rules only for the cloud desktop, app launcher, dock, and app-opening interactions.

## Stack Defaults

- New shared UI: React, Tailwind, Radix/shadcn-style primitives, `class-variance-authority`, `tailwind-merge`, and `lucide-react`.
- Existing Sealos monorepo apps may use Chakra. Follow their theme and component variants unless the task is explicitly migrating them.
- Use `lucide-react` icons for new product actions when an icon exists. Keep icons 16px in controls, 20-24px only for stronger identity or empty states.
- Use structured components for tables, dialogs, dropdowns, inputs, select, tooltip, badge, pagination, tabs, skeleton, and loading. Avoid ad hoc primitives when this repo already exports one.

## Core Tokens

Use existing tokens/classes when available. These values describe the Sealos visual center of gravity, not a mandate to hardcode.

| Role | Values |
|---|---|
| Page background | `#FAFAFA`, `#FBFBFC`, `#F7F8FA` |
| Surface | `#FFFFFF`, `oklch(1 0 0)` |
| Primary text/action | `#111824`, `#18181B`, `#0A0A0A` |
| Secondary text | `#485264`, `#667085`, `#71717A`, `#8A95A7` |
| Borders | `#E4E4E4`, `#E4E4E7`, `#E8EBF0`, `#DFE2EA` |
| Sealos blue accent | `#219BF4`, `#0884DD`, `#2563EB` |
| Success | `#12B76A`, `#039855`, soft `#EDFBF3` |
| Destructive | `#D92D20`, `#DC2626`, soft `#FEF3F2` |
| Warning | `#F79009`, soft `#FFFAEB` |

Desktop-specific values:
- App icons: 64-78px, radius 18-24px, subtle border `rgba(0,0,0,0.05)`, soft shadow close to `0 5px 8px -2px rgba(0,0,0,0.05)`.
- Dock icons: about 54px, radius 16px, white/translucent surface, backdrop blur, small label tooltip.
- Balance pill: about 36px high, radius 8px, soft blue gradient/tint, blue text.
- Desktop top links: about 40px high, 14px/500 text, light hover background, 8px radius.

Typography:
- Use the system stack with Chinese support: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `PingFang SC`, `Helvetica Neue`, `Arial`, `Noto Sans SC`, `sans-serif`.
- Product body defaults to 12-14px. Page titles are usually 20-30px, semibold. Section titles are usually 16-18px, medium/semibold.
- Use `font-medium` more than heavy bold. Sealos UI tends to use 500 as the strong weight.
- Do not use display fonts for product consoles.

Radius and depth:
- Controls: 6-8px.
- Small icon tiles and menu items: 6-8px.
- Cards/panels: 12px when compact, 16px for framed table shells or dialogs.
- Dialogs/drawers: 16px with a real shadow.
- Prefer border plus background step over large decorative shadows.

Spacing:
- Desktop provider pages often use 24-48px horizontal page padding.
- Header bars are commonly 72-96px tall when they carry title, search, and actions.
- Inputs/buttons are usually 32-40px high.
- Table header rows are around 40-42px; data rows should be compact but not cramped.

## Layout Patterns

App shell:
- Use a stable header plus a scrollable `min-h-0` content area.
- For Desktop, use top bar plus centered icon grid plus optional dock. Avoid a left navigation rail.
- Sidebars and trees are functional navigation, not decoration. Registry-style resource trees can sit at about 300-360px on desktop and collapse/stack on small screens.
- Ordinary provider list pages usually do not need a dark global sidebar. Prefer the product header plus content area first.
- Avoid nested cards. If a page already has an app shell, repeated resources may be cards, but sections themselves should be unframed layouts or simple panels.

Resource list:
- First screen should show title, search/filter, primary action, and the resource list/table.
- Prefer Sealos-style table/list views for operational resources: a rounded table header strip, separate rounded rows or a rounded bordered table shell, status, name, runtime/image, usage mini chart, created time, and actions.
- Keep row actions inline when primary, behind an ellipsis menu when secondary or destructive.
- Use hover states to reveal low-priority edit affordances, but preserve an accessible path through menus or visible controls.

Detail page:
- Put the resource identity and lifecycle actions in the header.
- Use tabs or a left detail nav for Basic, Network, Release, Logs, Monitoring, Advanced Config.
- Show status and risk near the resource title, not buried in content.
- Use code/YAML panels when configuration is central; preserve copy buttons and syntax readability.

Create/edit flow:
- Start from the user's goal, not from Kubernetes object structure.
- Group CPU, memory, GPU, storage, network, template/runtime, env, and advanced YAML into clear bands.
- Sliders are appropriate for resource amounts; selects/comboboxes for runtime, image, model, namespace, channel, and region.
- Show quota, price, validation, and irreversible consequences close to the control that causes them.

Registry:
- Keep the tree/table split. Users need folders/repositories on the left and image tags/details/actions on the right.
- Treat Docker commands as first-class UI. Use monospace blocks, copy buttons, exact registry host, and clear success/failure feedback.
- Upload/import progress needs stages, not a single spinner: uploading, validating, copying/importing, completed, failed.
- Access keys should be easy to copy but visually guarded.

Template/runtime gallery:
- Use compact cards with runtime icon, name, version selector, description, tags, and a clear select/create action.
- Icon tiles are usually 32px with `zinc-50`/light surface and a thin border.
- Card hover can raise intent by changing border to dark text color. Avoid heavy lift animations.

## Component Rules

Buttons:
- Primary actions are dark neutral or the app's existing primary. Secondary actions are outline/white with subtle border.
- Icon-only buttons must have tooltips or accessible labels.
- Destructive actions use red only at the point of risk, not across the whole page.

Inputs and selects:
- Default to 32-40px high, light surface, subtle border, clear placeholder, and visible focus ring.
- Use blue focus or border only when the surrounding app already does.
- Avoid long form labels that repeat section titles.

Tables:
- Use muted header text, light header background, compact rows, and hover background.
- Keep important identifiers selectable/truncatable with tooltip when needed.
- Use TanStack Table patterns when sorting/filtering/pagination are involved.

Status:
- Status tags should be compact and scannable. Use text plus soft tint or dot/icon where helpful.
- For normal running/healthy state, prefer green dot plus text over a large saturated badge.
- Preserve domain wording from the app and i18n files. Do not casually rename lifecycle states.
- Keep list status values in English unless the user explicitly asks to localize them.

Dialogs and drawers:
- Use dialogs for confirmation or tightly scoped edits. Use drawers when the user benefits from preserving list context.
- Titles should be concrete: "Delete repository", "Upload image tag", "Edit description".
- Confirmation copy should name the resource and the consequence.

Empty/loading/error:
- Loading can be a centered shared `Loading` component or skeletons that match the final layout.
- Empty states need one useful action. Do not explain the product in paragraphs.
- Error states should say what failed and expose retry or recovery when possible.

Copy and command UX:
- Copy buttons should write exact content and produce toast/status feedback.
- Code blocks need horizontal scroll, monospace font, and no truncation for commands.
- For shell commands, preserve registry host, namespace, repository, and tag exactly.

## Motion

Motion is quiet:
- Hover background/color, opacity reveal, small icon rotation for disclosure, spinner for refresh/loading.
- Use 150-220ms ease-out transitions.
- Do not animate layout-heavy properties or introduce bounce/elastic motion.
- No decorative particles, bokeh, gradient blobs, glassmorphism, or large animated hero effects in product consoles.
- Desktop launcher may use slight icon scale, dock expansion, blur, and label tooltips. Keep these tied to app launching/navigation.

## Copy

- Prefer direct verbs: Create, Import, Upload, Delete, Restart, Open, Copy, Refresh, Deploy.
- Use product nouns users recognize: DevBox, Runtime, Template, Repository, Image Tag, Access Key, Namespace, Channel, Model, Port, Quota.
- Keep helper text short and adjacent to the relevant field.
- Do not add in-app text that describes visual design, shortcuts, or how polished the UI is.

## Anti-Patterns

Rewrite if you see these:
- Copying another Sealos product page's layout, data, command block, tree, app grid, or button set when the new task has a different workflow.
- Stitching together literal parts from multiple Sealos products instead of designing one coherent task-native surface.
- Treating Sealos Desktop as a provider dashboard, management panel, KPI surface, or table page.
- Treating provider consoles as Desktop icon grids or decorative launchers.
- Marketing hero in a provider console.
- Dark global sidebar on a provider page where a simple title/header layout would fit better.
- KPI card grids as the first answer when the workflow is a sparse list or table.
- Purple/blue gradient page background, decorative orbs, glass cards, or generic SaaS card grids.
- A page made of cards when a table/list would scan better.
- Nested cards.
- Modal as the first answer for a workflow that should be inline or in a drawer.
- Mixing Chakra and shadcn in a new feature without a migration reason.
- Hardcoded color/radius/spacing when a local token or component variant exists.
- Table text that wraps unpredictably or actions that shift layout on hover.
- Hidden destructive actions with no confirmation.
- Empty states with no next action.

## Verification

Before handoff on implementation tasks:
- Compare against the design sentence: the result should feel Sealos-native while still serving the actual workflow.
- Run the repo's narrow type/lint/build command when feasible.
- Open the changed surface in a browser when feasible.
- Check desktop width and a narrow mobile width for overflow, clipped text, hidden actions, and table behavior.
- Confirm loading, empty, error, disabled, hover, focus, selected, and destructive states for the touched surface.
