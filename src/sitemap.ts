import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { ensurePrefix } from '@antfu/utils'
import format from 'xml-formatter'

import { ensureSuffix, isDynamicRoute, removeMaybeSuffix } from './utils'
import type { ResolvedOptions } from './types'

export function getSitemapLinks(options: ResolvedOptions) {
  const hostname = options.hostname
  const routes = flatRoutes([...options.routes.values()])
  return routes
    .filter(pageRoute => !isDynamicRoute(pageRoute.component as string, options.nuxtStyle) || typeof pageRoute === 'string')
    .filter(pageRoute => !options.exclude.includes(pageRoute.path))
    .map(pageRoute => ({
      url: `${removeMaybeSuffix('/', hostname)}${typeof pageRoute === 'string' ? pageRoute : pageRoute.path}`,
      changefreq: options.changefreq,
      priority: options.priority,
      lastmod: options.lastmod,
    }))
}

export function flatRoutes(routes: any[]) {
  const flatRoutes: Set<{ component?: string; path: string }> = new Set()

  const getFlatRoutes = (routes: any[], prefix = '') => {
    prefix = prefix.replace(/\/$/g, '')
    for (const route of routes) {
      if (typeof route === 'string') {
        flatRoutes.add({
          component: undefined,
          path: route,
        })
      }
      else {
        let path = route.path
        if (route.path) {
          path = prefix && !route.path.startsWith('/')
            ? `${prefix}/${route.path}`
            : route.path

          flatRoutes.add({
            component: route.component,
            path,
          })
        }
        if (Array.isArray(route.children))
          getFlatRoutes(route.children, path)
      }
    }
  }

  getFlatRoutes(routes)
  return [...flatRoutes]
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
  const str = 'User-agent: *\n'
    .concat(`${options.allowRobots ? 'Allow' : 'Disallow'}: /\n\n`)
    .concat(`Sitemap: ${getFinalSitemapPath(options)}`)
  writeFileSync(resolvedPath, str)
}

export function getFinalSitemapPath(options: ResolvedOptions) {
  return `${ensureSuffix('/', options.hostname)}${ensureSuffix('.xml', options.filename)}`
}
