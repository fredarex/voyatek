import React from 'react'

function BlueButton(props) {
  return (
    <div onClick={props.onClick} className={`max-w-[${props.width}] cursor-pointer flex justify-center text-white rounded-[4px] px-3 items-center bg-[#0D6EFD] h-[42px]`}>
      {props.icon && <div className='mr-4'>{props.icon}</div>}
      {props.text}</div>
  )
}

export default BlueButton