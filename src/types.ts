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
  routes: any[]
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
   * Converts XML into a human readable format
   * @default false
   */
  readable: boolean
  /**
   * Is Nuxt.js style route naming
   * @default false
   */
  nuxtStyle: boolean
}

export type UserOptions = Partial<Options>

export interface ResolvedOptions extends Options {}
