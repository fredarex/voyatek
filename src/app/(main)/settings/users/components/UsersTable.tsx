"use client"

// ** Store
import { useGetUsersQuery } from "@/store/features/users/UsersService"

// ** UI


const UsersTable = () => {
  const {data:getAllUsers} = useGetUsersQuery();
  console.log(getAllUsers);

  return (
    <div>
       {/* <DataTable columns={columns} data={ getAllUsers || []} /> */}
    </div>
  )
}

export default UsersTable