/*
  Warnings:

  - Added the required column `type` to the `Breed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Breed" ADD COLUMN     "type" "PetType" NOT NULL;
