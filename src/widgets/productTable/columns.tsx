import type {ColumnDef} from "@tanstack/react-table";
import type {Product} from "@shared/types";
import {Checkbox} from "@shared/ui/checkbox.tsx";
import {TableCellViewer, ProductActionsCell} from "@widgets/productTable";

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
    header: "Название",
    cell: ({row}) => {
      return <TableCellViewer data={row.original.name}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: "Цена",
    cell: ({row}) => {
      return <TableCellViewer data={row.original.price.toString(2).toString()}/>
    },
    enableHiding: true,
  },
  {
    accessorKey: "discountPrice",
    header: "Цена со скидкой",
    cell: ({row}) => {
      return <TableCellViewer data={row.original.discountPrice.toString(2).toString()}/>
    },
    enableHiding: true,
  },
  {
    id: "discountPercent",
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
    id: "isPopular",
    header: "Популярный товар",
    cell: ({row}) => {
      return <TableCellViewer data={row.original.isPopular.toString()}/>
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
    enableHiding: false,
  },
]