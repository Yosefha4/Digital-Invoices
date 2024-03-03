import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [userToken,setUserToken] = useState(false);

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
    if(!tkn){
      setUserToken(false);
    }
    setUserToken(true)
  }, []);
  return (
    <section className="homepage">
      <h1>HomePage</h1>

      <div className="container">
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
                  <Link to={`/userProfile/${item.user_id}`} style={{textDecoration:'none',listStyle:'none',listStyleType:"none"}}>
                    {item.user_name}
                  </Link>
                </td>
                <td>{item.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {users &&
        users.map((user) => (
          <p>
            {user.user_name} : {user.user_id}
          </p>
        ))} */}
    </section>
  );
};

export default Homepage;
