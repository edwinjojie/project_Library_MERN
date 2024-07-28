import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AddBook = () => {
  const [form, setForm] = useState({
    uniqueId: '',
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    isbn: '',
    imageUrl: '',
    available: true,
    summary:'',
    likes:0
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/addbook', form);
      console.log(res.data);
      alert('Successfully added the book');
     // navigate('/books'); // Adjust the route as needed
    } catch (e) {
      alert('Error occurred in adding the book');
      console.log(e);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, maxWidth: 600, marginTop: '20px' ,opacity:0.9}}>
        <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'black', textAlign: 'center' }} gutterBottom>
          Add Book
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="uniqueId"
              label="Unique ID"
              variant="outlined"
              name="uniqueId"
              value={form.uniqueId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="author"
              label="Author"
              variant="outlined"
              name="author"
              value={form.author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="publicationYear"
              label="Publication Year"
              variant="outlined"
              name="publicationYear"
              value={form.publicationYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="genre"
              label="Genre"
              variant="outlined"
              name="genre"
              value={form.genre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="isbn"
              label="ISBN"
              variant="outlined"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="imageUrl"
              label="Image URL"
              variant="outlined"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="summary"
              label="Summary"
              variant="outlined"
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" style={{color: 'white', marginLeft:'5px' ,backgroundColor: '#654321'}} onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
