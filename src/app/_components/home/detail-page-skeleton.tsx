export default function DetailPageSkeleton(){
  return (
    <div className="max-w-[1400px] px-[5%] mx-auto grid grid-cols-12">
    <div className="col-span-10 col-start-2 gap-x-1">
      <div className="my-6 flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="border border-black p-4">
        <div className="h-10 w-1/3 bg-gray-200 animate-pulse mb-4"></div>
        <div className="h-6 w-1/4 bg-gray-200 animate-pulse mb-4"></div>
        <div className="h-[400px] bg-gray-200 animate-pulse"></div>
      </div>
      <div className="border border-black p-4">
        <div className="h-[40px] bg-gray-200 animate-pulse"></div>
        <div className="h-[40px] bg-gray-200 animate-pulse my-6"></div>
        <div className="h-[60px] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  </div>
  )
}