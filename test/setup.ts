import { existsSync, rmSync } from 'fs'
import { beforeAll } from 'vitest'
import { getDestPath } from '../src'

beforeAll(() => {
  if (existsSync(getDestPath('test/sitemap'))) rmSync(getDestPath('test/sitemap'), { recursive: true, force: true })
})
