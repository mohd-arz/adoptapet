"use client";

import { ColumnDef } from "@tanstack/react-table";

export type MailColumns = {
  buyer_id: number;
  pet_id: number;
  createdAt: Date;
};

export const columns: ColumnDef<MailColumns>[] = [
  {
    accessorKey: "buyer_id",
    header: "buyer_id",
  },
  {
    accessorKey: "pet_id",
    header: "pet_id",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "amount",
    cell: ({ row }) => {
      return row.getValue("pet_id");
    },
  },
];
