"use client";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import Link from "next/link";
import { getServerAuthSession } from "~/lib/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res: any = await signIn("login", {
      email,
      password,
      type: "buyer",
      redirect: false,
    });
    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      toast({ description: "Login Successfully." });

      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }
  return (
    <section
      className="bg-gray-300"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(108, 95, 252, 0.6) 0%, #05c3fb91 100%)",
      }}
    >
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="mr-2 h-8 w-8"
            src="/assets/android-chrome-512x512.png"
            alt="logo"
          />
          Best Friend
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-semibold leading-tight text-center tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Welcome Buyer !
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <span className="text-red-500">{error}</span>
              <button
                type="submit"
                className="hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg bg-cyan px-5 py-2.5 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you want to Signin as a{" "}
                <Link href={"/sellers/signin"} className="underline">
                  Seller?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
