import React, { useState } from 'react'
import { TiTimes } from 'react-icons/ti';
import BlueButton from '../buttons/BlueButton';
import PrimaryBtn from '../loader/primary';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import { newuser } from '@/utils/constants';


function UpdateUserModal({ isOpen, close, reload,detail}:any) {

  const [type, setType] = useState('');
  const [Name, setName] = useState(detail.name || '-');
  const [email, setEmail] = useState(detail.email || '-');
  const [role, setRole] = useState(detail.role || '-');
  const [password, setPassword] = useState(detail.password || '-');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const updateUsers = async () => {
    if ((Name != '' && email != '' && role != '' && password != '')) {
      try {
        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_MOCK_API_URL}/${detail.id}`,
          {
            name: Name,
            email: email,
            role: role,
            password: password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        toast.success('User successfully updated', {
          position: "bottom-right"
        });
        close();
      } catch (err) {
        console.log(err);
      }
      reload();
    }

  }
  return (
    <>
      {isOpen ? (
        <>

          {

            <div className='z-[999999] fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]  w-[588px] h-[500px] flex flex-col  items-center border py-[32px] border-[#EDF2F7] rounded-[16px] bg-white'>
              <div className='w-full relative flex justify-center'>
                <div className=''>
                  <div className='flex justify-center'>
                    <Image alt="" src={newuser} width={64} height={64} />
                  </div>

                  <div className='text-[#1A202C] text-center font-bold text-[24px]'>Edit User</div>
                </div>

                <TiTimes className='cursor-pointer absolute top-[10%] right-[5%]' onClick={close} size={27} color={"#676E7E"} />
              </div>
              <div className='w-full mt-[48px] px-[22px] overflow-y-scroll'>
                {

                  <div className='w-full relative mb-[15px]'>
                    <div className="flex justify-between w-full h-full p-[20px] rounded-[12px] ">
                      <div className='w-full'>
                        <div className='w-full'>
                          <div className='mb-[8px]'>Email Address <span>*</span></div>
                          <div className='mb-[10px] w-full bg-white h-[40px] rounded-[8px] border border-[#e0dfdf]'>
                            <input placeholder='New User Email Address' className='w-full h-full rounded-[12px] px-[10px] outline-none border-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                        </div>
                        <div className='w-full'>

                          <div className='mb-[8px]'>Full Name <span>*</span></div>
                          <div className='mb-[10px] w-full bg-white h-[40px] rounded-[8px] border border-[#e0dfdf]'>
                            <input placeholder='New User Full Name' className='w-full h-full rounded-[12px] px-[10px] outline-none border-none' value={Name} onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>

                        <div className='w-full'>
                          <div className='mb-[8px]'>Role <span>*</span></div>
                          <div className='mb-[10px] w-full bg-white h-[40px] rounded-[8px] border border-[#e0dfdf]'>
                            <input placeholder='Role' className='w-full h-full rounded-[12px] px-[10px] outline-none border-none' value={role} onChange={(e) => setRole(e.target.value)} />
                          </div>
                        </div>
                        <div className='w-full'>
                          <div className='mb-[8px]'>Password<span>*</span></div>
                          <div className='mb-[10px] w-full bg-white h-[40px] rounded-[8px] border border-[#e0dfdf]'>
                            <input placeholder='Password' className='w-full h-full rounded-[12px] px-[10px] outline-none border-none' value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                }

                {<BlueButton width={"122px"} text={loading ? <PrimaryBtn /> : "Edit User"} onClick={() => updateUsers()} />}
              </div>
            </div>
          }
          <div className={`fixed top-0 inset-0 z-[99] bg-[rgba(26,32,44,0.3)]`}></div>
        </>
      ) : null}
    </>
  )
}

export default UpdateUserModal