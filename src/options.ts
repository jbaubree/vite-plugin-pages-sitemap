import { ResolvedOptions, UserOptions } from './types'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return Object.assign(
    {
      hostname: 'http://localhost/',
      routes: [],
      filename: 'sitemap',
      dest: 'public',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      nuxtStyle: false,
    },
    userOptions,
  )
}
