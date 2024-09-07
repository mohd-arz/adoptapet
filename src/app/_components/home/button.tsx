export default function Button({type,title,onclick}:{type:string,title:string,onclick:()=>void}):JSX.Element{
  return (
    <button onClick={onclick} className={`px-7 py-2 text-sm border rounded-full ${type=='white'? 'bg-white hover:bg-transparent ':'bg-black text-white'}`}>{title}</button>
  )
}