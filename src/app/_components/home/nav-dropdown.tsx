"use client";

import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { type } from "~/lib/atom";

export default function NavDropdown(): JSX.Element {
  const setType = useSetRecoilState(type);
  const router = useRouter();

  function handleClick(index: number, ind: number) {
    router.push("/");
    switch (index) {
      case 0:
        switch (ind) {
          case 0:
            setType("DOG");
            break;
          case 1:
            setType("CAT");
            break;
          case 2:
            setType("OTHERS");
            break;
        }
    }
  }
  const content = {
    "Find a Pet": ["Find a Dog", "Find a Cat", "Find other animals"],
    "How-to": ["How to adopt a dog", "How to adopt a cat"],
    "Get Involved": ["Ways to Help"],
  };
  return (
    <ul
      aria-label="primary"
      className="relative z-20 hidden h-full flex-grow flex-col pb-4 sm:hidden md:flex md:flex-row md:justify-end md:pb-0"
    >
      {Object.entries(content).map((item, index) => {
        return (
          <li className="group relative h-full" key={index}>
            <button className="font-montserrat mt-2 flex h-full w-full flex-row items-center rounded-lg bg-transparent px-4 py-4 text-base focus:outline-none md:ml-4 md:mt-0 md:inline md:w-auto">
              <span>{item[0]}</span>
            </button>
            <div className="bg-grey-200 absolute z-10 hidden group-hover:block">
              {item[1].map((el, ind) => {
                return (
                  <div
                    key={ind}
                    className="w-full min-w-48 bg-dark-cyan pb-4 pt-2 text-sm text-white shadow-lg"
                  >
                    <p
                      className="cursor-pointer pl-4"
                      onClick={() => handleClick(index, ind)}
                    >
                      {el}
                    </p>
                  </div>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
