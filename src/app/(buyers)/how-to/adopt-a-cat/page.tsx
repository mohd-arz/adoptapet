import { Gloock } from "next/font/google";
import Image from "next/image";

const gloock = Gloock({
  weight: ["400"],
  subsets: ["latin"],
});

export default function () {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 border-black px-[5%]">
      <div className="col-span-8 col-start-3 gap-x-1">
        <h1 className={`mb-4 mt-8 text-center text-5xl ${gloock.className}`}>
          How to Adopt a Cat: The Official Cat Parents Guide
        </h1>
        <p className="text-center text-xl">
          A step-by-step guide on how to adopt a cat — from where to begin
          looking to what the adoption process entails to how to prepare your
          home for your new pet.
        </p>
        <Image
          className="my-4 w-full rounded-lg"
          src={"/assets/adopt-a-cat-header.webp"}
          width={"1580"}
          height={"800"}
          alt="adopt-a-cat-header-img"
        ></Image>
        <p className="text-2xl font-light">
          Adopting a cat, especially if they’re your first, can feel like a
          terrifying jump into an ocean of the unknown. How do you adopt a cat?
          How do I choose a cat? What do I need to have at home? What does the
          application process look like? What if they hate me? As overwhelming
          as these questions can feel, most of them can be dealt with by taking
          a deep breath, doing some prep, and working your way through our
          step-by-step breakdown of the whole process.
        </p>
        <h1 className={`mb-4 mt-8 text-center text-3xl ${gloock.className}`}>
          Step-by-Step Guide on How to Adopt a Cat
        </h1>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          1. Determine what sort of cat are you able to adopt.
        </h1>
        <p>
          Quite possibly the most important part of the whole adoption process
          is establishing what sort of cat you want, and are able to, adopt. Are
          you looking for a young kitten? How about a fully grown cat? A senior?
          Are you able to adopt a cat with special needs who otherwise might not
          find a home? Are you able to adopt more than one cat at a time? Many
          are bonded with another cat, and even if not, will be far happier
          living in a situation with another cat. You never know who you’re
          going to meet at a shelter and fall in love with — so keep your mind
          open!
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          2. Browse local cat adoption listings.
        </h1>
        <p>
          Nose around for what cats and kittens are available in your neck of
          the woods. Adopt-a-Pet lets you search through tens of thousands of
          listings around the country and allows you to specify by breed, age,
          sex, and color — plus, if you don’t see the perfect match right away,
          you can set up an alert to let you know as soon as one matching your
          parameters is listed. Adopt-a-Pet works with shelters, rescues, and
          private individuals looking to find homes for cats — but also spend
          some time searching for local rescue and adoption organizations on the
          off chance they’re not listed on Adopt-a-Pet.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          3. Arrange a visit.
        </h1>
        <p>
          How people adopt cats has changed in recent years. Covid has meant
          that many places can no longer allow you to just show up at their door
          and spend time with all the animals looking for a perfect match — but
          with a bit of foresight, you can still drown in a pile of kittens.
          Many rescue organizations and cat cafés allow you to book a time to
          meet their adoptable cats to find out how well they mesh with you. For
          as cute as a kitten seems on an online listing, sometimes it’s just
          not the same in person — and you might fall in love with a critter
          that you never expected.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          4. Fill out all the paperwork.
        </h1>
        <p>
          Every adoption organization has its own paperwork requirements and
          fees, so before you can take the pet home you’ll need to fill it in
          and file it. These can vary hugely in how long and intensive they are.
          They’ll often ask questions about you and your household — the ages of
          people there, if there are any other pets, does anyone smoke, etc.
          Some may ask you what you’re looking for in a pet, and others may ask
          you to describe what sort of space you have set up for the animal (see
          more on that below). Most will require you to agree to registering
          your pet’s microchips, keeping up their medical care, and more. All of
          this is with the aim of making sure that the cat goes to a suitable
          and loving home that can meet all of their needs.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          5. Bring your pet home.
        </h1>
        <p>
          Whew, you did it! You got all of the pieces together, got approved,
          and now you’re bringing a tiny fuzzy gremlin into your house who
          you’re going to love to pieces. If you’ve followed these instructions
          on how to adopt a cat, you should be more than ready, even if they do
          decide that their favorite activity is biting your big toe as hard as
          they can with their tiny razor kitten teeth.
        </p>
      </div>
    </div>
  );
}
