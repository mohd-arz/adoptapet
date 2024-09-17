"use client";
import Image from "next/image";
import { Gloock } from "@next/font/google";
import Link from "next/link";
import { getSecureUrl } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

const gloock = Gloock({
  weight: ["400"],
  subsets: ["latin"],
});

export type petType = inferRouterOutputs<AppRouter>["pet"]["getPetsBySearch"];

const BASE_URL =
  process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

export default function ({ searchParams }: { searchParams: any }) {
  const [pets, setPets] = useState<petType>([]);
  const router = useRouter();

  const response = api.pet.getPetsBySearch.useQuery(searchParams);
  useEffect(() => {
    if (response.data && response.isSuccess) {
      setPets(response.data);
    }
  }, [response.data, response.isSuccess]);
  return (
    <div className="mx-auto mt-4 w-full max-w-[1400px] flex-1 px-[5%]">
      <button
        className="group my-6 flex items-center text-dark-cyan transition-all duration-300 ease-in-out"
        onClick={() => router.back()}
      >
        <ChevronLeft size={16} />
        <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-sm font-semibold transition-all duration-500 ease-out group-hover:bg-[length:100%_1px]">
          Back
        </span>
      </button>
      {!response.isLoading && pets.length == 0 ? (
        <div className="block text-center text-3xl">No Pets Found</div>
      ) : (
        <div className="grid flex-1 grid-cols-12 gap-x-6">
          {response.isLoading ? (
            <>
              {[1, 2, 3, 4].map((ind) => {
                return <GridItemSkeleton />;
              })}
            </>
          ) : (
            pets.map((pet) => {
              return <GridItem key={pet.id} pet={pet} />;
            })
          )}
        </div>
      )}
    </div>
  );
}

function GridItem({ pet }: { pet: any }) {
  return (
    <div className="col-span-3 h-[420px] overflow-hidden rounded-lg border border-black">
      <Link href={`/pet/${pet.id}`}>
        <div className="w-full">
        <Image
          src={`${getSecureUrl(pet?.image_url as string,pet?.thumb_url)}`}
          alt={`${pet?.name}'s profile picture`}
          width={420}
          height={420}
          style={{width:'100%',objectFit:'cover',aspectRatio:'1/1',overflow: 'hidden'}}
        />
        </div>
        <div className="mx-4 mb-4 text-left">
          <div className="border border-black">
            <h1 className={`truncate text-4xl ${gloock.className}`}>
              {pet?.name}
            </h1>
          </div>
          {pet?.type === "DOG" ? (
            <div className="my-1">
              <h2 className="text-xl font-bold">{pet?.breed?.name}</h2>
            </div>
          ) : (
            <div className="my-1">
              <h2 className="text-lg font-semibold">
                {pet?.type === "OTHERS" ? pet?.others : pet?.type}
              </h2>
            </div>
          )}
          <div>
            <p className="text-sm font-light">{pet?.age}</p>
            <p className="text-sm font-light">
              {pet?.location ? pet?.location.name : "Location"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
function GridItemSkeleton(): JSX.Element {
  return (
    <div
      role="status"
      className="h-[420px]flex col-span-3 w-full animate-pulse flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow dark:border-gray-700 md:p-6"
    >
      <div className="mb-4 flex h-64 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
        <svg
          className="h-10 w-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="mx-4 mb-4 text-left">
        <div className="mb-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-4 h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
