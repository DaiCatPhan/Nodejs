const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');

router.get('/student',UserController.user);

module.exports = router;