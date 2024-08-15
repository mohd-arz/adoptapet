-- CreateTable
CREATE TABLE "SubImages" (
    "id" SERIAL NOT NULL,
    "sub_url" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,

    CONSTRAINT "SubImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubImages" ADD CONSTRAINT "SubImages_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
