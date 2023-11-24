"use client"
import { columns } from "./columns"
import { Media, Tag } from '~/../prisma/generated/zod';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { TypePopover } from "../TypePopover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import MediaPreview from "../MediaPreview";

interface DataTableProps<TData, TValue> {
  data: TData[]
}
type MediaTags = Media & {
  tags: Tag[]
}
export function DataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  //eslint-disable-next-line
  const table = useReactTable({
    data,
    //eslint-disable-next-line
    columns: columns as ColumnDef<TData, any>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
              <>
                <TableRow 
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => row.toggleExpanded()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell> 
                  
                  ))}
                  
                </TableRow>
                <TableRow key={row.id+"1"}>
                  {row.getIsExpanded() && 
                    <TableCell colSpan={columns.length} >
                        <MediaPreview media={row.original as MediaTags} />
                    </TableCell>
                  }   
                </TableRow>
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
