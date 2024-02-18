const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes

//get user & invoice
  //get user id by name
app.get("/invoices", async (req,res) => {
  try {
    const {user_name} = req.body;
    if(user_name.length < 1 || !user_name){
      res.status(401).send("User not found")
    }

    const user = await pool.query("SELECT (user_id,user_address,user_email) FROM users WHERE user_name = $1;",[user_name]);
    res.status(201).send(user);
    console.log("Invoices get method !!!");
  } catch (error) {
    res.status(500).send(error.message);

  }
});

  //get all invoices by user_id
  app.get("/invoices/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      // Query the database to fetch all invoices for the specified user ID
      const invoices = await pool.query('SELECT * FROM invoices WHERE user_id = $1', [userId]);
  
      // Return the invoices as a response
      res.json(invoices.rows);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      res.status(500).send('Internal Server Error');
    }
  });



//create user & invoice
app.post("/invoices", async (req, res) => {
  try {
    const {
      user_name,
      invoice_number,
      invoice_date,
      total_amount,
    } = req.body;

    // Find user_id based on user_name and user_address
    const userResult = await pool.query( "SELECT * FROM users WHERE user_name = $1", [user_name]);

    // console.log(userResult)
    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    //Take the user_id from userResult
    const user_id = userResult.rows[0].user_id;

    // Insert new invoice into the database
    await pool.query("INSERT INTO invoices (user_id, invoice_number, invoice_date, total_amount) VALUES ($1, $2, $3, $4);", [
      user_id,
      invoice_number,
      invoice_date,
      total_amount,
    ]);

    res.status(201).send("Invoice added successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//update user & invoice

//delete user & invoice

app.listen(5002, () => {
  console.log("Server listen on port: 5002 !");
});


/*
-- Extracting the month
SELECT SUBSTRING(invoice_date FROM 6) AS month FROM invoices;

-- Extracting the year
SELECT SUBSTRING(invoice_date FROM 1 FOR 4) AS year FROM invoices;
*/