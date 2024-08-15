"use client"

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbCategoryMinus } from "react-icons/tb";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/sellers', icon: IoHomeOutline },
  {
    name: 'Pets',
    href: '/sellers/pets',
    icon: MdOutlinePets,
  },
  { name: 'Category', href: '/dashboard/category', icon: TbCategoryMinus },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`,{
              'bg-sky-100 text-blue-600':link.href === pathname
            })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
