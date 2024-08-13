"use client"

import { inferRouterOutputs } from "@trpc/server"
import { ArrowLeftIcon, ChevronDown, ChevronLeft, ChevronUp, Mail } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppRouter } from "~/server/api/root"
import { api } from "~/trpc/react"
import { differenceInMonths } from 'date-fns';
import Image from "next/image"
import { List, ListItem, Collapse } from '@mui/material';
import { Button } from "~/components/ui/button"
import DetailPageSkeleton from "~/app/_components/home/detail-page-skeleton"
import { Gloock}from '@next/font/google'

const gloock = Gloock({
  weight: ["400"],
  subsets:["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";
export type petType= inferRouterOutputs<AppRouter>['pet']['getPet']['pet'];

export default function({params}:{params:{id:string}}){
  const [pet,setPet] = useState<petType>();
  const [date,setDate] = useState<number>();
  const [imgInd,setImgInd] = useState<number>(-1);

  const {data,isSuccess,isLoading} = api.pet.getPet.useQuery({id:params.id});
  const handleClick = (ind:number)=>{
    setImgInd(ind);
  }
  useEffect(()=>{
    if(data && data.pet){
      setPet(data.pet)
      const now = new Date();
      const monthsAgo = differenceInMonths(now, data.pet.createdAt);
      setDate(Math.abs(monthsAgo));
    }
  },[isSuccess,data])
  const router = useRouter();

  if (isLoading) {
    return (
      <DetailPageSkeleton/>
    );
  }
  
  if(isSuccess)
  return (
    <div className="max-w-[1400px] px-[5%] mx-auto grid grid-cols-12">
    <div className="col-span-10 col-start-2 gap-x-1">
      <button className="my-6 flex text-dark-cyan items-center group transition-all duration-300 ease-in-out" onClick={() => router.back()}>
        <ChevronLeft size={16} />
        <span className="font-semibold text-sm bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out">
          Back
        </span>
      </button>
      <div className="border border-black">
        <h1 className={`text-5xl my-4 ${gloock.className}`}>My Name is {pet?.name} !</h1>
        <h2 className="my-4">Posted on {date === 0 ? 'this month' : `${date} month${date as number > 1 ? 's' : ''} ago`}</h2>
        <div className="grid grid-cols-10 gap-x-8">
          <div className="border border-black w-full flex flex-col gap-4 col-span-6">
            <div className="relative h-[400px] bg-slate-800">
              <Image
                src={imgInd === -1 ? `${BASE_URL}/${pet?.image_url}` : `${BASE_URL}/${pet?.SubImages[imgInd]?.sub_url}`}
                layout="fill"
                objectFit="contain"
                alt={`${pet?.name}'s profile pictures`}
              />
            </div>
            <div className="grid grid-cols-5 gap-4 relative w-full">
              <Image
                src={`${BASE_URL}/${pet?.thumb_url}`}
                onClick={() => handleClick(-1)}
                className={imgInd === -1 ? 'opacity-50' : ''}
                alt="main image"
                width={100}
                height={100}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover'
                }}
              />
              {pet?.SubImages && pet.SubImages.map((img, ind) => (
                <Image
                  key={ind}
                  src={`${BASE_URL}/${img.sub_url}`}
                  onClick={() => handleClick(ind)}
                  className={imgInd === ind ? 'opacity-50' : ''}
                  alt="sub images"
                  width={100}
                  height={100}
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>
          </div>
            <SideBox pet={pet}/>
        </div>
        <div className="border border-black basic-info max-h-[12.425rem]">
          <h1 className="text-3xl font-semibold mb-4">My basic info</h1>

          {pet?.type === 'DOG' && (
            <div className="flex gap-4 mb-2">
              <div className="font-semibold">Breed</div>
              <div>{pet?.breed?.name}</div>
            </div>
          )}

          <div className="flex gap-4 mb-2">
            <div className="font-semibold">Age</div>
            <div>{pet?.age}</div>
          </div>

          <div className="flex gap-4 mb-2">
            <div className="font-semibold">Sex</div>
            <div>{pet?.sex}</div>
          </div>
        </div>

        <div className="info mt-4">
          <h1 className="text-3xl font-semibold">Why I need a new home</h1>
          <p>Human health issues (e.g. allergies, sickness)</p>
        </div> 
        <div className="whynewhome mt-4">
          <h1 className="text-3xl font-semibold">My story</h1>
          <h2 className="text-xl font-semibold">Here's what the humans have to say about me:</h2>
          <p className="mt-4">Josephine is a wonderful and loving cat. She is truly a lap cat who loves nothing better than to sit on your lap and be pet or just hang out. She also likes to play and nap and is honestly the cutest and sweetest cat I've ever met. She can be shy and meek at first, but warms up to people and they fall in love with her. I don't know how she is with other animals. She is timid, so wouldn't be the alpha in any situation. I am heartbroken to have to rehome her, but a household member has severe allergies. I want her to have a loving and stable home where she can be cared for and loved the way she deserves.</p>
        </div>
      </div>
    </div>
  </div> 
  )
}
function SideBox({pet}:{pet:petType}){
  const [isExpanded, setIsExpanded] = useState(true);
  const items = ["Submit Application", "Interview", "Meet the Pet", "Pay Fee", "Sign Adoption Contract"];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="bg-cyan col-span-4 rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-8">
      Cared for by Private owner ({pet?.location.name})
      </h1>
      <List>
        <h2 className="font-semibold mb-2">Adoption process</h2>
        {items.slice(0,3).map((item, index) => (
          <ListItem key={index} sx={{
            padding:'8px 0',
          }}>
            <span className="flex items-center justify-center w-[20px] h-[20px] mr-4 text-white rounded-full text-sm bg-black">{index + 1}</span>
            {item}
          </ListItem>
        ))}
        <Collapse in={isExpanded}>
          {items.slice(3).map((item, index) => (
            <ListItem key={index + 3}  sx={{
              padding:'8px 0',
            }}>
              <span className="flex items-center justify-center w-[20px] h-[20px] mr-4 text-white rounded-full text-sm bg-black">{index + 4}</span>
              {item}
            </ListItem>
          ))}
        </Collapse>
      </List>
      <button className="text-sm flex items-center mb-6" onClick={toggleExpand}>
        {isExpanded ? (
          <>
            <ChevronUp /> Close
          </>
        ) : (
          <>
            <ChevronDown /> View All
          </>
        )}
      </button>
      <h1 className="text-xl font-bold mb-6">Adoption fee: $25</h1>
      <Button className="rounded-3xl w-full p-6 font-semibold">
        <Mail size={16} strokeWidth={2} className="mr-2 font-semibold"/>
        Mail to Seller
      </Button>
    </div>
  )
}