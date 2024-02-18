const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.listen(5002, () => {
  console.log("Server listen on port: 5002 !");
});
