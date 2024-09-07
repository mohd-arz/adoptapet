"use client";

import { inferRouterOutputs } from "@trpc/server";
import {
  ArrowLeftIcon,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Mail,
} from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import { differenceInMonths } from "date-fns";
import Image from "next/image";
import { List, ListItem, Collapse } from "@mui/material";
import { Button } from "~/components/ui/button";
import DetailPageSkeleton from "~/app/_components/home/detail-page-skeleton";
import { Gloock } from "@next/font/google";
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import { db } from "~/server/db";
import { toast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";
import { sendMail } from "~/lib/action";
import { ToastAction } from "~/components/ui/toast";

const gloock = Gloock({
  weight: ["400"],
  subsets: ["latin"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";
export type petType = inferRouterOutputs<AppRouter>["pet"]["getPet"]["pet"];

export default function ({ params }: { params: { id: string } }) {
  const [pet, setPet] = useState<petType>();
  const [date, setDate] = useState<number>();
  const [imgInd, setImgInd] = useState<number>(-1);

  const { data, isSuccess, isLoading } = api.pet.getPet.useQuery({
    id: params.id,
  });
  const handleClick = (ind: number) => {
    setImgInd(ind);
  };
  useEffect(() => {
    if (data && data.pet) {
      setPet(data.pet);
      const now = new Date();
      const monthsAgo = differenceInMonths(now, data.pet.createdAt);
      setDate(Math.abs(monthsAgo));
    }
  }, [isSuccess, data]);
  const router = useRouter();

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (isSuccess)
    return (
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 px-[5%]">
        <div className="col-span-10 col-start-2 gap-x-1">
          <button
            className="group my-6 flex items-center text-dark-cyan transition-all duration-300 ease-in-out"
            onClick={() => router.back()}
          >
            <ChevronLeft size={16} />
            <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-sm font-semibold transition-all duration-500 ease-out group-hover:bg-[length:100%_1px]">
              Back
            </span>
          </button>
          <div className="border border-black">
            <h1 className={`my-4 text-5xl ${gloock.className}`}>
              My Name is {pet?.name} !
            </h1>
            <h2 className="my-4">
              Posted on{" "}
              {date === 0
                ? "this month"
                : `${date} month${(date as number) > 1 ? "s" : ""} ago`}
            </h2>
            <div className="grid grid-cols-10 gap-x-8">
              <div className="col-span-6 flex w-full flex-col gap-4 border border-black">
                <div className="relative h-[400px] bg-slate-800">
                  <Image
                    src={
                      imgInd === -1
                        ? `${BASE_URL}/${pet?.image_url}`
                        : `${BASE_URL}/${pet?.SubImages[imgInd]?.sub_url}`
                    }
                    layout="fill"
                    objectFit="contain"
                    alt={`${pet?.name}'s profile pictures`}
                  />
                </div>
                <div className="relative grid w-full grid-cols-5 gap-4">
                  <Image
                    src={`${BASE_URL}/${pet?.thumb_url}`}
                    onClick={() => handleClick(-1)}
                    className={imgInd === -1 ? "opacity-50" : ""}
                    alt="main image"
                    width={100}
                    height={100}
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                  {pet?.SubImages &&
                    pet.SubImages.map((img, ind) => (
                      <Image
                        key={ind}
                        src={`${BASE_URL}/${img.sub_url}`}
                        onClick={() => handleClick(ind)}
                        className={imgInd === ind ? "opacity-50" : ""}
                        alt="sub images"
                        width={100}
                        height={100}
                        style={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                </div>
              </div>
              <SideBox pet={pet as petType} />
            </div>
            <div className="basic-info max-h-[12.425rem] border border-black">
              <h1 className="mb-4 text-3xl font-semibold">My basic info</h1>

              {pet?.type === "DOG" && (
                <div className="mb-2 flex gap-4">
                  <div className="font-semibold">Breed</div>
                  <div>{pet?.breed?.name}</div>
                </div>
              )}

              {pet?.type === "OTHERS" && (
                <div className="mb-2 flex gap-4">
                  <div className="font-semibold">Type</div>
                  <div>{pet?.other}</div>
                </div>
              )}
              <div className="mb-2 flex gap-4">
                <div className="font-semibold">Age</div>
                <div>{pet?.age}</div>
              </div>

              <div className="mb-2 flex gap-4">
                <div className="font-semibold">Sex</div>
                <div>{pet?.sex}</div>
              </div>
            </div>

            <div className="info mt-4">
              <h1 className="text-3xl font-semibold">Why I need a new home</h1>
              <p>{pet?.why}</p>
            </div>

            {DOMPurify.sanitize(pet?.story as string).length > 0 && (
              <div className="whynewhome mt-4">
                <h1 className="text-3xl font-semibold">My story</h1>
                <h2 className="text-xl font-semibold">
                  Here's what the humans have to say about me:
                </h2>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(pet?.story as string),
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
function SideBox({ pet }: { pet: petType }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPending, startTransition] = useTransition();
  const items = [
    "Submit Application",
    "Interview",
    "Meet the Pet",
    "Pay Fee",
    "Sign Adoption Contract",
  ];
  const session = useSession();
  const router = useRouter();
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [isMailed, setIsMailed] = useState(false);

  const { data, isSuccess } = api.pet.isMailSentByBuyer.useQuery(
    {
      pet_id: pet?.id,
      buyer_id: session?.data ? +session.data.user.id : undefined,
    },
    {
      enabled: !!pet?.id && !!session?.data?.user.id,
    },
  );

  useEffect(() => {
    console.log(pet, session, isMailed);
    if (isSuccess) {
      setIsMailed(data);
    }
  }, [pet, data]);

  async function sendMailHandler() {
    if (
      pet &&
      session.data &&
      session.data.user &&
      session.data.user.type == "buyer"
    ) {
      startTransition(async () => {
        const res = await sendMail(
          pet.id,
          pet.createdBy as number,
          session.data.user.id as string,
        );
        if (res.status) {
          toast({
            description: res.message,
          });
          setIsMailed(true);
        } else {
          console.log(res.error);

          if (res.error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: res.error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          } else {
            console.log(res.message);
            toast({
              title: "Uh oh! Something went wrong.",
              description: res.message,
            });
          }
        }
      });
    } else {
      router.push("/signin");
    }
  }
  return (
    <div className="col-span-4 rounded-xl bg-cyan p-6">
      <h1 className="mb-8 text-2xl font-bold">
        Cared for by Private owner ({pet?.location.name})
      </h1>
      <List>
        <h2 className="mb-2 font-semibold">Adoption process</h2>
        {items.slice(0, 3).map((item, index) => (
          <ListItem
            key={index}
            sx={{
              padding: "8px 0",
            }}
          >
            <span className="mr-4 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black text-sm text-white">
              {index + 1}
            </span>
            {item}
          </ListItem>
        ))}
        <Collapse in={isExpanded}>
          {items.slice(3).map((item, index) => (
            <ListItem
              key={index + 3}
              sx={{
                padding: "8px 0",
              }}
            >
              <span className="mr-4 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black text-sm text-white">
                {index + 4}
              </span>
              {item}
            </ListItem>
          ))}
        </Collapse>
      </List>
      <button className="mb-6 flex items-center text-sm" onClick={toggleExpand}>
        {isExpanded ? (
          <>
            <ChevronUp /> Close
          </>
        ) : (
          <>
            <ChevronDown /> View All
          </>
        )}
      </button>
      <h1 className="mb-6 text-xl font-bold">Adoption fee: ₹{pet?.fee}</h1>
      <form action={sendMailHandler}>
        <Button
          className="w-full rounded-3xl p-6 font-semibold"
          type="submit"
          disabled={isPending || isMailed}
        >
          <Mail size={16} strokeWidth={2} className="mr-2 font-semibold" />
          {isMailed ? "Mailed" : "Mail to Seller"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
