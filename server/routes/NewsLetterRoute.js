const express = require('express');
const router = express.Router();
const NewsLetterController = require('../controllers/NewsLetterController');

router.post("/subs", NewsLetterController.subscribe);

module.exports = router;
