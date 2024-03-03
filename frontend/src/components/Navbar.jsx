import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <nav className="nav">
      <a href="/" className="nav_logo">
        Logo
      </a>

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
                <a href="/homepage" className="nav_link">
                  Home
                </a>
                <a href="/" className="nav_link">
                  Products
                </a>
                <a href="/" className="nav_link">
                  Services
                </a>
                <a href="/" className="nav_link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <ul className={`nav_items ${menuOpen ? "open" : ""}`}>
        <li className="nav_item">
          <a href="/homepage" className="nav_link">
            Home
          </a>
          <a href="/" className="nav_link">
            Products
          </a>
          <a href="/" className="nav_link">
            Services
          </a>
          <a href="/" className="nav_link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
