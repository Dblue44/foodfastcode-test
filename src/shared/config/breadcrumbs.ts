import {
  type BreadcrumbsMap,
  breadcrumbsMapSchema,
  type Crumb,
  crumbResolverSchema,
  crumbSchema,
  resolverArgsSchema
} from "@shared/types";

export const BREADCRUMBS: BreadcrumbsMap = {
  "/home": () => [{ label: "Главная", to: "/home" }],

  "/places": () => [{ label: "Заведения", to: "/places" }],

  "/create-place": ({ pageName }) => [
    { label: "Заведения", to: "/places" },
    { label: pageName ?? "Добавление заведения", to: "/create-place" },
  ],
}

breadcrumbsMapSchema.parse(BREADCRUMBS)

/** Универсальный резолвер с валидацией входа/выхода */
export function resolveCrumbs(pathname: string, pageName?: string): Crumb[] {
  const args = resolverArgsSchema.parse({ pathname, pageName })
  const resolver = BREADCRUMBS[pathname]
  if (!resolver) {
    return pageName ? crumbSchema.array().parse([{ label: pageName, to: pathname }]) : []
  }
  return crumbResolverSchema.parse(resolver)(args)
}