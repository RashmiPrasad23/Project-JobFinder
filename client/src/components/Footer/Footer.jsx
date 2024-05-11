import React from "react";
import "../../assets/css/Footer.css";
import logo from "../../assets/img/logo-trans.png";
import "../../assets/css/Home.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="my-4">
              <Link to="/" className="">
                <img src={logo} height="60" alt="logo" />
              </Link>
            </div>
            <div className="my-2 text-color">
              <p className="nav-item">
                The only solution for everyone who
                <br /> are looking for a job
              </p>
              <p className="nav-item fw-bolder">Copyright © JobFinder,2023</p>
              <p className="nav-item fw-bolder">All Rights Reserved.</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-12  m-auto">
            <h6 className="mb-4">About</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  Company
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0">
                  Profile
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-sm-12 m-auto">
            <h6 className="mb-4">Resources</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  Contact
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0">
                  Application
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-sm-12 m-auto">
            <h6 className="mb-4">Legals</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  Term of Use
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0">
                  Privacy Policy
                </a>
              </li>
              <li className="nav-item mb-2 box">
                <a href="/" className="nav-link p-0 ">
                  Application
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
