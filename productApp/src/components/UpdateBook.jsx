import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    uniqueId: '',
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    isbn: '',
    imageUrl: '',
    available: true
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/${id}`);
        setForm(response.data);
      } catch (error) {
        console.log('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/updatebook/${id}`, form);
      console.log(res.data);
      alert('Successfully updated the book');
      navigate(`/book/${form.uniqueId}`);
    } catch (e) {
      alert('Error occurred in updating the book');
      console.log(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: '600px', width: '100%' }}>
        <Typography variant="h4" style={{ color: '#3B5323', fontFamily: 'Georgia' }} gutterBottom>
          Update Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Book Id"
                name="uniqueId"
                value={form.uniqueId}
                onChange={handleChange}
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publication Year"
                name="publicationYear"
                value={form.publicationYear}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ISBN"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Available"
                name="available"
                value={form.available}
                onChange={handleChange}
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond' }}
                fullWidth
              >
                Update Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateBook;
