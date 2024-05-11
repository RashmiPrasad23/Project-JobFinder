import React from "react";
import "../assets/css/student.css";

const AdminFooter = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Navbar</a> */}

          <div
            className="collapse navbar-collapse container"
            id="navbarSupportedContent"
          >
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Contact</a>
            </li>

          </ul> */}
            <form className="d-flex">
              <p
                style={{
                  fontFamily: "Poppins",
                }}
              >
                &copy; <script>document.write(new Date().getFullYear())</script>{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="http://localhost:3000/"
                >
                  JobFinder Team
                </a>
              </p>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminFooter;
