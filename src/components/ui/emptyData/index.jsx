import { nonFound } from '@/utils/constants'
import Image from 'next/image'
import React from 'react'

function EmptyData(props) {
  return (
    <div className='w-full flex flex-col items-center'>
        <div>
            <Image src={nonFound} width={200} height={200} />
        </div>
        <div className='font-medium text-[20px] text-[#2A313C]'>{props.message}</div>
    </div>
  )
}

export default EmptyData