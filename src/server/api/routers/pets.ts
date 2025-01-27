import { PetAge, PetSex, PetType } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import { pages } from "next/dist/build/templates/app-page";

const ITEMS_PER_PAGE = 10;

type PetSearchConditions = {
  type?: PetType;
  status:boolean,
  location_id?: number;
  age?: { in: PetAge[] };
  breed_id?: { in: number[] };
  other?: string;
  sex?: { in: PetSex[] };
};

function conditions(query: string) {
  let status = null;
  if ("active".includes(query.toLowerCase())) {
    status = true;
  } else if ("inactive".includes(query.toLowerCase())) {
    status = false;
  }

  let type = null;
  if ("dog".includes(query.toLowerCase())) {
    type = PetType.DOG;
  } else if ("cat".includes(query.toLowerCase())) {
    type = PetType.CAT;
  } else if ("others".includes(query.toLowerCase())) {
    type = PetType.OTHERS;
  }

  const conditions: any = [{ name: { contains: query, mode: "insensitive" } }];

  if (status !== null) {
    conditions.push({ status });
  }

  if (type !== null) {
    conditions.push({ type });
  }

  return conditions;
}

export const petRouter = createTRPCRouter({
  getBreed: publicProcedure
    .input(
      z.object({ type: z.enum([PetType.DOG, PetType.CAT, PetType.OTHERS]) }),
    )
    .query(async ({ input }) => {
      const breeds = await db.breed.findMany({
        where: {
          type: input.type,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return { breeds };
    }), //By Id
  getLocation: publicProcedure.query(async () => {
    try {
      const locations = await db.location.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return { locations };
    } catch (error) {
      console.log(error);
    }
  }),
  getPet: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const pet = await db.pet.findUnique({
        where: { id: +input.id,status:true },
        include: { SubImages: true, location: true, breed: true },
      });
      return { pet };
    }), //Count for Pet Table
  getPetTablePages: protectedProcedure
    .input(z.object({ id: z.number(), query: z.string() }))
    .query(async ({ input }) => {
      try {
        const { query } = input;
        const count = await db.pet.count({
          where: {
            OR: conditions(query),
            createdBy: input.id,
          },
        });
        const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
        return { totalPages };
      } catch (err) {
        return { err };
      }
    }), //Get pets for the created User
  getPets: protectedProcedure
    .input(
      z.object({ id: z.number(), query: z.string(), currentPage: z.number() }),
    )
    .query(async ({ input }) => {
      const { id, query, currentPage } = input;
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      return await db.pet.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          createdBy: id,
          OR: conditions(query),
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          SubImages: true,
        },
      });
    }),
  getNewPets: publicProcedure
    .input(
      z.object({ type: z.enum([PetType.DOG, PetType.CAT, PetType.OTHERS]) }),
    )
    .query(async ({ input }) => {
      return await db.pet.findMany({
        where: {
          type: input.type,
          status:true,
        },
        take: 9,
        select: {
          id: true,
          pet_id: true,
          age: true,
          name: true,
          type: true,
          breed: true,
          other: true,
          location: true,
          image_url: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  isMailSentByBuyer: publicProcedure
    .input(
      z.object({
        buyer_id: z.number().optional(),
        pet_id: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      console.log("input ", input);
      const { buyer_id } = input;
      const { pet_id } = input;
      const isMailed = await db.mails
        .count({
          where: { pet_id, buyer_id },
        })
        .then(Boolean);
      return isMailed;
    }),
  getMailsBySeller: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        currentPage: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { pageSize } = input;
      const offset = input.currentPage * pageSize;
      const totalCount = await db.mails.count({
        where: { seller_id: input.id },
      });
      const count = Math.ceil(totalCount / pageSize);
      const result = await db.mails.findMany({
        skip: offset,
        take: pageSize,
        where: { seller_id: input.id },
        select: {
          id: true,
          buyer_id: true,
          pet_id: true,
          is_replied: true,
          createdAt: true,
          Buyer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Pet: {
            select: {
              id: true,
              name: true,
              type: true,
              status:true,
              other:true,
              breed: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return { count, result };
    }),
  setStatusByMail: protectedProcedure
    .input(z.object({ id: z.number(), status: z.boolean() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const { status } = input;
      try {
        await db.mails.update({
          where: { id },
          data: {
            is_replied: status,
            Pet: {
              update: {
                status: !status,
              },
            },
          },
        });
      } catch (err) {
        return { status: false, message: "Something went wrong" };
      }
      return { status: true, message: "Set Status Successfully" };
    }),
  getPetsBySearch: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        age: z.string().optional(),
        breed: z.string().optional(),
        other: z.string().optional(),
        sex: z.string().optional(),
        type: z.enum([PetType.CAT, PetType.DOG, PetType.OTHERS]),
      }),
    )
    .query(async ({ input }) => {
      const { location, age, breed, other, sex, type } = input;

      const conditions: PetSearchConditions = {
        type: type as PetType,
        status:true,
      };

      if (location) {
        conditions["location_id"] = +location as number;
      }
      if (age) {
        conditions["age"] = {
          in: age.split(",") as PetAge[],
        };
      }
      if (breed) {
        conditions["breed_id"] = {
          in: breed.split(",").map((item) => +item) as number[],
        };
      }
      if (other) {
        conditions["other"] = other as string;
      }
      if (sex) {
        conditions["sex"] = {
          in: sex.split(",") as PetSex[],
        };
      }

      return await db.pet.findMany({
        where: conditions,
        include: {
          breed: true,
          location: true,
        },
      });
    }),
});
