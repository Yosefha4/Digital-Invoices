import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UsersData from "./UsersData";
import Footer from "./Footer";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/users");
      //   setUsers()
      // console.log("the axios result is: ", res.data);
      setUsers(res.data);
      //   res.data.forEach(item =>{
      //     setUsers([...users,item.user_name]);
      //      console.log(item.user_name);
      //     });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const tkn = sessionStorage.getItem("token");
    if (!tkn) {
      setUserToken(false);
    }
    setUserToken(true);
    // console.log(tkn)
  }, []);
  return (
    <section className="homepage">
      {/* <h1>Home Page</h1> */}

      <div className="container con2">
        <div className="hero">
          <h2>Get Your Digital Invoices </h2>
        </div>

        <table className="table">
          <caption>Users Table 2024</caption>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
            <th>Yosef Haim</th>
            <th>1</th>
          </tr> */}
            {users.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/userProfile/${item.user_id}`}
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      listStyleType: "none",
                    }}
                  >
                    {item.user_name}
                  </Link>
                </td>
                <td>{item.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        {/* <h2>2323</h2> */}
        <UsersData />
      </div>

      <Footer />
    </section>
  );
};

export default Homepage;
