import type { Place, Crumb } from "@shared/types";

/**
 * Строит крошки по текущему пути.
 *
 * Корни:
 *  - /home        → ["Главная"]
 *  - /settings    → ["Настройки"]
 *  - /places      → ["Заведения"]
 *  - /create-place→ ["Заведения" → "Добавление заведения"]
 *  - /place/:id   → ["Заведения" → "{place.name}"]
 */
export function resolveCrumbs(
  pathname: string,
  places: Place[] = [],
  pageName?: string | null
): Crumb[] {
  // HOME
  if (pathname === "/home") {
    return [{ label: "Главная", to: null }];
  }

  // SETTINGS (на будущее — если добавишь роут /settings)
  if (pathname === "/settings") {
    return [{ label: "Настройки", to: null }];
  }

  // PLACES ROOT
  if (pathname === "/places") {
    return [{ label: "Заведения", to: null }];
  }

  // CLIENTS ROOT
  if (pathname === "/clients") {
    return [{ label: "Клиенты", to: null }];
  }

  // CREATE PLACE
  if (pathname === "/create-place") {
    return [
      { label: "Заведения", to: "/places" },
      { label: "Добавление заведения", to: null },
    ];
  }

  // EDIT PLACE: /place/:id
  const match = pathname.match(/^\/place\/([^/]+)$/);
  if (match) {
    const id = String(match[1]);
    const place = places.find((p) => String(p.id) === id);
    const label = place?.name ?? pageName ?? "Заведение";
    return [
      { label: "Заведения", to: "/places" },
      { label, to: null },
    ];
  }


  return [];
}
