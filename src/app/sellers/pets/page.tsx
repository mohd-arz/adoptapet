import { redirect } from "next/navigation"
import { Suspense } from "react"
import { AddPet } from "~/app/_components/sellers/pets/buttons"
import Pagination from "~/app/_components/sellers/pets/pagination"
import Search from "~/app/_components/sellers/pets/search"
import Table from "~/app/_components/sellers/pets/table"
import { lusitana } from "~/app/_components/utils/font"
import { getServerAuthSession } from "~/lib/auth"
import { api } from "~/trpc/server"

export default async function({
  searchParams
}:{
  searchParams?:{
    query?:string
    page?:string
  }
}){
  const session = await getServerAuthSession();
  console.log(session)
  if(!session)redirect('/sellers/signin/')
  const id =  (session?.user as { id?: number })?.id as number; 
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1;
  const {totalPages} =  await api.pet.getPetTablePages({id:+id,query});
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Pets..." />
        <AddPet />
      </div>
       {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage}/>
      {/* </Suspense> */}
        <div className="mt-5 flex w-full justify-end">
          <Pagination totalPages={totalPages?totalPages : 1} />
        </div>
    </div>
  )
}