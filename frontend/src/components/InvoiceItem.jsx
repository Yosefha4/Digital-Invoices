import React from "react";

const InvoiceItem = ({ item }) => {
  return (
    <div className="invoice-item">
      <p>
        <strong>Invoice: </strong>
        <span>#{item.invoice_number}</span>{" "}
      </p>
      <p>
        <strong>Invoice ID:</strong> <span> {item.invoice_id}</span>
      </p>
      <p>
        <strong>Invoice Date:</strong> <span>{item.invoice_date}</span>
      </p>
      <p>
        <strong>Total Amount:</strong> <span style={{backgroundColor:'greenyellow'}}>{item.total_amount}</span>{" "}
      </p>
      <p>
        <strong>Created At:</strong> <span>{item.created_at}</span>
      </p>
      <p>
        <strong>User ID:</strong> <span>{item.user_id}</span>{" "}
      </p>
      <button className="btn">Print</button>
    </div>
  );
};

export default InvoiceItem;
