import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { describe, expect, test } from 'vitest'
import format from 'xml-formatter'

import generateSitemap, { getDestPath, getFinalSitemapPath, getResolvedPath, getSitemapLinks, writeRobotFile, writeXmlFile } from '../src'
import { resolveOptions } from '../src/options'

describe('Index', () => {
  test('Get sitemap links', async () => {
    expect(getSitemapLinks(resolveOptions({}))).toEqual([])
    expect(getSitemapLinks(resolveOptions({
      routes: ['/route'],
    }))).toMatchInlineSnapshot([{
      lastmod: expect.any(Date),
    }], `
      [
        {
          "changefreq": "daily",
          "lastmod": Any<Date>,
          "priority": 1,
          "url": "http://localhost/route",
        },
      ]
    `)
    expect(getSitemapLinks(resolveOptions({
      routes: ['/route'],
      exclude: ['/route'],
    }))).toMatchInlineSnapshot([])
    expect(getSitemapLinks(resolveOptions({
      routes: [{
        path: '/route',
        component: '/src/pages/route/index.vue',
      }],
    }))).toMatchInlineSnapshot([{
      lastmod: expect.any(Date),
    }], `
      [
        {
          "changefreq": "daily",
          "lastmod": Any<Date>,
          "priority": 1,
          "url": "http://localhost/route",
        },
      ]
    `)
    expect(getSitemapLinks(resolveOptions({
      routes: [{
        path: '/route',
        component: '/src/pages/route/index.vue',
        children: [{
          path: 'nested',
          component: '/src/pages/route/nested/index.vue',
        }],
      }],
    }))).toMatchInlineSnapshot([{
      lastmod: expect.any(Date),
    }, {
      lastmod: expect.any(Date),
    }], `
      [
        {
          "changefreq": "daily",
          "lastmod": Any<Date>,
          "priority": 1,
          "url": "http://localhost/route",
        },
        {
          "changefreq": "daily",
          "lastmod": Any<Date>,
          "priority": 1,
          "url": "http://localhost/route/nested",
        },
      ]
    `)
    expect(getSitemapLinks(resolveOptions({
      routes: [{
        path: '/route/:id',
        component: '/src/pages/route/[id].vue',
      }],
    }))).toEqual([])
  })

  test('Get dest path', async () => {
    expect(getDestPath('public')).toEqual('./public')
    expect(getDestPath('./public')).toEqual('./public')
  })

  test('Get resolved path', async () => {
    expect(getResolvedPath('sitemap', '.xml', 'public')).toEqual(resolve('./public/sitemap.xml'))
    expect(getResolvedPath('sitemap.xml', '.xml', 'public')).toEqual(resolve('./public/sitemap.xml'))
    expect(getResolvedPath('sitemap.xml', '.xml', './public')).toEqual(resolve('./public/sitemap.xml'))
  })

  test('Generate sitemap', async () => {
    generateSitemap({})
    expect(existsSync(getDestPath('public'))).toBe(false)
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
      allowRobots: false,
    }
    generateSitemap(options)
    expect(existsSync(getDestPath('test/sitemap'))).toBe(true)
  })

  test('Write XML file', async () => {
    const TEMPLATE = '<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>'
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({}))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(TEMPLATE)
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({ readable: true }))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(format(TEMPLATE))
  })

  test('Write robots file', async () => {
    writeRobotFile(resolve('./test/sitemap/robots.txt'), resolveOptions({}))
    expect(readFileSync(resolve('./test/sitemap/robots.txt')).toString('utf-8')).toEqual(
      'User-agent: *\nAllow: /\n\nSitemap: http://localhost/sitemap.xml',
    )
    writeRobotFile(resolve('./test/sitemap/robots.txt'), resolveOptions({ allowRobots: false }))
    expect(readFileSync(resolve('./test/sitemap/robots.txt')).toString('utf-8')).toEqual(
      'User-agent: *\nDisallow: /\n\nSitemap: http://localhost/sitemap.xml',
    )
  })

  test('Get final sitemap path', async () => {
    expect(getFinalSitemapPath(resolveOptions({}))).toEqual(
      'http://localhost/sitemap.xml',
    )
    expect(getFinalSitemapPath(resolveOptions({
      hostname: 'http://test.com/',
      filename: 'test.xml',
    }))).toEqual(
      'http://test.com/test.xml',
    )
  })
})
