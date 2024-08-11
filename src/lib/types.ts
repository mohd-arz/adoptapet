import { PetAge, PetSex, PetType } from "@prisma/client";
import { z } from "zod";

export const petDefaultValues = {
  name:'',
  image_url:undefined,
  sub_url:undefined,
  sex:undefined,
  type:undefined,
  other: '',
  age:undefined,
  breed:undefined,
  location:undefined,
}

const MAX_FILE_SIZE = 3 * 1024 * 1024; 

// Create Form Schema 
export const petFormSchema = z.object({
  name: z.string().min(2).max(50),
  image_url: z.instanceof(File,{message:'Main Image is required'})
  .refine(file=>file.size <= MAX_FILE_SIZE,{message:'Image should not exceed 3MB'}),
  sub_url: z.array(z.instanceof(File),{message:'Sub Image is required'})
  .max(4, { message: 'You can only upload up to 4 images' }) 
  .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), {
    message: 'Each Sub Image should not exceed 3MB',
  }),
  sex: z.enum([PetSex.FEMALE,PetSex.MALE],{message:"Gender is required"}),
  age: z.enum([PetAge.YOUNG,PetAge.ADULT,PetAge.SENIOR],{message:'Age is required'}),
  type: z.enum([PetType.DOG,PetType.CAT,PetType.OTHERS],{message:"Type is required"}),
  other:z.string().optional(),
  breed: z.string().optional(),
  location:z.string({message:'Location is required'}),
}).refine(data => {
  if (data.type === PetType.OTHERS) {
    return data.other && data.other.trim() !== '';
  }
  return true;
}, {
  message: "Other's field is required when type is 'OTHERS'",
  path: ['other']
}).refine(data=>{
  if(data.type === PetType.DOG){
    return data.breed && data.breed.trim() !== '';
  }
  return true;
},{
  message:'Breed is required',
  path:['breed']
});
export type breedType = {
  id:number,
  name:string,
}

export type locationType = {
  id:number
  name:string
}
