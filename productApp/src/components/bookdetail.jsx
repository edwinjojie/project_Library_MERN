import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useAuth } from '../authcontext';

const BookDetail = () => {
  const {uniqueId} = useParams();
  const [book, setBook] = useState(null);
  const {user}=useAuth();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(`http://localhost:4000/book/`+uniqueId);
        const response = await axios.get(`http://localhost:4000/book/`+uniqueId);
        console.log(response.data);
        setBook(response.data);
        console.log(book);
      } catch (error) {
        console.log('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [uniqueId]);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }
  const handleRent = () => {
    // Handle the rent action
    console.alert('Renting book:', book.title);
  };
  return (
    
      <Box
        sx={{
          display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        textAlign: 'left',
          backgroundColor:'white',
          mt: 2, // Margin top to separate from the image
          width: '100%', // Ensure the details take up full width
          maxWidth: 1000, // Optionally limit max width
          opacity:0.9,
          paddingLeft:'0px'
        }}
      ><img 
      component="img"
      height="400"
      image={book.imageUrl || 'https://via.placeholder.com/150'}
      alt={book.title}
      sx={{ width: '100%', objectFit: 'cover' }} // Make image fill the width of the container
    ></img>
        <Typography variant="h4">{book.title}</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>Author: {book.author}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Publication Year: {book.publicationYear}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Genre: {book.genre}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>ISBN: {book.isbn}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{book.available ? 'Available' : 'Not Available'}</Typography>
        {user && (
          <Button variant="contained" color="black" onClick={handleRent} sx={{ mt: 2 }}>
            Rent
          </Button>
        )}
      </Box>
  
  );
};
export default BookDetail;
