import { redirect } from "next/navigation";
import Breadcrumbs from "~/app/_components/sellers/pets/bread-crump";
import Form from "~/app/_components/sellers/pets/edit-form";
import { ToastAction } from "~/components/ui/toast";
import { Toaster } from "~/components/ui/toaster";
import { toast } from "~/components/ui/use-toast";
import { getServerAuthSession } from "~/lib/auth";
import { api, } from "~/trpc/server";



export default async function({params}:{params:{id:string}}){
  const session = await getServerAuthSession();
  if(!session)redirect('sellers/signin/')
  const {pet} = await api.pet.getPet({id:params.id})
  if(!pet){
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Error While getting Pet",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
    return (
      <div>Pet</div>
    )
  }
  // const customer = await fetchCustomers();
  return (
    <main>
      <Breadcrumbs
      breadcrumbs={[
        {label:'Pets',href:'/sellers/pets'},
        {label:'Edit Pet', href:`/sellers/pets/${params.id}/edit`,active:true}
      ]}
      ></Breadcrumbs>
      <Form pet={pet}></Form>
    <Toaster />
    </main>
  )
}