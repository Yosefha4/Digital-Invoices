import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  const userToken = sessionStorage.getItem("token");

  // console.log("user token: " + userToken);

  const handleLogout = (e) => {
    e.preventDefault();

    if(sessionStorage.getItem("token")){
      sessionStorage.removeItem("token");
      window.location.href = '/';
    }

  }

  return (
    <nav className="nav">
      {/* <a href="/" className="nav_logo">
        Logo
      </a> */}

      <i className="fa-solid fa-file-invoice" style={{ display: "flex",gap:'10px' }}>
            Digital Invoice
          </i>

      <div
        className={`menu-toggle ${menuOpen ? "menu-open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="menu-icon">&#9776;</div>
      </div>
      {menuOpen && (
        <div className="overlay">
          <div className="openNavBar">
          <div className="closeButton" onClick={toggleMenu}>X</div>

            <ul>
              <li className="nav_item">
                <a href="/" className="nav_link">
                  Home
                </a>
                <a href="/" className="nav_link">
                  Products
                </a>
                <a href="/subscribers" className="nav_link">
                   Subscribers
                </a>
                <a href="/" className="nav_link">
                  Contact
                </a>
               {userToken && <button className="btn" onClick={handleLogout}>Logout</button>}

              </li>
            

            </ul>
          </div>
        </div>
      )}

      <ul className={`nav_items ${menuOpen ? "open" : ""}`}>
        <li className="nav_item">
          <a href="/" className="nav_link">
            Home
          </a>
          <a href="/" className="nav_link">
            Products
          </a>
          <a href="/subscribers" className="nav_link">
                   Subscribers
                </a>
          <a href="/" className="nav_link">
            Contact
          </a>
        {userToken &&   <button className="nav-btn" onClick={handleLogout}>Logout</button>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
