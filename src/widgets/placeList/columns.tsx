import type {ColumnDef} from "@tanstack/react-table";
import {TableCellViewer} from "@widgets/placeList";
import {Checkbox} from "@shared/ui/checkbox.tsx";
import {Badge} from "@shared/ui/badge.tsx";
import type {BasePlace} from "@shared/types";
import {CheckCircle2Icon, Clock, Drill} from "lucide-react";
import {PlaceActionsCell} from "widgets/placeList";
import React from "react";

export const placeStatuses = ["Работает", "Приостановлено", "Технические работы"]

export const columns: ColumnDef<BasePlace>[] = [
  {
    id: "select",
    size: 10,
    header: ({table}) => (
      <div className="flex items-center justify-center size-8">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-center size-8">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Название",
    cell: ({row}) => {
      return <TableCellViewer item={row.original}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: "Адрес",
    cell: ({row}) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.address}
      </Badge>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Статус",
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true
      return filterValue.includes(row.getValue(columnId))
    },
    cell: ({row}) => {
      const status = row.original.status
      if (!status) return null
      const iconMap: Record<string, React.ReactNode> = {
        "Работает": <CheckCircle2Icon className="text-green-500 dark:text-green-400 size-4" />,
        "Приостановлено": <Clock className="text-blue-500 size-4" />,
        "Технические работы": <Drill className="text-red-500 size-4" />,
      }

      return (
        <Badge variant="outline" className="flex items-center gap-1 px-1.5 text-muted-foreground">
          {iconMap[status]}
          {status}
        </Badge>
      )
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <PlaceActionsCell place={row.original} />,
    enableHiding: false,
  },
]
