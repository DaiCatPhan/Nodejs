const Course = require('../models/Course') 
const User = require('../models/User') 
const Note = require('../models/Note') 
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class UploadController {
    
    createNewBook(req , res , next ) {
        var fileData = req.file
        var image = fileData.path;

        User.findById(req.params.id)
            .then(data => {
                if(data){
                    User.updateOne({_id: req.params.id}, { $set : {image : image}})
                    .then(()=> res.redirect('back'))
                    .catch(next)
                }
            })
    }
}

module.exports = new UploadController();

