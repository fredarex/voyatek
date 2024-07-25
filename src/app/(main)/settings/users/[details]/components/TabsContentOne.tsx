'use client'

import { FC } from 'react'

// ** Types
import { User } from '@/types'
import { formatNumber } from '@/helpers/formatValueComma'

interface TabsContentOneProps {
  user: User | undefined
}

const TabsContentOne: FC<TabsContentOneProps> = ({ user }) => {
  return (
    <div>
      {/*  */}
      <div className=''>
        <h2 className='text-[16px] text-b200 font-medium'>Personal Information</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-col-5 gap-x-4 gap-y-6 mt-6">
          <div className="space-y-1">
            <p className='user-title'>full name</p>
            <h2 className='user-detail capitalize'>{`${user?.firstname} ${user?.lastname}`}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Phone Number</p>
            <h2 className='user-detail capitalize'>{user?.phone}</h2>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-2 lg:col-span-1">
            <p className='user-title'>Email Address</p>
            <h2 className='user-detail capitalize'>{user?.email}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>gender</p>
            <h2 className='user-detail capitalize'>{user?.gender}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>bvn</p>
            <h2 className='user-detail capitalize'>{user?.bvn}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Marital status</p>
            <h2 className='user-detail capitalize'>{user?.status}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Children</p>
            <h2 className='user-detail capitalize'>{user?.children}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>type of residence</p>
            <h2 className='user-detail capitalize'>{user?.type_of_residence}</h2>
          </div>
        </div>
      </div>

      {/* Education Details */}
      {/*  */}
      <div className='mt-8'>
        <h2 className='text-[16px] text-b200 font-medium'>Education and Employment</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 mt-6">
          <div className="space-y-1">
            <p className='user-title'>level of education</p>
            <h2 className='user-detail capitalize'>{user?.education?.education_level}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>employment status</p>
            <h2 className='user-detail capitalize'>{user?.education?.employment_status}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>sector of employment</p>
            <h2 className='user-detail capitalize'>{user?.education.sector}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Duration of employment</p>
            <h2 className='user-detail capitalize'>{`${user?.education?.duration_of_employment} years`}</h2>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className='user-title'>office email</p>
            <h2 className='user-detail '>{user?.education?.office_email}</h2>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-2">
            <p className='user-title'>Monthly income</p>
            <h2 className='user-detail capitalize'>{user?.education && `₦${formatNumber(user?.education.salary_from, 2)} - ₦${formatNumber(user?.education.salary_to, 2)}`}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>loan repayment</p>
            <h2 className='user-detail capitalize'>₦{user?.education && formatNumber(user.education.loan)}</h2>
          </div>
        </div>
      </div>

      {/* Social Details */}
      <div className='mt-8'>
        <h2 className='text-[16px] text-b200 font-medium'>Socials</h2>
        <div className="w-fit grid grid-cols-3 gap-x-4 gap-y-6 mt-6">
          <div className="space-y-1">
            <p className='user-title'>Twitter</p>
            <h2 className='user-detail'>{user?.socials?.twitter}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Facebook</p>
            <h2 className='user-detail'>{user?.socials?.facebook}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Instagram</p>
            <h2 className='user-detail'>{user?.socials?.instagram}</h2>
          </div>
        </div>
      </div>

      {/* Social Details */}
      <div className='mt-8'>
        <h2 className='text-[16px] text-b200 font-medium'>Guarantor</h2>
        <div className="w-fit grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mt-6">
          <div className="space-y-1">
            <p className='user-title'>full Name</p>
            <h2 className='user-detail capitalize'>{user?.guarantor?.fullname}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Phone Number</p>
            <h2 className='user-detail capitalize'>{user?.guarantor?.phone}</h2>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className='user-title '>Email Address</p>
            <h2 className='user-detail'>{user?.guarantor.email}</h2>
          </div>
          <div className="space-y-1">
            <p className='user-title'>Relationship</p>
            <h2 className='user-detail capitalize'>{user?.guarantor?.relationship}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsContentOne