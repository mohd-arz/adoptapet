"use server"
import { PetAge, PetSex, PetType } from '@prisma/client';
import {  array, z } from "zod"
import  fs  from 'fs/promises';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp"
import { db } from '~/server/db';
import { getServerAuthSession } from './auth';
import { formType as EditType, petType } from '~/app/_components/sellers/pets/edit-form';
import { formType as CreateType } from '~/app/_components/sellers/pets/create-form';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function storePet(formData:FormData){
  const session = await getServerAuthSession();
  if(!session)return {message:"UnAuthorized",status:false};
  const form:CreateType = {
    name: formData.get('name') as string,
    image_url: formData.get('image_url') as File,
    type:formData.get('type') as PetType,
    sex: formData.get('sex') as PetSex,
    age: formData.get('age') as PetAge,
    location:formData.get('location') as string,
  }
  const id =  (session?.user as { id?: number })?.id as number; 
  if(formData.get('other'))
    form['other'] = formData.get('other') as string;
  if(formData.get('breed'))
    form['breed'] = formData.get('breed') as string;
  const breedId = form.breed ? parseInt(form.breed) : null;
  const image = form.image_url;
  const buffer = Buffer.from(await image.arrayBuffer());
  const ext = path.extname(image.name);
  const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
  const absolutePath = path.join(process.cwd(),'public','uploads');
  const filePath = path.join(absolutePath,uniqueFilename);
  const relativePath = path.join('uploads',uniqueFilename);

  const thumbnailBuffer = await sharp(buffer)
  .resize(100, 100)
  .toBuffer();
  const uniqueFilenameT = `thumb-${uuidv4()}-${Date.now()}${ext}`;  
  const filePathT =  path.join(absolutePath,uniqueFilenameT);
  const relativePathT = path.join('uploads',uniqueFilenameT);

  try{
    await fs.mkdir(absolutePath,{recursive:true});
    await fs.writeFile(filePath,buffer);
    await fs.writeFile(filePathT,thumbnailBuffer);
    const pet = await db.pet.create({
      data:{
        name:form.name,
        age:form.age,
        image_url:relativePath,
        thumb_url:relativePathT,
        type:form.type,
        sex:form.sex,
        location_id:+form.location,
        other:form.other,
        breed_id:breedId,
        createdBy:+id,
      }
    })
    return {message:"Added Successfully",status:true}
  }catch(err:any){ 
    return { message: "An error occurred", error: err.message,status:false };
  }
}



export async function updatePet(stringify:string,form:FormData,{id,image_url,thumb_url}:{id:number,image_url:string,thumb_url:string}){
  const values:EditType = JSON.parse(stringify);
  const session = await getServerAuthSession();
  if(!session)return {message:"UnAuthorized",status:false};
  if(form.get('image')){
    const image = form.get('image') as File;
    const buffer = Buffer.from(await image.arrayBuffer());
    const ext = path.extname(image.name);
    const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
    const absolutePath = path.join(process.cwd(),'public','uploads');
    const filePath = path.join(absolutePath,uniqueFilename);
    const relativePath = path.join('uploads',uniqueFilename);
    const thumbnailBuffer = await sharp(buffer)
    .resize(100, 100)
    .toBuffer();
    const uniqueFilenameT = `thumb-${uuidv4()}-${Date.now()}${ext}`;  
    const filePathT =  path.join(absolutePath,uniqueFilenameT);
    const relativePathT = path.join('uploads',uniqueFilenameT);

    const oldFile = path.join(process.cwd(),'public',image_url);
    const oldFileT = path.join(process.cwd(),'public',thumb_url);
    try{
      await fs.unlink(oldFile)
      await fs.unlink(oldFileT)
      await fs.mkdir(absolutePath,{recursive:true});
      await fs.writeFile(filePath,buffer);
      await fs.writeFile(filePathT,thumbnailBuffer);
      const pet = await db.pet.update({
        where:{
          id:id,
        },
        data:{  
          image_url:relativePath,
          thumb_url:relativePathT,
        }
      })
    }catch(err:any){ 
      return { message: "An error occurred", error: err.message,status:false };
    }
  }
  try{
    const pet = await db.pet.update({
      where:{
        id:id,
      },  
      data:{  
        name:values.name,
        age:values.age,
        type:values.type,
        sex:values.sex,
        other:values.other,
        location_id: +values.location,
        breed_id:values.breed ? +values.breed : undefined,
      }
    })
    return {message:"Edited Successfully",status:true}
  }catch(err:any){
    return { message: "An error occurred", error: err.message,status:false };
  }
}

export async function deletePet(id:number,image_url:string,thumb_url:string){
  try{
    const oldFile = path.join(process.cwd(),'public',image_url);
    const oldFileT = path.join(process.cwd(),'public',thumb_url);
    await fs.unlink(oldFile)
    await fs.unlink(oldFileT)
    const pet = await db.pet.delete({
      where:{
        id
      }
    })
    console.log('came here')
    revalidatePath('/sellers/pets');
    return {message:"Deleted Successfully",status:true}
  }catch(err:any){
    return {message:'An error occured',error:err.message,status:false}
  }
}