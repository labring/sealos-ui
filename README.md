# @labring/sealos-ui

Shared shadcn-based UI components for Sealos frontend apps.

## Getting started (Next.js / React apps)

### 1) Install dependencies

```sh
# package + peer deps
pnpm add @labring/sealos-ui react-hook-form sonner

# Tailwind v3 + PostCSS
pnpm add -D tailwindcss@^3.4.19 tailwindcss-animate postcss autoprefixer
```

For workspace usage, you can also add this in `package.json`:

```jsonc
{
  "dependencies": {
    "@labring/sealos-ui": "workspace:^"
  }
}
```

### 2) Add PostCSS config

```js
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

### 3) Add package files to Tailwind content

```ts
// tailwind.config.ts
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@labring/sealos-ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
```

### 4) Import styles in your app entry stylesheet

Import in your root stylesheet only if the app does not already define Sealos theme tokens:

```css
/* Tailwind CSS + theme tokens + base shared styles */
@import '@labring/sealos-ui/shadcn.css';
```

## Usage

```tsx
import { Button, cn } from '@labring/sealos-ui';
```

Subpath import is also supported:

```tsx
import { Button } from '@labring/sealos-ui/button';
```

## Developing this package

```sh
pnpm typecheck
```

## Local Showcase App

The repository now includes a private showcase app generated with `shadcn create` at `apps/showcase`.
It is for local UI preview only and is not published to npm.

```sh
pnpm install
pnpm showcase:dev
```

Build preview app:

```sh
pnpm showcase:build
```

### Adding component/hook with shadcn CLI

See: [shadcn/ui docs](https://ui.shadcn.com/docs/cli)

## Sealos Design Skill

This repository also ships the `sealos-design` agent skill alongside the UI package.

Install it from the GitHub repo with the Skills CLI:

```sh
npx skills add mlhiter/sealos-ui --skill sealos-design
```

Or install by path:

```sh
npx skills add https://github.com/mlhiter/sealos-ui/tree/main/skills/sealos-design
```
