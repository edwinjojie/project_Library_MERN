//initializing express
const express= require('express');
const app = new express();
//importing cors and schema for data
const cors = require('./node_modules/cors');
const schema=require('./model/UserData');
//initiating middleware
app.use(express.json());//for handling json payload(res,req)
app.use(cors());//for handling  cross origin reqsts
//importing code for DB connection
require('./connection');
const PORT=3000;
//get method
app.get('/users',async(req,res)=>{
  try{
    const data=await schema.find();//data contain all the records of the all the users
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
    const{identifier,password}=req.body;//identifier is either email or username
    const user = await schema.findOne({$or:[{user_id:identifier},{user_email:identifier}]})//$or is similiar to ||,but we cant use || directly in json
    if (!identifier || !password) {
      return res.status(400).send(' Username/email and password are required');
    }
    if(!user || user_password!==password)
    {
      return res.status(401).send('Invalid username/email or Incorrect password')
    }
    res.send('login successful',user);
  }
  catch(error){
    res.status(500).send('error occured in db');
    console.error(error);
  }
})
//get details by username or email
app.get('/user/:identifier',async(req,res)=>{
  try{
    const {identifier}= req.params;
    const data=await schema.findOne({user_id:identifier});//data contain all the records of one users
    if(!data){
      await schema.findOne({user_email:identifier});
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
//post method
app.post('/adduser',async(req,res)=>{
  try {
    var item = req.body;//not in order,in json ,make no sense to db
    const data= new schema(item);//in specified schema format
    await data.save();
    res.send('post successfull');
  } catch (error) {
    res.send('post failed');
  }
});
//put method(updating)
app.put('/updateuser/:id',async(req,res)=>{
  try {
    await schema.findByIdAndUpdate(req.params.id,req.body);
    res.send('succesfully updated');
  } catch (error) {
    res.send('error in updation');
  }
});
//deleting method
app.delete('/removeuser/:id',async(req,res)=>{
  try{
    await schema.findByIdAndDelete(req.params.id);
    res.send('successfully delted');
  }catch(e){
    res.send('error in deletion')
  }
});
//port initializing
app.listen(4000,()=>{
  console.log('server is running on port 4000');
});