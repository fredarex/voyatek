import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'

// ** Types
import { User } from './type'


export const usersApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
        query: () => ({
          url: `/`,
          method: 'GET',
        }),
      }),
  })
})

export const { useGetUsersQuery } = usersApi