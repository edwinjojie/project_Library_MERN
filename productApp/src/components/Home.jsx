import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {//this is because await cant be given directly but has to be mentioned in a function before getting invoked
      try {
        const response = await axios.get('http://localhost:4000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.uniqueId}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' , borderRadius:5 , marginTop:'10%' }}>
            <Link  to={`/book/`+book.uniqueId} >
              <CardMedia
                component="img"
                image={book.imageUrl || 'https://via.placeholder.com/150'}
                alt={book.title}
                height="200"
              />
              <CardContent >
                <Typography variant="h5">{book.title}</Typography>
                <Typography variant="body2"
                 sx={{textAlign:'left',padding:'5px',color:'black'}}>Author: {book.author}</Typography>
                <Typography variant="body2"
                sx={{textAlign:'left',padding:'5px',color:'black'}}>Year: {book.publicationYear}</Typography>
              </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Home;