import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "../App.css";

const InvoiceItem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { state } = useLocation();
  const { item, username, address } = state;

  // console.log(user_name)

  const handlePrint = (e) => {
    e.preventDefault();

    // window.print()

    // window.open()

    const windowFeatures = "width=100vw,height=100vh,left=200,top=200"; // Example features

    const printWindow = window.open("", "_blank");
    const currentContainer =
      document.getElementById("invoice-container").innerHTML;
    // alert(currentContainer)
    if (printWindow) {
      const htmlContentStart = `
  <html>
  <head>
      <style>
          /* Add your CSS styles here */
          body {
              background-color: lightGray;
              font-family: Arial, sans-serif;
              display:flex;
              align-items:canter;
              overflow:hidden;
          }
          h1 {
              color: red;
          }
          .invoice-container {
            max-width: 650px;
            margin-top: 12px;
            padding: 12px;
            height: 100%;
            background-color:  #add8e6;

          }
          .invoice-item {
            width: 100%; /* Ensure full width of the container */
            height: 100%;
            border: 3px solid black;
            border-radius: 8px; /* Add rounded corners */
            padding: 0px 16px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
            text-align: left; /* Align text to the left */
            font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
              "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
            background-color: #add8e6;
            overflow:hidden;
          }
          
          
          /* .invoice-item:hover{
            background-color: antiquewhite;
          } */
          .invoice-item .header {
            height: 10%;
            border-radius: 0.25px 40px;
            /* background-color: white; */
            text-align: center;
            padding: 8px;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;


          }
          .invoice-item .header .fa-solid fa-file-invoice {
          font-weight:"bold";

          }
          .invoice-item .header .logo {
            display:none;
            align-items: center;
            justify-content: center;
            gap: 4px;
            /* background-color: white; */
            padding: 8px;
            border-radius: 10%;
            box-shadow: 1px 2px 4px black;
            /* border: 1px solid navy; */
          }
     
          .invoice-item .dg-date {
            display: flex;
            justify-content: space-around; 
            align-items:center;  
            padding-top: 12px;
            padding-bottom: 12px;
            border-top: 1px solid black;
            width: 100%;
          }
          .invoice-details span {
            background-color: white;
          }
     
          .invoice-item .dg-date .user-det h5 {
            color: rgb(110, 110, 110);
            font-weight: 300;
            margin-right:12px;
  
          }
          .invoice-item .dg-date .user-det .name {
            font-weight: bold;
          }
          .invoice-item span {
            background-color: white;
            border-radius: 5px;
            padding: 0 4px;
            font-weight: bold;
          }
          
          .invoice-item h3 {
            margin-bottom: 8px; /* Add space below the invoice number */
          }
          
          .invoice-item .btn {
            width: 30%;
            padding: 8px;
            border-radius: 5px;
            background-color: white;
            color: black;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 24px;
          
            cursor: pointer;
          }
          .invoice-item .btn:hover {
            background-color: transparent;
          }
          
          .userInvoices td {
            font-weight: bold;
          }
          
          .userInvoices .moreBtn {
            background-color: lightblue;
            padding: 2px 8px;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            color: black;
            border: 1px solid black;
          }
          .userInvoices .moreBtn:hover {
            background-color: transparent;
          }
          
          .invoice-details {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: start;
            gap:24px;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
          }
          
          .invoice-details p {
            border: 3px solid black;
            padding: 12px;
            border-radius: 5px;
            margin: 4px 0; /* Add space above and below each paragraph */
          font-size:20px;
            background-color: white;
          }
          .invoice-item .dg-date .user-det {
            display: flex;
            flex-wrap: wrap;
        }
        .invoice-details .btn{
          display:none;
        }
  
          
      </style>
  </head>
  <body>
`;

      const htmlContentEnd = `
  </body>
  </html>
`;

      // Get HTML content of the invoice container
      // const invoiceContent = invoiceContainerRef.current.outerHTML;

      // Write the content to the new window
      // printWindow.document.write('<html><head><title>Invoice</title>');
      // printWindow.document.write('<link rel="stylesheet" href="../App.css"/>  </head><body>');

      printWindow.document.write(htmlContentStart);
      printWindow.document.write(currentContainer);
      printWindow.document.write(htmlContentEnd);
      // printWindow.document.write('</body></html>');

      // Trigger print
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="invoice-container" id="invoice-container">
      <div className="invoice-item">
        <div className="header">
          <i
            className="fa-solid fa-file-invoice"
            style={{ display: "flex", gap: "10px" }}
          >
            Digital Invoice
          </i>

          {/* <div className="logo">
        <i class="fa-regular fa-file-lines"></i>
        <p>DG Inv</p>
        </div> */}
        </div>

        <div className="dg-date">
          <div className="user-det">
            <h5>BILLED TO</h5>
            <h4 className="name">{username}</h4>
          </div>
          <div className="user-det">
            <h5>STREET ADDRESS</h5>
            <h4 className="name">{address}</h4>
          </div>
          <div className="user-det">
            <h5>Date</h5>
            <h4 className="name">{currentDate.toDateString()}</h4>
          </div>
        </div>
        <div className="invoice-details">
          <p>
            <strong>Invoice Number: </strong>
            <span>#{item.invoice_number}</span>{" "}
          </p>
          <p>
            <strong>Invoice ID:</strong> <span> {item.invoice_id}</span>
          </p>
          <p>
            <strong>Invoice Date:</strong> <span>{item.invoice_date}</span>
          </p>
          <p>
            <strong>Total Amount:</strong>{" "}
            <span style={{ backgroundColor: "white" }}>
              {item.total_amount}
            </span>{" "}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            <span>{item.created_at.split("T")[0]}</span>
          </p>

          {/* <p>
        <strong>User ID:</strong> <span>{item.user_id}</span>{" "}
      </p> */}
          <button className="btn" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
