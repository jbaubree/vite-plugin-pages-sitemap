import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'
import { ensurePrefix } from '@antfu/utils'
import format from 'xml-formatter'

import { ensureSuffix, isDynamicRoute, removeMaybeSuffix } from './utils'
import { resolveOptions } from './options'
import type { ResolvedOptions, UserOptions } from './types'

export default function generateSitemap(options: UserOptions) {
  const resolvedOptions: ResolvedOptions = resolveOptions(options)
  const RESOLVED_PATH = getResolvedPath(resolvedOptions.filename, '.xml', resolvedOptions.dest)
  const RESOLVED_ROBOT_PATH = getResolvedPath('robot', '.txt', resolvedOptions.dest)
  if (!resolvedOptions.routes.length) return
  if (!existsSync(getDestPath(resolvedOptions.dest))) mkdirSync(getDestPath(resolvedOptions.dest))

  const stream = new SitemapStream()
  getSitemapLinks(resolvedOptions).forEach(item => stream.write(item))
  streamToPromise(stream).then((sitemap) => {
    writeXmlFile(RESOLVED_PATH, sitemap.toString('utf-8'), resolvedOptions)
  })
  stream.end()
  writeRobotFile(RESOLVED_ROBOT_PATH, resolvedOptions)
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

export function getDestPath(dest: string) {
  return ensurePrefix('./', dest)
}

export function getResolvedPath(filename: string, extension: string, dest: string) {
  const filenameWithExtension = ensureSuffix(extension, filename)
  return resolve(`${getDestPath(dest)}/${filenameWithExtension}`)
}

export function writeXmlFile(resolvedPath: string, str: string, options: ResolvedOptions) {
  writeFileSync(resolvedPath, options.readable ? format(str) : str)
}

export function writeRobotFile(resolvedPath: string, options: ResolvedOptions) {
  const str = 'User-agent: * \n'
    .concat(`${options.allowRobots ? 'Allow' : 'Disallow'} /\n\n`)
    .concat(`Sitemap: ${getFinalSitemapPath(options)}`)
  writeFileSync(resolvedPath, str)
}

export function getFinalSitemapPath(options: ResolvedOptions) {
  return `${ensureSuffix('/', options.hostname)}${ensureSuffix('.xml', options.filename)}`
}
