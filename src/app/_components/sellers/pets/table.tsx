import Image from "next/image";
import { getServerAuthSession } from "~/lib/auth";
import { db } from "~/server/db";
import { DeletePet, EditPet } from "./buttons";
import { PetType } from "@prisma/client";
import { api } from "~/trpc/server";
import { petType } from "./edit-form";

const ITEMS_PER_PAGE = 10;


export default async function({query,currentPage}:{query:string,currentPage:number}){
  const session = await getServerAuthSession();
  if(!session)return;
  const id =  (session?.user as { id?: number })?.id as number; 
  const pets = await api.pet.getPets({id:+id,query, currentPage});
  const BASE_URL = process.env.NEXT_BASE_URL;
    return (
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {pets?.map((pet) => (
                  <div
                    key={pet.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          {/* <img 
                            src={`${BASE_URL}/${pet.thumb_url}`}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${pet.name}'s profile picture`}
                          /> */}
                          <CloudImage src={pet.image_url} class_="rounded-full" width={28} height={28} alt={`${pet.name} image`}/>
                          <p>{pet.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{pet.type}</p>
                      </div>
                      <div>{pet.status}</div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p>{new Date(pet.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <EditPet id={pet.id} />
                        <DeletePet pet={pet as petType}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Action
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {pets?.map((pet) => (
                    <tr
                      key={pet.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          {/* <Image
                            src={`${BASE_URL}/${pet.thumb_url}`}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${pet.name}'s profile picture`}
                          /> */}
                          <CloudImage src={pet.image_url} class_="rounded-full" width={28} height={28} alt={`${pet.name} image`}/>
                          <p>{pet.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pet.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pet.status == true ? 'Active' : "Inactive"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                      {new Date(pet.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-0 pr-3">
                        <div className="flex gap-3">
                          <EditPet id={pet.id} />
                          <DeletePet pet={pet as petType}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}