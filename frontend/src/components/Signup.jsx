import React, { useEffect, useState } from "react";
import InputItem from "./InputItem";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");

  const [userAdd, setUserAdd] = useState("");
  const [password, setUserPassword] = useState("");

  const [errorInputMsg, setErrorInputMsg] = useState({
    userName: false,
    userEmail: false,
    userAddress: false,
    userPassword: false,
  });

  //   const [errorFlag,setErrorFlag] = useState(0);

  useEffect(() => {
    validateInputs();
  },[username,email,userAdd,password])

  const handleSubmit = (e) => {
    e.preventDefault();

    checkInputs();

    // alert("SUBMIT!" + username + " " + email + " " + password );
  };

  const validateInputs = () => {
    setErrorInputMsg((prevState) => ({
        ...prevState,
        userName: username.length > 3 ,
        userEmail: isEmail(),
        userPassword: validatePassword(),
        userAddress: userAdd.length > 5
      }));
  }

  const checkInputs = () => {
    // Check if all inputs are valid
    const isValid =
      username.length >= 3 && isEmail()  && validatePassword()  && userAdd.length >= 5

    if (!isValid) {
      // All inputs are valid, show alert
      setErrorInputMsg((prevState) => ({
        ...prevState,
        userName: username.length > 3 ,
        userEmail: email.length > 3 || isEmail(),
        userPassword: validatePassword(),
        userAddress: userAdd.length > 5
      }));
     
    } else {
      // Update errorInputMsg state based on validation results
      console.log("ALL VALID")
      alert("ALL VALID")
    }
  };

  function validatePassword(){
    if(password === "" || password.length < 3){
        return false;
    }
    else{
        return true;
    }
    
  }

  function isEmail() {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// console.log(isEmail())


  return (
    <form className="signup" name="form">
      <h2>SignUp</h2>
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
        label="Email"
        inputType="email"
        name="email"
        placeHolder="example@gmail.com"
        changeFunc={setUserEmail}
        errorFlag={errorInputMsg.userEmail}
        errorMessage="Invalid Email"
      />
      <InputItem
        label="Address"
        inputType="text"
        name="userAdd"
        placeHolder="Jump 21 ST"
        changeFunc={setUserAdd}
        errorFlag={errorInputMsg.userAddress}
        errorMessage="Invalid Address"
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
        <button type="submit" className="btn" onClick={handleSubmit}>
          SignUp
        </button>
        {/* <button type='button' className='secondbtn' onClick={() => setAuthMode(!authMode)}>Alrady have an account? Login </button> */}
      </div>
    </form>
  );
};

export default Signup;
