const User = require('../models/User') 
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
                res.cookie('token', token)
                // res.json("Dang nhap thanh cong")
                res.redirect('/');
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
        res.render('user/student') 
    }

    get_teacher_second(req , res , next){
        res.render('user/admin') 
    }

    home(req , res , next){
        res.render('/');
    }



} 



module.exports = new AuthenticationController(); 
