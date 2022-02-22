import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'
import { getNames } from './src/api/fakeApi'

const config = defineConfig({
  plugins: [
    Vue(),
    Pages({
      onRoutesGenerated: async(routes) => {
        const names = await getNames()
        const dynamicRoutes = names.map(name => `/names/${name}`)
        generateSitemap({
          hostname: 'https://mywebsite.com/',
          routes: [...routes, ...dynamicRoutes],
          readable: true,
        })
      },
    }),
  ],
})

export default config
