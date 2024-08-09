"use client"
import {  FormEvent, useState } from "react"
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";

export default function SignIn(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast()
  
  async function handleSubmit(e:FormEvent<HTMLFormElement>){
      e.preventDefault();
        const res:any = await signIn('login',{
        email,
        password,
        redirect: false,
    })
    console.log(res);
    if (res.error) {
        setError(res.error);
    } else {
        toast({description: "Login Successfully.",})
      
        setTimeout(()=>{
            router.replace('/sellers');
        },1000)
    } 
  }
  return (
    <section className="bg-gray-300">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              Best Friend    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" value={email} onChange={(e)=>setEmail(e.currentTarget.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      </div>
                      <span className="text-red-500">{error}</span>
                      <button type="submit" className="w-full text-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-cyan ">Login</button>
                  </form>
              </div>
          </div>
      </div>
      <Toaster />
  </section>
  )
}