"use client"
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { deletePet } from "~/lib/action";
import { petType } from "./edit-form";
import { Toaster } from "~/components/ui/toaster";
import { useTransition } from "react";
import { toast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";

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

export function DeletePet({pet}:{pet:petType}){
  const [isPending, startTransition] = useTransition();
  async function handleDelete(){
    startTransition(async()=>{
      try{
        const res = await deletePet(pet)
        if(res.status){
          toast({
            description: res.message,
          })
        }else{
          if(res.error){
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: res.error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
          }else{
            toast({
              title: "Uh oh! Something went wrong.",
              description: res.message,
            })
          }
        }
      }catch(err:any){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    })
  }
  return (
    <>
    <form action={handleDelete}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    <Toaster/>
    </>
  )
}