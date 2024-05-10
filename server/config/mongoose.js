const mongoose = require("mongoose");

//db connection

//db jb cnnect ho jaayega tb index.js se line no. 32 se 34 as a callback function pass ho jaayega and call krenge phir hm usey
const mongoConnect = (callback) => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("db connected");
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

module.exports = mongoConnect;
