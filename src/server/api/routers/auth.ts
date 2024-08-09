import {z} from 'zod';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

const authRouter = createTRPCRouter({
  signin: publicProcedure
  .input(z.object({email:z.string().email(),password:z.string()}))
  .query(async({ctx,input})=>{
    const { db } = ctx
    const user = await db.user.findUnique({
      where:{
        email:input.email
      },select:{
        id:true,
        name:true,
        email:true,
        password:true
      }
  })
    if(!user)return {error:'No User Found',user:null}
    if(user && await bcrypt.compare(input.password,user.password)){
      return {user}
    }else{
      return {error:'Wrong Credentials',user:null}
    } 
  }),
  signup:publicProcedure
  .input(z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    type:z.string(),
  }))
  .mutation(async({ctx,input})=>{
    const {db} = ctx;
    const {name,email,password,type} = input;
    const hashedPass =  await bcrypt.hash(password,10);
    try{
      const newUser = await db.user.create({
        data:{
          name,
          email,
          password:hashedPass,
          type
        }
      });
      return {user:newUser}
    }catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {error:('Unique constraint failed on the field:'+ error.meta?.target as string)};
        }
        return {error:('Known Request Error:'+ error.message)};
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {error:('Unknown Request Error:'+ error.message)};
      } else {
        return {error:('Other Error:'+ error as string)};
      }
    }
  })
  
})

export { authRouter };