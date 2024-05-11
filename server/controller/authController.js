const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const User = require("../model/userModel");

// user id at index 1 store to use it for validation
function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

// user login
const userLogin = async (data) => {
  let user = await User.findOne({ email: data.email });

  if (!user) {
    return "That user does not exisits!";
  }
  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) {
    return "Invalid Password";
  } else {
    let newObj = {
      id: user._id,
      firstName: user.fname,
      email: user.email,
      username: user.username,
      role: user.role,
      lastName: user.lname || "",
      middlename: user.middlename || "",
      phone: user.phone || "",
      dob: user.dob || ""
    };
    return newObj;
  }
};

exports.login = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await userLogin(data);

    if (result.id) {
      //create token
      let token = jwt.sign(
        { _id: result.id, email: result.email, name: result.firstName },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      //put token in cookie
      res.cookie("token", token, {
        expire: new Date() + 9999,
        sameSite: "None",
        secure: true,
      });
      let refreshToken = jwt.sign(
        { _id: result.id },
        process.env.REFRESHSECRET,
        { expiresIn: "7d" }
      );
      //send response to frontend
      res.json({
        user: result,
        token: token,
        refreshToken: refreshToken,
        msg: "Login Successful! ✅",
        status: "success",
      });
    } else {
      res.json({ msg: result, status: "error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

//new user register and save in db
const userRegister = async (data) => {
  const password = data.password;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    fname: data.fname,
    lname: data.lname,
    username: data.username,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });
  let result = await user.save();
  return result;
};

exports.register = async (req, res, next) => {
  try {
    let data = req.body;
    let checkEmail = await User.findOne({ email: data.email });
    let checkUsername = await User.findOne({ username: data.username });
    if (checkEmail) {
      return res.json({
        msg: "That Email already exisits!",
        status: "error"
      });
    }
    if (checkUsername) {
      return res.json({
        msg: "Username already in use, please choose new one.",
        status: "error"
      });
    }
    let result = await userRegister(data);
    let response = {
      email: result.email,
      fname: result.fname,
      lname: result.lname,
      role: result.role,
      phone: result.phone,
      username: result.username,
    };
    return res.json({
      msg: "Registered successfully!",
      status: "success"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// refresh token
exports.refreshaccess = async (req, res, next) => {
  try {
    const oldAccessToken = req.cookies.token;
    const refreshToken = req.body.refreshToken;
    let parsedRefreshToken = parseJwt(refreshToken);
    let parsedAccessToken = parseJwt(oldAccessToken);
    if (!refreshToken) {
      return res.json({ message: "User not authenticated!" });
    }
    let token = jwt.sign(
      {
        _id: parsedRefreshToken._id,
        email: parsedAccessToken.email,
        name: parsedAccessToken.firstName,
      },
      process.env.SECRET,
      { expiresIn: "60s" }
    );
    res.cookie("token", token, {
      expire: new Date() + 9999,
      sameSite: "None",
      secure: true,
    });
    let newRefreshToken = jwt.sign(
      { _id: parsedRefreshToken._id },
      process.env.REFRESHSECRET,
      { expiresIn: "7d" }
    );
    return res.json({ token: token, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
// refreshauthstate 
exports.refreshAuthState = async (req, res) => {
  const accessToken = req.cookies.token || req.body.refreshToken

  if (!accessToken) {
    return res.json({ message: "User not authenticated!", status: false })
  }
  if (accessToken === "undefined") {
    return res.json({ message: "User not authenticated!", status: false })
  }
  console.log(accessToken)
  let parsedAccessToken = await parseJwt(accessToken)

  let user = await User.findOne({ _id: parsedAccessToken._id })
  if (!user) return res.json({
    msg: "Login again!",
    status: "error",
  })
  // console.log(user)
  let result = {
    id: user._id,
    firstName: user.fname,
    email: user.email,
    username: user.username,
    role: user.role,
    lastName: user.lname || "",
    middlename: user.middlename || "",
    phone: user.phone || "",
    dob: user.dob || ""
  };

  if (result.id) {
    //create token
    let token = jwt.sign(
      { _id: result.id, email: result.email, name: result.firstName },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    //put token in cookie
    res.cookie("token", token, {
      expire: new Date() + 9999,
      sameSite: "None",
      secure: true,
    });
    let refreshToken = jwt.sign(
      { _id: result.id },
      process.env.REFRESHSECRET,
      { expiresIn: "7d" }
    );
    //send response to frontend
    res.json({
      user: result,
      token: token,
      refreshToken: refreshToken,
      msg: "Login Successful! ✅",
      status: "success",
    });
  };
};

//get user role
exports.getUserRole = async (req, res, next) => {
  try {
    let id = req.auth._id;
    let { role } = await User.findOne({ _id: id });
    return res.json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// signout user
exports.signout = (req, res) => {
  //clear cookies
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "u are not admin,access denied",
    });
  }
  next();
};

// signout user
exports.updateProfile = async (req, res, next) => {
  let data = req.body;
  const token = req.cookies.token;
  let { _id } = await parseJwt(token);
  let result = await User.findOneAndUpdate({ _id: _id }, data)

  res.json({
    msg: "Profile Updated successfully",
    status: "success"
  });
};