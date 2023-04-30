const names = [
  'John',
  'Bryce',
  'Addison',
  'Dana',
]

export function getNames(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(names), 250)
  })
}
