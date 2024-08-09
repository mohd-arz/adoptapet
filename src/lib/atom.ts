import { PetType } from '@prisma/client';
import { atom } from 'recoil';

export const type = atom<PetType>({
  key: 'type', 
  default: PetType.DOG,
});