import React, { useState } from "react";

const SendEmail = () => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  //
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000"); // Default color: black
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [fontSize, setFontSize] = useState("medium");

  const handleSendEmail = (e) => {
    e.preventDefault();

    // if(!validateInputs()){
    //   alert("The Email subject is : " + emailSubject + "\nThe Content is : " + emailContent)
    // }
    // else{
    //   alert("Email subject & content cannot be empty. \nTry again please.")

    // }
  };

  const validateInputs = () => {
    if (emailSubject === "" || emailContent === "") {
      return false;
    }
    return true;
  };

  return (
    <form className="send-email" onSubmit={handleSendEmail}>
      <h2>Send Message To Users</h2>

      <div className="options-bar">
      <div className="emailInput">
          <input
            type="color"
            id="textColor"
            name="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{
              width: 20,
              height: 20,
              backgroundColor: `${textColor}`,
              border: "none",
            }}
          />
        </div>

        <div className="emailInput">
          <select
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontFamily(e.target.value)}
            style={{ width: 80, textAlign: "center" }}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            {/* Add more font options as needed */}
          </select>
        </div>
        <div className="emailInput">
          <select
            name="fontSize"
            id="fontSize"
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>
   
        <div className="emailInput">
          <input
            type="checkbox"
            id="fontWeight"
            name="fontWeight"
            placeholder="bold/regular"
  
            checked={fontWeight === "bold"}
            onChange={(e) =>
              setFontWeight(e.target.checked ? "bold" : "normal")
            }
            style={{ width: 18, height: 18 }}
          />
        </div>
        <div className="emailInput">
          <select
            name="textAlign"
            id="textAlign"
            onChange={(e) => setTextAlign(e.target.value)}
            style={{ textAlign: "center" }}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            {/* Add more alignment options as needed */}
          </select>
        </div>
      </div>

      <input
        type="text"
        name="emailSubject"
        minLength={3}
        required
        placeholder="Enter  Subject"
        className="subj"
        onChange={(e) => setEmailSubject(e.target.value)}
                style={{ fontFamily, color: textColor, fontWeight, textAlign, fontSize }}

      />

      <textarea
        placeholder="Enter Your Message"
        name="emailContent"
        id="emailContent"
        className="mess"
        cols="30"
        rows="10"
        onChange={(e) => setEmailContent(e.target.value)}
        required
        minLength={20}
                style={{ fontFamily, color: textColor, fontWeight, textAlign, fontSize }}

      ></textarea>
      {/* <input type="text" placeholder="Enter Your Message" className="mess" /> */}

      <button className="btn" type="submit">
        SEND
      </button>
    </form>
  );
};

export default SendEmail;
