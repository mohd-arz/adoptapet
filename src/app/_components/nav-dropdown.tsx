export default function NavDropdown():JSX.Element{
  const content = {
    'Find a Pet':['Find a Dog','Find a Cat'],
    'How-to':['How to adopt a dog','How to adopt a cat'],
    'Get Involved':['Ways to Help'],
  }
  return (
    <ul aria-label="primary" className="relative z-20 flex-col h-full flex-grow hidden sm:hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          {Object.entries(content).map((item,index)=>{
            return (
              <li className="relative group h-full" key={index}>
                <button className="flex flex-row h-full items-center w-full px-4 py-4 mt-2 text-base bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat">
                    <span>{item[0]}</span>
                </button>
                <div className="absolute z-10 hidden bg-grey-200 group-hover:block">
                    {item[1].map((el,ind)=>{
                      return (
                        <div key={ind} className="px-2 pt-2 pb-4  bg-gray-200 shadow-lg w-48">
                          <p className="pl-4">
                            {el}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </li>  
            )
          })}
        </ul>
  )
}
