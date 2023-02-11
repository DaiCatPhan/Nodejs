const Course = require('../models/Course') 
const Note = require('../models/Note') 
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class SiteController {
    // GET /
    // index(req, res,next) {
    //     // Nay la dung promise lay du lieu tu modal tra ve client
    //     Course.find({})
    //         .then(courses => { 
    //             res.render('home',{
    //                  courses: mutipleMongooseToObject(courses) 
    //             });
    //         })
    //         .catch(next ); 
    // } 
    index(req, res,next) {
        // Nay la dung promise lay du lieu tu modal tra ve client
        Note.find({})
            .then(notes => { 
                res.render('home',{
                    notes: mutipleMongooseToObject(notes) 
                });
            })
            .catch(next ); 
    } 

    thongbao(req , res , next){
        // const thongbao = req.body.thongbao;
        const form_note = req.body;
        const note = new Note(form_note);
        note.save()  // lưu dữ liệu vào database. Phải coi trong models/Course phải có tất cả mấy trường này 
            .then(data => {
                // res.json("Luu thanh cong cmn")
                // res.json(note)
                res.redirect("/");
            })
            .catch(error => {
                
            })
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
