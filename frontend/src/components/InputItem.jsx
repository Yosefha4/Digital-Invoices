import React, { useEffect, useState } from 'react'

const InputItem = ({label,inputType,placeHolder,name,changeFunc,errorFlag,errorMessage}) => {

  const handleChange = (e) => {
    changeFunc(e.target.value);
  };

  // const [validFlag, setValidFlag] = useState(true);

  const errorState = errorFlag ? 'success' : "error"

  // const errorState = errorFlag ? "errorShow" : "errorHide";


  // useEffect(() => {
  //   checkFlag();
  // },[changeFunc,])


  return (
    <div className={`input-item ` + errorState}>
        <label>{label}</label>
        <input type={inputType} placeholder={placeHolder} name={name} minLength={2}  onChange={handleChange} required/>
        {/* <i className="fas fa-check-circle"></i>
        <i className="fas fa-exclamation-circle"></i> */}
        <span>{errorMessage}</span>
    </div>
  )
}

export default InputItem