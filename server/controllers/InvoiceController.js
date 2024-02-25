const pool = require("../db");

exports.getInvoice = async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await pool.query("SELECT * FROM invoices WHERE invoice_id = $1",[invoiceId]);
    res.status(201).send(invoice.rows);
    // console.log("Invoices get method !!!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getAllInvoices = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM invoices;");
    res.status(201).send(users.rows);
    // console.log("Invoices get method !!!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getInvoicesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Query the database to fetch all invoices for the specified user ID
    const invoices = await pool.query(
      "SELECT * FROM invoices WHERE user_id = $1",
      [userId]
    );

    // Return the invoices as a response
    res.json(invoices.rows);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addNewInvoice = async (req, res) => {
  try {
    const { user_name, invoice_number, invoice_date, total_amount } = req.body;

    // Find user_id based on user_name and user_address
    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [user_name]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    // Check if invoice_number already exists
    const invoiceCheckResult = await pool.query(
      "SELECT * FROM invoices WHERE invoice_number = $1",
      [invoice_number]
    );

    if (invoiceCheckResult.rows.length > 0) {
      return res.status(400).send("Invoice number already exists");
    }

    //Take the user_id from userResult
    const user_id = userResult.rows[0].user_id;

    // Insert new invoice into the database
    await pool.query(
      "INSERT INTO invoices (user_id, invoice_number, invoice_date, total_amount) VALUES ($1, $2, $3, $4);",
      [user_id, invoice_number, invoice_date, total_amount]
    );

    res.status(201).send("Invoice added successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
