const pool = require("../db");
const nodemailer = require("nodemailer");

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yossonline2u@gmail.com",
    pass: process.env.EMAIL_NEWS_PASS,
  },
});

// Function to send confirmation email
async function sendConfirmationEmail(email) {
  try {
    // Email content
    const mailOptions = {
      from: "yossonline2u@gmail.com",
      to: email,
      subject: "Newsletter Subscription Confirmation",
      text: "Thank you for subscribing to our newsletter!",
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

exports.getAllEmail = async (req,res) => {
  try {
    const subsData = await pool.query(
      "SELECT * FROM subscriptions;"
    );
    res.status(201).send(subsData.rows);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.subscribe = async (req, res) => {
  try {
    const { user_email } = req.body;
    if (!user_email || user_email === "") {
      return res.status(401).send("Email address canot be an empty string");
    }

    const emailExist = await pool.query(
      "SELECT * FROM subscriptions WHERE email = $1",
      [user_email]
    );
    if (emailExist.rows.length !== 0) {
      return res.status(404).send("Email already exist.");
    }
    await pool.query("INSERT INTO subscriptions (email) VALUES ($1);", [
      user_email,
    ]);
    //send email
    sendConfirmationEmail(user_email);

    res.status(201).send("Email Subscription Successfully!");
    // console.log("The user subs email is : " , user_email);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
