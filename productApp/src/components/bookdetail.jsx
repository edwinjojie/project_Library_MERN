import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Button, IconButton, TextField } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useAuth } from '../authcontext';

const BookDetail = () => {
  const { uniqueId } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/` + uniqueId);
        setBook(response.data);
      } catch (error) {
        console.log('Error fetching book:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/${uniqueId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    };

    fetchBook();
    fetchComments();
  }, [uniqueId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/book/${uniqueId}/like`);
      setBook(response.data);
    } catch (error) {
      console.log('Error liking book:', error);
    }
  };

  const handleRent = async () => {
    if (book.available) {
      const updatedBook = { ...book, reciever: user.user_email, available: false };
      setBook(updatedBook);
      try {
        const response = await axios.put(`http://localhost:4000/updatebook/${book._id}`, updatedBook);
        console.log(response.data);
      } catch (error) {
        console.log('Error updating book:', error);
      }
    } else {
      alert('Book has been already rented.');
    }
  };

  const handleReturn = async () => {
    if (!book.available) {
      const updatedBook = { ...book, reciever: '', available: true };
      setBook(updatedBook);
      try {
        const response = await axios.put(`http://localhost:4000/updatebook/${book._id}`, updatedBook);
        console.log(response.data);
      } catch (error) {
        console.log('Error updating book:', error);
      }
    } else {
      alert('Book has not been rented.');
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/removebook/` + book._id);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  };

  const handleDelete = () => {
    if (book.available) {
      deleteBook();
    } else {
      alert('Book has been rented, cannot delete until the user returns the book');
    }
  };

  const handleUpdate = () => {
    navigate(`/updatebook/${book._id}`, { state: { book } });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(`http://localhost:4000/book/${uniqueId}/comment`, {
          user_email: user.user_email,
          text: newComment,
        });
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.log('Error adding comment:', error);
      }
    }
  };

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          minHeight: '100vh',
          p: 2,
          textAlign: 'left',
          backgroundColor: 'white',
          mt: 2,
          width: '100%',
          maxWidth: 1200,
          opacity: 0.9,
          gap: 2,
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        <CardMedia
          component="img"
          height="600"
          image={book.imageUrl}
          alt={book.title}
          sx={{ width: 'auto', objectFit: 'cover' }}
        />
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4" style={{ color: '#3B5323', fontWeight: 'bold', fontFamily: 'Georgia' }} sx={{ mt: 1 }}>{book.title}</Typography>
          <Typography variant="h6" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>Author: {book.author}</Typography>
          <Typography variant="body1" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>Publication Year: {book.publicationYear}</Typography>
          <Typography variant="body1" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>Genre: {book.genre}</Typography>
          <Typography variant="body1" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>ISBN: {book.isbn}</Typography>
          <Typography variant="body1" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>{book.available ? 'Available' : 'Not Available'}</Typography>
          <Typography variant="body1" style={{ color: '#3B5323', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 1 }}>Likes: {book.likes}</Typography>
          
          {user && user.user_type !== 'Admin' && (
            <>
              <IconButton onClick={handleLike}>
                <Favorite style={{ color: 'red' }} />
              </IconButton>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleRent} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
                  Rent
                </Button>
              </Box>
            </>
          )}
          {user && book.reciever === user.user_email && (
            <Button variant="contained" onClick={handleReturn} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
              Return
            </Button>
          )}
          {user && user.user_type === 'Admin' && (
            <>
              <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
                Delete
              </Button>
              <Button variant="contained" onClick={handleUpdate} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2, ml: 2 }}>
                Update
              </Button>
            </>
          )}
          {user && user.user_type !== 'Admin' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" style={{ color: '#3B5323', fontFamily: 'Georgia', fontWeight: 'bold' }}>Comments</Typography>
              {comments.map((comment, index) => (
                <Typography key={index} variant="body1" style={{ fontFamily: 'Garamond', color: '#3B5323', fontWeight: 'bold' }} sx={{ mt: 1 }}>
                  {comment.text} - <i>{comment.user_email}</i>
                </Typography>
              ))}
              <TextField
                fullWidth
                multiline
                rows={3}
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleAddComment}
                style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }}
                sx={{ mt: 2 }}
              >
                Post Comment
              </Button>
            </Box>
          )}
          <Typography variant="h5" style={{ color: '#3B5323', fontFamily: 'Georgia', fontWeight: 'bold' }} sx={{ mt: 2 }}>⁘ Summary ⁘</Typography>
          <Typography variant="body1" style={{ fontFamily: 'Garamond', color: '#3B5323', fontWeight: 'bold' }} sx={{ mt: 1 }}>
            {book.summary}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default BookDetail;
