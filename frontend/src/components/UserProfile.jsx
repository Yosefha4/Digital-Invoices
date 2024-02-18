import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceItem from "./InvoiceItem";

const UserProfile = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userAdd, setUserAdd] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [userInvoices, setUserInvoices] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5002/invoices/userDetails/${userId}`
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
      const res = await axios.get(`http://localhost:5002/invoices/${userId}`);
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
        {userInvoices &&
          userInvoices.map((item, index) => (
            <InvoiceItem key={index} item={item} />
          ))}
        {/* {userInvoices && (
            userInvoices.map((item) => (
                <p>{item}</p>
            ))
        )} */}
      </div>
    </div>
  );
};

export default UserProfile;
