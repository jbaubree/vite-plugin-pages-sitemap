const names = [
  'John',
  'Bryce',
  'Addison',
  'Dana',
]

export const getNames = (): Promise<string[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(names), 250)
  })
