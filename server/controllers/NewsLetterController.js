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

// Function to send email to subscribers
const sendEmailToSubs = async (subscribers, emailSubject, emailContent) => {
  try {
    for (const subscriber of subscribers) {
      // Email content
      const mailOptions = {
        from: "yossonline2u@gmail.com",
        to: subscriber,
        subject: emailSubject,
        text: emailContent,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Custom email sent successfully to ${subscriber}`);
    }
  } catch (error) {
    console.error("Error sending custom email to subscribers:", error);
  }
};

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

exports.SendEmailsToUsers = async (req, res) => {
  try {
    const { emailSubject, emailContent } = req.body;

    const subsData = await pool.query("SELECT email FROM subscriptions;");
    const subscribersEmails = subsData.rows.map(row => row.email);
    // console.log("The subscribersEmails after map is :  " + subscribersEmails)
    await sendEmailToSubs(subscribersEmails, emailSubject, emailContent);
    res.status(201).send('Custom emails sent successfully to all subscribers.');

  } catch (error) {
    console.log(error)
  }
};
exports.getAllEmail = async (req, res) => {
  try {
    const subsData = await pool.query("SELECT * FROM subscriptions;");
    res.status(201).send(subsData.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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
