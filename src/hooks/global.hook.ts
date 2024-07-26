'use client'

import { RootState } from "@/store";
import { useAppSelector } from "./useTypedSelector";

const useGlobalState = () => {
  const email = useAppSelector((state: RootState) => state.auth.email);

  return { email };
};

export default useGlobalState;
