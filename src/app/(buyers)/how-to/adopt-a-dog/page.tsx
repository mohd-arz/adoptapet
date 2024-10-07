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
          How to Find a Dog to Adopt
        </h1>
        <p className="text-center text-xl">
          Learn more about how you can find a dog shelter that meets your
          expectations.
        </p>
        <Image
          className="my-4 w-full rounded-lg"
          src={"/assets/adopt-a-dog-header.webp"}
          width={"1580"}
          height={"800"}
          alt="adopt-a-dog-header-img"
        ></Image>
        <p className="text-2xl font-light">
          Ask any pet parent — there’s nothing better than puppy kisses, nose
          boops, and the pure tail-wagging joy that comes with having a pup by
          your side. If you’re thinking about adopting a dog, the journey to
          your perfect pup might seem a bit daunting. There are so many options
          out there, from shelters and rescue organizations to online platforms
          like Adopt a Pet and even social media. Not sure where to begin your
          search? With a bit of research and a lot of patience, you’ll meet your
          new BFF in no time.
        </p>
        <h1 className={`mb-4 mt-8 text-center text-3xl ${gloock.className}`}>
          How to search for a dog to adopt
        </h1>
        <p>
          Start your search on Adopt a Pet. If you don’t see your perfect pup
          right away, type your email address into the New Pet Alerts box, then
          click the confirmation link in the signup email. That’s it. New pets
          who match your search criteria will be emailed to you once a day.
        </p>
        <ol className="mt-4">
          <li>1. Use Adopt a Pet’s search to find pets for adoption.</li>
          <li>2. Enter your zip code then click the search button.</li>
          <li>
            3. Browse all pets near you or filter by age, sex, breed, and even
            color.
          </li>
          <li>4. Sign up for New Pet Alert email notifications.</li>
        </ol>
        <h1 className={`mb-4 mt-8 text-center text-3xl ${gloock.className}`}>
          How can you find the right dog for you?
        </h1>
        <p>
          Embarking on the journey to find a dog soulmate is an exciting
          adventure, and there are many ways to approach it. From tapping into
          your personal network to connecting with dedicated rescue
          organizations, the path to adopting your ideal canine companion is as
          diverse as the pups themselves. Here’s how to find a dog to adopt and
          tips to help you choose the perfect route for your journey.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          1. Determine what type of dog is the best fit for you
        </h1>
        <p>
          Before you even think about googling “how to find a dog to adopt,”
          it’s important that you figure out what type of dog you’re looking
          for. Depending on the age, size, breed, and temperament of a dog, your
          experience can be vastly different. Choosing one that’s compatible
          with your lifestyle will ensure that you and your pup will have a
          long, happy life together. For example, a prospective pet parent who’s
          in the office five days a week and travels frequently will likely have
          different criteria than a stay-at-home freelancer who only works a few
          hours a day — but we’ll dive more into that later.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          2. Perform an online search via reputable sites
        </h1>
        <p>
          Surfing the web isn’t just for cat memes and viral videos; it’s your
          ticket to a world of adorable, adoptable pups. Adopt a Pet makes it
          super easy to find available dogs in your area, allowing you to
          customize your search by adding your preferred location, age, and
          breed. Once you enter your search, Adopt a Pet serves up a list of pet
          profiles that match your criteria — don’t be ashamed if you find
          yourself scrolling through them for hours…they’re just too cute. If
          you find one (or ten) you’re interested in, you can click the “Ask
          About Me” button and connect directly with the shelter or rescue
          organization to learn more.
          <br />
          <br />
          When using the internet to find a dog to adopt, it’s very important to
          use reputable sites. Unfortunately, there are a lot of scammers out
          there who prey on pet parent hopefuls and falsely advertise available
          pups. Stick to well-known websites, such as Adopt a Pet, and save
          Craigslist for finding used furniture (or maybe don’t).
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          3. Visit local animal shelters and rescue organizations
        </h1>
        <p>
          Whether you’ve found a potential pooch online first and want to go
          meet them or are casually strolling by, visiting a local animal
          shelter or rescue organization means you get to see the available
          adoptables IRL. There are a few subtle differences between shelters
          and rescues. Shelters generally have a broader focus, accepting
          various breeds and types, while rescue organizations typically take in
          fewer animals, are “no-kill,” and specialize in specific breeds or
          types of pets. Keep in mind, there’s a good chance you won’t be able
          to meet any pups unless there’s a scheduled event or you’ve
          coordinated a meet-and-greet in advance, so make sure you plan ahead.
        </p>
        <br />
        <p>
          Another important reminder: There’s typically a lot of paperwork,
          multiple interviews, and a home visit involved when you adopt a dog,
          especially through a rescue organization. While this is a good thing
          and ensures that dogs find responsible pet parents, the process can
          take a while and require some time and attention. Don’t get
          discouraged if an adoption doesn’t work out and know that a pup will
          find their way home to you soon. With that said, before you dive into
          the adoption process, it can be helpful to prepare answers to specific
          questions you might be asked — for example, questions about your work
          schedule, home type and features (small apartment, big backyard), past
          pets, and personal and professional references. That way, once you
          find one you like, you’ll already be one step ahead.
        </p>
        <h1 className={`mb-4 mt-8 text-2xl font-medium`}>
          4. Search for breed-specific rescues
        </h1>
        <p>
          If you’ve already determined which breed is the best for you, many
          rescue organizations specialize in certain breeds. Consider reaching
          out to these breed-specific rescues to inquire about available dogs —
          they often have a deeper understanding of the breed’s needs and
          characteristics and can help match you with the perfect companion.
        </p>
        <h1 className={`mb-4 mt-8 text-center text-3xl ${gloock.className}`}>
          8 Factors to consider when choosing a dog to adopt
        </h1>
        <p>
          Finding the right fit is extremely important when it comes to adopting
          a dog. The last thing anyone wants is for a pup in need to get matched
          with a home and get returned to the shelter shortly after. There are
          several factors to consider when choosing a dog to welcome into your
          family.
        </p>
        <ul className="my-4 list-disc">
          <li>
            <strong>Lifestyle:</strong> Think about your daily routine and how a
            dog would fit into it. Are you more of a couch potato or an
            adventure seeker? Your lifestyle will influence the type of dog
            that’s the best match for you.
          </li>
          <li>
            <strong>Activity level:</strong>
            Consider your energy level and how much exercise you can provide.
            High-energy dogs might need more playtime, while lower-energy breeds
            are happy with shorter walks and more snuggles.
          </li>
          <li>
            <strong>Size:</strong>
            Do you have enough space for a big, lovable lug, or are you looking
            for a pocket-sized pup? The size of your home and yard plays a role
            in this decision.
          </li>
          <li>
            <strong>Age: </strong>
            Puppies are adorable, but they need training and patience. Older
            dogs might be a better fit if you prefer a more settled and relaxed
            companion.
          </li>
          <li>
            <strong>Temperament:</strong>
            Think about your personality and what you’re looking for in a furry
            friend. Some dogs are outgoing and sociable, while others are more
            reserved.
          </li>
          <li>
            <strong>Health history:</strong>
            Understanding a dog’s health history is crucial. It helps you
            prepare for potential medical expenses and any special care they
            might need.
          </li>
          <li>
            <strong>Budget:</strong>
            Dogs come with costs beyond adoption fees, like food, grooming, and
            veterinary care. Consider your budget and ensure it covers your
            dog’s needs comfortably.
          </li>
          <li>
            <strong>Experience:</strong>
            How much experience do you have as a pet parent? This is an
            important one that can be easy to overlook because there are
            definitely some dog breeds that are better for first-time pet
            parents (and some that aren’t).
          </li>
        </ul>
        <h1 className={`mb-4 mt-8 text-center text-3xl ${gloock.className}`}>
          Commonly asked questions
        </h1>
        <h2 className="my-2 text-2xl font-medium">
          What is the difference between a shelter and a rescue?
        </h2>
        <p>
          While the goal is always to find loving homes for pups in need, there
          are a few key differences between shelters and rescues. Shelters and
          humane societies are like temporary waystations for dogs, often housed
          in kennels or larger facilities. They might have a mix of breeds and
          types, making it a bit like a doggie melting pot. Rescue organizations
          are like dog matchmakers with a special touch. They often have fewer
          pets and might even focus on particular breeds or types. Many dogs in
          rescues are living in foster homes, so you get the inside scoop on
          their personalities from experienced foster families. Plus, rescue
          organizations often have a “no-kill” policy, meaning they don’t
          euthanize animals due to space constraints. So, if you’re looking for
          a bit more assistance when adopting a dog, a rescue could be your best
          bet.
        </p>
        <h2 className="my-2 text-2xl font-medium">
          What are the benefits of adopting a dog?
        </h2>
        <p>
          When you adopt a dog, you not only save a dog’s life and help break
          the cycle of pet overpopulation, but you also play a role in reducing
          animal cruelty. Adopting is usually less expensive than going to a
          breeder and many adopted dogs are already housebroken and trained.
          You’re basically getting a dog who’s ready to settle into your home —
          after an adjustment period. And the best part? You’re gaining a
          lifelong friend who’ll be there for all the adventures and cozy
          snuggles.
        </p>
      </div>
    </div>
  );
}
