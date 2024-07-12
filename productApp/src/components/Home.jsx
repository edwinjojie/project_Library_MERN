import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'

export const Home = () => {
    
    const books = [
        {
          id: 1,
          imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR9bzaSLBXmS1_KEdm8HjTvcLEv6eBm5qkKtT5fu6E74vmK-jhZ",
          title: "War and Peace",
          author: "Leo Tolstoy",
          rating: 8.1
        },
        {
          id: 2,
          imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/330px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          rating: 9.2
        },
        {
          id: 3,
          imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1kRj1nnXtv-dZUhSj2n_xUDvtQFf5MzNXXcZouIU1FU_hY4A",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          rating: 9.0
        },
        {
            id:4 ,
            imgSrc: "https://rukminim1.flixcart.com/image/800/800/regionalbooks/7/f/v/to-kill-a-mockingbird24-june-2010-special-edition-by-harper-lee-original-imaenkkqyadeswxe.jpeg?q=90",
            title: "To Kill a Mockingbird",
            author: " Harper Lee",
            rating:8.9
        },
        {
            id:5 ,
            imgSrc: "https://m.media-amazon.com/images/I/71574P+PUKL._SY466_.jpg",
            title: "Don Quixote",
            author: "Miguel de Cervantes",
            rating:8.8
        },
        {
            id: 6,
            imgSrc: "https://m.media-amazon.com/images/I/71xH0ALI4-L._AC_UF1000,1000_QL80_.jpg",
            title: "Ikigai",
            author: "Héctor García",
            rating: 9.2
          },
          {
            id: 7,
            imgSrc: "https://m.media-amazon.com/images/I/71RpzpolDVL._SL1500_.jpg",
            title: "A Long Walk To Water",
            author: "Linda Sue Park",
            rating: 9.7
          },
          {
            id: 8,
            imgSrc: "https://m.media-amazon.com/images/I/71H52+sSb4L._SY466_.jpg",
            title: "The Book Thief",
            author: " Markus Zusak",
            rating: 9.6
          },
          {
            id: 9,
            imgSrc: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTS-DmJW9L68XoajSNvY81h1Vq1ElNreTT1WP5pMj17qIFdNAl2X5FWWybJVbHpITDZxqqNHRRPrVJLfMB9mVQviOoPRVI4MoKkIkruGEUqzkv-9dIt4I4K&usqp=CAE",
            title: "The Trial",
            author: " Franz Kafka",
            rating: 9.8
          },
          {
            id: 10,
            imgSrc: "https://m.media-amazon.com/images/I/81F90H7hnML._SL1500_.jpg",
            title: "Atomic Habits",
            author: " James Clear",
            rating: 9.7
          },
          {
            id: 11,
            imgSrc: "https://m.media-amazon.com/images/I/81gIvYx3AuL._SY466_.jpg",
            title: "The Hike",
            author: "Lucy Clarke",
            rating: 9.4
          },
          {
            id: 12,
            imgSrc: "https://m.media-amazon.com/images/I/81XK3aweD8L._SY466_.jpg",
            title: "The Dressmaker’s Secret",
            author: " Lorna Cook",
            rating: 9.6
          }

      ];
    
      return (
        
        <Grid container spacing={2} sx={{marginTop:'10px'}}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ minWidth: 275, marginBottom: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150',width:'50' }}>
                <CardContent>
                  <img src={book.imgSrc} alt={book.title} width={"100"} height={"150"} />
                  <Typography variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {book.author}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                   Rating: {book.rating}
                 </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ mt: 2,color: '#654321'  }}>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    };
    
    export default Home;