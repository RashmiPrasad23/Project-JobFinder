const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fetchJobSchema = new Schema(
  {
    CompanyName: {
      type: String,
      required: true,
    },
    CompanyURL: {
      type: String,
      required: true,
    },
    CompanyLogo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FetchJob", fetchJobSchema);
