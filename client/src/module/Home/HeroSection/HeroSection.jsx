import React from "react";
import heroSectionModel from "../../../assets/img/heroImage.png";
import leftImage from "../../../assets/img/left.png";
import "../../../style.css";
import "../../../assets/css/Home.css";
import SearchBar from "../../../components/SearchBar/SearchBar";

const HeroSection = () => {
  const placeholder = "Job title or company";
  return (
    <div className="container-fluid mb-5">
      <div className="position-absolute left-0 " style={{ zIndex: "-1" }}>
        <img className="w-75 h-75" src={leftImage} alt="background" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <h1 className="pb-3 ps-4 roboto-family">
              Your Dream Job is
              <br /> Waiting for You
            </h1>
            <p className="ps-4 mt-3 hero-para-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              condimentum, ex a gravida varius, nisl neque
              <br /> posuere est, sed .
            </p>
            <div classname="search-bar-container">
              <SearchBar placeholder={placeholder} />
            </div>
          </div>
          <div className="col-lg-6 d-flex">
            <img
              className="w-100 h-100 p-4 mx-auto"
              src={heroSectionModel}
              alt="hero-sec"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
