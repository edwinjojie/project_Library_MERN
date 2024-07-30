//initializing express
const express= require('express');
const app = new express();
//importing cors and schema for data
const cors = require('./node_modules/cors');
const userschema=require('./model/UserData');
const bookschema=require('./model/BookData');
//initiating middleware
app.use(express.json());//for handling json payload(res,req)
app.use(cors());//for handling  cross origin reqsts
//importing code for DB connection
require('./connection');
//const PORT=4000;
let rentedBooks = {};
//get all users
app.get('/users',async(req,res)=>{
  try{
    const data=await userschema.find();//data contain all the records of the all the users
    res.send(data);
  }
  catch{
    res.send('error found');
    console.error();
  }
});
app.get('/user/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userschema.findById(id);
    if (!data) {
      return res.status(404).send('User not found');
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user details');
  }
});
//login
app.post('/loginuser',async(req,res)=>{
  try{
    const{identifier,password}=req.body;//identifier is either email or username
   
    const user = await userschema.findOne({$or:[{user_id:identifier},{user_email:identifier}]})//$or is similiar to ||,but we cant use || directly in json
    if (!identifier || !password) {
      return res.status(400).send(' Username/email and password are required');
    }
    if(!user || user.user_password!==password)
    {
      return res.status(401).send('Invalid username/email or Incorrect password')
    }
    res.send(user);
  }
  catch(error){
    console.log(error);
    res.status(500).send('error occured in db');
  }
})
//get details by username or email
app.get('/user/:identifier',async(req,res)=>{
  try{
    const {identifier}= req.params;
    const data=await userschema.findOne({user_id:identifier});//data contain all the records of one users
    console.log(data);
    if(!data){
      data = await userschema.findOne({user_email:identifier});
    }
    if (!data) {
      return res.status(404).send('User not found');
    }
    res.send(data);
  }
  catch{
    res.send('error found');
    console.error();
  }
});
//post user data
app.post('/adduser',async(req,res)=>{
  try {
    var item = req.body;//not in order,in json ,make no sense to db
    const data= new userschema(item);//in specified schema format
    await data.save();
    res.send(data);
  } catch (error) {
    
    res.send(error);
  }
});
//put method(updating)
app.put('/updateuser/:id',async(req,res)=>{
  try {
    const data = await userschema.findByIdAndUpdate(req.params.id,req.body);
    res.send(data);
  } catch (error) {
    res.send('error in updation');
  }
});
//deleting user
app.delete('/removeuser/:id',async(req,res)=>{
  try{
    await userschema.findByIdAndDelete(req.params.id);
    res.send('successfully delted');
  }catch(e){
    res.send('error in deletion')
  }
});
//BOOKS
//get all books
app.get('/books',async(req,res)=>{
  try{
    const data=await bookschema.find();//data contain all the records of the all the books
    res.send(data);
  }
  catch{
    res.send('error found');
    console.error();
  }
});
//get book by id
app.get('/book/:uniqueId',async(req,res)=>{
  try{
    const {uniqueId}=req.params;
    console.log(uniqueId);
    const data=await bookschema.findOne({uniqueId:uniqueId});//data contain all the records of one book
    if (!data) {
       return res.status(404).send('book not found');
      }
    res.send(data);  
    }
  catch(error){
    console.log(error);
    res.send('error found'+error);
    }
});
//posting books
app.post('/addbook',async(req,res)=>{
  try {
    var item = req.body;//not in order,in json ,make no sense to db
    const data= new bookschema(item);//in specified schema format
    await data.save();
    console.log('success');
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//updating book
app.put('/updatebook/:id',async(req,res)=>{
  try {
    const data= await bookschema.findByIdAndUpdate(req.params.id,req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//deleting book
app.delete('/removebook/:id',async(req,res)=>{
  try{
    await bookschema.findByIdAndDelete(req.params.id);
    res.send('successfully deleted');
  }catch(e){
    res.send('error in deletion')
  }
});
// rent book
app.post('/rentbook/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { userId } = req.body;
    const book = await bookschema.findOne({ uniqueId });

    if (!book) {
      return res.status(404).send('Book not found');
    }
    if (!book.available) {
      return res.status(400).send('Book is already rented');
    }

    book.available = false;
    await book.save();
    rentedBooks[uniqueId] = userId;

    res.send('Book rented successfully');
  } catch (error) {
    res.status(500).send('Error renting book: ' + error.message);
  }
});

// Retrieve a book
app.post('/retrievebook/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const book = await bookschema.findOne({ uniqueId });

    if (!book) {
      return res.status(404).send('Book not found');
    }
    if (book.available) {
      return res.status(400).send('Book is already available');
    }

    book.available = true;
    await book.save();
    delete rentedBooks[uniqueId];

    res.send('Book retrieved successfully');
  } catch (error) {
    res.status(500).send('Error retrieving book: ' + error.message);
  }
});


// Get all rented books with user details
app.get('/rentedbooks', async (req, res) => {
  try {
    // Find books that are not available (rented)
    const books = await bookschema.find({ available: false });
    console.log(books);
    // If no books are found, send an empty array immediately
    if (books.length === 0) {
      return res.send([]);
    }

    // Fetch user details for each rented book using the receiver's email
    const rentedBooksWithUsers = await Promise.all(
      books.map(async (book) => {
        const user = await userschema.findOne({ user_email: book.reciever });
        return { book, user };
      })
    );

    // Send the fetched rented books along with user details
    res.send(rentedBooksWithUsers);
  } catch (error) {
    // Log the error and send a response with status 500
    console.error('Error fetching rented books:', error);
    res.status(500).send('Error fetching rented books: ' + error.message);
  }
});
// Like a book
app.post('/book/:uniqueId/like', async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const book = await bookschema.findOne({ uniqueId });

    if (!book) {
      return res.status(404).send('Book not found');
    }

    book.likes += 1;
    await book.save();

    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error liking book: ' + error.message);
  }
});
//port initializing
app.listen(4000,()=>{
  console.log('server is running on port 4000');
});