import { MutableRefObject, useRef } from 'react';
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useAppDispatch } from '../store/storeHooks';
import { searchActions } from '../store/Slices/SearchSlice';
import { clearVideos } from '../store/Slices/YoutubeAppSlice';
const Navbar:React.FC<{searchTerm?:string}>= ({searchTerm}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {addSearchTerm} = searchActions;
  const inputSearchTerm = useRef()as MutableRefObject<HTMLInputElement>;
const disptach = useAppDispatch();
  const handlerSearch =()=>{
  const searchedTerm = inputSearchTerm.current.value;
    if(searchedTerm.trim()==='') return
    disptach(addSearchTerm(searchedTerm));
    if (location.pathname !== "/search") navigate("/search");
    disptach(clearVideos());
 }

return (
   <div className='flex gap-5 w-100 justify-between px-4 py-7 items-center fixed left-0 right-10 z-10 ' style={{height:"7.5vh",backgroundColor:"rgb(15, 15, 15)"}}>
    <div className="flex gap-2 items-center ">
      <GiHamburgerMenu className='rounded-full bg-zinc-900 m-1 cursor-pointer hover:bg-zinc-700 text-4xl p-1.5	' />
  <Link to={'/'} >
    <div className='flex'>
  <BsYoutube className='cursor-pointer text-3xl text-red-600'/>
  <div className='flex gap-1 cursor-pointer'>
  <span className='font-semibold text-lg ml-1 tracking-tighter' >YouTube </span>
  <sup className='text-gray-500 mt-2'>pk</sup>
  </div>
    </div>
  </Link>
    </div>

{/* Search Input Field section */}
    <div className='flex items-center gap-2 flex-initial w-6/12'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        handlerSearch();
      }}
      className="rounded-3xl relative flex w-full flex-wrap items-stretch">
      <input
      type="search"
      className="rounded-l-full relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto border border-solid border-white-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-white-600 dark:text-white-200 dark:placeholder:text-white-200 dark:focus:border-primary"
      placeholder="Search"
      defaultValue={searchTerm ? searchTerm : ""}
      ref={inputSearchTerm}
    />

      <button
      onClick={handlerSearch}
      className="relative z-[2] flex items-center rounded-r-full bg-zinc-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md"
      type="button"
      id="button-addon1"
      data-te-ripple-init
      data-te-ripple-color="light">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5">
      <path
      fill-rule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clip-rule="evenodd"
      />
      </svg>
      </button>
      </form>
      <TiMicrophone className='rounded-full bg-zinc-900 m-1 cursor-pointer hover:bg-zinc-700 text-4xl p-1.5'/>
      </div>

    <div className="flex flex-initial w-40 justify-between mr-4">
      <BsCameraVideo className='rounded-full bg-zinc-900 m-1 cursor-pointer hover:bg-zinc-700 text-4xl p-2' />
      <BsBell className='rounded-full bg-zinc-900 m-1 cursor-pointer hover:bg-zinc-700 text-4xl p-2' />
      <IoAppsSharp className='rounded-full bg-zinc-900 m-1 cursor-pointer hover:bg-zinc-700 text-4xl p-2' />
    </div>
   </div>
 )
}

export default Navbar;