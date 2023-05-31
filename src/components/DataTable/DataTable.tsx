import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { HeroForm } from '../HeroForm/';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'comics_appeared_in',
    headerName: 'Comics Appeared In',
    width: 5,
    editable: true
  },
  {
    field: 'super_power',
    headerName: 'Super Power',
    width: 200,
    editable: true
  },

];

interface gridData {
  data: {
    id?: string;
  }
}

export const DataTable = () => {

  const { heroData, getData } = useGetData();
  const [open, setOpen] = useState(false);
  const [gridData, setData] = useState<GridRowSelectionModel>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData)



  //conditionally render datatable if we have an authenticated user
  const MyAuth = localStorage.getItem('myAuth');
  console.log(MyAuth)
  if (MyAuth == 'true'){
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Cars in Inventory</h2>
        <DataGrid
          rows={heroData}
          columns={columns}
          initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    },
                },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel) }}
          {...heroData}
        />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
        {/* Dialog Pop up for Updating a Car */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Hero</DialogTitle>
          <DialogContent>
            <DialogContentText>Hero id: {gridData[0]}</DialogContentText>
            <HeroForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Done</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  } else {
    return(
        // return does not render datatable if user is authenticated
        <div>
          <h3>Plese Sign in to view Your Heroes</h3>
        </div>
  )}
}