import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useWordCloud } from "@/contexts/WordCloud";
import { Datum } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { processedData, setProcessedData } = useWordCloud();

  const [rowSelection, setRowSelection] = useState(() => {
    const state: Record<string, boolean> = {};
    processedData.map((data) => {
      if (data.isVisible) {
        state[data.word] = data.isVisible;
      }
    });

    return state;
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    //@ts-expect-error ...
    getRowId: (row) => row.word,
    state: {
      rowSelection,
      columnFilters,
    },
  });

  useEffect(() => {
    const handleSelectionState = (selections: RowSelectionState) => {
      const processedDataMap = new Map<Datum["word"], Datum>();
      processedData.forEach((data) => {
        processedDataMap.set(data.word, { ...data, isVisible: false });
      });

      Object.keys(selections).map((key) => {
        //  const value= table.getSelectedRowModel().rowsById[key]?.original;
        const value = processedDataMap.get(key) as Datum;
        processedDataMap.set(key, { ...value, isVisible: true });
      });

      setProcessedData(Array.from(processedDataMap.values()));
    };

    handleSelectionState(rowSelection);
  }, [rowSelection]);

  return (
    <div className="flex flex-col h-[350px] md:h-[400px]  w-full overflow-y-auto p-3 gap-4 ">
      <div className="flex items-center">
        <Input
          placeholder="Filter word..."
          value={(table.getColumn("word")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("word")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="rounded-md border flex-1 h-full overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="text-center max-w-28 overflow-x-auto"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
