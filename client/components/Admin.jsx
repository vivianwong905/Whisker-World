import React from "react";
import { useGetAllUsersQuery } from "../redux/api";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

const Admin = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'name', headerName: 'Full Name', width: 130 },
    { field: 'admin', headerName: 'Admin', width: 130 },
    { field: 'cartId', headerName: 'Cart ID', width: 130 },
  ]
  
  const { data: users, isLoading, error } = useGetAllUsersQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ height: 100}}>
      <Typography variant="h3" sx={{marginLeft:14}} >Users</Typography>
      {error && !users && (<p> Failed to load user data from api</p>)}
     
      {users ?(
        users.map((user) =>{
         
          return(
            <ul key={user.name}>
              <li>{user.id}</li>
              <li>{user.username}</li>
              <li>{user.name}</li>
              <li>{user.admin}</li>
              <li>{user.cartId}</li>
            </ul>
          )
        
        })
      ): !error && <p>Loading...</p>}
    </Box>
  );
};

export default Admin;