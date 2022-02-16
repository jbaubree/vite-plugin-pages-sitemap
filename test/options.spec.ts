import { describe, expect, test } from 'vitest'
import { resolveOptions } from '../src/options'

describe('Options', () => {
  test('resolve options', () => {
    const options = resolveOptions({})
    expect(options).toMatchInlineSnapshot({
      lastmod: expect.any(Date),
    }, `
      {
        "allowRobots": true,
        "changefreq": "daily",
        "dest": "public",
        "filename": "sitemap",
        "hostname": "http://localhost/",
        "lastmod": Any<Date>,
        "nuxtStyle": false,
        "priority": 1,
        "readable": false,
        "routes": [],
      }
    `)
  })
})
