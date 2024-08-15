import { NavBar } from "../_components/home/header";
import { Gloock}from '@next/font/google'

const gloock = Gloock({
  weight: ["400"],
  subsets:["latin"],
});

export default function NavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>){
  return (
    <div className="flex flex-col min-h-svh">
    <NavBar/>
    {children}
    <footer className="min-h-[300px] bg-cyan mt-4">
        <h1 className={`text-[200px] text-center ${gloock.className}`}>Best Friend</h1>
    </footer>
    </div>
  )
}