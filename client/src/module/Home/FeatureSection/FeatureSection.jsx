import React from "react";
import "../../../assets/css/Home.css";
import featureSectionModel from "../../../assets/img/featureImage1.png";

const FeatureSection = () => {
  return (
    <div className="container-fluid pt-4 mt-0">
      <h3 className="headline text-center position-relative border-short">
        We provide more than 90+ <br /> companies to apply for
      </h3>
      <p className="description text-center pt-3 ">
        Find your Fit among the companies
      </p>
      <div className="row align-self-center">
        <img
          className="w-75 h-25 mx-auto"
          src={featureSectionModel}
          alt="hero-sec"
        />
      </div>
    </div>
  );
};

export default FeatureSection;
