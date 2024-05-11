import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./core/Home";
import SignUpForm from "./components/Form/SignUpForm";
import Login from "./module/Auth/Login";
import axios from "axios";
import Dashboard from "./core/Admin/Dashboard";
import UserProfile from "./core/User/UserProfile";
import EditProfile from "./core/User/EditProfile";
import { GlobalContext } from "./context/GlobalContext";

function App() {

  // localhost:3000/products
  // my-page.com/
  const { setAuthUser } = useContext(GlobalContext);

  async function refreshAuthState() {
    let getRefreshToken = localStorage.getItem("refreshtoken");
    const { data } = await axios.post(
      `http://localhost:5001/api/auth/refreshauthstate`, { refreshToken: getRefreshToken },
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (data.status === "success") {
      console.log("refreshauth", data.user)
      setAuthUser({
        fname: data.user.firstName,
        lname: data.user.lastName || "",
        email: data.user.email,
        userid: data.user.id,
        username: data.user.username,
        role: data.user.role,
        middlename: data.user.middlename || "",
        phone: parseInt(data.user.phone) || 0,
        dob: data.user.dob || "",
      });
      // if (roomMeta.status === false) {
      //   window.location.reload()
      // }
    } else {

      setAuthUser({
        fname: "",
        middlename: "",
        lname: "",
        dob: "",
        state: "",
        email: "",
        username: "",
        phone: 0,
        userid: "",
        role: null
      });
    }
  }

  useEffect(() => {
    refreshAuthState();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="/user">
        <Route path="dashboard" element={<UserProfile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="searchjob" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
