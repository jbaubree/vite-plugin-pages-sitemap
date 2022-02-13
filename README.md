# vite-plugin-pages-sitemap

[![npm version](https://badgen.net/npm/v/vite-plugin-pages-sitemap)](https://www.npmjs.com/package/vite-plugin-pages-sitemap)
[![monthly downloads](https://badgen.net/npm/dm/vite-plugin-pages-sitemap)](https://www.npmjs.com/package/vite-plugin-pages-sitemap)
[![types](https://badgen.net/npm/types/vite-plugin-pages)](https://github.com/jbaubree/vite-plugin-pages-sitemap/blob/master/src/types.ts)
[![license](https://badgen.net/npm/license/vite-plugin-pages)](https://github.com/jbaubree/vite-plugin-pages-sitemap/blob/master/LICENSE)

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/jbaubree/vite-plugin-pages-sitemap)

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

export default {
  plugins: [
    // ...
    Pages({
      onRoutesGenerated: (routes) => (generateSitemap({ routes })),
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

- **Type:** `Route[]`
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