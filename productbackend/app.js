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
//login
app.post('/loginuser',async(req,res)=>{
  try{
    console.log('e');
    const{identifier,password}=req.body;//identifier is either email or username
    console.log(password);
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
    console.log(req.params);
    const {identifier}= req.params;
    const data=await userschema.findOne({user_id:identifier});//data contain all the records of one users
    if(!data){
      await userschema.findOne({user_email:identifier});
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
    await userschema.findByIdAndUpdate(req.params.id,req.body);
    res.send('succesfully updated');
  } catch (error) {
    res.send('error in updation');
  }
});
//deleting method
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
    console.log('ee')
    const data=await bookschema.findOne({uniqueId:uniqueId});//data contain all the records of one book
    if (!data) {
       return res.status(404).send('book not found');
      }
      console.log(data);
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
//port initializing
app.listen(4000,()=>{
  console.log('server is running on port 4000');
});