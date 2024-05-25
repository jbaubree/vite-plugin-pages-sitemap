import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../src/options'

describe('options', () => {
  it('resolve options', () => {
    const options = resolveOptions({})
    expect(options).toMatchInlineSnapshot({
      lastmod: expect.any(Date),
    }, `
      {
        "allowRobots": true,
        "changefreq": "daily",
        "dest": "public",
        "exclude": [],
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
