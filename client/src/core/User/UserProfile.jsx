import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/userPage.css";
import Base from "../../layouts/Base";
import profileImage from "../../assets/img/team-5.jpg";
import apiClient from "../../apiClient/apiClient";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";

const UserProfile = () => {
  // state
  const [allNoti, setAllNoti] = useState(null);
  const { authUser } = useContext(GlobalContext);

  const fetchedNoti = async () => {
    await apiClient
      .get("/admin/viewnotified")
      .then(({ data }) => {
        console.log(data);
        setAllNoti(data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NO NEED WE ARE USING THIS FROM GLOBALCONTEXT ONLY
  // const getUserDetail = async () => {
  //   await apiClient.get('/admin/userdetail')
  //     .then(({ data }) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  useEffect(() => {
    fetchedNoti();
    // getUserDetail();
  }, []);

  const deleteSingleNotification = async (id) => {
    const toastRes = toast.loading("Please wait...");

    await apiClient
      .delete(`/admin/deletenoti/${id}`)
      .then(({ data }) => {
        console.log(data);
        toast.update(toastRes, {
          render: data.msg,
          type: data.status === "success" ? "success" : "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
        const filteredNoti = allNoti.filter(
          (item) => item._id !== data.result._id
        );
        setAllNoti(filteredNoti);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base>
      <div className="container-fluid" id="base">
        <div className="container my-5 mt-1">
          <div className="row profile-container py-3 ">
            <div className="py-3">
              <img
                src={profileImage}
                alt=""
                className=" rounded-circle shadow-sm m-auto d-flex"
                height={150}
                width={150}
              />
            </div>
            <div className="px-5">
              <h5 className="mb-2 text-center fs-5">{`${authUser.fname} ${authUser.lname}`}</h5>
              {authUser.email && (
                <p className="mb-2 text-center fs-6">
                  email id : {authUser.email}
                </p>
              )}
              {authUser.dob && (
                <p className=" text-center fs-6">D.O.B : {authUser.dob}</p>
              )}
            </div>
          </div>
          <div className="row my-3">
            <h6>Marked for Notifications</h6>
            {allNoti && (
              <>
                <div class="row">
                  {allNoti.map((singleNotification, index) => {
                    return (
                      <div class="col-sm-6" key={index}>
                        <div class="card">
                          <div class="card-body">
                            <span className="d-flex justify-content-end">
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteSingleNotification(
                                    singleNotification._id
                                  );
                                }}
                              >
                                Delete
                              </button>
                            </span>
                            <h5 class="card-title">
                              {singleNotification.companyName.toUpperCase()}
                            </h5>
                            <p class="card-text">
                              Location: {singleNotification.location}
                            </p>
                            <p class="card-text">
                              Job Profile: {singleNotification.profile}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UserProfile;
