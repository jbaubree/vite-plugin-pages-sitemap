import { resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import format from 'xml-formatter'

import generateSitemap from '../src'
import { getDestPath, getFinalSitemapPath, getResolvedPath, getSitemapLinks, writeRobotFile, writeXmlFile } from '../src/sitemap'
import { resolveOptions } from '../src/options'

describe('index', () => {
  it('get sitemap links', async () => {
    expect(getSitemapLinks(resolveOptions({ i18n: { languages: ['fr', 'en'] } }))).toEqual([])
    expect(getSitemapLinks(resolveOptions({
      i18n: { languages: ['fr', 'en'] },
      routes: ['/route'],
    }))).toMatchInlineSnapshot([{
      lastmod: expect.any(Date),
    }], `
        [
          {
            "changefreq": "daily",
            "lastmod": Any<Date>,
            "links": [
              {
                "lang": "fr",
                "url": "http://localhost/fr",
              },
              {
                "lang": "en",
                "url": "http://localhost/en",
              },
            ],
            "priority": 1,
            "url": "http://localhost/route",
          },
        ]
      `)
    expect(getSitemapLinks(resolveOptions({
      i18n: { languages: ['fr', 'en'], defaultLanguage: 'fr' },
      routes: ['/route'],
    }))).toMatchInlineSnapshot([{
      lastmod: expect.any(Date),
    }], `
          [
            {
              "changefreq": "daily",
              "lastmod": Any<Date>,
              "links": [
                {
                  "lang": "fr",
                  "url": "http://localhost/",
                },
                {
                  "lang": "en",
                  "url": "http://localhost/en",
                },
                {
                  "hostname": "http://localhost/",
                  "lang": "x-default",
                },
              ],
              "priority": 1,
              "url": "http://localhost/route",
            },
          ]
        `)
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
    }))).toMatchInlineSnapshot([], `
      []
    `)
    expect(getSitemapLinks(resolveOptions({
      routes: ['/route'],
      exclude: [/r/],
    }))).toMatchInlineSnapshot([], `
      []
    `)
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

  it('get dest path', async () => {
    expect(getDestPath('public')).toEqual('./public')
    expect(getDestPath('./public')).toEqual('./public')
  })

  it('get resolved path', async () => {
    expect(getResolvedPath('sitemap', '.xml', 'public')).toEqual(resolve('./public/sitemap.xml'))
    expect(getResolvedPath('sitemap.xml', '.xml', 'public')).toEqual(resolve('./public/sitemap.xml'))
    expect(getResolvedPath('sitemap.xml', '.xml', './public')).toEqual(resolve('./public/sitemap.xml'))
  })

  it('generate sitemap', async () => {
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

  it('write XML file', async () => {
    const TEMPLATE = '<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>'
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({}))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(TEMPLATE)
    writeXmlFile(resolve('./test/sitemap/sitemap.xml'), TEMPLATE, resolveOptions({ readable: true }))
    expect(readFileSync(resolve('./test/sitemap/sitemap.xml')).toString('utf-8')).toEqual(format(TEMPLATE))
  })

  it('write robots file', async () => {
    writeRobotFile(resolve('./test/sitemap/robots.txt'), resolveOptions({}))
    expect(readFileSync(resolve('./test/sitemap/robots.txt')).toString('utf-8')).toEqual(
      'User-agent: *\nAllow: /\n\nSitemap: http://localhost/sitemap.xml',
    )
    writeRobotFile(resolve('./test/sitemap/robots.txt'), resolveOptions({ allowRobots: false }))
    expect(readFileSync(resolve('./test/sitemap/robots.txt')).toString('utf-8')).toEqual(
      'User-agent: *\nDisallow: /\n\nSitemap: http://localhost/sitemap.xml',
    )
  })

  it('get final sitemap path', async () => {
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
