import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React, { useState } from 'react'




function RoundedTable(props) {
  return (
    <div style={{ height: "50vh", width: '100%',backgroundColor:'white' }}>
        <DataGrid
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

export default RoundedTable