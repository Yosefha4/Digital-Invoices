import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const InvoiceItem = () => {

  const [currentDate, setCurrentDate] = useState(new Date())


  let { state } = useLocation();

  useEffect(() =>{
    console.log("state: ", state)
  },[])

  

  return (
    <div className="invoice-container">
    <div className="invoice-item">
      <div className="header">
      <h2>Digital Invoice</h2>
        <div className="logo">
        <i class="fa-regular fa-file-lines"></i>
        <p>DG Inv</p>
        </div>
      
   
      </div>

<div className="dg-date">
  <div className="user-det">
    <h5>BILLED TO</h5>
    <h4 className="name">Yosef Haim</h4>
    
  </div>
  <div className="user-det">
    <h5>STREET ADDRESS</h5>
    <h4 className="name">Tel Aviv ,12 ST</h4>
    
  </div>
  <div className="user-det">
    <h5>Date</h5>
    <h4 className="name">{currentDate.toDateString()}</h4>
    
  </div>

</div>
      <div className="invoice-details">
  
      <p>
        <strong>Invoice Number: </strong>
        <span>#{ state.item.invoice_number}</span>{" "}
      </p>
      <p>
        <strong>Invoice ID:</strong> <span> { state.item.invoice_id}</span>
      </p>
      <p>
        <strong>Invoice Date:</strong> <span>{ state.item.invoice_date}</span>
      </p>
      <p>
        <strong>Total Amount:</strong> <span style={{backgroundColor:'white'}}>{  state.item.total_amount}</span>{" "}
      </p>
      <p>
        <strong>Created At:</strong> <span>{   state.item.created_at.split("T")[0]}</span>
      </p>
      {/* <p>
        <strong>User ID:</strong> <span>{item.user_id}</span>{" "}
      </p> */}
      <button className="btn">Print</button>
      </div>

    </div>
    </div>
  );
};

export default InvoiceItem;
