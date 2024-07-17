const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://edwinjojie04:edwin0507@cluster0.9jcfito.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
  console.log('db connected');
}).catch(()=>{
  console.log('error in connection');
  console.error();
})