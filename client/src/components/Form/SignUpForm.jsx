import React, { useState } from "react";
import "../../assets/css/Auth.css";
import BasicInfo from "../FormParts/BasicInfo";
import Contact from "../FormParts/Contact";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [page, setPage] = useState(1);
  const [fname, setFname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    let data = {
      fname,
      middlename,
      lname,
      dob,
      email,
      username,
      phone,
      password,
    };
    axios
      .post("http://localhost:5001/api/auth/register", data)
      .then(({ data }) => {
        console.log(data);
        if (data.status === "success") {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {page === 1 ? (
        <BasicInfo
          data={{
            fname,
            middlename,
            lname,
            dob,
            setFname,
            setMiddlename,
            setLname,
            setDob,
          }}
        />
      ) : (
        <Contact
          data={{
            email,
            username,
            phone,
            password,
            setEmail,
            setUsername,
            setPhone,
            setPassword,
          }}
        />
      )}

      <div className="d-flex justify-content-between">
        {page > 1 && (
          <input
            type="submit"
            className="submit-btn mb-3"
            onClick={() => {
              setPage(page - 1);
            }}
            value="Back"
          />
        )}
        {page < 2 && (
          <input
            type="submit"
            className="submit-btn mb-3"
            onClick={() => {
              setPage(page + 1);
            }}
            value="Next"
          />
        )}
        {page === 2 && (
          <input
            type="button"
            className="submit-btn mb-3"
            value="submit"
            onClick={signUp}
          />
        )}
      </div>
    </>
  );
};

export default SignUpForm;
