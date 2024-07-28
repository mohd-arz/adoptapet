"use client"
import Link from "next/link";
import Button from "../../_components/button";
import { Header } from "../../_components/header";
import { SwiperContainer } from "../../_components/swiper";


export default function(){
  return (
    <div className="">
      <Header/>
      <main>
        <section className="px-[5%] my-10 mx-auto border text-center border-red-500 max-w-[1400px]">
          <div>
            <h1 className="text-5xl">
              Meet featured pets
            </h1>
          </div>
          <div className="text-xl mb-5">
            We're spotlighting a few pets looking for homes.
          </div>
          <SwiperContainer/>
        </section>
        <div className="wrapper bg-cyan">
          <section className="px-[5%] mx-auto border text-center border-red-500 max-w-[1400px] w-full flex gap-14 ">
            <div className="w-1/2 py-20">
              <img src="https://prod-assets.production.omega.aapdev.org/img/HP-GettoKnowUs.png" alt="" />
            </div>
            <div className="text-left w-1/2 py-24">
              <h1 className="text-5xl mb-10">Get to know us</h1>
              <p className="mb-8 text-xl leading-8">
              We know pet adoption, because we're adopters too. We think it's just about the best thing you can do. But we'll be real: it can be a lengthy (paperwork-filled) process.
              <br /><br />
              So we're making it easier, with the tools, advice, and transparency you need—from the first search through to daily life as a pet parent.
              <br /><br />
              Because we'll do whatever it takes to help millions of people and pets find each other.
              <br /><br />
              Ready to find your pet? Let's do it.
              </p>
              <div className="flex gap-4 items-center">
                <Button type="black" title="How it Works"/>
                <Link href={''}>More about us</Link>
              </div>
            </div>
          </section>
        </div>
        <section className="py-20 mx-auto border text-center border-red-500 max-w-[1400px] min-h-[500px]">
          <div>
            <h1 className="text-5xl">Check out adoption advice</h1>
            <p className="text-xl my-2">Wondering how (and why) you should adopt?</p>
            <p className="text-xl mb-5">Get the inside scoop.</p>
          </div>
          <div className="flex justify-center gap-5">
            <div className="max-w-[28rem]">
              <h2 className="text-xl font-bold mb-5">Why we recommend adopting</h2>
              <p className="text-left">There are so many reasons to adopt: meeting a unique pet, spending less, doing a good deed—but let's talk facts. Millions of pets enter shelters every year. And hundreds of thousands are euthanized each year. We don't tell you that to guilt you or be a downer, but that's why adoption really matters to us. So we would love it if you considered adopting. And, since you're here, we’re guessing you are. Seriously, no judgment if you find a pet another way (every pet parent journey is different!). But we’re here to help make adoption easier, however we can.</p>
            </div>
            <div className="max-w-[28rem]">
              <h2 className="text-xl font-bold mb-5">How to find the perfect pet</h2>
              <p className="text-left">Let’s bust a myth. The perfect pet? Doesn’t exist. Because there are so many pets that can be the right fit for you. It’s just about knowing what you’re looking for. So start by thinking about your criteria based on your lifestyle, breed preferences, living situation, (fur and human) family, etc. From there, our team can help match you with the right pet. Check out our New Pet Alerts too: with Alerts, we’ll email you newly added adoptable pets that fit your search—so you can check out matches and meet your next best friend faster.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="h-[300px] bg-cyan">
        <h1 className="text-[200px] text-center">Logo</h1>
      </footer>
    </div>
  )
}
