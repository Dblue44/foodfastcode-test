import {useEffect, useState} from "react";
import {
  type ColumnFiltersState, flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  type SortingState,
  useReactTable
} from "@tanstack/react-table";
import {useIsMobile} from "@shared/hooks/use-mobile.ts";
import {type ClientTableProps} from "./types";
import {columns} from './columns';
import {cn, useAppSelector} from "@shared/lib";
import {Input} from "@shared/ui/input.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@shared/ui/table.tsx";
import {Label} from "@shared/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@shared/ui/select.tsx";
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon} from "lucide-react";
import {selectIsClientsLoading} from "@entities/client";

export function ClientTable({data}: ClientTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const isClientsLoading = useAppSelector(selectIsClientsLoading)

  const isMobile = useIsMobile()

  const clientTable = useReactTable({
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
    clientTable
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" &&
          column.getCanHide()
      )
      .forEach((column) => {
        column.toggleVisibility(!isMobile)
      })
  }, [isMobile, clientTable])

  const visibleCols = clientTable.getVisibleLeafColumns().length;

  return (
    <div className={cn("w-full flex flex-wrap content-start mb-2 mr-2", !isMobile && "max-w-[1440px]")}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          Клиенты
        </span>
      </div>
      <div className="w-full flex items-center mb-2">
        <Input
          placeholder="Поиск по названию"
          value={(clientTable.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            clientTable.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs mr-4"
        />
      </div>
      <div className="w-full rounded-lg border overflow-hidden">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-30" />
            {clientTable.getVisibleLeafColumns().slice(0, -1).map((col) => (
              <col key={col.id} />
            ))}
          </colgroup>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {clientTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="sticky top-0 z-10 pl-4">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {clientTable.getRowModel().rows?.length ? (
              clientTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-4 h-11">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isClientsLoading
              ?
              <TableRow>
                <TableCell colSpan={visibleCols} className="h-24 text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
              : (
                <TableRow>
                  <TableCell colSpan={visibleCols} className="h-24 text-center">
                    Нет клиентов в выбранном заведении
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between ml-auto mt-2 px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Количество на странице
            </Label>
            <Select
              value={`${clientTable.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                clientTable.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={clientTable.getState().pagination.pageSize}/>
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Страница {clientTable.getState().pagination.pageIndex + 1} из {clientTable.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => clientTable.setPageIndex(0)}
              disabled={!clientTable.getCanPreviousPage()}
            >
              <span className="sr-only">В начало</span>
              <ChevronsLeftIcon/>
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => clientTable.previousPage()}
              disabled={!clientTable.getCanPreviousPage()}
            >
              <span className="sr-only">Предыдущая страница</span>
              <ChevronLeftIcon/>
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => clientTable.nextPage()}
              disabled={!clientTable.getCanNextPage()}
            >
              <span className="sr-only">Следующая страница</span>
              <ChevronRightIcon/>
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => clientTable.setPageIndex(clientTable.getPageCount() - 1)}
              disabled={!clientTable.getCanNextPage()}
            >
              <span className="sr-only">Перейти в конец</span>
              <ChevronsRightIcon/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

}