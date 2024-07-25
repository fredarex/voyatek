'use client'

import {ReactNode} from "react";
// ** Store
import { Provider } from 'react-redux'
import store from '@/store'

const Providers = ({children}: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Providers