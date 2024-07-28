import { db } from "~/server/db"


enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
  OTHERS = 'OTHERS',
}

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


async function seedDatabase(){
  try{
    await seedDogBreed()
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