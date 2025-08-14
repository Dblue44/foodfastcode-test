import {useMemo, useState} from "react";
import {ChevronDown} from "lucide-react";
import {ScrollArea} from "@shared/ui/scroll-area";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@shared/ui/dropdown-menu.tsx";
import {selectPlacesList, selectCurrentPlace, setCurrentPlace} from "@entities/place";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {CreatePlaceButton} from "@shared/ui/createPlaceButton/createPlaceButton.tsx";

export function SearchPlace() {
  const dispatch = useAppDispatch()
  const places = useAppSelector(selectPlacesList)
  const selectedPlace = useAppSelector(selectCurrentPlace)
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      places.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        ),
    [places, query]
  )

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center justify-between border rounded px-3 py-2 text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className={selectedPlace ? "" : "text-gray-500"}>
            {selectedPlace ? selectedPlace.name : "Выберите место"}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="min-w-60 max-w-80 p-0 overflow-hidden rounded-md border"
      >
        <div className="p-2">
          <input
            type="text"
            placeholder="Поиск..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b px-2 py-1 focus:outline-none"
          />
        </div>

        <ScrollArea className="max-h-80 mb-2 ml-2 mr-2">
          {filtered?.length > 0 ? (
            filtered.map((place) => (
              <DropdownMenuItem
                key={place.id}
                onSelect={() => {
                  dispatch(setCurrentPlace(place))
                }}
                className="cursor-pointer"
              >
                {place.name}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">Ничего не найдено</div>
          )}
        </ScrollArea>

        <div className="p-2 pt-0">
          <CreatePlaceButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}