import React from "react";
import styled from "styled-components";
import logo from "../assets/img/logo-trans.png";
import img from "../assets/img/img.png";

import "../assets/css/student.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { useEffect } from "react";
// import { GlobalContext } from "../context/GlobalContext";
// import axios from "axios";

const SideBar = styled.div`
  overflow: auto;
  max-height: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  display: block;
  z-index: 1;
  color: #fff;
  font-weight: 200;
  background-size: cover;
  background-position: center center;
`;

const SidebarWrapper = styled.div`
  position: relative;
  max-height: calc(100vh - 75px);
  min-height: 100%;
  overflow: auto;
  width: 260px;
  z-index: 4;
  padding-bottom: 100px;
  background-image: url(${img});
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Logo = styled.img`
  max-height: 50px;
  display: block;
  margin: auto;
  margin-top: 20px;
  padding: 3px 2rem;
  color: white;
  ${"" /* background-color: white; */}
`;
const NavLinks = styled.a`
  display: flex;
  margin: 10px 15px;
  border-radius: 4px;
  border: none;
  padding: 10px 15px;
  color: white;
  background: transparent;
  &:hover {
    background: rgba(255, 255, 255, 0.23);
    opacity: 0.4;
    ${"" /* color: white; */}
  }
  & > li {
    display: none;
  }
`;
const NavLinkText = styled.p`
  margin: auto 10px;
  color: black !important;
  font-weight: bold;
`;
const AdminSidebar = () => {
  const Logout = () => {
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    // navigate("/");
  };
  return (
    <SideBar>
      {/* <SideBar class="collapse" id="navbarToggleExternalContent"> */}
      <SidebarWrapper>
        <div className="logo w-100 ">
          <a href="/">
            <Logo src={logo} alt="logo" />
          </a>
        </div>
        <ul className="nav d-block mt-5">
          {/* <li className="nav-item">
        <NavLink to="/admin/dashboard" className="nav-link">
          <FontAwesomeIcon
            icon="fa-solid fa-gauge "
            fixedWidth
            pull="left"
            className="my-auto fs-4"
          />
          <NavLinkText>DASHBOARD</NavLinkText>
        </NavLink>
      </li> */}

          <li
            className="nav-item my-4"
            // style={{ background: "#E9AB43", opacity: 0.4 }}
          >
            <NavLink to="/user/dashboard" className="nav-link">
              {/* <FontAwesomeIcon
            icon="fa-solid fa-user"
            fixedWidth
            pull="left"
            className="my-auto fs-4"
          /> */}
              <NavLinkText>DASHBOARD</NavLinkText>
            </NavLink>
          </li>
          {/* {authUser.role === 0 &&
        <li className="nav-item">
          <NavLink to="/admin/fees" className="nav-link">
            <FontAwesomeIcon
              icon="fa-solid fa-money-check-dollar"
              fixedWidth
              pull="left"
              className="my-auto fs-4"
            />
            <NavLinkText>FEE PAYMENT</NavLinkText>
          </NavLink>
        </li>
      } */}
          <li
            className="nav-item my-4"
            // style={{ background: "#E9AB43", opacity: 0.4 }}
          >
            <NavLink to="/user/edit-profile" className="nav-link">
              {/* <FontAwesomeIcon
            icon="fa-solid fa-pencil"
            fixedWidth
            pull="left"
            className="my-auto fs-4"
          /> */}
              <NavLinkText>EDIT PROFILE</NavLinkText>
            </NavLink>
          </li>

          {/* Admin section */}
          {/* {authUser.role === 1 &&
        <li className="nav-item">
          <NavLink to="/admin/generate-certificate" className="nav-link">
            <FontAwesomeIcon
              icon="fa-solid fa-money-check-dollar"
              fixedWidth
              pull="left"
              className="my-auto fs-4"
            />
            <NavLinkText>GENERATE CERTIFICATE</NavLinkText>
          </NavLink>
        </li>
      } */}
          {/* {authUser.role === 1 &&
        <li className="nav-item">
          <NavLink to="/admin/admin-fees" className="nav-link">
            <FontAwesomeIcon
              icon="fa-solid fa-money-check-dollar"
              fixedWidth
              pull="left"
              className="my-auto fs-4"
            />
            <NavLinkText>MANAGE FEE PAYMENT</NavLinkText>
          </NavLink>
        </li>
      } */}
          {/* {authUser.role === 1 &&
        <li className="nav-item">
          <NavLink to="/admin/new-register" className="nav-link">
            <FontAwesomeIcon
              icon="fa-solid fa-money-check-dollar"
              fixedWidth
              pull="left"
              className="my-auto fs-4"
            />
            <NavLinkText>NEW REGISTRATION</NavLinkText>
          </NavLink>
        </li>
      }
      {authUser.role === 1 &&
        <li className="nav-item">
          <NavLink to="/admin/view-student" className="nav-link">
            <FontAwesomeIcon
              icon="fa-solid fa-money-check-dollar"
              fixedWidth
              pull="left"
              className="my-auto fs-4"
            />
            <NavLinkText>VIEW STUDENT PROFILE</NavLinkText>
          </NavLink>
        </li>
      } */}
          <li
            className="nav-item my-4"
            // style={{ background: "#E9AB43", opacity: 0.4 }}
          >
            <NavLink to="/user/searchjob" className="nav-link">
              {/* <FontAwesomeIcon
            icon="fa-solid fa-pencil"
            fixedWidth
            pull="left"
            className="my-auto fs-4"
          /> */}
              <NavLinkText>SEARCH JOBS</NavLinkText>
            </NavLink>
          </li>
          <li
            className="nav-item   position-absolute w-100 justify-content-center"
            style={{ bottom: "10px" }}
          >
            <NavLinks
              className="nav-link d-flex"
              href="/"
              style={{
                background: "#E9AB43",
                color: "black !important",
              }}
              onClick={() => {
                Logout();
              }}
            >
              {/* <FontAwesomeIcon
            icon="fa-solid fa-right-from-bracket"
            fixedWidth
            className="my-auto"
          /> */}
              <NavLinkText>LOGOUT</NavLinkText>
            </NavLinks>
          </li>
        </ul>
      </SidebarWrapper>
    </SideBar>
  );
};

export default AdminSidebar;
