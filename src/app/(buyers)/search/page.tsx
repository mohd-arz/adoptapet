import Image from "next/image";
import { api } from "~/trpc/server";
import { Gloock}from '@next/font/google'
import Link from "next/link";

const gloock = Gloock({
  weight: ["400"],
  subsets:["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

export default async function({searchParams}:{searchParams:any}){
  const pets = await api.pet.getPetsBySearch(searchParams);
  return (
    <div className="flex-1 mt-4 max-w-[1400px] px-[5%] mx-auto grid grid-cols-12 gap-x-6">
      {pets.map(pet=>{
        return(
            <GridItem key={pet.id} pet={pet}/>
        )
      })}
    </div>
  )
}

function GridItem({pet}:{pet:any}){
  return (
  <div className="h-[420px] border border-black col-span-3 rounded-lg overflow-hidden">
    <Link href={`/pet/${pet.id}`}>
    <div className="w-full">
      <Image
        src={`${BASE_URL}/${pet?.image_url}`}
        alt={`${pet?.name}'s profile picture`}
        width={420}
        height={420}
        style={{width:'100%',objectFit:'cover',aspectRatio:'1/1',overflow: 'hidden'}}
      />
    </div>
    <div className="text-left mx-4 mb-4">
      <div className="border border-black">
        <h1 className={`text-4xl truncate ${gloock.className}`}>{pet?.name}</h1> 
      </div>
      {
        pet?.type === 'DOG' ? (
          <div className="my-1">
            <h2 className="text-xl font-bold">{pet?.breed?.name}</h2>
          </div>
        ) : (
          <div className="my-1">
            <h2 className="text-lg font-semibold">{pet?.type === 'OTHERS' ? pet?.others : pet?.type}</h2>
          </div>
        )
      }
      <div>
        <p className="text-sm font-light">{pet?.age}</p>
        <p className="text-sm font-light">{pet?.location ? pet?.location.name : 'Location'}</p>
      </div>
    </div>
    </Link>
  </div>
  )
}