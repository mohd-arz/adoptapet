/*
  Warnings:

  - Made the column `location_id` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_location_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "location_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
