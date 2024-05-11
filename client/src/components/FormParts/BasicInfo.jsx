import React from "react";

const BasicInfo = ({ data }) => {
  return (
    <>
      <form>
        <div className="field">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            defaultValue={data.fname}
            onChange={(e) => {
              data.setFname(e.target.value);
            }}
            name="fname"
            placeholder="First name"
            required
          />
        </div>

        <div className="field">
          <i className="fa-regular fa-user"></i>
          <input
            type="text"
            defaultValue={data.middlename}
            onChange={(e) => {
              data.setMiddlename(e.target.value);
            }}
            name="middlename"
            placeholder="Middle name"
          />
        </div>

        <div className="field">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            defaultValue={data.lname}
            onChange={(e) => {
              data.setLname(e.target.value);
            }}
            name="lname"
            placeholder="Last name"
            required
          />
        </div>

        <div className="field">
          <i className="fa-solid fa-calendar-days"></i>
          <input
            type="date"
            defaultValue={data.dob}
            onChange={(e) => {
              data.setDob(e.target.value);
            }}
            name="dob"
            placeholder="DOB"
            className="date-input"
            style={{ fontSize: "0.85em" }}
            required
          />
        </div>

        {/* <input type="submit" className="submit-btn mb-3" value="Next"/> */}
      </form>
    </>
  );
};

export default BasicInfo;
