import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleUpdateClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/id/${id}`);
      setCurrentUser(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUpdateChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/updateuser/${currentUser._id}`, currentUser);
      setUsers(users.map(user => user._id === currentUser._id ? currentUser : user));
      setOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }} style={{ paddingTop: '80px', backgroundColor: '#F5F5DC', opacity: 0.9 }}>
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
                    style={{color: 'white', marginLeft:'5px' ,backgroundColor: '#654321'}}
                    onClick={() => handleToggleBlock(user._id, user.user_type)}
                  >
                    {user.user_type === 'blocked' ? 'Unblock' : 'Block'}
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit" style={{color: 'white', marginLeft:'5px' ,backgroundColor: '#654321'} }
                    onClick={() => handleUpdateClick(user._id)}
                    sx={{ ml: 2 }}
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {currentUser && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="user_id"
              label="ID"
              type="text"
              fullWidth
              value={currentUser.user_id}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              name="user_name"
              label="Name"
              type="text"
              fullWidth
              value={currentUser.user_name}
              onChange={handleUpdateChange}
            />
            <TextField
              margin="dense"
              name="user_email"
              label="Email"
              type="email"
              fullWidth
              value={currentUser.user_email}
              onChange={handleUpdateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AllUsers;

