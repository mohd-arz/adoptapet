import { Suspense } from "react"
import { AddPet } from "~/app/_components/sellers/pets/buttons"
import Search from "~/app/_components/sellers/pets/search"
import Table from "~/app/_components/sellers/pets/table"
import { lusitana } from "~/app/_components/utils/font"

export default async function({
  searchParams
}:{
  searchParams?:{
    query?:string
    page?:string
  }
}){
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages =  await fetchInvoicesPages(query);
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
        <Table />
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}