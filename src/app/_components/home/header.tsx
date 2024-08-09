"use client"
import { FaMagnifyingGlass } from "react-icons/fa6";
import NavDropdown from "./nav-dropdown";
import Button from "./button";
import { useEffect, useState } from "react";
import { AgeInput, BreedInput, LocationInput } from "./banner-select";
import { PetAge, PetType } from "@prisma/client";
import { api } from "~/trpc/react";
import { breedType, locationType } from "~/lib/types";

export function Header(){
  return(
    <header className="border">
      <NavBar/>
      <Banner/>
      <div className="empty-cyan h-10 bg-cyan"></div>
      <div className="empty-blue h-16 bg-blue"></div>
    </header>
  );
}

function NavBar():JSX.Element{
  return (
    <div className="wrapper bg-cyan">
      <nav className="flex flex-row justify-between items-center px-[5%] mx-auto border border-red-500 max-w-[1400px] h-[88px]">
        <div>Logo</div>
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

function Banner():JSX.Element{
  const [location,setLocation] = useState<locationType>({id:0,name:'default'});
  const [age,setAge] = useState<PetAge[]>([]);
  const [breeds,setBreeds] = useState<breedType[]>();
  const [breed,setBreed] = useState<breedType[]>([]); 
  const [locations,setLocations] = useState<locationType[]>([]);
  console.log(location,age,breed);
  
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
          <div className="banner-title text-8xl text-white">Ready to <br/> adopt a pet?</div>
          <div className="banner-description text-white">Let's get started. Search pets from shelters, rescues, and individuals.</div>
          <div className="banner-search h-[152px] flex flex-col justify-between bg-cyan rounded-tl-xl rounded-tr-xl p-5">
              <ul className="flex text-xl gap-4">
                <li>Dog</li>
                <li>Cat</li>
                <li>Other Pets</li>
              </ul>
            <div className="flex justify-center items-center gap-4">
              <LocationInput locations={locations} setLocation={setLocation}></LocationInput>
              <AgeInput ages={ages} age={age} setAge={setAge}/>
              {
                breeds ? (
                  <BreedInput breed={breed} breeds={breeds as breedType[]} setBreed={setBreed}/>
                ):'Loading...'
              }
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