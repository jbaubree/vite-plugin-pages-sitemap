import { describe, expect, test } from 'vitest'
import { ensureSuffix, isDynamicRoute, removeMaybeSuffix } from '../src/utils'

describe('Utils', () => {
  test('Dynamic route', () => {
    expect(isDynamicRoute('/path/[id]', false)).toBe(true)
    expect(isDynamicRoute('/path/_id', true)).toBe(true)
    expect(isDynamicRoute('/path/me', false)).toBe(false)
  })

  test('Ensure suffix', () => {
    expect(ensureSuffix('.extension', 'file')).toBe('file.extension')
    expect(ensureSuffix('.extension', 'file.extension')).toBe('file.extension')
  })

  test('Remove maybe suffix', () => {
    expect(removeMaybeSuffix('suffix', 'prefix')).toBe('prefix')
    expect(removeMaybeSuffix('suffix', 'prefixsuffix')).toBe('prefix')
  })
})
