import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const Arentedbook = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/rentedbooks');
        console.log('Fetched rented books:', response.data); // Log data for debugging
        if (Array.isArray(response.data)) {
          setRentedBooks(response.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        console.log('Error fetching rented books:', error);
        setError('Failed to fetch rented books');
      } finally {
        setLoading(false);
      }
    };

    fetchRentedBooks();
  }, []);

  const handleRetrieve = async (uniqueId) => {
    try {
      await axios.post(`http://localhost:4000/retrievebook/${uniqueId}`);
      setRentedBooks(prevBooks => prevBooks.filter(book => book.book.uniqueId !== uniqueId));
    } catch (error) {
      console.log('Error retrieving book:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} style={{ paddingTop: '80px', backgroundColor: '#F5F5DC', opacity: 0.9 }}>
      <Table sx={{ minWidth: 650 }} aria-label="rented books table">
        <TableHead>
          <TableRow>
            <TableCell>Book Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentedBooks.map(({ book, user }) => (
            <TableRow key={book.uniqueId}>
              <TableCell>
                <img src={book.imageUrl} alt={book.title} style={{ width: '100px', height: 'auto' }} />
              </TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{user ? user.user_email : 'Unknown'}</TableCell>
              <TableCell>
                <Button color="inherit" style={{ color: 'white', marginLeft: '5px', backgroundColor: '#654321' }} onClick={() => handleRetrieve(book.uniqueId)}>
                  Retrieve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Arentedbook;
