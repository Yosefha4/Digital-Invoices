import React from "react";

const Footer = () => {
  const sites = ["facebook", "twitter", "google", "dribbble", "skype"];

  return (
    <footer>
      <div className="footer-cont">
        <div className="left">
          {/* <h2>Digital Invoice</h2> */}
          <i className="fa-solid fa-file-invoice" style={{ display: "flex" }}>
            Digital Invoice
          </i>
        </div>
        <div className="middle">
          <ul class="social-icons">
            <li>
              <a href="#">
                <i class="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-codepen"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="right">
            <h3>Join Us</h3>
          <div className="input-rigth">

            <input type="email" placeholder="example@gmail.com" />
            <button>SEND</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
