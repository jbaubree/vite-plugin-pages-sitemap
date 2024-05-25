import { describe, expect, it } from 'vitest'
import { ensureSuffix, isDynamicRoute, removeMaybeSuffix } from '../src/utils'

describe('utils', () => {
  it('dynamic route', () => {
    expect(isDynamicRoute('/path/[id]', false)).toBe(true)
    expect(isDynamicRoute('/path/_id', true)).toBe(true)
    expect(isDynamicRoute('/path/me', false)).toBe(false)
  })

  it('ensure suffix', () => {
    expect(ensureSuffix('.extension', 'file')).toBe('file.extension')
    expect(ensureSuffix('.extension', 'file.extension')).toBe('file.extension')
  })

  it('remove maybe suffix', () => {
    expect(removeMaybeSuffix('suffix', 'prefix')).toBe('prefix')
    expect(removeMaybeSuffix('suffix', 'prefixsuffix')).toBe('prefix')
  })
})
