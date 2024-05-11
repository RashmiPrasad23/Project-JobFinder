import React from "react";

const Contact = ({ data }) => {
  return (
    <>
      <form>
        <div className="field">
          <i className="fa-solid fa-paper-plane"></i>
          <input
            type="email"
            defaultValue={data.email}
            onChange={(e) => {
              data.setEmail(e.target.value);
            }}
            name="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="field">
          <i className="fa-solid fa-at"></i>
          <input
            type="text"
            defaultValue={data.username}
            onChange={(e) => {
              data.setUsername(e.target.value);
            }}
            name="username"
            placeholder="Username"
          />
        </div>

        <div className="field">
          <i className="fa-solid fa-phone"></i>
          <input
            type="tel"
            defaultValue={data.phone}
            onChange={(e) => {
              data.setPhone(e.target.value);
            }}
            name="phone"
            placeholder="Phone no."
            required
          />
        </div>

        <div className="field">
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            defaultValue={data.password}
            onChange={(e) => {
              data.setPassword(e.target.value);
            }}
            name="password"
            placeholder="password"
            required
          />
        </div>

        {/* <div className="field">
          <i className="fa-sharp fa-solid fa-lock"></i>
          <input
            type="password"
            name="cpassword"
            placeholder="Re-enter password"
            required
          />
        </div> */}

        {/* <input type="submit" className="submit-btn mb-3" value="Next"/> */}
      </form>
    </>
  );
};

export default Contact;
