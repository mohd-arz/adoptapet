"use client"
import { FaMagnifyingGlass } from "react-icons/fa6";
import NavDropdown from "./nav-dropdown";
import Button from "./button";
import { useEffect, useState } from "react";
import { AgeInput, BreedInput, LocationInput } from "./banner-select";
import { PetAge, PetType } from "@prisma/client";
import { api } from "~/trpc/react";
import { breedType, locationType } from "~/lib/types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { type as typeState } from "~/lib/atom";
import { motion } from 'framer-motion';
import { Gloock}from '@next/font/google'

const gloock = Gloock({
  weight: ["400"],
  subsets:["latin"],
});

export function Header(){
  return(
    <header className="border">
      <Banner/>
      <div className="empty-cyan h-10 bg-cyan"></div>
      <div className="empty-blue h-16 bg-blue"></div>
    </header>
  );
}

export function NavBar():JSX.Element{
  return (
    <div className="wrapper bg-cyan">
      <nav className="flex flex-row justify-between items-center px-[5%] mx-auto border border-red-500 max-w-[1400px] h-[88px]">
        <div className={`${gloock.className} text-2xl italic`}>Best Friend</div>
        <div className="h-full">
          <NavDropdown/>
        </div>
        <div className="flex flex-row gap-4">
          <Button type={'white'} title={'Login'}/>     
          <Button type={'black'} title={'Sign Up'}/>     
        </div>
      </nav>
    </div>
  )
}

const ages:ageType[] = [
  {value:PetAge.YOUNG,name:'Young'},
  {value:PetAge.ADULT,name:'Adult'},
  {value:PetAge.SENIOR,name:'Senior'},
]
type ageType = {
  value:PetAge,
  name:string,
}

const textSegments = ["Ready","to", "have","a","friend?"];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const segmentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },  
};

function Banner():JSX.Element{
  const [location,setLocation] = useState<locationType>({id:0,name:'default'});
  const [age,setAge] = useState<PetAge[]>([]);
  const [breeds,setBreeds] = useState<breedType[]>([]);
  const [breed,setBreed] = useState<breedType[]>([]); 
  const [locations,setLocations] = useState<locationType[]>([]);
  const [type,setType] = useRecoilState(typeState);

  const handleTypeChange = (newType:PetType) => {
    setType(newType);
  };  
  const { data, isSuccess }  = api.pet.getBreed.useQuery({type:PetType.DOG})
  const locationQuery = api.pet.getLocation.useQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setBreeds(data.breeds);
    }
    if(locationQuery.isSuccess && locationQuery.data){
      setLocations(locationQuery.data.locations)
    }
    
  }, [isSuccess, data,locationQuery.isSuccess,locationQuery.data]);


  return (
    <div className="wrapper  bg-dark-cyan">
      <div className="banner-container h-[800px] max-w-[1400px] px-[5%] mx-auto border border-purple-700 flex items-end">
        <div className="banner-content w-full">
        <motion.div
          className={`banner-title text-9xl text-white ${gloock.className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {textSegments.map((segment, index) => (
            <motion.span key={index} variants={segmentVariants}>
              {segment} {index == 1 && <br />}
            </motion.span>
          ))}
        </motion.div>
          <div className="banner-description text-white my-4 text-lg">Let's get started. Search pets from rescues, and individuals.</div>
          <div className="banner-search h-[152px] flex flex-col justify-between bg-cyan rounded-tl-xl rounded-tr-xl p-5">
              <ul className="flex text-xl gap-4">
                <li className={`cursor-pointer ${type === PetType.DOG ? 'font-bold' : ''}`}
                onClick={() => handleTypeChange(PetType.DOG)}>
                  Dogs
                </li>
                <li className={`cursor-pointer ${type === PetType.CAT ? 'font-bold' : ''}`} 
                  onClick={() => handleTypeChange(PetType.CAT)}>
                    Cats
                  </li>
                <li className={`cursor-pointer ${type === PetType.OTHERS ? 'font-bold' : ''}`} 
                  onClick={() => handleTypeChange(PetType.OTHERS)}>
                  Other Pets
                </li>
              </ul>
            <div className="flex justify-center items-center gap-4">
              <LocationInput locations={locations} setLocation={setLocation}></LocationInput>
              <AgeInput ages={ages} age={age} setAge={setAge}/>
              <BreedInput breed={breed} breeds={breeds as breedType[]} setBreed={setBreed}/>
              <GetStartedButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GetStartedButton():JSX.Element{
  return (
    <button className="flex items-center px-9 py-4 text-base border rounded-full bg-black text-white">
        <FaMagnifyingGlass className="mr-2" />
        Get Started
    </button>
  )
}