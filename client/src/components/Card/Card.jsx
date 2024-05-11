import React from "react";
import { ParseMe } from "../../helper/utils";
const CardC = ({ singleJob, companyName }) => {
  return (
    <div className="container-fluid mt-3 mb-4">
      <div className="container position-relative">
        <div className="row">
          <div className="card ">
            <div className="card-body">
              <h5 className="mb-3">{singleJob.title}</h5>
              <h6>Company Name</h6>
              <p>{singleJob.companyName}</p>
              <h6>Description</h6>
              <p className="mb-0">{ParseMe(singleJob.description)}</p>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <h6>Eligibility Criteria</h6>
                {ParseMe(singleJob.qualification)}
              </li>
              <li className="list-group-item">
                <h6>Role</h6>
                {singleJob.job_schedule_type}
              </li>
              <li className="list-group-item">
                <h6>Location</h6>
                {singleJob.location}
              </li>
              <li className="list-group-item">
                <h6>Published On</h6>
                {singleJob.publishDate}
              </li>
              <li className="list-group-item">
                <h6>Apply Link</h6>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={
                    companyName === "amazon"
                      ? "https://www.amazon.jobs" + singleJob.applyLink
                      : singleJob.applyLink
                  }
                >
                  {singleJob.applyLink}
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardC;

// style={{ width: "18rem" }}
