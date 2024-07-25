'use client'

import  { FC, useEffect, useState } from 'react'

// ** Store
import { useGetUsersQuery } from "@/store/features/users/UsersService"

// ** Third Party
import { Rating as ReactRating } from '@smastrom/react-rating'

// ** Icon
import { UserRound  } from 'lucide-react';

// ** Components
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabsContentOne from './TabsContentOne'

// ** Types
import { User } from '@/types'

// ** Helpers
import { formatNumber } from '@/helpers/formatValueComma'



interface UserViewDetailsProps {
  user_id: number;
}

const UserViewDetails: FC<UserViewDetailsProps> = ({ user_id }) => {
  const [rating, setRating] = useState(0)
  const [user, setUser] = useState<User | undefined>();

  const {data:getAllUsers, isLoading} = useGetUsersQuery()


  useEffect(() => {
    if (getAllUsers) {
      const filteredUser = getAllUsers.find(user => user.id === user_id);
      if (filteredUser) {
        setUser(filteredUser);
        setRating(filteredUser?.rating)
      } else {
        console.log(`User with ID ${user_id} not found.`);
      }
    }
  }, [getAllUsers, user_id]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs defaultValue="details" className="w-full">      
      {/* user header action */}
      <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:items-center justify-between'>
        <h3 className='text-b200 text-2xl font-medium'>User Details</h3>
        <div className='flex items-center space-x-3'>
          <Button variant={"outline"} className='text-sm text-r500 font-semibold uppercase border-r500'>blacklist user</Button>
          <Button variant={"outline"} className='text-sm text-primary font-semibold uppercase border-primary'>activate user</Button>
        </div>
      </div>

      {/* user details tab panel */}
      <div className='mt-10 w-full'>
        <div className='relative w-full h-[500px] md:h-[210px] border border-[#213f7d0f] drop-shadow-sm rounded-[4px] bg-white p-6'>
          <div className='p-6'>
            <div className="flex flex-col md:flex-row h-7 items-center space-x-4 text-sm">
              <div className='flex items-center space-x-3'>
                <div>
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage src={"/profile.png"}  />
                    <AvatarFallback><UserRound className=' text-n500'size={28}/></AvatarFallback>
                  </Avatar>
                </div>
                <div className='space-y-1 flex flex-col'>
                  <h2 className='text-[22px] text-n500 font-medium'>{`${user?.firstname} ${user?.lastname}`}</h2>
                  <p className='text-sm text-n500 font-normal'>{user?.id}</p>
                </div>
              </div>
              <Separator orientation="vertical" className='bg-n500 h-[80px] hidden md:block' />
              <Separator className='bg-n500/10 h-[1px] my-6 md:hidden'/>
              <div>
                <p className='text-sm text-n500 font-medium'>User’s Tier</p>
                <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
              </div>
              <Separator orientation="vertical" className='bg-n500 h-[80px] hidden md:block' />
              <Separator className='bg-n500/10 my-6 h-[1px] md:hidden'/>
              <div className='space-y-1'>
                <p className='text-[22px] text-b200 font-medium space-y-1'>₦{user?.education && formatNumber(user?.education?.salary_from, 2)}</p>
                <p className='text-xs text-b200 font-normal'>{`${user?.bank?.account_number}/${user?.bank?.bank_name}`}</p>
              </div>
            </div>
          </div>
          
          {/*tab header */}
          <div className='absolute  bottom-0'>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 flex-nowrap overflow-x-scroll md:overflow-hidden">
              <TabsTrigger value="details">General Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="bank">Bank Details</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="apps">App and System</TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>
      <div className='border border-[#213f7d0f] drop-shadow-sm rounded-[4px] bg-white px-6 pt-6 pb-10 w-full h-full mt-10'>
        <TabsContent value="details">
          <TabsContentOne user={user}/>
        </TabsContent>
        <TabsContent value="documents">USER DOCUMENTS HERE.</TabsContent>
        <TabsContent value="bank">BANK DETAILS HERE.</TabsContent>
        <TabsContent value="loans">LOAN VIEW HERE.</TabsContent>
        <TabsContent value="savings">SAVINGS DETAILS HERE</TabsContent>
        <TabsContent value="apps">APP AND SYSTEM DETAILS HERE</TabsContent>
      </div>
    </Tabs>
  )
}

export default UserViewDetails