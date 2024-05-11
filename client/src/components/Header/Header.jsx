import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Header.css";
import logo from "../../assets/img/logo-trans.png";
import CustomBtn from "../Button/CustomBtn";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white "
      style={{ padding: "3% 5%" }}
    >
      <div className="container-fluid">
        <Link to="/" className="">
          <img src={logo} height="60" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
            <li className="nav-item px-4">
              <a className="nav-link active fs-6" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item px-4">
              <a className="nav-link  fs-6" aria-current="page" href="/">
                Post A Job
              </a>
            </li>
            <li className="nav-item px-4">
              <a className="nav-link  fs-6" aria-current="page" href="/">
                About Us
              </a>
            </li>
            <li className="nav-item px-4">
              <a className="nav-link  fs-6" aria-current="page" href="/">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <CustomBtn value="Signup" to="/login" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
