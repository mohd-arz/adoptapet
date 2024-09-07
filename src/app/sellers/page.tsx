import { Mails } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getSellersDetails } from "~/lib/action";
import { api } from "~/trpc/server";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type MailType = Omit<Mails, "id" | "seller_id">;

export default async function () {
  const session = await getServerSession();
  let auth = false;
  let mails: MailType[] = [];
  if (session && session.user.email) {
    const user = await getSellersDetails(session?.user.email);
    if (user?.type == "seller") auth = true;
    if (user?.id) mails = await api.pet.getMailsBySeller({ id: +user.id });
  }
  if (!auth) {
    return redirect("sellers/signin");
  }
  console.log(mails);
  return (
    <div>
      Welcome Sellers
      <h2>Mails</h2>
      {/* <DataTable data={mails} columns={columns} /> */}
    </div>
  );
}
