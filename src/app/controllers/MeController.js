const Course = require('../models/Course');
const Note = require('../models/Note') 

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose')



class MeController{
    storedCourses(req , res  ,next){
        Note.find({})
        .then(notes => res.render('me/stored-courses',{
            notes : mutipleMongooseToObject(notes)
        }))
        .catch(next)
    }
}

module.exports = new MeController();
