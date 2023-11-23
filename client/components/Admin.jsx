import React from "react";
import { useGetAllUsersQuery } from "../redux/api";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import UpdateProductForm from "./UpdateProductForm";


const Admin = () => {

  const { data: users, isLoading, error } = useGetAllUsersQuery();


  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Paper>
    <Box>
      <Typography variant="h5" sx={{ marginLeft: 10, padding: 1 }} >Users</Typography>
      {error && !users && (<p> Failed to load user data from api</p>)}
      <TableContainer sx={{ maxWidth: 700, marginLeft: 10 }} component={Paper}>
        <Table sx={{ maxWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Admin</TableCell>
              <TableCell align="right">Cart ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              users.map((user) => {
                return (
                  <TableRow
                    key={user.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.admin ? "true" : "false"}</TableCell>
                    <TableCell align="right">{user.cartId}</TableCell>
                  </TableRow>
                )
              })
            ) : !error && <p>Loading...</p>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Box>
          <UpdateProductForm />
    </Box>
    </Paper>
  );
};

export default Admin;