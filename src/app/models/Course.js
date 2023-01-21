const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String , maxLength: 255},
  description: {type: String , maxLength: 255},
  image: {type: String ,maxLength: 255},
  videoID: {type: String ,maxLength: 255},
  level: {type: String ,maxLength: 255},
  slug: { type: String, slug: 'name', unique: true },
},{
  timestamps: true, 
})

module.exports =  mongoose.model('Course', Course); 
// module.exports = mongoose.model("cource",Cource,"cource")