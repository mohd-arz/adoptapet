"use server";
import { PetAge, PetSex, PetType } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { db } from "~/server/db";
import { getServerAuthSession } from "./auth";
import {
  formType as EditType,
  petType,
} from "~/app/_components/sellers/pets/edit-form";
import { formType as CreateType } from "~/app/_components/sellers/pets/create-form";
import { revalidatePath } from "next/cache";
import { sendMailUtils } from "./mail";

type SubImageType = {
  sub_url: string;
  pet_id: number;
};

export async function storePet(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session) return { message: "UnAuthorized", status: false };
  const form: CreateType = {
    name: formData.get("name") as string,
    image_url: formData.get("image_url") as File,
    sub_url: formData.getAll("sub_url") as File[],
    type: formData.get("type") as PetType,
    sex: formData.get("sex") as PetSex,
    age: formData.get("age") as PetAge,
    location: formData.get("location") as string,
    fee: formData.get("fee") as string,
    why: formData.get("why") as string,
    story: formData.get("story") as string,
  };
  const id = +session.user.id;
  if (formData.get("other")) form["other"] = formData.get("other") as string;
  if (formData.get("breed")) form["breed"] = formData.get("breed") as string;
  const breedId = form.breed ? parseInt(form.breed) : null;
  const image = form.image_url;
  const buffer = Buffer.from(await image.arrayBuffer());
  const ext = path.extname(image.name);
  const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
  const absolutePath = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(absolutePath, uniqueFilename);
  const relativePath = path.join("uploads", uniqueFilename);

  const thumbnailBuffer = await sharp(buffer).resize(100, 100).toBuffer();
  const uniqueFilenameT = `thumb-${uuidv4()}-${Date.now()}${ext}`;
  const filePathT = path.join(absolutePath, uniqueFilenameT);
  const relativePathT = path.join("uploads", uniqueFilenameT);

  try {
    await fs.mkdir(absolutePath, { recursive: true });
    await fs.writeFile(filePath, buffer);
    await fs.writeFile(filePathT, thumbnailBuffer);
    await db.$transaction(async (db) => {
      const pet = await db.pet.create({
        data: {
          name: form.name,
          age: form.age,
          image_url: relativePath,
          thumb_url: relativePathT,
          type: form.type,
          sex: form.sex,
          location_id: +form.location,
          other: form.other,
          breed_id: breedId,
          story: form.story,
          why: form.why,
          fee: +form.fee,
          createdBy: +id,
        },
      });
      if (pet.id) {
        const urls: SubImageType[] = [];
        for (const img of form.sub_url) {
          const buffer = Buffer.from(await img.arrayBuffer());
          const ext = path.extname(img.name);
          const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
          const filePath = path.join(absolutePath, uniqueFilename);
          await fs.writeFile(filePath, buffer);
          const relativePath = path.join("uploads", uniqueFilename);
          urls.push({ sub_url: relativePath, pet_id: pet.id });
        }
        await db.subImages.createMany({ data: urls });
      }
    });
    return { message: "Added Successfully", status: true };
  } catch (err: any) {
    return { message: "An error occurred", error: err.message, status: false };
  }
}
``;
export async function updatePet(
  stringify: string,
  form: FormData,
  pet: petType,
) {
  if (!pet) return { message: "An error occurred", status: false };
  const values: EditType = JSON.parse(stringify);
  const session = await getServerAuthSession();
  if (!session) return { message: "UnAuthorized", status: false };
  if (form.get("image")) {
    const image = form.get("image") as File;
    const buffer = Buffer.from(await image.arrayBuffer());
    const ext = path.extname(image.name);
    const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
    const absolutePath = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(absolutePath, uniqueFilename);
    const relativePath = path.join("uploads", uniqueFilename);
    const thumbnailBuffer = await sharp(buffer).resize(100, 100).toBuffer();
    const uniqueFilenameT = `thumb-${uuidv4()}-${Date.now()}${ext}`;
    const filePathT = path.join(absolutePath, uniqueFilenameT);
    const relativePathT = path.join("uploads", uniqueFilenameT);

    const oldFile = path.join(process.cwd(), "public", pet.image_url);
    const oldFileT = path.join(
      process.cwd(),
      "public",
      pet.thumb_url as string,
    );
    try {
      await fs.unlink(oldFile);
      await fs.unlink(oldFileT);
      await fs.mkdir(absolutePath, { recursive: true });
      await fs.writeFile(filePath, buffer);
      await fs.writeFile(filePathT, thumbnailBuffer);
      const newPet = await db.pet.update({
        where: {
          id: pet.id,
        },
        data: {
          image_url: relativePath,
          thumb_url: relativePathT,
        },
      });
    } catch (err: any) {
      return {
        message: "An error occurred",
        error: err.message,
        status: false,
      };
    }
  }
  if (form.getAll("sub_url").length > 0) {
    const images = form.getAll("sub_url") as File[];
    const urls: SubImageType[] = [];
    await db.subImages.deleteMany({
      where: {
        pet_id: pet.id,
      },
    });
    for (const img of pet.SubImages) {
      const oldFile = path.join(process.cwd(), "public", img.sub_url);
      if (await fileExists(oldFile)) {
        await fs.unlink(oldFile);
      }
    }

    for (const img of images) {
      const buffer = Buffer.from(await img.arrayBuffer());
      const ext = path.extname(img.name);
      const uniqueFilename = `${uuidv4()}-${Date.now()}${ext}`;
      const absolutePath = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(absolutePath, uniqueFilename);
      await fs.writeFile(filePath, buffer);
      const relativePath = path.join("uploads", uniqueFilename);
      urls.push({ sub_url: relativePath, pet_id: pet.id });
    }
    await db.subImages.createMany({ data: urls });
  }
  try {
    const newPet = await db.pet.update({
      where: {
        id: pet.id,
      },
      data: {
        name: values.name,
        age: values.age,
        type: values.type,
        sex: values.sex,
        other: values.other,
        location_id: +values.location,
        story: values.story,
        why: values.why,
        fee: +values.fee,
        breed_id: values.breed ? +values.breed : undefined,
      },
    });
    return { message: "Edited Successfully", status: true };
  } catch (err: any) {
    return { message: "An error occurred", error: err.message, status: false };
  }
}

