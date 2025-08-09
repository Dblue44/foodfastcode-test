export type Crumb = { label: string; to: string }
type ResolverArgs = { pageName?: string; pathname: string }
type CrumbResolver = (args: ResolverArgs) => Crumb[]
type BreadcrumbsMap = Record<string, CrumbResolver>

/**
 * Единая точка, где определяем крошки для страниц.
 * Для страниц с «листом» (например, /create-place) можно переопределить label через pageName.
 */
export const BREADCRUMBS: BreadcrumbsMap = {
  '/home': () => [{ label: 'Главная', to: '/home' }],

  '/places': () => [{ label: 'Заведения', to: '/places' }],

  '/create-place': ({ pageName }) => [
    { label: 'Заведения', to: '/places' },
    { label: pageName ?? 'Добавить новое заведение', to: '/create-place' },
  ],
}

/**
 * Простое сопоставление по точному пути.
 * Если маршрут не описан — падаем обратно к pageName (если он есть) как единственной крошке.
 */
export function resolveCrumbs(pathname: string, pageName?: string): Crumb[] {
  const resolver = BREADCRUMBS[pathname]
  if (resolver) return resolver({ pathname, pageName })
  return pageName ? [{ label: pageName, to: pathname }] : []
}
