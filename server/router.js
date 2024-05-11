const express = require("express");
const useRouter = express.Router();

//Authentication Router
const authRouter = require("./routes/authRoute");
useRouter.use("/auth", authRouter);

// //Super Admin Router
const adminRouter = require("./routes/superAdminRoute");
useRouter.use("/admin", adminRouter);

// //user Router
// const userRouter = require('./routes/userRoute');
// useRouter.use('/user', userRouter);

//Export
module.exports = useRouter;
