import Image from "next/image";

import { FC, ReactNode } from "react";

interface AuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayout> = ({children}) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden md:centralize-all-col relative bg-[#FCFCFC] h-full ">
        {/* logo */}
        <div className="absolute left-0 top-0 translate-y-20 translate-x-44">
          <Image 
            src="/logo.svg"
            alt="auth banner"
            width={400}
            height={200}
            className="w-auto h-auto"
          />
        </div>
        {/* image */}
        <div className="relative bg-[#FCFCFC]">
          <Image 
            src="/auth-banner.png"
            alt="auth banner"
            width={400}
            height={200}
            className="w-auto h-auto"
          />
        </div>
      </div>
      <div className="relative bg-white flex flex-col justify-center ">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout