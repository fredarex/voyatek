import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useState } from 'react'

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[100],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));


function StripedTable(props) {
  console.log(props.rows);
  const [pageSize, setPageSize] = useState(10);
  return (
    <div style={{ height: "90vh", width: '100%',backgroundColor:'white'}}>
        <StripedDataGrid
            loading={props.isLoading}
            pagination
            paginationMode='server'
            showCellVerticalBorder={false}
            sortingMode={"server"}
            columns={props.columns}
            rows={props.rows}
            rowCount={props.rowCount}
            pageSize={props.pageSize}
            page={props.page}
            paginationModel={props.paginationModel}
            onPaginationModelChange={props.onPaginationModelChange}
            onPageChange={props.onPageChange}
            pageSizeOptions={[5,10,15]}
            getRowSpacing={params => ({
              top:params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5
            })}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            checkboxSelection
            
        />
    </div>
  )
}

export default StripedTable