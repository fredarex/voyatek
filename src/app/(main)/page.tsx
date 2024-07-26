'use client'
import AllUserAction from '@/components/ui/AllUserAction';
import BlueButton from '@/components/ui/buttons/BlueButton';
import EmptyData from '@/components/ui/emptyData';
import AddNewUserModal from '@/components/ui/modal/AddNewUserModal';
import RoundedTable from '@/components/ui/table/RoundedTable';
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlusCircle } from "react-icons/fi";
import { getAllUser } from '@/store/features/users/userSlice';
import UpdateUserModal from '@/components/ui/modal/UpdateUserModal';

const mapState = (state: any) => ({
  allusers: state.user.users
});

function Dashboard() {
  
  const { allusers } = useSelector(mapState);
  console.log(allusers);
  const [rowId, setRowId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [tabId, setTabId] = useState(1);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [detailId, setDetailId] = useState('');
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 20
  })
  const dispatch = useDispatch();


  const fetchUserData = async() =>  {
    setIsLoading(true);
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_MOCK_API_URL}`);
      
      dispatch(getAllUser(data))
      setIsLoading(false);
    }catch(err) {
      setIsLoading(false);
      console.log(err)
    }
  } 

  useEffect(() => {
    setIsLoading(true);
    if (tabId == 1) {
      fetchUserData();

    }


  }, [pageState.page]);

  const reloadData = async () => {
    setReload(!reload);
  };

  useEffect(() => {
    setIsLoading(true);
    if (tabId == 1) {
    

    }

  }, [reload]);

  const handleDelete = async (id: any, type: any) => {
    setIsLoading(true);
    console.log(tabId)
    if (type == 'users') {
     
    }

  }


  const Studentcolumns = useMemo(() => [
    { field: 'name', headerName: 'Name', width: 180, cellClassName: 'darker-blue' },
    { field: 'email', headerName: 'Email', width: 180, cellClassName: 'first-row-table-color' },
    { field: 'role', headerName: 'Role', width: 180, cellClassName: 'first-row-table-color' },
    { field: 'actions', headerName: 'Actions', width: 120, type: 'action', renderCell: (params: any) => <AllUserAction params={params} setOpenUpdateModal={setOpenUpdateModal} setDetailId={setDetailId} handleDelete={handleDelete} />, cellClassName: 'dark-text-row' },
  ], []);


  const handleOnSearchUser = async (e: any) => {

  }

  return (
    <div>
      <h6 className='text-[14px] text-[#98A2B3] mb-[20px] '>Settings / Users & Roles Settings</h6>
      <div>
        <div className='text-[24px] text-[#1D2739] mb-[10px] font-bold'>Users & Roles</div>
        <div className='text-[16px] text-[#98A2B3]'>Manage all users in your business</div>
      </div>
      {
        openAddModal && <AddNewUserModal reload={reloadData} close={() => setOpenAddModal(false)} isOpen={openAddModal} />
      }
      {
        openUpdateModal && <UpdateUserModal reload={reloadData} detail={detailId} close={() => setOpenUpdateModal(false)} isOpen={openUpdateModal} />
      }

      
      <div className='mb-[14px] h-[30px] flex border-b border-[#EBEAED]'>
        <div className={`mr-[12px] h-full px-[8px] cursor-pointer ${tabId == 1 ? 'border-b-[3px] border-[#0D6EFD] text-[#0D6EFD]' : 'text-[#84818A]'} `} onClick={() => {
          setTabId(1);
          setIsLoading(true);
        }}>Users</div>
        <div className={`mr-[8px] h-full px-[8px] cursor-pointer ${tabId == 2 ? 'border-b-[3px] border-[#0D6EFD]  text-[#0D6EFD]' : 'text-[#84818A]'} `} onClick={() => {
          setTabId(2);
          setIsLoading(true);
        }}>Role
        </div>

      </div>
      <div className=' bg-white p-[15px] rounded-[8px] flex justify-between items-center mb-[24px]'>
        <div>
          <div className='w-[150px] md:w-[336px] px-[18px] border border-[#E2E8F0] rounded-[12px] h-[48px] flex justify-between items-center'>
            <div className='mr-[14px] flex items-center h-full'>
              <CiSearch />
            </div>
            <input onChange={(e) => handleOnSearchUser(e)} value={searchName} className='w-full h-full outline-none border-none rounded-[12px] bg-transparent' type="text" placeholder='Search by Name...' />
          </div>
        </div>
        <div className='flex'>
          <BlueButton icon={<FiPlusCircle color={"#fff"} />} width={"122px"} text={"New User"} onClick={() => setOpenAddModal(true)} />
        </div>
      </div>
      <div>

        {
          (allusers?.length > 0 && tabId == 1)
          &&
          <RoundedTable
            isLoading={isLoading}
            columns={Studentcolumns}
            rows={allusers}
            rowsPerPageOptions={[5, 10, 20]}
            page={pageState.page}
            pageSize={pageState.pageSize}
            rowCount={allusers.length}
            paginationModel={{ page: pageState.page - 1, pageSize: pageState.pageSize }}
            onPaginationModelChange={(newModel:any) => {
              setPageState(old => ({
                ...old, page: newModel.page + 1, pageSize: newModel.pageSize
              }))
            }}
          />

        }
        
        {
          (allusers?.length == 0 && tabId == 1) && <EmptyData message={"No User Data"} />
        }

      </div>
    </div>
  )
}



export default Dashboard