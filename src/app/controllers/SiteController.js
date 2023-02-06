const Course = require('../models/Course') 
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // GET /
    index(req, res,next) {
        // Nay la dung promise lay du lieu tu modal tra ve client
        Course.find({})
            .then(courses => { // courses là biến trả về all các document của Course
                res.render('home',{
                     courses: mutipleMongooseToObject(courses) // courses được truyền qua cho file home.hbs
                });
            })
            .catch(next ); 
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
