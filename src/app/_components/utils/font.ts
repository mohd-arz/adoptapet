import {Inter,Lusitana} from 'next/font/google';
import {Sevillana} from 'next/font/google';

export const inter = Inter({
  subsets:['latin']
})

export const sevillana = Sevillana({
  weight:['400'],
  subsets:['latin'],
})

export const lusitana = Lusitana({
  weight:['400','700'],
  subsets:['latin']
})