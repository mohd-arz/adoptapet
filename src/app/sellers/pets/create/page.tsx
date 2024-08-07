import { redirect } from "next/navigation";
import Breadcrumbs from "~/app/_components/sellers/pets/bread-crump";
import Form from "~/app/_components/sellers/pets/create-form";
import { getServerAuthSession } from "~/lib/auth";

export default async function(){
  const session = await getServerAuthSession();
  if(!session)redirect('/signin/')
  // const customer = await fetchCustomers();
  return (
    <main>
      <Breadcrumbs
      breadcrumbs={[
        {label:'Pets',href:'/sellers/pets'},
        {label:'Add Pet', href:'/sellers/pets/create',active:true}
      ]}
      ></Breadcrumbs>
      <Form></Form>
    </main>
  )
}