"use client";

import { Dispatch, FC, SetStateAction } from "react";
import Image from 'next/image'
import Link from "next/link";

// ** Avatar
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// ** Icons
import { Bell, UserRound, Menu } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";

// ** Components
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchInput } from "@/components/ui/input";

/// ** Hook

import { useAppDispatch } from "@/hooks/useTypedSelector";
import { BsWallet } from "react-icons/bs";

// ** Store
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { newuser, person } from "@/utils/constants";


interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar: FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();



  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="h-full w-full pt-4 flex items-center justify-between">
      <div className="md:w-[25rem] flex items-center justify-start space-x-2">
        <Menu className="text-black md:hidden -mt-1" size={30} onClick={handleSidebarToggle} />
        <div className="flex items-center md:gap-[20px] md:w-[17.68rem]" >
          <Image
            src="/logo.svg"
            alt=""
            width="48"
            height="48"
            className="w-[48px] md:w-auto h-auto"
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-end md:justify-between">
        <div className="w-full hidden md:block">
          <div>
            <div className=' ml-[20px] bg-[#f0f2f5] w-[150px] md:w-[336px] px-[18px] border border-[#E2E8F0] rounded-[5px] h-[40px] flex justify-between items-center'>
              <div className='mr-[14px] flex items-center h-full'>
                <CiSearch />
              </div>
              <input onChange={(e) => { console.log('welldone') }} value={""} className='w-full h-full outline-none border-none rounded-[12px] bg-transparent' type="text" placeholder='Search by Name...' />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col justify-center items-center mr-[30px]">
              <Bell color='#110D0C' size={20} />
              <div className="text-center">notifications</div>
            </div>
           

            <div className="flex flex-col justify-center items-center px-[10px]">
              <BsWallet color='#110D0C' size={20} />
              <div className="text-center">wallet</div>
            </div>


            <div className="flex flex-col justify-center items-center px-[10px]">
                <Image alt="" src={person} width={100} height={100} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;