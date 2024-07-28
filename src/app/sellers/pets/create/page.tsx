import Breadcrumbs from "~/app/_components/sellers/pets/bread-crump";

export default async function(){
  const customer = await fetchCustomers();
  return (
    <main>
      <Breadcrumbs
      breadcrumbs={[
        {label:'Pets',href:'/sellers/pets'},
        {label:'Add Pet', href:'/sellers/pets/create',active:true}
      ]}
      ></Breadcrumbs>
      <Form customers={customer}></Form>
    </main>
  )
}