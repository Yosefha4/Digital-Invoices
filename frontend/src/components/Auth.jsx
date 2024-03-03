import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const Auth = () => {
  const [authMode,setAuthMode] = useState(false);

  return (
    <div className="auth-container">
   {authMode ?   <Signup /> : <Login />}
      <button type='button' className='secondbtn' onClick={() => setAuthMode(!authMode)} >Alrady have an account? Login </button>
    </div>
  );
};

export default Auth;
