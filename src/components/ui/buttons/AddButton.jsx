import React from 'react'

function AddButton(props) {
  return (
    <div onClick={props.onClick} className={`max-w-[${props.width}] text-[14px] underline cursor-pointer flex justify-center rounded-[16px] px-3 items-center text-[#17599A] h-[42px]`}>
      {props.icon && <span className='mr-2]'>{props.icon}</span>}
      {props.text}</div>
  )
}

export default AddButton