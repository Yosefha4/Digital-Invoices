const jwt = require('jsonwebtoken');


exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('User:', req.headers); // Check if user data is correctly attached to the request

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  };