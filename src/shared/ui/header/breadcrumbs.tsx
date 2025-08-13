import { Link } from "react-router-dom"
import { Badge } from "@shared/ui/badge"
import { Separator } from "@shared/ui/separator"
import { useAppSelector } from "@shared/lib"
import {selectCrumbs} from "@entities/user";

export function Breadcrumbs() {
  const crumbs = useAppSelector(selectCrumbs);

  if (!crumbs?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <div key={`${c.to ?? "null"}-${i}`} className="flex items-center gap-2">
            {isLast ? (
              <Badge variant="outline" className="cursor-default select-none text-sm" aria-current="page">
                {c.label}
              </Badge>
            ) : (
              <Badge asChild className="cursor-pointer hover:underline text-sm">
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </Badge>
            )}
            {!isLast ? <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
