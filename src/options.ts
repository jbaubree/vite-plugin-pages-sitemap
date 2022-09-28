import type { ResolvedOptions, UserOptions } from './types'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return Object.assign(
    {
      hostname: 'http://localhost/',
      routes: [],
      exclude: [],
      filename: 'sitemap',
      dest: 'public',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      readable: false,
      nuxtStyle: false,
      allowRobots: true,
    },
    userOptions,
  )
}
