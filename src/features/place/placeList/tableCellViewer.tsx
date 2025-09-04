import type {BasePlace} from "@shared/types";

export function TableCellViewer({item}: {item: BasePlace}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium leading-none">{item.name}</div>
    </div>
  )
}
