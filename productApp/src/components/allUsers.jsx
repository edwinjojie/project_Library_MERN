import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBlock = async (id, currentType) => {
    const newType = currentType === 'blocked' ? 'user' : 'blocked';
    try {
      await axios.put(`http://localhost:4000/updateuser/${id}`, { user_type: newType });
      setUsers(users.map(user => user._id === id ? { ...user, user_type: newType } : user));
      console.log(`User with id ${id} ${newType === 'blocked' ? 'blocked' : 'unblocked'}`);
    } catch (error) {
      console.error(`Error ${newType === 'blocked' ? 'blocking' : 'unblocking'} user:`, error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.user_id}
              </StyledTableCell>
              <StyledTableCell>{user.user_name}</StyledTableCell>
              <StyledTableCell>{user.user_email}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color={user.user_type === 'blocked' ? 'primary' : 'secondary'}
                  onClick={() => handleToggleBlock(user._id, user.user_type)}
                >
                  {user.user_type === 'blocked' ? 'Unblock' : 'Block'}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
