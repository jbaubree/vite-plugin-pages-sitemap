import type { RouteRecordRaw } from 'vue-router'

/**
 * Plugin options.
 */
interface Options {
  /**
   * Base URI
   * @default 'http://localhost/'
   */
  hostname: string
  /**
   * Generated routes from vite-plugin-pages
   * @default []
   */
  routes: RouteRecordRaw[]
  /**
   * File name
   * @default 'sitemap'
   */
  filename: string
  /**
   * Destination path
   * @default 'public'
   */
  dest: string
  /**
   * Change frequency option for sitemap
   * @default 'daily'
   */
  changefreq: string
  /**
   * Priority option for sitemap
   * @default 1
   */
  priority: number
  /**
   * Last modification option for sitemap
   * @default new Date()
   */
  lastmod: Date
  /**
   * Is Nuxt.js style route naming
   * @default false
   */
  nuxtStyle: boolean
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Options {}
