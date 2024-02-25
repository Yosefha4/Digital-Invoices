import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const InvoiceItem = () => {

  let { state } = useLocation();

  useEffect(() =>{
    console.log("state: ", state)
  },[])

  return (
    <div className="invoice-container">
    <div className="invoice-item">
      <div className="header">
        <h2>Digital Invoice</h2>
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
        <strong>Created At:</strong> <span>{   state.item.created_at}</span>
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
