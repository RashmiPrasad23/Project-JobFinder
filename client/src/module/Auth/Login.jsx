import React, { useState } from "react";
import SignUpForm from "../../components/Form/SignUpForm";
import signUp from "../../assets/svg/signUp.svg";
import img from "../../assets/svg/logIn.svg";
import "../../assets/css/Auth.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  // ref for details
  const emailRef = useRef("");
  const passRef = useRef("");
  // password show/hide
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const passToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon("fa-solid fa-eye");
    } else {
      setType("password");
      setIcon("fa-solid fa-eye-slash");
    }
  };

  // Toggling sign in and sign up
  const [isVisible, setVisible] = useState(true);
  const { setAuthUser } = useContext(GlobalContext);
  const submitDetail = async () => {
    let bodyData = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    const loginResponse = toast.loading("Please wait...");
    await axios
      .post("http://localhost:5001/api/auth/login", bodyData, {
        withCredentials: true,
      })
      .then(({ data }) => {
        toast.update(loginResponse, {
          render: data.msg,
          type: data.status === "success" ? "success" : "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
        // toast('Hello World');

        localStorage.setItem("refreshtoken", data.refreshToken);
        localStorage.setItem("name", data.user.firstName);
        localStorage.setItem("token", data.token);
        if (data.status === "success") {
          navigate("/user/dashboard");
        }
        console.log(data.user.role);
        setAuthUser({
          fname: data.user.firstName,
          email: data.user.email,
          userid: data.user.id,
          username: data.user.username,
          role: data.user.role,
          lname: data.user.lastName || "",
          middlename: data.user.middlename || "",
          phone: data.user.phone || "",
          dob: data.user.dob || "",
        });
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });

    // setInitData(data);
  };

  return (
    <div id="Auth">
      {/* <!-- Sign in --> */}
      <div
        className={
          isVisible
            ? "form-container sign-in-form show"
            : "form-container sign-in-form hide "
        }
        id="vanish"
      >
        <div
          className={
            isVisible
              ? "form-box sign-in-box animate__animated animate__slideInRight"
              : "form-box sign-in-box "
          }
        >
          <h2>Login</h2>
          <form method="POST">
            <div className="field">
              <i className="fa-solid fa-paper-plane"></i>
              <input
                ref={emailRef}
                type="email"
                id="text1"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="field">
              <i className="fa-solid fa-key"></i>
              <input
                ref={passRef}
                className="pass-input"
                type={type}
                name="password"
                placeholder="Enter password"
                required
              />
              <div onClick={passToggle} className="eye-btn">
                <i className={icon}></i>
              </div>
            </div>
            <div className="forgot-link">
              <a href="/">Forgot password?</a>
            </div>
            <input
              type="button"
              className="submit-btn"
              value="Login"
              onClick={() => submitDetail()}
            />
          </form>
        </div>
        <div
          className={
            isVisible
              ? "imgBox sign-in-imgBox animate__animated animate__slideInLeft"
              : "imgBox sign-in-imgBox"
          }
        >
          <div className="sliding-link py-3">
            <p>Don't have an account?</p>
            <span
              onClick={() => setVisible(!isVisible)}
              className="sign-up-btn"
            >
              Sign up
            </span>
          </div>

          <div>
            <img className="w-75" src={img} alt="" />
          </div>
        </div>
      </div>

      {/* <!-- Sign up --> */}
      <div
        className={
          isVisible
            ? "form-container sign-up-form hide"
            : "form-container sign-up-form show "
        }
      >
        <div
          className={
            isVisible
              ? "imgBox sign-up-imgBox "
              : "imgBox sign-up-imgBox animate__animated animate__slideInRight"
          }
        >
          <div className="sliding-link">
            <p>Already have an account?</p>
            <span
              onClick={() => setVisible(!isVisible)}
              className="sign-in-btn"
            >
              Sign in
            </span>
          </div>
          <div className="text-center">
            <img className="w-75" src={signUp} alt="" />
          </div>
          <div className="other-options " style={{ textAlign: "center" }}>
            <p className="my-3">Or use other option...</p>
          </div>
        </div>
        <div
          className={
            isVisible
              ? "form-box sign-up-box "
              : "form-box sign-up-box animate__animated animate__slideInLeft"
          }
        >
          <h2>Sign up</h2>
          <SignUpForm />
        </div>
      </div>
      {/* <ToastContainer pauseOnFocusLoss="false" /> */}
    </div>
  );
};

export default Login;
