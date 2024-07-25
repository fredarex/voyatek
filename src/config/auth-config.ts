import { RootState } from '@/store';
import {  fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_MOCK_API_URL}`,
  prepareHeaders: (headers) => {
    return headers;
  },
});
