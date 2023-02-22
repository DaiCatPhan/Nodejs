const User = require('../models/User') 
const { mutipleMongooseToObject } = require('../../util/mongoose')

class UserController {
    // GET /search
    user(req, res,next) {
        res.render('user/student')
    }

    infouser(req, res,next) {
        res.render('search');
    }

}

module.exports = new UserController();
