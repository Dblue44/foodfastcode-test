import type {ColumnDef} from "@tanstack/react-table";
import type {Category} from "@shared/types";
import {CategoryActionsCell, type CategoryTableMeta} from "@widgets/categoryList";


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({row}) => {
      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium leading-none">{row.original.name}</div>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({row, table}) => <CategoryActionsCell
      category={row.original}
      onEdit={(table.options.meta as CategoryTableMeta)?.onEdit}
    />,
    enableHiding: false,
  },
]