import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { deletePet } from "~/lib/action";

export function AddPet() {
  return (
    <Link
      href="/sellers/pets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add a Pet</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function EditPet({ id }: { id: number }) {
  return (
    <Link
      href={`/sellers/pets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePet({id,image_url,thumb_url}:{id:number,image_url:string,thumb_url:string}){
  return (
    <form action={deletePet.bind(null,id,image_url,thumb_url)}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  )
}