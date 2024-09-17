"use client"
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import {  useRef } from "react";
import 'swiper/css';
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '~/server/api/root';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import {  type } from '~/lib/atom';
import { api } from '~/trpc/react';
import { PetType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Gloock}from '@next/font/google'

const gloock = Gloock({
  weight: ["400"],
  subsets:["latin"],
});

export type petType= inferRouterOutputs<AppRouter>['pet']['getNewPets'];


export function SwiperContainer():JSX.Element{
  const value = useRecoilValue(type)
  const {data,isSuccess} = api.pet.getNewPets.useQuery({type:value});
  const swiper = useSwiper();
  const swiperRef = useRef<SwiperRef>(null);
  const handlePrev = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.slideNext();
    }
  };
  return (
    <div className="relative px-16">
      {
        (isSuccess && data.length > 0) ? (
          <>
          <Swiper
            slidesPerView={3}
            ref={swiperRef}
            breakpoints={{
              10: {
                slidesPerView: 1,
                slidesPerGroup:1,
                spaceBetween: 20,
              },
              800: {
                slidesPerView: 2,
                slidesPerGroup:2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup:3,
                spaceBetween: 50,
              },
            }}
          >
          { data.map((pet,index)=>(
            <SwiperSlide key={index}>
              <Link href={`/pet/${pet.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <SlideElement pet={pet} ind={index}/>
              </Link>
            </SwiperSlide>
           ))
          }
          </Swiper> 
            <ChevronLeft
              className="prev-arrow absolute left-0 top-1/2 cursor-pointer "
              onClick={handlePrev}
              size={45}
              style={{
                strokeWidth: "1",
              }}
            />
            <ChevronRight
              className="next-arrow absolute right-0 top-1/2 cursor-pointer"
              onClick={handleNext}
              size={45}
              style={{
                strokeWidth: "1",
              }}
            />
          </>
          )
          : (
          <div className='flex gap-8'>
            <SlideElementSkeleton/>
            <SlideElementSkeleton/>
            <SlideElementSkeleton/>
        </div> )
      }
   
    
    </div>
  )
}

function SlideElement({pet,ind}:{pet:any,ind:number}):JSX.Element{
  const maskStyle= {
      WebkitMaskImage: 'url("assets/Mask-pet-card-wavy.svg")',
      maskImage: 'url("assets/Mask-pet-card-wavy.svg")',
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      maskSize:'85%',    
      WebkitMaskSize:'85%',    
      maskPosition:"center",
    }
  const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";
  return (
    <div style={{ maxWidth:'350px' }} className={`flex flex-col w-full max-h-500 ${ind==0 ? 'bg-cyan' : ind == 1 ? 'bg-t-blue' : 'bg-mustard-yello'} rounded-2xl`}>
        <div className={`w-full`} style={{
          ...maskStyle, 
          // backgroundColor:'grey'
        }}>
           <Image
              src={`${BASE_URL}/${pet.image_url}`}
              style={{objectFit:'cover',aspectRatio:'1/1'}}
              width={'350'}
              height={'350'}
              alt={`${pet.name}'s profile pictures`}
            />
        </div>
      <div className="text-left mx-4 mb-4">
        <div className="border border-black">
          <h1 className={`text-4xl truncate ${gloock.className}`}>{pet.name}</h1> 
        </div>
        {
          pet.type == 'DOG' ? (
            <div className="my-2">
              <h2 className="text-xl font-bold">{pet.breed.name}</h2>
            </div>
          ):(
            <div className="my-2">
              <h2 className="text-xl font-bold">{pet.type == 'OTHERS' ? pet.others : pet.type}</h2>
            </div>
          )
        }
        <div>
          <p className="text-lg font-light">{pet.age}</p>
          <p className="text-lg font-light">{pet.location ? pet.location.name : 'Location'}</p>
        </div>
      </div>
    </div>
  )
}

export function SlideElementSkeleton(): JSX.Element {
  return (
    <div
      role="status"
      style={{ maxWidth: "350px",height:"508px" }}
      className="flex flex-col w-full max-h-500 p-4 border border-gray-200 rounded-2xl shadow animate-pulse bg-white md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center w-full h-64 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="text-left mx-4 mb-4">
        <div className="h-8 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
      </div>
    </div>
  );
}
