import Link from 'next/link'
import React from 'react'

// Icons
import { MoveLeft } from 'lucide-react';

// ** Components
import UserViewDetails from './components/UserViewDetails';

const UserDetails = ({ params }: { params: { details: string } }) => {
  const userId:number = parseInt(params.details, 10)

  return (
    <div>
      {/* to back */}
      <Link href={"/dashboard/users"}>
        <div className='flex items-center space-x-2'>
          <MoveLeft className='text-n500' />
          <p className='text-n500 text-[16px] font-normal'>Back to Users</p>
        </div>
      </Link>
      {/* user details */}
      <div className='mt-10'>
        <UserViewDetails user_id={userId} />
      </div>
    </div>
  )
}

export default UserDetails