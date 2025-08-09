import type {ColumnDef} from "@tanstack/react-table";
import {TableCellViewer} from "@widgets/placesList/tableCellViewer";
import {Checkbox} from "@shared/ui/checkbox.tsx";
import {Badge} from "@shared/ui/badge.tsx";
import type {IBasePlace} from "@shared/types";
import {CheckCircle2Icon, Clock, Drill, EllipsisVertical} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";

export const placeStatuses = ["Работает", "Приостановлено", "Технические работы"]

export const utils: ColumnDef<IBasePlace>[] = [
  {
    id: "select",
    header: ({table}) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({row}) => (
      <div className="flex items-center justify-center">
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
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 ml-auto mr-4"
            size="icon"
          >
            <EllipsisVertical />
            <span className="sr-only">Открыть меню</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Изменить</DropdownMenuItem>
          <DropdownMenuItem>В избранное</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  },
]
