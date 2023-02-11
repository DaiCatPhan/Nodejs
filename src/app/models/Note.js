const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

// phải cài ipm i mongoose-slug-genertor --save để cái slug nó k bị trùng và tự động cập nhật
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Note = new Schema({ 
  thongbao: { type: String },
  slug: { type: String, slug: 'thongbao', unique: true }, // unique là chỉ tồn tại 1 cái slug thôi , k trùng nhau á
},{
  timestamps: true,  
  collection:'thongbao',
})

module.exports =  mongoose.model('thongbao', Note);    