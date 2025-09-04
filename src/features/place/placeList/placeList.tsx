import React, {useEffect} from "react";
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon} from "lucide-react";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, type SortingState,
  useReactTable
} from "@tanstack/react-table";
import {Input} from "@shared/ui/input.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu.tsx";
import {Button} from "@shared/ui/button.tsx";
import {Label} from "@shared/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@shared/ui/select.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@shared/ui/table.tsx";
import {columns, type PlacesListProps, placeStatuses} from "@features/place";
import {useIsMobile} from "@shared/hooks/use-mobile.ts";
import {CreatePlaceButton} from "@shared/ui/createPlaceButton/createPlaceButton.tsx";
import {useNavigate} from "react-router-dom";
import {isInteractiveTarget} from "@shared/utils";


export const PlaceList = ({
  data
}: PlacesListProps) => {
  const isMobile = useIsMobile()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>(placeStatuses)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const navigate = useNavigate();

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
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
    table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" &&
          column.getCanHide()
      )
      .forEach((column) => {
        column.toggleVisibility(!isMobile)
      })
  }, [isMobile, table])

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => {
      const updated = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]

      table.getColumn("status")?.setFilterValue(
        updated.length ? updated : undefined
      )

      return updated
    })
  }

  return (
    <div className="max-w-[1440px] w-full p-4">
      {isMobile && (
        <div className="mb-2">
          <CreatePlaceButton />
        </div>
      )}
      <div className="w-full flex items-center py-2 mb-2">
        <Input
          placeholder="Поиск по названию"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs mr-4"
        />
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-auto">
                Статус заведения
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {placeStatuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                  onSelect={(event) => {
                    event.preventDefault()
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!isMobile && (
          <div className="ml-4">
            <CreatePlaceButton />
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-12" />
            {table.getVisibleLeafColumns().slice(1, -1).map((col) => (
              <col key={col.id} />
            ))}
            <col className="w-12" />
          </colgroup>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (isInteractiveTarget(target)) return;
                    const id = row.original.id;
                    if (id) navigate(`/place/${id}`);
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
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-2 px-4">
        <div className="hidden flex-1 text-sm text-muted-foreground  mr-25 lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize}/>
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
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon/>
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon/>
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon/>
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}