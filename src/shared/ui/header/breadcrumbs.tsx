import { useLocation, Link } from "react-router-dom"
import { useMemo } from "react"
import { Badge } from "@shared/ui/badge"
import { Separator } from "@shared/ui/separator"
import { resolveCrumbs } from "@shared/config/breadcrumbs"
import { useAppSelector } from "@shared/lib"
import { selectUserBase } from "@entities/user"

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const user = useAppSelector(selectUserBase)
  const pageName = user?.pageName ?? undefined

  const crumbs = useMemo(() => resolveCrumbs(pathname, pageName), [pathname, pageName])

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
                <Link to={c.to}>{c.label}</Link>
              </Badge>
            )}

            {!isLast && <Separator orientation="vertical" className="mx-1 h-4" />}
          </div>
        )
      })}
    </nav>
  )
}
