const Course = require('../models/Course') 
const { mongooseToObject } = require('../../util/mongoose') // chỉ là 1 khóa học , 1 document nên dùng mongoseToObject còn cái kia là 1 list

class CourseController {
    // Get courses : slug
    show(req,res,next){
        Course.findOne({ slug: req.params.slug }) // lấy slug của :slug bên routes/course.js
        .then(course => {
            res.render('courses/show' ,{
             course: mongooseToObject(course) 
            }) 
        })  
        .catch(next);
    }

    // create
    create(req,res,next){
        res.render('courses/create')
    }

    //POST /courses/store
    store(req,res,next){
        const formData = req.body;
        const course = new Course(formData);
        course.save()  // lưu dữ liệu vào database. Phải coi trong models/Course phải có tất cả mấy trường này 
        .then(()=> res.redirect('/')) // chuyển hướng website trên sever 
        .catch(error => {
            
        })
    } 

    // GET  /courses/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
            .then(course =>  res.render('courses/edit',{
                course : mongooseToObject(course)
            }))
    }
     // PUT  /courses/:id
    update(req,res,next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next)
    }

     // DELETE  /courses/:id
    destroy(req,res,next){
        Course.deleteOne({_id: req.params.id}) // id là điều kiện để xóa
            .then(()=> res.redirect('back')) // redirect la chuyen huong 
            .catch(next)
    }


} 

module.exports = new CourseController(); 
