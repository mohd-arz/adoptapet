"use client"
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { useRef } from "react";
import 'swiper/css';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export function SwiperContainer():JSX.Element{
  const swiper = useSwiper();
  const swiperRef = useRef<SwiperRef>(null);
  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
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
          <SwiperSlide ><SlideElement/></SwiperSlide>
          <SwiperSlide ><SlideElement/></SwiperSlide>
          <SwiperSlide ><SlideElement/></SwiperSlide>
          <SwiperSlide ><SlideElement/></SwiperSlide>
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

function SlideElement():JSX.Element{
  const maskStyle= {
      WebkitMaskImage: 'url("https://prod-assets.production.omega.aapdev.org/img/Mask-pet-card-wavy.svg")',
      maskImage: 'url("https://prod-assets.production.omega.aapdev.org/img/Mask-pet-card-wavy.svg")',
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      maskSize:'85%',    
      WebkitMaskSize:'85%',    
      maskPosition:"center",
    }
  
  return (
    <div style={{ maxWidth:'350px' }} className="flex flex-col w-full max-h-500 bg-cyan rounded-2xl">
        <div className="w-full" style={maskStyle}>
          <img src="https://pet-uploads.adoptapet.com/1/b/b/1138469363.jpg" className="w-full" style={{objectFit:'cover'}} alt="Dog Image"/>
        </div>
      <div className="text-left mx-4 mb-4">
        <div>
          <h1 className="text-4xl">Name</h1> 
        </div>
        <div className="my-2">
          <h2 className="text-xl font-bold">Type</h2>
        </div>
        <div>
          <p className="text-lg font-light">Detail</p>
        </div>
      </div>
    </div>
  )
}