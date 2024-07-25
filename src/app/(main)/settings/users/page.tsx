import React from 'react'

// ** Components
import UsersTable from './components/UsersTable'


const User = () => {
  return (
    <div className='space-y-10'>
      {/* users data overview */}
      <div className='space-y-6'>
        <h2 className='text-2xl text-b200 font-medium'>Users</h2>
       
      </div>

      {/* users data overview */}
      <div className='w-full '>
        <UsersTable />
      </div>
    </div>
  )
}

export default User