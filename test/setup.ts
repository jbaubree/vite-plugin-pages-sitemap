import { existsSync, rmSync } from 'node:fs'
import { beforeAll } from 'vitest'
import { getDestPath } from '../src/sitemap'

beforeAll(() => {
  if (existsSync(getDestPath('test/sitemap')))
    rmSync(getDestPath('test/sitemap'), { recursive: true, force: true })
})
