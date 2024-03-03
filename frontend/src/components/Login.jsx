import React, { useEffect, useState } from "react";
import InputItem from "./InputItem";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setUserPassword] = useState("");

  const [errorInputMsg, setErrorInputMsg] = useState({
    userName: true,
    userPassword: true,
  });

  const checkInputs = () => {
    // Check if all inputs are valid
    const isValid = username.length >= 3 && validatePassword();

    if (!isValid) {
      // All inputs are valid, show alert
      setErrorInputMsg((prevState) => ({
        ...prevState,
        userName: username.length > 3,
        userPassword: validatePassword(),
      }));
      return false;
    } else {
      // Update errorInputMsg state based on validation results
      console.log("ALL VALID");
      // alert("ALL VALID");
      return true;
    }
  };

  function validatePassword() {
    if (password === "" || password.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  const handleLoginFunc = async (e) => {
    e.preventDefault();
    if(checkInputs()){
      try {
        await axios
          .post("http://localhost:5002/api/users/login/", {
            user_name: username,
            password: password,
          })
          .then((response) => {
            // Successful login, handle token or any other action
            const token = response.data.token;
            sessionStorage.setItem("token",token);
            window.location.href = '/homepage';
            // Do something with the token
          })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              if (error.response.status === 404) {
                // User not found
  
                alert("User not found");
                // Display appropriate message to the user
              } else if (error.response.status === 401) {
                // Invalid password
  
                alert("Invalid password");
                // Display appropriate message to the user
              } else {
                // Other server errors
  
                alert("Something went wrong ...");
                // Display appropriate message to the user
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received");
              // Display appropriate message to the user
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error", error.message);
              // Display appropriate message to the user
            }
          });
  
        // const res =  await axios.get("http://localhost:5002/api/users");
        // console.log(res.status)
      } catch (error) {
        console.log(error);
      }
    }
  
  
  
  };
  // const handleLoginFunc = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res  = await axios.post("http://localhost:5002/api/users/login/",{
  //       user_name:username,
  //       password:password
  //     });
  //     if(res.status === 404) {
  //       return res.json("User not found")
  //     }
  //     else if(res.status === 401){
  //       return res.json("Password incorrect")
  //     }
  //     else if(res.status === 500){
  //       return res.json("Something went wrong ...")
  //     }
  //     else{
  //       return res.data;
  //     }
  //     // const res =  await axios.get("http://localhost:5002/api/users");
  //     // console.log(res.status)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <form className="signup" name="form" onSubmit={handleLoginFunc}>
      <h2>Login</h2>
      <InputItem
        label="User Name"
        inputType="text"
        placeHolder="user name.."
        name="username"
        changeFunc={setUsername}
        errorFlag={errorInputMsg.userName}
        errorMessage="Invalid User Name"
      />

      <InputItem
        label="Password"
        inputType="password"
        name="password"
        placeHolder="****"
        changeFunc={setUserPassword}
        errorFlag={errorInputMsg.userPassword}
        errorMessage="Invalid Password"
      />
      <div className="auth-btns">
        <button type="submit" className="btn">
          SignUp
        </button>
      </div>
    </form>
  );
};

export default Login;
