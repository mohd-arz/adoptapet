import Image from "next/image";

export default function(){
  const pets = [];
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
                          <Image 
                            src={pet.image_url}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${pet.name}'s profile picture`}
                          />
                          <p>{pet.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{pet.type}</p>
                      </div>
                      <div>{pet.status}</div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p>{(pet.createdAt)}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        {/* <UpdateInvoice id={invoice.id} /> */}
                        {/* <DeleteInvoice id={invoice.id} /> */}
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
                          <Image
                            src={pet.image_url}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${pet.name}'s profile picture`}
                          />
                          <p>{pet.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pet.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {(pet.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pet.status}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* <UpdateInvoice id={invoice.id} />
                          <DeleteInvoice id={invoice.id} /> */}
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