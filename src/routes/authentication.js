const express = require('express');
const router = express.Router();

const authentication = require('../app/controllers/AuthenticationController');

// newsController.index;
// signin đang ký tài khoản
router.post('/register/stores', authentication.register_stores); 
router.get('/register', authentication.register);  

// đăng nhập tài khoản 
router.post('/login/stores', authentication.login_stores ); 
router.get('/login', authentication.login); 

// Đăng xuất logout
router.get('/logout/stores', authentication.checkLogout ); 


// phân trang student , teacher
router.get('/student', authentication.checkLogin,authentication.checkStudent_teacher , authentication.get_student_second);  
router.get('/teacher', authentication.checkLogin,authentication.checkTeacher , authentication.  get_teacher_second); 

// phân trang teacher
router.get('/teacher/edit',authentication.edit);
router.put('/teacher/:id',authentication.point); 



module.exports = router; 