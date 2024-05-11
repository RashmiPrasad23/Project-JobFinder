const express = require("express");
const {
  login,
  refreshaccess,
  register,
  signout,
  getUserRole,
  refreshAuthState,
  updateProfile,
} = require("../controller/authController");
const authRoute = express.Router();

authRoute.post("/login", login);
// authRoute.get("/role", isSignedIn,);

authRoute.post("/register", register);
authRoute.post("/refreshaccess", refreshaccess);
authRoute.post("/refreshauthstate", refreshAuthState);
authRoute.post("/updateprofile", updateProfile);

authRoute.get("/signout", signout);

//Export
module.exports = authRoute;
