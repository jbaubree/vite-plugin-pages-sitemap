# vite-plugin-pages-sitemap

[![npm version](https://badgen.net/npm/v/vite-plugin-pages-sitemap)](https://www.npmjs.com/package/vite-plugin-pages-sitemap)
[![monthly downloads](https://badgen.net/npm/dm/vite-plugin-pages-sitemap)](https://www.npmjs.com/package/vite-plugin-pages-sitemap)
[![types](https://badgen.net/npm/types/vite-plugin-pages)](https://github.com/jbaubree/vite-plugin-pages-sitemap/blob/master/src/types.ts)
[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jbaubree/c7b3044dcd6c4203f33a3b93ca236ce1/raw/50691ecd5172277c1d3020224856b24883d44bb3/site-plugin-pages-sitemap__heads_master.json)](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jbaubree/c7b3044dcd6c4203f33a3b93ca236ce1/raw/50691ecd5172277c1d3020224856b24883d44bb3/site-plugin-pages-sitemap__heads_master.json)
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
      onRoutesGenerated: routes => (generateSitemap({ routes })),
    }),
  ],
};
```

### Dynamic routes

To generate dynamic routes, you can add them manually:

```js
export default {
  plugins: [
    // ...
    Pages({
      onRoutesGenerated: async(routes) => {
        const users = await api.get('/users')
        const dynamicRoutes = users.map(user => `/users/${user.name}`)
        generateSitemap(routes: [...routes, ...dynamicRoutes])
      },
    }),
  ],
};
```

You can find a working example in example folder.

### hostname

- **Type:** `string`
- **Default:** `'http://localhost/'`

Base URI.

### routes

- **Type:** `Route[] or/and string[]`
- **Default:** `[]`

Generated routes from vite-plugin-pages or/and strings as paths (ex: ['/user/1', '/user/2']) for manual dynamic routes.

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

### readable

- **Type:** `boolean`
- **Default:** `false`

Converts XML into a human readable format

### nuxtStyle

- **Type:** `boolean`
- **Default:** `false`

Is Nuxt.js style route naming.

### allowRobots

- **Type:** `boolean`
- **Default:** `true`

Allow robots crawl (in robots.txt file).

## License

MIT License © 2022 [jbaubree](https://github.com/jbaubree)
