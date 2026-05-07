---
name: sealos-design
description: Use when designing, reviewing, polishing, or implementing Sealos frontend product UI, including Sealos Cloud provider consoles, shared UI components, Devbox, Registry, AI Proxy, admin/resource dashboards, tables, forms, dialogs, drawers, onboarding, empty states, CLI/code-copy flows, and design-system extraction. Prefer Sealos product patterns over generic SaaS, marketing, or decorative UI.
---

# Sealos Design

Design Sealos product UI as a calm, dense cloud workbench. The interface should feel reliable, compact, and operational: users are managing resources, costs, images, keys, logs, templates, clusters, and runtime state. Design serves repeated work.

## First Moves

1. Identify the surface:
   - App shell, provider console, resource list, resource detail, create/edit form, template gallery, table-heavy admin page, registry tree/table, dialog, drawer, empty state, onboarding guide, code/YAML/CLI block, or shared component.
2. Inspect the local product before designing:
   - In this repo, start with `src/styles/theme.css`, `src/styles/shadcn.css`, and `src/components/ui/*`.
   - In Sealos frontend apps, read the nearest page/component plus the local global styles and imports.
   - For legacy Chakra apps, reuse the shared theme ideas from `frontend/packages/ui/src/theme/*`.
   - For newer Tailwind/Radix apps, prefer `@labring/sealos-ui` or `@sealos/shadcn-ui` components before writing custom primitives.
3. State one design sentence before editing:
   - "This is a Sealos product surface for [user/task], so the UI will prioritize [scan/action/status] with [density level] and [primary component pattern]."

Do not make a landing page, hero section, decorative marketing composition, or generic card grid unless the user explicitly asks for a marketing surface.

## Product Character

- Utility first: orient the user, show live state, make the next action obvious.
- Calm density: compact controls and tables are good when they help scanning. Avoid oversized empty whitespace.
- Resource-native language: surface resource names, namespaces, tags, versions, runtime icons, status, quotas, ports, image tags, and commands directly.
- Conservative polish: subtle borders, restrained shadows, clear hover/focus, and purposeful icons. No visual theatrics.
- Consistent with the current app first. If an app is Chakra-based, do not introduce a shadcn island casually. If it is shadcn/Tailwind-based, do not import Chakra for one control.

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
- Sidebars and trees are functional navigation, not decoration. Registry-style resource trees can sit at about 300px on desktop and collapse/stack on small screens.
- Avoid nested cards. If a page already has an app shell, repeated resources may be cards, but sections themselves should be unframed layouts or simple panels.

Resource list:
- First screen should show title, search/filter, primary action, and the resource list/table.
- Prefer table/list views for operational resources: status, name, runtime/image, usage mini chart, created time, actions.
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

Admin/log/config pages:
- Tables are the primary surface. Put filters above the table, keep pagination visible, and make selected/batch state obvious.
- Mapping/config editors should use compact input rows with add/remove actions, not long prose.
- Logs should emphasize time, status, model/channel/resource, token/price/count fields, and a detail affordance.

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

## Copy

- Prefer direct verbs: Create, Import, Upload, Delete, Restart, Open, Copy, Refresh, Deploy.
- Use product nouns users recognize: DevBox, Runtime, Template, Repository, Image Tag, Access Key, Namespace, Channel, Model, Port, Quota.
- Keep helper text short and adjacent to the relevant field.
- Do not add in-app text that describes visual design, shortcuts, or how polished the UI is.

## Anti-Patterns

Rewrite if you see these:
- Marketing hero in a provider console.
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
- Run the repo's narrow type/lint/build command when feasible.
- Open or screenshot the changed surface when a browser is available.
- Check desktop width and a narrow mobile width for overflow, clipped text, hidden actions, and table behavior.
- Confirm loading, empty, error, disabled, hover, focus, selected, and destructive states for the touched surface.

## Refreshing This Skill

When updating the skill from live Sealos code, sample these areas:
- `sealos-ui/src/styles/*` and `sealos-ui/src/components/ui/*`
- `sealos/frontend/packages/ui/src/theme/*`
- `sealos/frontend/packages/shadcn-ui/src/components/ui/*`
- `sealos/frontend/providers/devbox/app/**`
- `sealos/frontend/providers/aiproxy/app/**` and `components/**`
- `sealos-registry/frontend/src/app/**` and `src/components/**`

Useful search patterns:

```sh
rg -n "grayModern|brightBlue|@sealos/shadcn-ui|@labring/sealos-ui|@chakra-ui|lucide-react|Table|Dialog|Drawer|Badge|Status|Empty" .
rg -n "rounded|border|shadow|bg-zinc|text-zinc|hover:bg|focus-visible|toast|copy" .
```

Summarize evidence into design rules. Do not paste large source excerpts into the skill.
