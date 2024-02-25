const pool = require("../db");


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