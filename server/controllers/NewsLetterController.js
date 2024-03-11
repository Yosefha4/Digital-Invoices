const pool = require("../db");


exports.subscribe = async (req,res) => {
    try {
        const {user_email} = req.body;
        if(!user_email || user_email === ""){
            return res.status(401).send("Email address canot be an empty string");
        }

        const emailExist = await pool.query(
            "SELECT * FROM subscriptions WHERE email = $1",
            [user_email]
          );
        if(emailExist.rows.length !==0){
            return res.status(404).send("Email already exist.");
        } 
        await pool.query(
            "INSERT INTO subscriptions (email) VALUES ($1);",[user_email]
        )   
        res.status(201).send("Email Subscription Successfully!")    
        // console.log("The user subs email is : " , user_email);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }
}