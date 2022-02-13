import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'

const config = defineConfig({
  plugins: [
    Vue(),
    Pages({
      onRoutesGenerated: routes => (generateSitemap({ routes })),
    }),
  ],
})

export default config
