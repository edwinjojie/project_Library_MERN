import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useAuth } from '../authcontext';

const BookDetail = () => {
  const {uniqueId} = useParams();
  const [book, setBook] = useState();
  const {user}=useAuth();
  const navigate=useNavigate();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/`+uniqueId);
        setBook(response.data);
      } catch (error) {
        console.log('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [uniqueId]);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }
  const handleRent = async () => {
    if (book.available) {
      // Update the book object
      const updatedBook = { ...book, reciever: user.user_email, available: false };
      setBook(updatedBook);
      console.log(updatedBook);
  
      try {
        const response = await axios.put(`http://localhost:4000/updatebook/${book._id}`, updatedBook);
        //setBook(response.data); // Update the local state with the updated book data
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
      // Update the book object
      const updatedBook = { ...book, reciever: '', available: true };
      setBook(updatedBook);
  
      try {
        const response = await axios.put(`http://localhost:4000/updatebook/${book._id}`, updatedBook);
        //setBook(response.data); // Update the local state with the updated book data
        console.log(response.data);
      } catch (error) {
        console.log('Error updating book:', error);
      }
    } else {
      alert('Book has not been rented.');
    }
  };  
  const deleteBook=()=>{
    try {
      console.log('ee');
      const response = axios.delete(`http://localhost:4000/removebook/`+book._id);
      console.log(response);//--
      navigate("/");
    } catch (error) {
      console.log('Error fetching book:', error);
    }
    console.log( book);//--
  }
  const handleDelete=()=>{
    {book.available?(
      deleteBook()
        ):(alert('Book has been rented, cannot delete until the user returns the book'))};
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
          {user && (user.user_type !== 'Admin') && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleRent} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
                Rent
              </Button>
            </Box>
          )}
          {user && (book.reciever === user.user_email) && (
            <Button variant="contained" onClick={handleReturn} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
              Return
            </Button>
          )}
          {user && (user.user_type === 'Admin') && (
            <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond', fontWeight: 'bold' }} sx={{ mt: 2 }}>
              Delete
            </Button>
          )}
          <Typography variant="h5" style={{ color: '#3B5323', fontFamily: 'Georgia', fontWeight: 'bold' }} sx={{ mt: 2 }}>⁘ Summary ⁘</Typography>
          <Typography variant="body1" style={{ fontFamily: 'Garamond', color: '#3B5323', fontWeight: 'bold' }} sx={{ mt: 1 }}>
            The story is narrated by Hazel Grace Lancaster, a 16-year-old girl with thyroid cancer that has affected her lungs. Hazel is forced by her parents to attend a support group where she subsequently meets and falls in love with 17-year-old Augustus Waters, an ex-basketball player, amputee, and survivor of osteosarcoma.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
