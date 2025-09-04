import type {ColumnDef} from "@tanstack/react-table";
import type {Product} from "@shared/types";
import {Checkbox} from "@shared/ui/checkbox.tsx";
import {TableCellViewer, ProductActionsCell, type ProductTableMeta} from "@features/product/productTable/index.ts";
import {ArrowDownAZ, ArrowUpAZ} from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
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
      return <TableCellViewer data={row.original.name}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Цена
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return <TableCellViewer data={row.original.price.toFixed(2)}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Цена со скидкой
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return <TableCellViewer data={row.original.discountPrice.toFixed(2)}/>
    },
    enableHiding: true,
  },
  {
    accessorKey: "discountPercent",
    header: "% скидки",
    cell: ({row}) => {
      const discountPercent = 100 - (row.original.discountPrice / row.original.price * 100)
      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium leading-none">{parseFloat(discountPercent.toFixed(1))}</div>
        </div>
      )
    },
    enableHiding: true,
  },
  {
    accessorKey: "isPopular",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-1 select-none"
          onClick={() => column.toggleSorting(isSorted === "asc")}
        >
          Популярный товар
          {isSorted === "asc" && <ArrowDownAZ size={16} />}
          {isSorted === "desc" && <ArrowUpAZ size={16} />}
        </button>
      );
    },
    cell: ({row}) => {
      return (
        <Checkbox
          checked={row.original.isPopular}
          disabled={true}
        />
      )
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }) => <ProductActionsCell product={row.original} onEdit={(table.options.meta as ProductTableMeta)?.onEdit}/>,
    enableHiding: false,
  },
]