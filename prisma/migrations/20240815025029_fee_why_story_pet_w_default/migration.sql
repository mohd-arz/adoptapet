-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "story" TEXT,
ADD COLUMN     "why" TEXT NOT NULL DEFAULT '';