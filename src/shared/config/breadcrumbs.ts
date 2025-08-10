import {type Crumb, type IBasePlace,} from "@shared/types";

export function resolveCrumbs(pathname: string, placesList: IBasePlace[], pageName?: string): Crumb[] {
  const path = pathname.replace(/\/+$/, "") || "/"

  // /auth
  if (path === "/auth") return [{label: "Авторизация", to: null}]

  // /home
  if (path === "/home") return [{label: "Главная", to: null}]

  // /places
  if (path === "/places") return [{label: "Заведения", to: null}]

  // /create-place
  if (path === "/create-place") {
    return [
      {label: "Заведения", to: "/places"},
      {label: "Новое заведение", to: null},
    ]
  }

  // /place/:id
  {
    const m = /^\/place\/([^/]+)$/.exec(path)
    if (m) {
      const placeId = m[1]
      const place = safeFindPlace(placeId, placesList)
      const label = place?.name || pageName || "Редактирование"

      return [
        {label: "Заведения", to: "/places"},
        {label, to: null}, // текущая страница
      ]
    }
  }

  // /:placeId/categories (на будущее)
  {
    const m = /^\/([^/]+)\/categories$/.exec(path)
    if (m) {
      const placeId = m[1]
      const place = safeFindPlace(placeId, placesList)
      const placeLabel = place?.name || "Заведение"

      return [
        {label: "Заведения", to: "/places"},
        {label: placeLabel, to: `/place/${placeId}`},
        {label: "Категории", to: null},
      ]
    }
  }

  // /category/:categoryId (на будущее)
  {
    const m = /^\/category\/([^/]+)$/.exec(path)
    if (m) {
      const categoryId = m[1]
      // TODO: когда появится стор категорий — подставить имя:
      const categoryLabel = pageName || `Категория ${categoryId}`

      return [
        {label: "Заведения", to: "/places"},
        {label: categoryLabel, to: null},
      ]
    }
  }

  return pageName ? [{label: pageName, to: null}] : []
}

function safeFindPlace(id: string | number, placesList: IBasePlace[]) {
  try {
    return placesList.find(p => String(p.id) === String(id))
  } catch {
    return undefined
  }
}