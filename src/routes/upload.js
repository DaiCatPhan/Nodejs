const express = require('express');
const router = express.Router();

const uploadCloud = require('../app/middlewares/uploader_img');
const UploadController = require('../app/controllers/UploadController');

router.put('/:id',uploadCloud.single('image') , UploadController.createNewBook); 
module.exports = router;  