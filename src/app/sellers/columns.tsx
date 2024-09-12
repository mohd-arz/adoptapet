"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { MailType } from "~/lib/types";
import { Switch } from "~/components/ui/switch";
import { api } from "~/trpc/react";

function SwitchFn({
  rowData,
  pet_id,
  status,
  id,
  buyer_id,
  pet_status,
  onSwitchChange,
}: {
  rowData: any;
  pet_id: number;
  status: boolean;
  id: number;
  buyer_id: number;
  pet_status: boolean;
  onSwitchChange: (checked: boolean, pet_id: number, buyer_id: number) => void;
}) {
  const mutation = api.pet.setStatusByMail.useMutation();
  function onChange(checked: boolean, id: number) {
    onSwitchChange(checked, pet_id, buyer_id);
    mutation.mutate({ id: id, status: checked });
  }
  return (
    <Switch
      defaultChecked={status}
      onCheckedChange={(checked) => onChange(checked, id)}
      disabled={!status && !pet_status}
    />
  );
}

export const columns = (
  handleSwitchChange: (
    checked: boolean,
    pet_id: number,
    buyer_id: number,
  ) => void,
): ColumnDef<MailType>[] => [
  {
    header: "SI NO",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    header: "Buyer Name",
    accessorKey: "Buyer.name",
  },
  {
    header: "Buyer Mail",
    accessorKey: "Buyer.email",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pet Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "Pet.name",
    id: "petName",
  },
  {
    header: "Pet Type",
    accessorFn: (row) => {
      if (row.Pet.type == "OTHERS") {
        return row.Pet.other;
      } else if (row.Pet.type == "DOG") {
        return row.Pet.breed?.name;
      }
      return row.Pet.type;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Mailed at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString();
    },
  },
  {
    header: "Action",
    accessorKey: "is_replied",
    cell: ({ row }) => {
      const id = row.original.id;
      const petStatus = row.original.Pet.status;
      return (
        <SwitchFn
          rowData={row.original}
          status={row.getValue("is_replied")}
          id={id}
          pet_id={row.original.pet_id}
          buyer_id={row.original.buyer_id}
          pet_status={petStatus}
          onSwitchChange={(checked, pet_id, buyer_id) =>
            handleSwitchChange(checked, pet_id, buyer_id)
          }
        />
      );
    },
  },
];
