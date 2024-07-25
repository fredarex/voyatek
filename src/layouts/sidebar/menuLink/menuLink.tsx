'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';

interface MenuLinkProps {
  item: {
    title: string;
    path: string;
    image: any;
    imageActive: any;
  },
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const MenuLink: FC<MenuLinkProps> = ({ item, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const segments = pathname.split('/');

  
  const sanitizedPathname = segments.length === 2 ? `/${segments[1]}` :  `/${segments[1]}/${segments[2]}`;

  console.log(sanitizedPathname)

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }
  
  return (
    <Link
      href={item.path}
      className={`h-[40px] px-4 w-full flex items-center  my-[5px] space-x-3 hover:bg-[#F3FCFC] ${
        sanitizedPathname === item.path && 'bg-[#F3FCFC] border border-l-[3px] border-transparent border-l-primary'
      }`}
      onClick={handleCloseSidebar}
    >
       {/* <span className={`text-lg ${pathname === item.path ? 'text-p800 ' : 'text-n900'}`}> */}
        {
          sanitizedPathname == item.path ?
          item.imageActive : item.image
        }
       
      {/* </span> */}
      <p className={`${sanitizedPathname === item.path ? 'text-[14px] text-[#94A3B8] font-normal' : 'text-[14px] text-[#94A3B8]  font-normal'} pl-[10px]`}>{item.title}</p>
    </Link>
  );
};

export default MenuLink;
 