export async function deletePet(pet: petType) {
  if (!pet) return { message: "An error occurred", status: false };
  console.log("ppet ", pet?.SubImages);
  try {
    const oldFile = path.join(process.cwd(), "public", pet.image_url);
    const oldFileT = path.join(
      process.cwd(),
      "public",
      pet.thumb_url as string,
    );
    for (const img of pet.SubImages) {
      const oldFile = path.join(process.cwd(), "public", img.sub_url);
      if (await fileExists(oldFile)) {
        await fs.unlink(oldFile);
      }
    }
    if (await fileExists(oldFile)) {
      await fs.unlink(oldFile);
    }

    if (await fileExists(oldFileT)) {
      await fs.unlink(oldFileT);
    }
    await db.subImages.deleteMany({
      where: {
        pet_id: pet.id,
      },
    });
    await db.pet.delete({
      where: {
        id: pet.id,
      },
    });
    revalidatePath("/sellers/pets");
    return { message: "Deleted Successfully", status: true };
  } catch (err: any) {
    return { message: "An error occured", error: err.message, status: false };
  }
}
export async function sendMailToSeller(
  pet_id: number,
  pet_name:string,
  pet_type:PetType,
  seller_id: number,
  buyer_id: string,
  buyer_email: string,
) {
  try {
    await db.mails.create({
      data: {
        pet_id: pet_id,
        buyer_id: +buyer_id,
        seller_id: seller_id,
      },
    });
    const user = await db.user.findUniqueOrThrow({ where: { id: seller_id } });
    await sendMailUtils(
      "Your Pet is Requested",
      user.email,
      "Your "+pet_name+" ("+pet_type+") is requested by " + buyer_email,
    );
    return { message: "Mail send Successfully", status: true };
  } catch (err: any) {
    return { message: "An error occurred", error: err.message, status: false };
  }
}
export async function sendMailToBuyer(pet_id:number,pet_name:string,pet_type:PetType,buyer_id:number,seller_id:string)
  {
    try {
      // await db.mails.create({
      //   data: {
      //     pet_id: pet_id,
      //     buyer_id: +buyer_id,
      //     seller_id: seller_id,
      //   },
      // });
      const user = await db.user.findUniqueOrThrow({ where: { id: buyer_id } });
      await sendMailUtils(
        "Woohoo! Seller assigned you the pet",
        user.email,
        "Your requested  "+pet_name+" ("+pet_type+") is assigned by the seller, The seller will contact you for upcoming process",
      );
      return { message: "Mail send Successfully", status: true };
    } catch (err: any) {
      return { message: "An error occurred", error: err.message, status: false };
    }
}


export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
export async function getSellersDetails(email: string) {
  return await db.user.findUnique({ where: { email } });
}
