const express = require('express');
const router = express.Router();
const NewsLetterController = require('../controllers/NewsLetterController');

router.post("/subscribe", NewsLetterController.subscribe);
router.get("/getAll",NewsLetterController.getAllEmail);


module.exports = router;
