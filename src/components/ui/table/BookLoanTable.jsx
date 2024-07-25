import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUserLoansAction, setLoansAction } from '@/redux/Loans/loans.actions';
import { useState } from 'react';

function createData(no, name, title,author, returndate, status,time) {
  return { no, name, title,author, returndate, status,time };
}

const rows = [
  createData('645.9 P96G', 'Obalende Isiaka', 'Introduction to Origin of Plant tissue ','John K. Ludwig', 'Jan 16, 2023','Overdue','-2'),
  createData('635.9 P96G', 'Obalende Isiaka', 'Introduction to Origin of Plant tissue ','John K. Ludwig', 'Jan 16, 2023','On-going','24'),
];

const mapState = (state) => ({
  allLoans: state.loan.allUserLoans
})
function BookLoanTable() {
  const {allLoans} = useSelector(mapState);
  const [loanData, setLoanData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageState, setPageState] = useState({
        page:1,
        pageSize:20

    })
    const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(setAllUserLoansAction(pageState.page,setLoanData,setPageState,setIsLoading));
  },[]);

  React.useEffect(() => {
    let newData  = [];
    console.log(allLoans?.data?.length);
    allLoans?.data?.length > 0 && allLoans?.data?.map((data,index) => {
      if(index < 3) {
          let obj = {}
          if(data?.user?.roles?.includes('student')) {
              obj = {
                id: data?.id,
                name: data?.user?.name || 'matthew',
                call_number: data?.resource.call_number,
                matric: data?.user?.matric_number,
                booktitle: data?.resource.title,
                author: data?.resource.authors[0],
                dateborrowed: data?.loan_date,
                status: data?.status,
                duedate: data?.due_date
              }
          }

          if(data?.user?.roles?.includes('staff')) {
            obj = {
              id: data?.id,
              name: data?.user?.name,
              call_number: data?.resource?.call_number,
              matric: data?.user?.staff_number,
              booktitle: data?.resource.title,
              author: data?.resource?.authors[0],
              dateborrowed: data?.loan_date,
              status: data?.status,
              duedate: data?.due_date
            }
        }
          
          newData = [
            ...newData,
            obj
          ]
      }
        
    });
      setLoanData(newData );
     
  },[allLoans]);

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,border:'none' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='text-[#718096] font-bold'>Call Number</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">User’s  number</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Book Title</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Author</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Due Date</TableCell>
            <TableCell className='text-[#718096] font-bold' align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loanData.length > 0 && loanData?.map((row,index) => (
            <TableRow
              key={row.no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.call_number}
              </TableCell>
              <TableCell align="left">{row?.matric}</TableCell>
              <TableCell align="left">{row?.booktitle}</TableCell>
              <TableCell align="left">{row?.author}</TableCell>
              <TableCell align="left">{new Date(row?.duedate).toDateString()}</TableCell>
              <TableCell align="left">
                <div className='flex flex-col justify-center items-center'>
                    {/* <div>{row.time+index}days</div> */}
                    <div className={`${row?.status == 'Overdue'? 'bg-[rgba(252,52,0,0.1)] text-[#FC3400]': row?.status?.toLowerCase() == 'returned' ?'text-[#20C9AC] bg-[rgba(32,201,172,0.1)]':'text-[#5542F6] bg-[rgba(85,66,246,0.1)]'} w-[65px] h-[24px] rounded-[4px] flex justify-center items-center`}>{row?.status}</div>
                </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default BookLoanTable;