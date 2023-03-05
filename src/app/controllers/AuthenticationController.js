const User = require('../models/User') 
const { mutipleMongooseToObject } = require('../../util/mongoose')

const { mongooseToObject } = require('../../util/mongoose') // chỉ là 1 khóa học , 1 document nên dùng mongoseToObject còn cái kia là 1 list
const jwt = require('jsonwebtoken');

class AuthenticationController {
    
    // GET /authentication/register
    register(req,res,next){
        res.render('authentication/register')
    }

    // // POST /register/stores  cách 1 : Của a Sơn Đặng
    // stores(req,res,next){
    //     const user = new User(req.body);
    //     user.save()  // lưu dữ liệu vào database. Phải coi trong models/Course phải có tất cả mấy trường này 
    //     .then(()=> res.redirect('/')) 
    //     .catch(error => {
            
    //     })
    // } 

//===========================================================================================================

    // POST /register/stores : form đăng ký , lưu dữ liệu vào database
    register_stores(req,res,next){
       var email = req.body.email;  // lấy dữ liệu mà form đưa lên của email
       var pass = req.body.pass;    // láy dữ liêu mà form đưa lên của pass

        User.findOne({
            email : email
        })
        .then(data =>{
            if(data){
                res.json("Tài khoản đã tồn tại !!!")
            }else{
                User.create({
                    email : email,  // tên biến : dữ liệu email của form nhập
                    pass : pass     // tên biến : dữ liệu pass của form nhập
                })
            }
        })

        .then(data =>{
            res.json("Tao tai khoan thanh cong nha ban") // nếu tạo thành công thì ...
       })

       .catch(err => {
            res.status(500).json("Tạo tài khoản  thất bại !!!") // nếu tạo thất bại thì
        })
    } 



    // ĐĂNG NHẬP

    // GET /authentication/login  khi bấm vài trang đăng nhập thì chuyển đến trang đăng nhạp
    login(req,res,next){
        res.render('authentication/login'); 
    }

    // POST /authentication/login/stores  kiểm tra đăng nhập và gởi token vào cookie
    login_stores(req,res,next){
        var email = req.body.email;
        var pass = req.body.pass;

        User.findOne({
            email : email,
            pass : pass
        })
        .then(data => { 
            if(data){
                var token = jwt.sign({
                    _id : data._id 
                },"mk")
                res.cookie('token', token);
                res.redirect('/authentication/student');
                // res.redirect('/');
            }else{
                res.status(500).json("Account không đúng");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json("Đăng nhập thất bại !!!") 
        })
    }


    // Check Login
    checkLogin(req , res , next){
        try{
            var token = req.cookies.token;
            var idUser = jwt.verify(token , 'mk');
            User.findOne({
                _id : idUser
            })
            .then(data => {
                if(data){
                    req.data = data;
                    next();
                }else{
                    res.json("Bạn không có quyền")
                }
            })
            .catch(err => {

            })
        }catch(err){
            res.status(500).json("Token k hop le");
        }
    }


    // check logout (đăng xuất )
    checkLogout(req , res , next){
        try{
            var token = req.cookies.token;
            var idUser = jwt.verify(token , 'mk');
            User.findOne({
                _id : idUser
            })
            .then(data => {
                if(data){
                    res.clearCookie('token');
                    res.redirect('/authentication/login');
                    res.end();
                    next();
                }
            })
            .catch(err => {

            })
        }catch(err){
            res.status(500).json("Bạn chưa đăng nhập");
        }
    }



    // check student 
    checkStudent(req, res , next){
        var role = req.data.role;
        if(req.data.role === 'student' || req.data.role === 'teacher'){
            next()
        }else{
            res.json("NOT PERMISSION");
        }
    }

    checkTeacher(req, res , next){
        var role = req.data.role;
        if(req.data.role === 'teacher'){
            next()
        }else{
            res.status(500).json("NOT PERMISSION"); 
        }
    }

    // Phân trang :
    
    get_student_second(req , res , next){  
        var data = req.data;
        res.render('user/student',{
            data : mongooseToObject(data)
        }) 
    }

    // GET authentication/teacher lấy những tài khoản mà k phải admin ra 
    get_teacher_second(req , res , next){
        User.find({
            "email": {$not:{$eq: "admin@gmail.com"}} // tìm những thằng có email không bằng : "admin@gmail.com"
        })
            .then(data => {
                res.render('user/admin',{
                    data: mutipleMongooseToObject(data) 
                })
            })
            .catch(err => {
                
            })
    }

    point(req , res , next){
        User.findById(req.params.id)
            .then(data => {
                if(data){
                    User.updateOne({_id: req.params.id}, req.body)
                    .then(()=> res.redirect('/authentication/teacher'))
                    .catch(next)
                }
            })
    }

    file(req , res , next){
        var file = req.body ;
        res.json(file)
        // User.findById(req.params.id)
        //     .then(data => {
        //         if(data){
        //             User.updateOne({_id: req.params.id}, req.body)
        //             // .then(()=> res.redirect('/authentication/student'))
        //             .then(()=> res.json(data))
        //             .catch(next)
        //         }
        //     })
    }



    edit(req , res , next ){
        User.find({
             "email": {$not:{$eq: "admin@gmail.com"}}
            })
            .then(data => {
                res.json(data)
            })
    }

} 



module.exports = new AuthenticationController(); 
