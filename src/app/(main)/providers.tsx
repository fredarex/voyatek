'use client'

import {ReactNode, useState } from "react";

// ** Layouts
import Sidebar from "@/layouts/sidebar/Sidebar";
import Navbar from "@/layouts/navbar/navbar";

// ** Utils
import { cn } from "@/lib/utils";


const Providers = ({children}: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-full bg-[#F0f2f5]">
      <div className={cn(`bg-white mt-[120px] rounded-[6px] ml-[20px] w-[224px] min-h-screen fixed left-0 top-0 transform`, {
        '-translate-x-full lg:translate-x-0' : !isSidebarOpen,
        'z-50': isSidebarOpen
      })}>
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className=" fixed top-0 w-full min-h-[89px]  bg-white  z-50 px-[20px] ">
        <Navbar isSidebarOpen = {isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      </div>
      <div className={cn(`w-full`,{
        'lg:pl-[17.68rem]' : isSidebarOpen,
        " lg:pl-[17.68rem] p-0" : !isSidebarOpen
      } )}>
        <div className="w-full mt-[40px] pb-[40px] pr-[20px] pt-[75px] bg-[#f0f2f5] min-h-screen px-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Providers