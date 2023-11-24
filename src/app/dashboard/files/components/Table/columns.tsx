import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {  filterFns, sortingFns } from "@tanstack/react-table"
import type{ Column, ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypePopover } from "../TypePopover";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type MediaTags = {
  id: string;
  title: string;
  type: string;
  duration: number;
  width: number;
  height: number;
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: Date;
}
type Media = {
  id: string;
  title: string;
  type: string;
  duration: number;
  width: number;
  height: number;
  createdAt: Date;
}
function format(s: number) {
   const Hms = new Date(s * 1000).toISOString().slice(11, 19);
   if (Hms.startsWith("00:")) {
     return Hms.replace("00:", "");
   }
   return Hms
}
const DataTableColumnHeader = ({ column, children }: { column: Column<MediaTags>, children: JSX.Element }) => {
  return (
  
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {children}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
}
const globalHeader = (text: string, column: Column<MediaTags>) => { 
  return (
    <DataTableColumnHeader column={column}>
      <span>{text}</span>
    </DataTableColumnHeader>
  )
}


export const columns: ColumnDef<MediaTags>[] = [
  {
    accessorFn: () => "",
    accessorKey: "",
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    accessorFn: (row: Media) => row.id,
    header: "ID",
    enableGlobalFilter: true
  },
  {
    accessorKey: "title",
    accessorFn: (row: Media) => row.title,
    enableGlobalFilter: true,
    sortingFn: sortingFns.alphanumeric,
    enableSorting: true,
    sortDescFirst: false,
    header: ({column}) => globalHeader("Name", column),
  },
  {
    accessorFn: (row: Media) => {
        if (row.type === "VIDEO" || row.type === "AUDIO") {
            
            if (row.duration) {
                let duration = row.duration;
                if (typeof duration !== "number") {
                    duration = Number(row.duration)
                    return format(duration)
                }
                return format(duration)
            }
        }
    },
    header: "Duration",
    accessorKey: "duration",
  },
  {
    accessorFn: (row: Media) => {
        if (row.type === "VIDEO") {
            return `${row.width}x${row.height}`
        }
    },
    header: "Resolution",
    accessorKey: "width",
  },
  {
    accessorKey: "type",
    cell: props => {
        return <TypePopover type={props.row.original.type}></TypePopover>
    },
    accessorFn: (row: MediaTags) => row.type,
    enableGlobalFilter: true,
    header: ({column}) => globalHeader("Type", column),
  },
  {
    cell: props => {
        return <div className="flex flex-wrap">
            {props.row.original.tags.map((tag) => {
                return <Badge key={tag.id} className="mr-1 mb-1 bg-blue-500">{tag.name}</Badge>
            })}
        </div>
    },
    accessorKey: "tags",
    accessorFn: (row: MediaTags) => row.tags.map((tag) => tag.name).join(""),
    enableGlobalFilter: true,
    filterFn: filterFns.includesString,
    enableColumnFilter: true,
    header: ({column}) => globalHeader("Tags", column),
    sortingFn: sortingFns.alphanumeric,
  },
  {
    cell: props => {
        return <div className="flex flex-wrap">
            {props.row.original.createdAt.toLocaleDateString() + " " + props.row.original.createdAt.toLocaleTimeString()}
        </div>
    },
    accessorFn: (row: MediaTags) => row.createdAt.toLocaleDateString() + " " + row.createdAt.toLocaleTimeString(),
    accessorKey: "createdAt",
    enableGlobalFilter: true,
    filterFn: filterFns.includesString,
    enableColumnFilter: true,
    header: ({column}) => globalHeader("Creted At", column),
    sortingFn: sortingFns.datetime,
  },
]

