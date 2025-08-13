import type {ColumnDef} from "@tanstack/react-table";
import type {Category} from "@shared/types";
import {CategoryActionsCell, type CategoryTableMeta} from "@widgets/categoryList";
import {ArrowDownAZ, ArrowUpAZ} from "lucide-react";


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Название
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
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