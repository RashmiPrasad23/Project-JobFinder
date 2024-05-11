import React from "react";
import "../assets/css/student.css";
import defaultImage from "../assets/img/default-avatar.png";

const AdminNav = () => {
  return (
    <div>
      <nav
        class="navbar navbar-light bg-light"
        style={{ background: "#E9AB43" }}
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="navbar-text">
            <img
              src={defaultImage}
              alt=""
              srcSet=""
              className="border border-dark rounded-circle"
              width="30"
              height="30"
            />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
