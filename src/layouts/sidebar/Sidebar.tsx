'use client'

import { Dispatch, SetStateAction } from "react";

// ** Images

// ** Icons
// ./
import MenuLink from "./menuLink/menuLink";

// ** Utils
import { cn } from "@/lib/utils";
import { MdLogout } from "react-icons/md";
// ** Components
import { GoPerson } from "react-icons/go";
import { FaLock } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

const menuItems = [
 
  {
    title: "Setting",
    list: [
      {
        title: "Account",
        path: "/settings/users",
        image: <GoPerson  color="#94A3B8" size={20} />,
        imageActive: <GoPerson color="#0D6EFD" size={20} />
      },
      {
        title: "Security",
        path: "/settings/security",
        image: <FaLock color="#94A3B8" size={20} />,
        imageActive: <FaLock color="#0D6EFD" size={20} />
      },
      {
        title: "Notification",
        path: "/settings/notification",
        image: <FaRegBell color="#94A3B8" size={20} />,
        imageActive: <FaRegBell color="#0D6EFD" size={20} />
      },
      {
        title: "Users & Role",
        path: "/settings/users",
        image: <FiUsers color="#94A3B8" size={20} />,
        imageActive: <FiUsers color="#0D6EFD" size={20} />
      },
      
    ],
  },
];

interface SidebarProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Sidebar =  ({ setIsSidebarOpen }: SidebarProps) => {
  return (
    <div className={cn("sticky top-10 h-[100dvh]")}>
      
      <ul className={`list-none mt-24`}>
        
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-xs font-medium text-[12px] px-3 mb-[10px]">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} setIsSidebarOpen={setIsSidebarOpen}/>
            ))}
          </li>
        ))}
      </ul>
      {/* <div className=" mb-[80px] flex mx-[20px] items-center border-2 border-black rounded-[5[px]">
        <MdLogout size={20} />
        <div className="ml-[20px]">Back to Dashboard</div>
      </div> */}
    </div>
  );
};

export default Sidebar;