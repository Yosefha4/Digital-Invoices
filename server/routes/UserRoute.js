const express = require('express');
const router = express.Router();
const UserControl = require('../controllers/UserController')

router.get('/', UserControl.getAllUsers);
router.get('/userDetails/:userId', UserControl.getUserById);

module.exports = router;
