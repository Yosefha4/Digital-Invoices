const express = require('express');
const router = express.Router();
const UserControl = require('../controllers/UserController')
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', UserControl.getAllUsers);
router.get('/userDetails/:userId', UserControl.getUserById);

// auth routes
router.post("/signup",UserControl.signup)
router.post("/login",UserControl.login)
router.get("/checkAuth",UserControl.checkAuth)

// router.get('/profile', authenticateToken, (req, res) => {
//     console.log('User:', req.user); // Check if user data is correctly attached to the request

//     res.json(req.user);
//   });

module.exports = router;
