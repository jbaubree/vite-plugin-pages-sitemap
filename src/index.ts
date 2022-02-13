import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { SitemapStream } from 'sitemap'
import { ensurePrefix } from '@antfu/utils'

import { ensureSuffix, isDynamicRoute, removeMaybeSuffix } from './utils'
import { resolveOptions } from './options'
import type { ResolvedOptions, UserOptions } from './types'

export default function generateSitemap(options: UserOptions) {
  const resolvedOptions: ResolvedOptions = resolveOptions(options)
  if (!resolvedOptions.routes.length) return
  if (!existsSync(getDestPath(resolvedOptions))) mkdirSync(getDestPath(resolvedOptions))

  const stream = new SitemapStream()
  const writeStream = createWriteStream(getResolvedPath(resolvedOptions))
  getSitemapLinks(resolvedOptions).forEach(item => stream.write(item))
  stream.pipe(writeStream)
  stream.end()
}

export function getSitemapLinks(options: ResolvedOptions) {
  const hostname = options.hostname

  return [...options.routes.values()]
    .filter(pageRoute => !isDynamicRoute(pageRoute.component as string, options.nuxtStyle))
    .map(pageRoute => ({
      url: removeMaybeSuffix('/', hostname) + pageRoute.path,
      changefreq: options.changefreq,
      priority: options.priority,
      lastmod: options.lastmod,
    }))
}

export function getDestPath(sitemap: ResolvedOptions) {
  return ensurePrefix('./', sitemap.dest)
}

export function getResolvedPath(sitemap: ResolvedOptions) {
  const SITEMAP_EXTENSION = '.xml'
  const filenameWithExtension = ensureSuffix(SITEMAP_EXTENSION, sitemap.filename)
  return resolve(`${getDestPath(sitemap)}/${filenameWithExtension}`)
}
