const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.getAllUsers = async (req,res) => {
    try {
  
      const users = await pool.query("SELECT * FROM users;");
      res.status(201).send(users.rows);
    } catch (error) {
      res.status(500).send(error.message);
  
    }
  };

exports.getUserById = async (req,res) => {
    const userId = req.params.userId;

  try {
    const userDet = await pool.query('SELECT user_name,user_address,user_email FROM users WHERE user_id = $1', [userId]);
    res.json(userDet.rows);
  } catch (error) {
    return res.status(404).send("User not found");

  }
  };

  exports.signup = async (req, res) => {
    try {
      const { user_name, user_email, user_address , password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      // res.status(200).send({user_name, user_email, user_address , password });
      const query = 'INSERT INTO users (user_name, user_email, user_address,password) VALUES ($1, $2, $3, $4) RETURNING *';
      const { rows } = await pool.query(query, [user_name, user_email, user_address,hashedPassword]);
      res.status(201).json({ message: 'User created successfully', user: rows[0] });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', message:error });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { user_name, password } = req.body;
      const query = 'SELECT * FROM users WHERE user_name = $1';
      const { rows } = await pool.query(query, [user_name]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' ,row0:rows[0]});
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };