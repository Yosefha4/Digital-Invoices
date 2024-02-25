import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import InvoiceItem from "./InvoiceItem";

const UserProfile = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userAdd, setUserAdd] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [userInvoices, setUserInvoices] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5002/api/users/userDetails/${userId}`
      );
      setUserName(res.data[0].user_name);
      setUserAdd(res.data[0].user_address);
      setUserEmail(res.data[0].user_email);
      //   console.log("User Details: ", res.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchUserInvoices = async () => {
    try {
      const res = await axios.get(`http://localhost:5002/api/invoices/${userId}`);
      console.log(res.data);
      setUserInvoices(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserInvoices();
  }, []);
  return (
    <div className="userProfile">
      <h2>User Profile</h2>
      <div className="userInfo">
        <div className="info-item">
          <p>Name: </p>
          <span>{userName && userName}</span>
        </div>
        <div className="info-item">
          <p>Email: </p>
          <span>{userEmail && userEmail}</span>
        </div>
        <div className="info-item">
          <p>Address: </p>
          <span> {userAdd && userAdd}</span>
        </div>
      </div>
      <div className="userInvoices">
        <table className="table" >
        <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
{userInvoices.map((item,index) => (
  <tr key={index}>
    <td>{item.invoice_number}</td>
    <td> {item.invoice_date}</td>
    <td>{item.total_amount}</td>
    <td>
    {/* <Link className="moreBtn" to={{ pathname: `/invoice/${item.invoice_id}`, state: { item } }}>More</Link> */}

      <Link className="moreBtn"  to={`/invoice/${item.invoice_id}`} state={{item}}>More</Link>
      {/* <button className="moreBtn">More</button> */}
    </td>

  </tr>
))}
          </tbody>
        </table>
      </div>
      {/* <div className="userInvoices">
        {userInvoices &&
          userInvoices.map((item, index) => (
            <InvoiceItem key={index} item={item} />
          ))}

      </div> */}
    </div>
  );
};

export default UserProfile;
