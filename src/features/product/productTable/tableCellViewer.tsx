
export function TableCellViewer({data}: {data:string}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium leading-none">{data}</div>
    </div>
  )
}