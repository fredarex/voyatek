'use client'

import { RootState } from "@/store";
import { useAppSelector } from "./useTypedSelector";

const useGlobalState = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return { user };
};

export default useGlobalState;
