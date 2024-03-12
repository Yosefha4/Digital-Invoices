import axios from "axios";
import React, { useEffect, useState } from "react";
import SendEmail from "./SendEmail";

const Subs = () => {
  const [userData, setUserData] = useState([]);

  const fetchUsersData = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/subscribe/getAll");
      console.log(res.data);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);
  return (
    <div className=" subs">
        <div className="left">
        <h2>Subscribers</h2>
      <div className="table">
        <table className="">
          <caption>NewsLetter Table 2024</caption>
          <thead>
            <tr>
              <th>*</th>
              <th>Email</th>
              <th>Created At</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>
                  <span>{item.email}</span>
                </td>
                <td>{item.created_at}</td>
                {/* <td>
                <i class="fa fa-envelope" aria-hidden="true"></i>

                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
        <div className="right">
            <SendEmail />
        </div>

    </div>
  );
};

export default Subs;
