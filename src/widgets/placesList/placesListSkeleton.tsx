import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@shared/ui/table";

export function PlacesListSkeleton() {
  return (
    <div className="max-w-[1440px] w-full animate-pulse pl-4 pr-4">
      <div className="w-full flex items-center justify-between py-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto" />
      </div>
      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="sticky top-0 h-10 z-10 bg-muted">
            <TableRow>
              <TableHead>
                <div className="ml-8 h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-12">

          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4 px-4">
        <div className="hidden lg:block h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden lg:flex items-center gap-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
