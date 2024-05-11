import React, { useState, useRef } from "react";
import "../../assets/css/userPage.css";
import SelectBox from "../../components/SelectBox/SelectBox";
import axios from "axios";
import CardC from "../../components/Card/Card";
import { toast } from "react-toastify";
import apiClient from "../../apiClient/apiClient";

const companyData = [
  {
    value: "google",
    text: "Google",
  },
  {
    value: "microsoft",
    text: "Microsoft",
  },
  {
    value: "amazon",
    text: "Amazon",
  },
  {
    value: "swiggy",
    text: "Swiggy",
  },
  {
    value: "zomato",
    text: "Zomato",
  },
  {
    value: "linkedIn",
    text: "LinkedIn",
  },
];
const profileData = [
  {
    value: "Software Engineer",
    text: "Software Engineer",
  },
  {
    value: "FrontEnd Developer",
    text: "FrontEnd Developer",
  },
  {
    value: "Backend Developer",
    text: "Backend Developer",
  },
  {
    value: "Full Stack Developer",
    text: "Full Stack Developer",
  },
];
const locationData = [
  {
    value: "India",
    text: "India",
  },
  {
    value: "Banglore",
    text: "Banglore",
  },
  {
    value: "London",
    text: "London",
  },
];

const UserJobSearchPage = () => {
  const companyRef = useRef("");
  const profileRef = useRef("");
  const locationRef = useRef("");
  const [isLoading, setIsLoading] = useState(true);

  // states
  const [jobResult, setJobResult] = useState(null);
  const [isNotified, setIsNotified] = useState(false);

  const submitQuery = async () => {
    setIsLoading(true);
    let company = companyRef.current.value;
    let profile = profileRef.current.value;
    let location = locationRef.current.value;
    let page = 1;
    console.log(company, profile, location);
    const toastRes = toast.loading("Please wait...");

    const data = { company, job: profile, location, page };
    await apiClient
      .post("/admin/scrape", data)
      .then(({ data }) => {
        setJobResult(data.result);
        setIsLoading(false);
        toast.update(toastRes, {
          render: data.msg,
          type: data.status === "success" ? "success" : "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
        if (data.notified === null) {
          setIsNotified(false);
        } else {
          setIsNotified(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notifyMe = async () => {
    let company = companyRef.current.value;
    let profile = profileRef.current.value;
    let location = locationRef.current.value;
    let page = 1;
    let jobCount = jobResult.count;
    const toastRes = toast.loading("Please wait...");

    const data = { company, job: profile, location, page, jobCount };
    await axios
      .post("http://localhost:5001/api/admin/notify", data, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        setIsNotified(true);
        toast.update(toastRes, {
          render: data.msg,
          type: data.status === "success" ? "success" : "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastRes, {
          render: err,
          type: "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
      });
  };

  const deletenotifyMe = async () => {
    let company = companyRef.current.value;
    let profile = profileRef.current.value;
    let location = locationRef.current.value;
    const toastRes = toast.loading("Please wait...");

    const data = { company, job: profile, location };
    await apiClient
      .post("/admin/deletenotibyinfo", data)
      .then(({ data }) => {
        console.log(data);
        setIsNotified(false);
        toast.update(toastRes, {
          render: data.msg,
          type: data.status === "success" ? "success" : "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastRes, {
          render: err,
          type: "error",
          isLoading: false,
          autoClose: 1500,
          theme: "dark",
          closeOnClick: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="container-fluid my-2">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="row mt-5 mb-4 ">
              <h5 className="my-3">Company</h5>
              <SelectBox
                title={"Select Company Name"}
                data={companyData}
                selectRef={companyRef}
              />
            </div>
            <div className="row my-4">
              <h5 className="my-3">Job Profile</h5>
              <SelectBox
                title={"Select Job Profile"}
                data={profileData}
                selectRef={profileRef}
              />
            </div>
            <div className="row my-4">
              <h5 className="mt-3 mb-2">Location</h5>
              <SelectBox
                title={"Select Job Location"}
                data={locationData}
                selectRef={locationRef}
              />
            </div>
            <div className="classname">
              <input
                type="button"
                className="submit-button mb-3"
                value="Submit Query"
                onClick={submitQuery}
              />
            </div>
          </div>
          <div className="col-12 col-md-8 scroll-bar">
            {!isLoading && jobResult && (
              <>
                {isNotified ? (
                  <div className="d-flex justify-content-end">
                    <input
                      type="button"
                      className="notify-btn"
                      value="Remove Notify 💔"
                      onClick={deletenotifyMe}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-end">
                    <input
                      type="button"
                      className="notify-btn"
                      value="Notify Me ❤️"
                      onClick={notifyMe}
                    />
                  </div>
                )}

                {jobResult.jobs.map((singleJob, index) => {
                  return (
                    <CardC
                      key={index}
                      companyName={companyRef.current.value}
                      singleJob={singleJob}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobSearchPage;
