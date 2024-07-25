import React, { useEffect } from 'react'
import {BsThreeDots} from 'react-icons/bs';
import Popover from '@mui/material/Popover';


function AllUserAction({params,handleDelete,setOpenUpdateModal,setDetailId}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log('params',params)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        setAnchorEl(null);
    },[])
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div className='flex w-full'>
          <div className='cursor-pointer' onClick={() => {
                setOpenUpdateModal(true);
                setDetailId(params.row);
              }}>
                <span className='text-[#0D6EFD] text-[12px] font-semibold'>Edit</span>
            </div>
            <div className='cursor-pointer ml-[12px]' onClick={() => handleDelete(params.row.id,type)}>
                <span className='text-[#98A2B3] text-[12px] font-semibold '>Remove</span>
            </div>
      </div>
    );
}

export default AllUserAction