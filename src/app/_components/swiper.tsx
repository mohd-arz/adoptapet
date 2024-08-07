"use client"
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { useRef } from "react";
import 'swiper/css';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '~/server/api/root';
import Image from 'next/image';
export type petType= inferRouterOutputs<AppRouter>['pet']['getNewPets'];


export function SwiperContainer({pets}:{pets:petType}):JSX.Element{
  console.log(pets);
  const swiper = useSwiper();
  const swiperRef = useRef<SwiperRef>(null);
  const handlePrev = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      // Move 3 slides back
      for (let i = 0; i < 3; i++) {
        swiper.slidePrev();
      }
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const newIndex = Math.min(swiper.activeIndex + 3, swiper.slides.length - 1); // Ensure index does not exceed the number of slides
      swiper.slideTo(newIndex);
    }
  };
  return (
    <div className="relative px-8">
    <Swiper
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        ref={swiperRef}
      >
        {pets.map((pet,index)=>(
          <SwiperSlide key={index}><SlideElement pet={pet}/></SwiperSlide>
        ))}
      </Swiper>
      <FaCircleChevronLeft
        className="prev-arrow absolute left-0 top-2/4 cursor-pointer"
        onClick={handlePrev}
        style={{
          color: "lightgray",
          stroke: "black",
          strokeWidth: "0.75",
          fontSize: "20px",
        }}
      />
      <FaCircleChevronRight
        className="next-arrow absolute right-0 top-2/4 cursor-pointer"
        onClick={handleNext}
        style={{
          color: "lightgray",
          stroke: "black",
          strokeWidth: "0.75",
          fontSize: "20px",
        }}
      />
    </div>
  )
}

function SlideElement({pet}:{pet:any}):JSX.Element{
  const maskStyle= {
      WebkitMaskImage: 'url("https://prod-assets.production.omega.aapdev.org/img/Mask-pet-card-wavy.svg")',
      maskImage: 'url("https://prod-assets.production.omega.aapdev.org/img/Mask-pet-card-wavy.svg")',
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      maskSize:'85%',    
      WebkitMaskSize:'85%',    
      maskPosition:"center",
    }
  console.log(pet);
  const BASE_URL = "http://localhost:3000"
  return (
    <div style={{ maxWidth:'350px' }} className="flex flex-col w-full max-h-500 bg-cyan rounded-2xl">
        <div className="w-full" style={maskStyle}>
          {/* <img src="https://pet-uploads.adoptapet.com/1/b/b/1138469363.jpg" className="w-full" style={{objectFit:'cover'}} alt="Dog Image"/> */}
           <img
              src={`${BASE_URL}/${pet.image_url}`}
              style={{objectFit:'cover',aspectRatio:'1/1'}} alt="Dog Image"
              width={'350'}
              alt={`${pet.name}'s profile pictures`}
            />
        </div>
      <div className="text-left mx-4 mb-4">
        <div className="border border-black">
          <h1 className="text-4xl truncate">{pet.name}</h1> 
        </div>
        {
          pet.type == 'DOG' ? (
            <div className="my-2">
              <h2 className="text-xl font-bold">{pet.breed.name}</h2>
            </div>
          ):(
            <div className="my-2">
              <h2 className="text-xl font-bold">{pet.type}</h2>
            </div>
          )
        }
        <div>
          <p className="text-lg font-light">Age:{pet.age}</p>
        </div>
      </div>
    </div>
  )
}