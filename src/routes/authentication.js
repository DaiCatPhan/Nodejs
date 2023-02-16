const express = require('express');
const router = express.Router();

const authentication = require('../app/controllers/AuthenticationController');

// newsController.index;
router.post('/register/stores', authentication.register_stores); 
router.get('/register', authentication.register);  

router.post('/login/stores', authentication.login_stores ); 
router.get('/login', authentication.login); 


router.get('/student', authentication.checkLogin,authentication.checkStudent , authentication.get_student_second);  
router.get('/teacher', authentication.checkLogin,authentication.checkTeacher , authentication.get_teacher_second); 

router.get('/teacher/edit',authentication.edit);
router.put('/teacher/:id',authentication.point); 



module.exports = router; 