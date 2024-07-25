import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit } from 'react-icons/fa';
import BlueButton from '../buttons/BlueButton';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Link from 'next/link';

function AuthorTable(props) {
  return (
    <div>
        <div className='mt-[30px] flex justify-between'>
            <div className='font-bold'>All({props.data?.data?.length})</div>
            {props.blueButton}
        </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650,border:'none' }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>
                        <div className='text-[#000000] text-[18px] font-bold'>Name</div>
                    </TableCell>
                    {/* <TableCell>
                        <div className='text-[#000000] text-[20px] font-bold'>Description</div>
                    </TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {props.data?.data?.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell  align="left">
                        <div  className='text-[#4A529C] text-[16px]'>
                            {row.name}{' '}
                        </div>
                    </TableCell>
                    {/* <TableCell className='text-[#4A529C] text-[16px]' align="left">{row.last_name}</TableCell> */}
                    {/* <TableCell align="left">
                            <FaRegEdit  />
                        </TableCell> */}
                        <TableCell align='left'>
                        <RiDeleteBin6Fill className='ml-[5px] cursor-pointer' color={"#DD3333"} onClick={() => props.onDelete(row.id)} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </div>
    
  )
}

export default AuthorTable