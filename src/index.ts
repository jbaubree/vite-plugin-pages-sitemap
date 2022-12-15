import { existsSync, mkdirSync } from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'

import { resolveOptions } from './options'
import { getDestPath, getResolvedPath, getSitemapLinks, writeRobotFile, writeXmlFile } from './sitemap'
import type { ResolvedOptions, UserOptions } from './types'

export default function generateSitemap(options: UserOptions) {
  const resolvedOptions: ResolvedOptions = resolveOptions(options)
  const RESOLVED_PATH = getResolvedPath(resolvedOptions.filename, '.xml', resolvedOptions.dest)
  const RESOLVED_ROBOT_PATH = getResolvedPath('robots', '.txt', resolvedOptions.dest)
  if (!resolvedOptions.routes.length)
    return
  if (!existsSync(getDestPath(resolvedOptions.dest)))
    mkdirSync(getDestPath(resolvedOptions.dest))

  const stream = new SitemapStream()
  getSitemapLinks(resolvedOptions).forEach(item => stream.write(item))
  streamToPromise(stream).then((sitemap) => {
    writeXmlFile(RESOLVED_PATH, sitemap.toString('utf-8'), resolvedOptions)
  })
  stream.end()
  writeRobotFile(RESOLVED_ROBOT_PATH, resolvedOptions)
}
