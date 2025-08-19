import type {ColumnDef} from "@tanstack/react-table";
import type {Client} from "@shared/types";
import {ArrowDownAZ, ArrowUpAZ} from "lucide-react";
import {TableCellViewer} from "./tableCellViewer";
import {Avatar, AvatarFallback, AvatarImage} from "@shared/ui/avatar.tsx";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "image",
    header: "Изображение",
    cell: ({row}) => {
      return (
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={row.original.avatarUrl} alt={row.original.name}/>
          <AvatarFallback className="rounded-lg">{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Имя
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return <TableCellViewer data={row.original.name}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Username
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return <TableCellViewer data={row.original.username}/>
    },
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Телефон
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return <TableCellViewer data={row.original.phone}/>
    },
    enableHiding: false,
  },
]