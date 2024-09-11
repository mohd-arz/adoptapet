import { Mails } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getSellersDetails } from "~/lib/action";
import { api } from "~/trpc/server";
import { DataTable } from "./data-table";
import { MailType } from "~/lib/types";


export default async function ({
  searchParams,
}: {
  searchParams: { currentPage: string };
}) {
  const session = await getServerSession();
  let userid:number = 0;
  let auth = false;
  if (session && session.user.email) {
    const user = await getSellersDetails(session?.user.email);
    if (user?.type == "seller") auth = true;
    if (user?.id){
      userid = user.id;
    }
  }
  if (!auth) {
    return redirect("sellers/signin");
  }
  return (
    <div>
      Welcome Sellers
      <h2>Mails</h2>
      <DataTable id={userid}/>
    </div>
  );
}
