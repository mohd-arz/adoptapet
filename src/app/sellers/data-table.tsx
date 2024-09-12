"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { MailType } from "~/lib/types";
import { columns } from "./columns";

export function DataTable<TData, TValue>({ id }: { id: number }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<MailType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const d = api.pet.getMailsBySeller.useQuery({
    id: id,
    currentPage: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });
  const handleSwitchChange = (
    checked: boolean,
    pet_id: number,
    buyer_id: number,
  ) => {
    console.log("data", data);
    setData((prevData) =>
      prevData.map((row) => {
        if (row.pet_id === pet_id && row.buyer_id === buyer_id) {
          return {
            ...row,
            is_replied: checked,
            Pet: { ...row.Pet, status: !checked },
          };
        } else if (row.buyer_id === buyer_id) {
          return { ...row, Pet: { ...row.Pet, status: !checked } };
        } else {
          return row;
        }
      }),
    );
  };
  useEffect(() => {
    if (d.isSuccess) {
      setData(d.data?.result || []);
      setPageCount(d.data?.count || 0);
    }
  }, [d.data, d.isSuccess]);

  const table = useReactTable({
    data: data || [],
    columns: columns(handleSwitchChange),
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Pets..."
          value={(table.getColumn("petName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("petName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  {d.isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
