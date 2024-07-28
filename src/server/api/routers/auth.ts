import {z} from 'zod';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
const {JWT_SECRET} = process.env;

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
      // const token = jwt.sign({user:user.id},JWT_SECRET as string);
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
      // const token = jwt.sign({user:newUser.id},JWT_SECRET as string);
      
      // ctx.res.headers.set(
      //   'Set-Cookie',
      //   cookie.serialize('token', token, {
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV === 'production',
      //     maxAge: 3600,
      //     path: '/',
      //   })
      // );
      return {user:newUser}
    }catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {error:('Unique constraint failed on the field:'+ error.meta?.target)};
        }
        return {error:('Known Request Error:'+ error.message)};
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return {error:('Unknown Request Error:'+ error.message)};
      } else {
        return {error:('Other Error:'+ error)};
      }
    }
  })
  
})

export { authRouter };