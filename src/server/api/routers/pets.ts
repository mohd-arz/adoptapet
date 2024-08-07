import { PetType } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import {z} from 'zod';
import { db } from "~/server/db";

const ITEMS_PER_PAGE = 10;

function conditions(query:string){
  let status = null;
  if('active'.includes(query.toLowerCase())){
    status = true
  }else if ('inactive'.includes(query.toLowerCase())) {
    status = false;
  }

  let type = null;
  if('dog'.includes(query.toLowerCase())){
    type = PetType.DOG;
  }else if('cat'.includes(query.toLowerCase())){
    type = PetType.CAT;
  }else if('others'.includes(query.toLowerCase())){
    type = PetType.OTHERS;
  }

  const conditions:any = [
    { name: { contains: query, mode: 'insensitive' } }
  ];

  if (status !== null) {
    conditions.push({ status });
  }

  if (type !== null){
    conditions.push({type})
  }

  return conditions;
}

export const petRouter = createTRPCRouter({
  getBreed:protectedProcedure
  .input(z.object({ type: z.enum([PetType.DOG,PetType.CAT,PetType.OTHERS]) }))
  .query(async({input})=>{
    const breeds = await db.breed.findMany({
      where:{
        type:input.type
      },select:{
        id:true,
        name:true,
      }
    })
    return { breeds }
  }),//By Id
  getPet:protectedProcedure
  .input(z.object({id:z.string()}))
  .query(async({input})=>{
    const pet = await db.pet.findUnique({where:{id:+input.id}});
    return {pet};
  }),//Count for Pet Table
  getPetTablePages:protectedProcedure
  .input(z.object({query:z.string()}))
  .query(async({input})=>{
    try{
      const {query} = input;
      const count = await  db.pet.count({
        where:{
          OR: conditions(query)
        }
      })
      const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      return {totalPages};
    }catch(err){
      return {err}
    }
  }),//Get pets for the created User
  getPets:protectedProcedure
  .input(z.object({id:z.number(),query:z.string(),currentPage:z.number()}))
  .query(async({input})=>{
    const {id,query,currentPage} = input;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    return await db.pet.findMany({
      skip:offset,
      take:ITEMS_PER_PAGE,
      where:{
        createdBy:id,
        OR:conditions(query)
      },orderBy:{
        createdAt:'desc'
      },
    })
  }),
  getNewPets:publicProcedure
  .query(async()=>{
    return await db.pet.findMany({
      take:9,
      select:{
        id:true,
        pet_id:true,
        age:true,
        name:true,
        type:true,
        breed:true,
        image_url:true,
        createdAt:true,
      },
      orderBy:{
        createdAt:'desc'
      }
    })
  })
})


