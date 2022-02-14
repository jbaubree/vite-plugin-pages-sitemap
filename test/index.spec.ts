import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { describe, expect, test } from 'vitest'
import format from 'xml-formatter'

import generateSitemap, { getDestPath, getResolvedPath, getSitemapLinks, writeXmlFile } from '../src'
import { resolveOptions } from '../src/options'

describe('Index', () => {
  test('Get sitemap links', async() => {
    expect(getSitemapLinks(resolveOptions({}))).toEqual([])
  })

  test('Get dest path', async() => {
    expect(getDestPath(resolveOptions({}))).toEqual('./public')
    expect(getDestPath(resolveOptions({
      dest: 'test',
    }))).toEqual('./test')
    expect(getDestPath(resolveOptions({
      dest: './test',
    }))).toEqual('./test')
  })

  test('Get resolved path', async() => {
    expect(getResolvedPath(resolveOptions({}))).toEqual(resolve('./public/sitemap.xml'))
    expect(getResolvedPath(resolveOptions({
      dest: 'test',
    }))).toEqual(resolve('./test/sitemap.xml'))
    expect(getResolvedPath(resolveOptions({
      dest: 'test',
      filename: 'test',
    }))).toEqual(resolve('./test/test.xml'))
    expect(getResolvedPath(resolveOptions({
      dest: 'test',
      filename: 'test.xml',
    }))).toEqual(resolve('./test/test.xml'))
  })

  test('Generate sitemap', async() => {
    generateSitemap({})
    expect(existsSync(getDestPath(resolveOptions({})))).toBe(false)

    const options = {
      dest: 'test/sitemap',
      routes: [
        {
          name: 'index',
          path: '/',
          component: '/src/pages/index.vue',
          props: true,
        },
      ],
    }
    generateSitemap(options)
    expect(existsSync(getDestPath(resolveOptions(options)))).toBe(true)
  })

  test('Write XML file', async() => {
    const TEMPLATE = '<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>'
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({}))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(TEMPLATE)
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({ readable: true }))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(format(TEMPLATE))
  })
})
