import React, { useContext } from "react";
import "../../assets/css/userPage.css";
import Base from "../../layouts/Base";
import userImage from "../../assets/img/team-5.jpg";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [preview, setPreview] = useState(userImage);
  const [detailVisible, setDetailVisibility] = useState(true);
  const [passVisible, setPassVisibility] = useState(false);
  const userRef = useRef([]);
  const { authUser } = useContext(GlobalContext);

  const uploadProfilePic = async (file) => {
    console.log(file);
    const data = new FormData();
    data.append("photo", file);
    axios
      .post("user/uploadimage", data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(data);
      });
  };

  const getProfileDetail = async () => {
    await axios
      .get("/user/profile")
      .then(({ data }) => {
        console.log(data);
        userRef.current[0].value = data.fname || "";
        userRef.current[1].value = data.middlename || "";
        userRef.current[2].value = data.lname || "";
        userRef.current[3].value = data.username || "";
        userRef.current[4].value = data.dob.split("T")[0] || "";

        userRef.current[5].value = data.phone || "";
        userRef.current[6].value = data.email || "";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // getProfileDetail();
    console.log(authUser);
  }, []);

  const submitDetail = async () => {
    let fname = userRef.current[0].value;
    let middlename = userRef.current[1].value;
    let lname = userRef.current[2].value;
    let dob = userRef.current[5].value.split("T")[0];
    let phone = userRef.current[9].value;
    let email = userRef.current[10].value;
    let bodyData = { fname, middlename, lname, dob, phone, email };

    await apiClient
      .post("/auth/updateprofile", bodyData)
      .then(({ data }) => {
        console.log(data);
        toast.success(data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base>
      <div className="container-fluid " id="base">
        <div className="container ">
          {/* Profile image */}
          <div className={detailVisible ? "row my-5" : "hide"}>
            <div className="col-lg-3 col-md-12 d-flex flex-wrap justify-content-center">
              <div>
                <img
                  src={preview}
                  alt=""
                  className="border rounded-circle"
                  height={130}
                  width={130}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <label style={{ position: "relative" }}>
                <form>
                  <input
                    style={{ display: "none" }}
                    name="photo"
                    type="file"
                    id="inpFile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreview(reader.result);
                          uploadProfilePic(file);
                          // uploadimage
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setPreview(userImage);
                      }
                    }}
                  />
                </form>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "-2px",
                    background: "#2c428f",
                    height: "34px",
                    width: "34px",
                  }}
                >
                  <i
                    className="fa-solid fa-pencil pe-2 ms-2"
                    style={{ color: "wheat" }}
                  ></i>
                </div>
              </label>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="">
                <div className="mb-3 col-lg-4">
                  <label htmlFor="fname" className={"form-label fw-bolder"}>
                    First Name
                  </label>
                  <input
                    // style={{ background: "#f6b58421" }}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    ref={(el) => (userRef.current[0] = el)}
                    defaultValue={authUser.fname}
                  />
                </div>
                <div className="mb-3 col-lg-4">
                  <label
                    htmlFor="middlename"
                    className={"form-label fw-bolder"}
                  >
                    Middle Name
                  </label>
                  <input
                    // style={{ background: "#f6b58421" }}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    defaultValue={authUser.middlename}
                    ref={(el) => (userRef.current[1] = el)}
                  />
                </div>
                <div className="mb-3 col-lg-4">
                  <label htmlFor="lname" className={"form-label fw-bolder"}>
                    Last Name
                  </label>
                  <input
                    // style={{ background: "#f6b58421" }}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    defaultValue={authUser.lname}
                    ref={(el) => (userRef.current[2] = el)}
                  />
                </div>

                <div className="mb-3 col-lg-4">
                  <label
                    htmlFor="inputEmail4"
                    className={"form-label fw-bolder"}
                  >
                    DOB
                  </label>
                  <input
                    // style={{ background: "#f6b58421" }}
                    type="date"
                    className="form-control"
                    name="dob"
                    placeholder="Date"
                    defaultValue={authUser.dob}
                    ref={(el) => (userRef.current[5] = el)}
                  />
                </div>

                <div className="mb-3 col-lg-4">
                  <label
                    htmlFor="inputEmail4"
                    className={"form-label fw-bolder"}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Phone Number"
                    defaultValue={authUser.phone}
                    ref={(el) => (userRef.current[9] = el)}
                  />
                </div>

                <div className="mb-3 col-lg-4">
                  <label
                    htmlFor="collegeName"
                    className={"form-label fw-bolder"}
                  >
                    Email
                  </label>

                  <input
                    // style={{ background: "#f6b58421" }}
                    type="email"
                    className="form-control"
                    name="collegeName"
                    placeholder="College Name"
                    defaultValue={authUser.email}
                    ref={(el) => (userRef.current[10] = el)}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <input
                    type="button"
                    className={"inp-tab colour"}
                    value="Save Changes"
                    onClick={() => submitDetail()}
                  />
                  <input
                    type="button"
                    className={"inp-tab colour"}
                    value="Password Change"
                    onClick={() => {
                      setDetailVisibility(!detailVisible);
                      setPassVisibility(!passVisible);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* change password */}
          <div
            className={
              passVisible
                ? "d-flex justify-content-center align-items-center flex-column"
                : "hide"
            }
          >
            <div className="form-group  col-lg-7 pt-3 ">
              <label htmlFor="state" className={"fw-bolder change-colour"}>
                Current Password
              </label>

              <input
                // style={{ background: "#f6b58421" }}
                type="text"
                className="form-control"
                name="old-password"
                placeholder="Current Password"
              />
            </div>
            <div className="form-group  col-lg-7 pt-3 ">
              <label htmlFor="state" className={"fw-bolder change-colour"}>
                New Password
              </label>

              <input
                // style={{ background: "#f6b58421" }}
                type="text"
                className="form-control"
                name="new-password"
                placeholder="New Password"
              />
            </div>
            <div className="form-group  col-lg-7 pt-3 ">
              <label htmlFor="state" className={"fw-bolder change-colour"}>
                Confirm Password
              </label>

              <input
                // style={{ background: "#f6b58421" }}
                type="text"
                className="form-control"
                name="confirm-password"
                placeholder="Confirm Password"
              />
              <div className={"pt-3 d-flex justify-content-between"}>
                <input
                  type="button"
                  className={"inp-tab colour"}
                  value="Set"
                  onClick={() => {}}
                />
                <input
                  type="button"
                  className={"inp-tab colour"}
                  value="Close"
                  onClick={() => {
                    setDetailVisibility(!detailVisible);
                    setPassVisibility(!passVisible);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default EditProfile;
