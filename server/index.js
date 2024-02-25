const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.use('/api/invoices', require('./routes/InvoiceRoute'));
app.use('/api/users', require('./routes/UserRoute'));




app.listen(5002, () => {
  console.log("Server listen on port: 5002 !");
});


/*
-- Extracting the month
SELECT SUBSTRING(invoice_date FROM 6) AS month FROM invoices;

-- Extracting the year
SELECT SUBSTRING(invoice_date FROM 1 FOR 4) AS year FROM invoices;
*/