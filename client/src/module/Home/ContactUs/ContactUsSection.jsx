import React from "react";
import "../../../assets/css/Home.css";
import "../../../assets/css/SearchBar.css";

const ContactUsSection = () => {
  return (
    <div className="container-fluid ">
      <div className="container contactUs-box py-5 ">
        <div className="row">
          <h3 className="headline-contactus text-center position-relative border-short pt-5">
            Subscribe our Newsletter <br /> for Daily Update
          </h3>
          <p className="description-contactus text-center py-4 my-4 ">
            Be a part of us and get the latest information
          </p>
        </div>
        {/* test */}
        <form
          action="https://haxworld.us13.list-manage.com/subscribe/post?u=3b39f90dfbf84fccd460bd7f7&amp;id=02e3ab77df"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate="novalidate"
        >
          <div class="row justify-content-center">
            <div class="form-floating col-6 description ">
              <input
                type="email"
                name="EMAIL"
                class="form-control rounded-0"
                id="mce-EMAIL"
                placeholder="name@example.com"
              />
              <label for="mce-EMAIL" class="ps-4" name="EMAIL">
                Enter your Email address
              </label>
              <button
                type="submit"
                class="btn px-4   mt-0 rounded-0 sub_button"
              >
                Surprise Me
              </button>
            </div>

            <div id="mce-responses" class="clear foot">
              <div class="response  text-danger" id="mce-error-response"></div>
              <div
                class="response  text-success"
                id="mce-success-response"
              ></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsSection;
