import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getSecureUrl = (publicId: string, format: string = '.webp') => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; 
  let format_ = format;
  if(format=='.jpeg'){
    format_ = '.jpg'
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}${format_}`;
};
// Other pets
export const OTHERS = [
  'Rabbits',
  'Birds',
  'Horses',
  'Small Animals',
  'Reptiles, Amphibians, and/or Fish',
  'Farm-Type Animals',
]
