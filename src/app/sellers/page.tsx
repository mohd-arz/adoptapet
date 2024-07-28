import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function(){
  const session = await getServerSession();
  if(!session)redirect('/signin/')
  console.log(session);
  return (
    <div>Welcome Sellers</div>
  )
}