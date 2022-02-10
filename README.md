# vite-plugin-pages-sitemap

> vite-plugin-pages based sitemap generator

## Getting Started

### Vue

Install:

```bash
npm install -D vite-plugin-pages
npm install -D vite-plugin-pages-sitemap
npm install vue-router@next
```

### Vite config

Add to your `vite.config.js`:

```js
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'
import type { RouteRecordRaw } from 'vue-router'

export default {
  plugins: [
    // ...
    Pages({
      onRoutesGenerated: (routes: RouteRecordRaw[]) => (generateSitemap({ routes })),
    }),
  ],
};
```

> ⚠️ Dynamic routes will not be generated! 

### hostname

- **Type:** `string`
- **Default:** `'http://localhost/'`

Base URI.

### routes

- **Type:** `RouteRecordRaw[]`
- **Default:** `[]`

Generated routes from vite-plugin-pages.

### filename

- **Type:** `string`
- **Default:** `'sitemap'`

File name.

### dest

- **Type:** `string`
- **Default:** `'public'`

Destination path.

### changefreq

- **Type:** `string`
- **Default:** `'daily'`

Change frequency option for sitemap.

### priority

- **Type:** `number`
- **Default:** `1`

Priority option for sitemap.

### lastmod

- **Type:** `Date`
- **Default:** `new Date()`

Last modification option for sitemap.

### nuxtStyle

- **Type:** `boolean`
- **Default:** `false`

Is Nuxt.js style route naming.

## License

MIT License © 2021 [jbaubree](https://github.com/jbaubree)
