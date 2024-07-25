import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CookieManager from '@/utils/cookieManager';
import client from '@/pages/api/client';
import RequestSucccessModal from '../modal/RequestSuccessModal';
import PrimaryBtn from '../loader/primary';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

function createData(type, callno, copyno, status, date) {
  return { type, callno, copyno, status, date};
}

const rows = [
  createData('Text-Book', '635.9 P96G', 1, 'Available ','Jan 16, 2023'),
  createData('Text-Book', '622.9 P96G', 1, 'Available ','Jan 16, 2023')
];

const mapState = (state) => ({
  userDetail: state.user.userDetail,
  token: state.user.token
})

function BookDetailTable({detailData,setOpenUpdateModal,close,checkedResource,reloadData}) {
  const Router =  useRouter();
  const {userDetail,token} = useSelector(mapState);
  const [smallSize, setSmallSize] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      if(windowSize[0] >= 765) {
        setSmallSize(false);
      }else {
        setSmallSize(true);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize[0]]);

  
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
    console.log(detailData);
  console.log(userDetail)
    const splitedArray = detailData?.file?.split('/');
    const fileName = splitedArray[splitedArray.length-1];
    console.log(splitedArray[splitedArray.length-1]);

  const requestBook = async (id) => {
    setIsLoading(true);
    let obj;
    if((CookieManager.getCookie('role') == 'student')) {
      obj = {
        resource_id: id
      }
    } else if((CookieManager.getCookie('role') == 'staff')) {
      obj = {
        resource_id: id
      }
    }
    else if((CookieManager.getCookie('role') == 'visitor')) {
      obj = {
        resource_id: id
      }
    }
     
    try {
      const {data} = await client.post(`/api/request-resource-loan`,obj,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      });
      
       
        setIsLoading(false);
        // reloadData();
        
        setIsSuccess(true);
        //close();
      
      console.log(data);
    }catch(err) {
      // reloadData();
      //close();
      setIsSuccess(false);
      console.log(err);
    }
  }
  const onClose = () => {
    setIsSuccess(false);
  }

  const handleApproveRequest = async(id) => {
    try {
        const {data} = await client.post(`/api/resource-approval/${id}`,{
          status:'approve'
        },
        {
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        
        });
        window.location.reload();
        console.log(data);
    }catch(err) {
      console.log(err);
    }
  }
  
  const handleDenyRequest = async(id) => {
    try {
        const {data} = await client.post(`/api/resource-approval/${id}`,{
          status:'reject'
        },
        {
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        
        });
        window.location.reload();
    }catch(err) {
      console.log(err);
    }
  }

  return (
  <>
    <RequestSucccessModal isSuccess={isSuccess} close={onClose} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: `${windowSize[0] >= 765 ? 650 : 200}`,border:'none' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {windowSize[0] >= 765 && <TableCell  className='text-[#718096] hidden md:block font-bold' align="left">Item Type</TableCell>}
            {windowSize[0] >= 765 && <TableCell className='text-[#718096] hidden md:block  font-bold' align="left">Edition</TableCell>}
            {windowSize[0] >= 765 && <TableCell className='text-[#718096] hidden md:block font-bold' align="left">Number of Copies</TableCell>}
            <TableCell className='text-[#718096] font-bold' align="left">Status</TableCell>

            <TableCell className='text-[#718096] font-bold' align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={detailData.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {windowSize[0] >= 765 && <TableCell className='hidden md:block' component="th" scope="row">
                {detailData.type}
              </TableCell>}
              {windowSize[0] >= 765 && <TableCell className='hidden md:block' align="left">{detailData.edition}</TableCell>}
              {windowSize[0] >= 765 && <TableCell className="hidden md:block" align="left">{detailData.available_copies}</TableCell>}
              <TableCell align="left">
                <div className=''>
                    <div className={`${detailData?.available_copies == 0 ? 'bg-[rgba(252,52,0,0.1)] text-[#FC3400] p-[10px]':'text-[#5542F6] bg-[rgba(85,66,246,0.1)]'} w-[65px] md:min-w-[65px] h-[24px] rounded-[4px] flex justify-center items-center`}>{detailData?.available_copies > 0 ? 'Available': 'Unavailable'}</div>
                </div>
                </TableCell>
              <TableCell align="left">
                <div className=''>
                {
                  ((detailData?.status.toLowerCase() == 'pending') && (CookieManager.getCookie('role') == 'super-admin')) &&
                  <div className='mt-[5px] bg-[#50C878] text-white w-[120px] h-[44px] rounded-[6px]  justify-center items-center flex  p-[8px] hover:bg-[#F8F8FD] cursor-pointer' onClick={() => handleApproveRequest(detailData?.id)}>
                    <FaCheck />
                    <span className='text-[12px] font-semibold ml-[16px]' >Approve Request</span>
                  </div>
                }

                {
                  ((detailData?.status.toLowerCase() == 'pending') && (CookieManager.getCookie('role') == 'super-admin')) &&
                  <div className='mt-[5px] bg-[#DD3333] text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center p-[8px] hover:bg-[#F8F8FD] cursor-pointer' onClick={() => handleDenyRequest(detailData?.id)}>
                    <MdCancel />
                    <span className='text-[12px] font-semibold ml-[16px]'>Deny Request</span>
                  </div>
                }
                  {
                    ((CookieManager.getCookie('role') == 'admin') && 
                    <div className={` bg-[#1E4F7F] mt-[5px] cursor-pointer text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`} onClick={() => {setOpenUpdateModal(true);
                      close()}}>
                       Edit
                     </div>
                    )
                  }
                  {
                    ((CookieManager.getCookie('role') == 'super-admin') && 
                    <div className={` bg-[#1E4F7F] mt-[5px] cursor-pointer text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`} onClick={() => {setOpenUpdateModal(true);
                      close()}}>
                       Edit
                     </div>
                    )
                  }
                  {
                    (((CookieManager.getCookie('role') == 'student') || (CookieManager.getCookie('role') == 'staff') || (CookieManager.getCookie('role') == 'visitor')) && 
                    (
                    (detailData?.format?.toLowerCase() == 'hard copy') ?
                    <div className={`min-w-[120px] h-[44px] rounded-[6px] flex font-bold items-center`}>
                      {detailData?.available_copies == 0 ? 'No available copies':
                      checkedResource ? 
                        <div className={`cursor-pointer text-black w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`}>
                          book reserved
                        </div>
                        :
                        <div className={`bg-[#1E4F7F] cursor-pointer text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`} onClick={() => requestBook(detailData.id)}>
                         {isLoading ? <PrimaryBtn /> : 'Reserve book'}
                        </div>
                      }
                      {/* {(detailData.format.toLowerCase() == 'hard copy' || detailData.format.toLowerCase() == 'hardcopy') ? 'loan' : 'read'} */}
                    </div> :
                    <div className={`min-w-[120px] h-[44px] rounded-[6px] flex font-bold items-center`}>
                    {detailData?.available_copies == 0 ? 'No available copies':
                    checkedResource ? 
                      <div className={`cursor-pointer text-black w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`}>
                        book reserved
                      </div>
                      :
                      <div className={`bg-[#1E4F7F] cursor-pointer text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`} onClick={() => requestBook(detailData.id)}>
                       {isLoading ? <PrimaryBtn /> : 'Reserve book'}
                      </div>
                    }
                    {/* {(detailData.format.toLowerCase() == 'hard copy' || detailData.format.toLowerCase() == 'hardcopy') ? 'loan' : 'read'} */}
                  </div>
                    
                    )
                    )
                  }
                  {/* {
                    ((CookieManager.getCookie('role') == 'student') && 
                    (
                    (detailData.format.toLowerCase() == 'hard copy') || (detailData.format.toLowerCase() == 'hardcopy') ?
                    <div className={`min-w-[120px] h-[44px] rounded-[6px] flex font-bold items-center`}>
                      {detailData.available_copies == 0 ? 'No available copies':'Book is available for loan'}
                     
                    </div>
                    :
                    
                    <div onClick={() => 
                      Router.push({
                      pathname: '/docviewer',
                      query: { name: fileName},
                    })} className={`bg-[#0A2B4F] cursor-pointer text-white w-[70px] justify-center h-[28px] rounded-[6px] flex font-bold items-center`}>
                      <Link href="">
                        read
                      </Link>
                        
                     
                    </div>
                    )
                    )
                  } */}
                  
                  
                    
                </div>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default BookDetailTable