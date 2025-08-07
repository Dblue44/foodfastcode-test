import type {IBasePlace} from "@shared/types";

export function TableCellViewer({item}: {item: IBasePlace}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium leading-none">{item.name}</div>
    </div>
  )
}
