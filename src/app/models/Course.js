const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

// phải cài ipm i mongoose-slug-genertor --save để cái slug nó k bị trùng và tự động cập nhật
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String , maxLength: 255},
  description: {type: String },
  image: {type: String },
  videoID: {type: String },
  level: {type: String ,maxLength: 255},
  slug: { type: String, slug: 'name', unique: true }, // unique là chỉ tồn tại 1 cái slug thôi , k trùng nhau á
},{
  timestamps: true, 
})

module.exports =  mongoose.model('Course', Course); 