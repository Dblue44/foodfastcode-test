import type {ProductListProps} from "@widgets/productTable";
import {Input} from "@shared/ui/input.tsx";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, type SortingState,
  useReactTable
} from "@tanstack/react-table";
import {columns} from "@widgets/productTable";
import {useEffect, useState} from "react";
import {useIsMobile} from "@shared/hooks/use-mobile.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@shared/ui/table.tsx";
import {isInteractiveTarget} from "@shared/utils";
import {ProductDialog} from "@widgets/productDialog";
import {cn} from "@shared/lib";

export function ProductTable({data, category, isProductsLoading}: ProductListProps) {
  const isMobile = useIsMobile()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const productTable = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(() => {
    productTable
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" &&
          column.getCanHide()
      )
      .forEach((column) => {
        column.toggleVisibility(!isMobile)
      })
  }, [isMobile, productTable])

  return (
    <div className={cn(
      "w-full  flex flex-wrap content-start mb-2 mr-2",
      !isMobile && "max-w-[1440px]"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {"Товары"}{category?.name && ` в категории "${category?.name}"`}
          </span>
      </div>
      <div className="w-full flex items-center  mb-2">
        <Input
          placeholder="Поиск по названию"
          value={(productTable.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            productTable.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs mr-4"
        />
        <div className="ml-auto">
          <ProductDialog category={category}/>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-12"/>
            {productTable.getVisibleLeafColumns().slice(1, -1).map((col) => (
              <col key={col.id}/>
            ))}
            <col className="w-12"/>
          </colgroup>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {productTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {productTable.getRowModel().rows?.length ? (
              productTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (isInteractiveTarget(target)) return;
                    const id = row.original.id;
                    if (id) {/*navigate(`/place/${id}`)*/}
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isProductsLoading
              ?
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Загрузка...
                </TableCell>
              </TableRow>
              : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет продуктов в выбранной категории
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}