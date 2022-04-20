const dynamicRouteRE = /\[.+\]/
const nuxtDynamicRouteRE = /_[\s\S]*/

export function isDynamicRoute(routePath: string, nuxtStyle: boolean) {
  if (!routePath)
    return false
  return nuxtStyle
    ? nuxtDynamicRouteRE.test(routePath)
    : dynamicRouteRE.test(routePath)
}

export function ensureSuffix(suffix: string, str: string) {
  if (!str.endsWith(suffix))
    return str + suffix
  return str
}

export function removeMaybeSuffix(suffix: string, str: string) {
  if (!str.endsWith(suffix))
    return str
  return str.slice(0, -suffix.length)
}
