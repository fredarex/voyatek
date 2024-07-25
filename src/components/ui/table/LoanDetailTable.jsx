import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import CookieManager from '@/utils/cookieManager';
import { MdCancel } from 'react-icons/md';
import client from '@/pages/api/client';
import { useState } from 'react';
import ApproveSucccessModal from '../modal/ApproveSuccessModal';
import DenySucccessModal from '../modal/DenySuccessModal';

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

function LoanDetailTable({detailData,close,setOpenUpdateModal,setLoanDetailId}) {
  const {userDetail,token} = useSelector(mapState);
  const [approveModal, setApproveModal] = useState(false);
  const [denyModal, setDenyModal] = useState(false);

  const handleApproveRequest = async(id) => {
    try {
      const {data} = await client.post(`/api/approve-resource-loan/${id}`,
      {
        status:'approved'
      },
      {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
      setApproveModal(true);
      window.location.reload();
      
    }catch(err) {
      console.log(err);
    }
  }

  const handleDenyRequest = async(id) => {
    
    try {
      const {data} = await client.post(`/api/approve-resource-loan/${id}`,
      {
        status:'decline'
      },
      {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    setDenyModal(true);
    window.location.reload();
    //reloadData();
    }catch(err) {
      console.log(err);
    }
  }


  const handleReceiveRequest = async(id) => {
    
    try {
      const {data} = await client.post(`/api/resource-pick-status/${id}`,
      {
        status:'picked'
      },
      {
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    //reloadData();
    window.location.reload();
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <>
       {
            approveModal && <ApproveSucccessModal close={() => setApproveModal(false)} isSuccess={approveModal} />
        }
        {
            denyModal && <DenySucccessModal close={() => setDenyModal(false)} isSuccess={denyModal} />
        }
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,border:'none' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  className='text-[#718096] font-bold' align="left">Name</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Identity Number</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Type</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Title</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Loan Date</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Due Date</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Status</TableCell>

            <TableCell className='text-[#718096] font-bold' align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={detailData.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detailData?.user?.name}
              </TableCell>
              <TableCell align="left">{(detailData?.user?.matric_number) != null ? detailData?.user?.matric_number : (detailData?.user?.staff_number) != null ? detailData?.user?.staff_number : (detailData?.user?.visitor_number) != null ? detailData?.user?.visitor_number:''   }</TableCell>
              <TableCell align="left">{detailData?.user?.roles.includes('student') ? 'student': detailData?.user?.roles.includes('staff') ? 'staff':'visitor'} </TableCell>
              <TableCell align="left">{detailData?.resource.title}</TableCell>
              <TableCell align="left">{detailData?.loan_date}</TableCell>
              <TableCell align="left">{detailData?.due_date}</TableCell>
              
              <TableCell align="left">
                <div className=''>
                    <div className={`${detailData?.status == 'Overdue' ? 'bg-[rgba(252,52,0,0.1)] text-[#FC3400]':'text-[#5542F6] bg-[rgba(85,66,246,0.1)]'} w-[65px] h-[24px] rounded-[4px] flex justify-center items-center`}>{detailData?.status}</div>
                </div>
                </TableCell>
                
              <TableCell align="left">
                <div className='' onClick={() => {
                  close();
                  setOpenUpdateModal(true); setLoanDetailId(detailData?.id)
                }}>
                  <div className={`bg-[#1E4F7F] text-white w-[120px] h-[44px] rounded-[6px] flex justify-center items-center`}>
                    Edit
                  </div>
                    
                </div>
                {
              detailData?.request_status &&
              (
                ((detailData?.request_status.toLowerCase() == 'pending') && (CookieManager.getCookie('role') == 'admin')) &&
                <div className='mt-[5px] bg-[#50C878] text-white w-[120px] h-[44px] rounded-[6px]  justify-center items-center flex  p-[8px] hover:bg-[#F8F8FD] cursor-pointer' onClick={() => handleApproveRequest(detailData?.id)}>
                  <FaCheck  />
                  <span className='text-[12px] font-semibold ml-[16px]' >Approve Request</span>
                </div>   
              )
              
            }

            {
              detailData?.request_status && 
              ((detailData?.request_status.toLowerCase() == 'pending') && (CookieManager.getCookie('role') == 'admin')) &&
                <div className='mt-[5px] bg-[#DD3333] text-white w-[120px] h-[44px] rounded-[6px]  justify-center items-center flex  p-[8px] hover:bg-[#F8F8FD] cursor-pointer' onClick={() => handleDenyRequest(detailData?.id)}>
                  <MdCancel />
                  <span className='text-[12px] font-semibold ml-[16px]'>Deny Request</span>
                </div>
            }

            {
              detailData?.request_status && 
              ((detailData?.request_status.toLowerCase() == 'approved' && detailData?.picked_status.toLowerCase() == 'unpicked') && (CookieManager.getCookie('role') == 'admin')) &&
                <div className='flex items-center p-[8px] hover:bg-[#F8F8FD] cursor-pointer' onClick={() => handleReceiveRequest(detailData?.id)}>
                  <FaCheck color="#50C878" />
                  <span className='text-[#50C878] text-[12px] font-semibold ml-[16px]'>Recieved</span>
                </div>
            }
                </TableCell>
                
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
    
  )
}

export default LoanDetailTable