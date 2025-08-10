import { useLocation, Link } from "react-router-dom"
import { useMemo } from "react"
import { Badge } from "@shared/ui/badge"
import { Separator } from "@shared/ui/separator"
import { resolveCrumbs } from "@shared/config"
import { useAppSelector } from "@shared/lib"
import {selectPageName} from "@entities/user"
import {selectPlacesList} from "@entities/places";

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const pageName = useAppSelector(selectPageName)
  const placesList = useAppSelector(selectPlacesList)

  const crumbs = useMemo(() => resolveCrumbs(pathname, placesList, pageName), [pathname, placesList, pageName])

  if (!crumbs.length) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1

        return (
          <div key={`${c.to}-${i}`} className="flex items-center gap-2">
            {isLast ? (
              <Badge
                variant="outline"
                className="cursor-default select-none text-sm"
                aria-current="page"
              >
                {c.label}
              </Badge>
            ) : (
              <Badge asChild className="cursor-pointer hover:underline text-sm">
                {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
              </Badge>
            )}

            {!isLast && <Separator orientation="vertical" className="mx-1 h-4" />}
          </div>
        )
      })}
    </nav>
  )
}
