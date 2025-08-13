import {
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {columns} from "@widgets/categoryList";
import type {CategoryListProps} from "@widgets/categoryList";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@shared/ui/table.tsx";
import {cn, useAppDispatch} from "@shared/lib";
import {setCategoryId} from "@entities/product";
import {Input} from "@shared/ui/input.tsx";
import {CategoryForm, type DialogMode} from "@widgets/categoryForm";
import {useIsMobile} from "@shared/hooks/use-mobile.ts";
import {isInteractiveTarget} from "@shared/utils";
import {useMemo, useState} from "react";
import type {Category} from "@shared/types";
import {Button} from "@shared/ui/button.tsx";

export function CategoryList({data, isCategoriesLoading}: CategoryListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>("create")
  const [initialCategory, setInitialCategory] = useState<Category | null>(null)

  const openCreate = () => {
    setMode("create")
    setInitialCategory(null)
    setOpen(true)
  }

  const openEdit = (category: Category) => {
    setMode("edit")
    setInitialCategory(category)
    setOpen(true)
  }

  const title = mode === "create" ? "Добавление категории" : "Изменение категории"

  const categoryTable = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: useMemo(() => ({ onEdit: openEdit }), []),
  })

  return (
    <div className={cn(
      "w-full flex flex-wrap content-start mb-2 mr-2",
      !isMobile && "max-w-[500px]"
    )}>
      <div className="flex items-center h-8 gap-2 mb-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          Категории
        </span>
      </div>
      <div className="w-full flex items-center mb-2">
        <Input
          placeholder="Поиск по названию"
          value={(categoryTable.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            categoryTable.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs mr-4"
        />
        <div className="ml-auto">
          <Button variant="outline" onClick={openCreate}>Добавить</Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table className="table-fixed">
          <colgroup>
            {categoryTable.getVisibleLeafColumns().slice(0, -1).map((col) => (
              <col key={col.id} />
            ))}
            <col className="w-42" />
          </colgroup>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {categoryTable.getHeaderGroups().map((headerGroup) => (
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
            {categoryTable.getRowModel().rows?.length ? (
              categoryTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (isInteractiveTarget(target)) return;
                    const category = row.original;
                    dispatch(setCategoryId(category.id));
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
            ) : isCategoriesLoading
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
                  {sorting.length ? "По выбранному фильтру не найдено ни одной категории" : "В данном заведение не добавлены категории"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CategoryForm
        open={open}
        setOpen={setOpen}
        category={initialCategory ?? undefined}
        title={title}
        mode={mode}
      />
    </div>
  )
}