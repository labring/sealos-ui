# @labring/sealos-ui

Shared shadcn-based UI components for Sealos frontend apps.

## Getting started (Next.js / React apps)

### 1) Install dependencies

```sh
# package + peer deps
pnpm add @labring/sealos-ui react-hook-form sonner

# Tailwind v4 + PostCSS
pnpm add -D tailwindcss @tailwindcss/postcss postcss
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
    '@tailwindcss/postcss': {}
  }
};
```

### 3) Import styles in your app entry stylesheet

Import in your root stylesheet (for example `global.css`):

```css
/* Tailwind CSS, theme tokens and base shared styles */
@import '@labring/sealos-ui/shadcn.css';

/* Tailwind @source path for shared UI components */
@import '@labring/sealos-ui/styles.css';
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

### Adding component/hook with shadcn CLI

See: [shadcn/ui docs](https://ui.shadcn.com/docs/cli)