//   return (
//     <Card
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       minHeight: '100vh',
//       p: 2,
//       textAlign: 'left',
//       backgroundColor: 'white',
//       mt: 2,
//       width: '100%',
//       maxWidth: 1200,
//       opacity: 0.9,
//       gap: 2,
//       paddingLeft: '10px',
//       paddingRight: '10px',
//     }}
//   >
//     <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
//       <CardMedia sx={{ flex: 1 }}>
//         <img
//           component="img"
//           height="400"
//           src={book.imageUrl}
//           alt={book.title}
//           style={{ width: '100%', objectFit: 'cover' }} // Make image fill the width of the container
//         />
//       </CardMedia>
//       <Box sx={{ flex: 1, p: 2 }}>
//         <Typography variant="h4" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Georgia' }}>{book.title}</Typography>
//         <Typography variant="h6" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}>Author: {book.author}</Typography>
//         <Typography variant="body1" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}>Publication Year: {book.publicationYear}</Typography>
//         <Typography variant="body1" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}>Genre: {book.genre}</Typography>
//         <Typography variant="body1" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}>ISBN: {book.isbn}</Typography>
//         <Typography variant="body1" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}>{book.available ? 'Available' : 'Not Available'}</Typography>
//       </Box>
//     </Box>
//     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
//       {user && (user.user_type !== 'Admin') && (
//         <Button variant="contained" onClick={handleRent} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond' }}>
//           Rent
//         </Button>
//       )}
//       {user && (book.reciever === user.user_email) && (
//         <Button variant="contained" onClick={handleReturn} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond' }}>
//           Return
//         </Button>
//       )}
//       {user && (user.user_type === 'Admin') && (
//         <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: "#E97451", color: 'white', fontFamily: 'Garamond' }}>
//           Delete
//         </Button>
//       )}
//     </Box>
//     <Typography variant="h6" style={{ color: '#3B5323' }} sx={{ mt: 1, fontFamily: 'Garamond' }}> </Typography>
//     <Typography variant="h5" style={{ color: '#3B5323', fontFamily: 'Georgia' }} sx={{ mt: 1 }}>⁘ Summary ⁘ </Typography>
//     <Typography style={{ fontFamily: 'Georgia', color: '#3B5323' }}>{book.summary}</Typography>
//   </Card>
//     //   <Card
//     //   sx={{
//     //     display: 'flex',
//     //   flexDirection: 'row',//this
//     //   justifyContent: 'center',//this
//     //   alignItems: 'flex-start',//this
//     //   minHeight: '100vh',
//     //   p: 2,
//     //   textAlign: 'left',
//     //     backgroundColor:'white',
//     //     mt: 2, 
//     //     width: '100%', 
//     //     maxWidth: 1200, // this
//     //     opacity:0.9,//this
//     //     gap: 2,
//     //     paddingLeft:'10px',//this
//     //     paddingRight:'10px'//this
//     //   }}
//     //   >
//     //     <CardMedia>
//     //       <img 
//     //   component="img"
//     //   height="400"
//     //   image={book.imageUrl}
//     //   alt={book.title}
//     //   sx={{ width: '100%', objectFit: 'cover' }} // Make image fill the width of the container
//     // ></img>
//     // </CardMedia>
//     // <Box sx={{ flex: 1, p:2}}> 
//     //     <Typography variant="h4" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Georgia' }}>{book.title}</Typography>
//     //     <Typography variant="h6" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Author: {book.author}</Typography>
//     //     <Typography variant="body1" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Publication Year: {book.publicationYear}</Typography>
//     //     <Typography variant="body1" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Genre: {book.genre}</Typography>
//     //     <Typography variant="body1" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>ISBN: {book.isbn}</Typography>
//     //     <Typography variant="body1" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>{book.available ? 'Available' : 'Not Available'}</Typography>
//     //     {user && (user.user_type!='Admin')&&(
//     //       <Box sx={{ display: 'flex',gap:2}}>
//     //       <Button variant="contained" onClick={handleRent} style={{backgroundColor:"#E97451",color:'white', fontFamily:'Garamond'}} sx={{ mt: 2 }}>
//     //         Rent
//     //       </Button>
//     //       </Box>
//     //     )}
//     //      {  user &&
//     //         ([book.reciever]==user.user_email)&&
//     //         (
//     //           <Button variant="contained" onClick={handleReturn} style={{backgroundColor:"#E97451",color:'white', fontFamily:'Garamond'}} sx={{ mt: 2 }}>
//     //              Return
//     //           </Button>
//     //         )
//     //       }
//     //     {user && (user.user_type=='Admin')&&(
//     //       <Button variant="contained" onClick={handleDelete} style={{backgroundColor:"#E97451",color:'white', fontFamily:'Garamond'}} sx={{ mt: 2 }}>
//     //          Delete
//     //       </Button>
          
//     //     )}
//     //     </Box>
//     //     <Typography variant="h6" style={{color: '#3B5323'}} sx={{ mt: 1,fontFamily:'Garamond' }}> </Typography>
//     //     <Typography variant="h5" style={{color: '#3B5323', fontFamily: 'Georgia'}} sx={{ mt: 1 }}>⁘ Summary ⁘ </Typography>
//     //     <p style={{fontFamily:'Gerogia', color: '#3B5323' }}>The story is narrated by Hazel Grace Lancaster, a 16-year-old girl with thyroid cancer that has affected her lungs. Hazel is forced by her parents to attend a support group where she subsequently meets and falls in love with 17-year-old Augustus Waters, an ex-basketball player, amputee, and survivor of osteosarcoma.</p>
     
//     //   </Card>
  
// );
};
export default BookDetail;
