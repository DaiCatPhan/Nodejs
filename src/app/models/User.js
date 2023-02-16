const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

// phải cài ipm i mongoose-slug-genertor --save để cái slug nó k bị trùng và tự động cập nhật
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema({ 
  mssv: { type: String },
  email: {type: String },
  pass: {type: String },
  age: {type: String },
  ten: {type: String },
  file: {type: Object },
  role:{type : String},
  point: {type: Number},
  slug: { type: String, slug: 'email', unique: true }, // unique là chỉ tồn tại 1 cái slug thôi , k trùng nhau á
},{
  timestamps: true,  
  collection:'users',
})

module.exports =  mongoose.model('users', User);   