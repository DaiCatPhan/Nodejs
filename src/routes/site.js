const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);

router.post('/note', siteController.thongbao);

router.get('/', siteController.index);

module.exports = router;
