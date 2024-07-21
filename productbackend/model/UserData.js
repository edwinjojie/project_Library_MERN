const mongoose = require('mongoose');
const userSchema=mongoose.Schema(
  {
    user_name:String,
    user_id:String,
    user_password:String,
    user_email:String,
    user_place:String,
    user_age:Number,
    user_phno:Number,
    user_gender:{
      type:String,
      enum:['Male','Female','Others'],
      required:true
    },
    user_type:{
      type:String,
      enum:['Admin','user']
    }
  }
);
module.exports = mongoose.model('userDetail',userSchema);