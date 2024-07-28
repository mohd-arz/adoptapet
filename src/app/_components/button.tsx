export default function Button({type,title}:{type:string,title:string}):JSX.Element{
  return (
    <button className={`px-7 py-2 text-sm border rounded-full ${type=='white'? 'bg-white hover:bg-transparent ':'bg-black text-white'}`}>{title}</button>
  )
}