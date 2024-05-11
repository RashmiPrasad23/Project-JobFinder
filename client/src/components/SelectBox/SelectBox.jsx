import React, { useRef } from "react";
import "../../assets/css/userPage.css";

const SelectBox = ({ title, data, selectRef }) => {
  return (
    <div className="container">
      <select
        ref={selectRef}
        className="form-select"
        aria-label="Default select example"
      >
        <option defaultValue={0}>{title}</option>
        {data.map((single, index) => {
          return (
            <option value={single.value} key={single.value}>
              {single.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
