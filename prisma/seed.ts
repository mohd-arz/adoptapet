import { PetType } from "@prisma/client";
import { db } from "~/server/db"


type DogBreedType = {
  name: string;
  type: PetType;
}

const dogBreeds: DogBreedType[] = [
  { name: 'Labrador Retriever', type: PetType.DOG },
  { name: 'German Shepherd', type: PetType.DOG },
  { name: 'Golden Retriever', type: PetType.DOG },
  { name: 'Bulldog', type: PetType.DOG },
  { name: 'Poodle', type: PetType.DOG },
  { name: 'Beagle', type: PetType.DOG },
  { name: 'Rottweiler', type: PetType.DOG },
  { name: 'German Shorthaired Pointer', type: PetType.DOG },
  { name: 'Yorkshire Terrier', type: PetType.DOG },
  { name: 'Boxer', type: PetType.DOG },
];

type indianStatesType = {
  name:string,
}

const indianStates:indianStatesType[] = [
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chhattisgarh" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Odisha" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
  { name: "Andaman and Nicobar Islands" },
  { name: "Chandigarh" },
  { name: "Dadra and Nagar Haveli and Daman and Diu" },
  { name: "Delhi" },
  { name: "Lakshadweep" },
  { name: "Puducherry" },
];


async function seedDogBreed(){
  try{
    await db.breed.createMany({
      data:dogBreeds
    })
  }catch(error){
    console.error('Error seeding breeds:', error);
    throw error;
  }
}
async function seedIndianStates(){
  try{
    await db.location.createMany({data:indianStates});
  }catch(error){
    console.error('Error seeding Location',error)
  }
}

async function seedDatabase(){
  try{
    await seedDogBreed()
    await seedIndianStates();
  }catch(error){
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});