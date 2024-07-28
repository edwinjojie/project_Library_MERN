const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: false,  // Set to true if you want this field to be mandatory
  },
  available: {
    type: Boolean,
    default: true,
  },
  reciever:{
    type:String,
    default:''
    },
    summary:{
      type:String,
      default:''
      } ,
    likes: { type: Number, default: 0 }

})
module.exports = mongoose.model('book',bookSchema);