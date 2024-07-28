import { FaMagnifyingGlass } from "react-icons/fa6";
import NavDropdown from "./nav-dropdown";
import Button from "./button";

export function Header(){
  return(
    <header className="border">
      <NavBar/>
      <Banner/>
      <div className="empty-cyan h-10 bg-cyan"></div>
      <div className="empty-blue h-16 bg-blue"></div>
    </header>
  );
}

function NavBar():JSX.Element{
  return (
    <div className="wrapper bg-cyan">
      <nav className="flex flex-row justify-between items-center px-[5%] mx-auto border border-red-500 max-w-[1400px] h-[88px]">
        <div>Logo</div>
        <div className="h-full">
          <NavDropdown/>
        </div>
        <div className="flex flex-row gap-4">
          <Button type={'white'} title={'Login'}/>     
          <Button type={'black'} title={'Sign Up'}/>     
        </div>
      </nav>
    </div>
  )
}

function Banner():JSX.Element{
  return (
    <div className="wrapper  bg-dark-cyan">
      <div className="banner-container h-[800px] max-w-[1400px] px-[5%] mx-auto border border-purple-700 flex items-end">
        <div className="banner-content w-full">
          <div className="banner-title text-8xl text-white">Ready to <br/> adopt a pet?</div>
          <div className="banner-description text-white">Let's get started. Search pets from shelters, rescues, and individuals.</div>
          <div className="banner-search h-[152px] flex flex-col justify-between bg-cyan rounded-tl-xl rounded-tr-xl p-5">
              <ul className="flex text-xl gap-4">
                <li>Dog</li>
                <li>Cat</li>
                <li>Other Pets</li>
              </ul>
            <div className="flex justify-center items-center gap-4">
              <BannerInput label="location" name="Location"/>
              <BannerSelect values={['Puppy','Young','Adult','Senior']}/>
              <BannerSelect values={['Puppy','Young','Adult','Senior']}/>
              {/* <Button type="black" title="Get Started"></Button> */}
              <GetStartedButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BannerInput({label,name}:{label:string,name:string}):JSX.Element{
  return (
    <div className="relative flex-1">
      <input type="email" id={label} className="peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
      focus:pt-6
      focus:pb-2
      [&:not(:placeholder-shown)]:pt-6
      [&:not(:placeholder-shown)]:pb-2
      autofill:pt-6
      autofill:pb-2" placeholder="" />
    <label htmlFor={label} className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500">{name}</label>
  </div>
  )
}

function BannerSelect({values}:{values:string[]}):JSX.Element{
  return (
      <select multiple data-hs-select='{
        "placeholder": "Age",
        "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-[200px] h-[full] cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-black",
        "dropdownClasses": "mt-2 z-50 w-[200px] max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
        "optionTemplate": "<div class=\"flex justify-between items-center w-full \"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
        "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
      }' className="hidden">
        <option value="">Choose</option>
        {values.map((value,ind)=>{
          return (
            <option key={ind} value={value}>{value}</option>
          )
        })}
      </select>
    )
}
function GetStartedButton():JSX.Element{
  return (
    <button className="flex items-center px-9 py-4 text-base border rounded-full bg-black text-white">
        <FaMagnifyingGlass className="mr-2" />
        Get Started
    </button>
  )
}