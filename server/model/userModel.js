const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    lname: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    phone: {
      type: Number,
      unique: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      default: Math.floor(Math.random() * 2000),
    },
    password: {
      type: String,
      trim: true,
    },
    profileImg: {
      type: String,
    },
    jobsApplied: {
      type: Array,
      default: [],
    },
    //TODO: come back here
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
