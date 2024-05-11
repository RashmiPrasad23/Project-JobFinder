const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoConnect = require("./config/mongoose");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/img", express.static("assets"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// track req
app.use(morgan("dev"));
// Initializing route
const useRouter = require("./router");
app.use("/api", useRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

// run db and server together
mongoConnect(() => {
  //server start after mongo connect and returning the port
  app.listen(process.env.PORT || 5000, () => {
    console.log(`http://localhost:${process.env.PORT || 5000}`);
  });
});
