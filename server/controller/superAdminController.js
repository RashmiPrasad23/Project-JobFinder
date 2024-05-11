const axios = require("axios");
const NotifyJob = require("../model/notifyJob");
const { parseJwt } = require("../helper/utils");
const userModel = require("../model/userModel");
const { sendEmail } = require("../helper/sendMail");
const scrapeGoogle = async (data) => {
  //https://careers.google.com/api/v3/search/?distance=50&page=8&q=Software%20Engineer&location=India
  let q = encodeURIComponent(data.job);
  let location = encodeURIComponent(data.location);
  let page = data.page;
  let url = `https://careers.google.com/api/v3/search/?distance=50&page=${page}&q=${q}&location=${location}`;

  let result = await axios.get(url);
  const job = [];
  result.data.jobs.map((singleJob, index) => {
    job.push({
      title: singleJob.title,
      companyName: singleJob.company_name,
      location: singleJob.locations[0].display,
      description: singleJob.description,
      responsibilities: singleJob.responsibilities,
      qualification: singleJob.qualifications,
      publishDate: singleJob.publish_date,
      applyLink: singleJob.apply_url,
    });
  });
  let finaldata = {
    count: result.data.count,
    jobs: job,
  };
  return finaldata;
};

const scrapeAmazon = async (data) => {
  //https://www.amazon.jobs/en/search?base_query=software+engineer&loc_query=India&latitude=&longitude=&loc_group_id=&invalid_location=false&country=IND&city=&region=&county=
  let q = encodeURIComponent(data.job);
  let location = encodeURIComponent(data.location);
  //   let page = data.page;
  let url = `https://www.amazon.jobs/en/search.json?base_query=${q}&loc_query=${location}`;
  console.log(url);

  let result = await axios.get(url);
  const job = [];
  result.data.jobs.map((singleJob, index) => {
    // console.log(singleJob);
    job.push({
      title: singleJob.title,
      companyName: singleJob.company_name,
      location: singleJob.normalized_location,
      description: singleJob.description_short,
      //   responsibilities: singleJob.responsibilities,
      qualification: singleJob.basic_qualifications,
      job_schedule_type: singleJob.job_schedule_type,
      publishDate: singleJob.posted_date,
      applyLink: singleJob.job_path,
    });
  });
  let finaldata = {
    count: result.data.hits,
    jobs: job,
  };
  return finaldata;
};

exports.scrape = async (req, res, next) => {
  try {
    let data = req.body;
    const token = req.cookies.token;
    let parsedToken = await parseJwt(token);
    let result = "";
    if (data.company.toString() === "google") {
      result = await scrapeGoogle(data);
    } else if (data.company.toString() === "amazon") {
      result = await scrapeAmazon(data);
    }

    let isNotiExists = await NotifyJob.findOne({
      userId: parsedToken._id,
      companyName: data.company.toString(),
      location: data.location,
      profile: data.job,
    });
    console.log(isNotiExists);
    // let result = await scrapeGoogle(data);
    //send response to frontend
    res.json({
      notified: isNotiExists,
      result,
      msg: "Successful! ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

exports.notify = async (req, res, next) => {
  try {
    let data = req.body;
    const token = req.cookies.token;
    let parsedToken = await parseJwt(token);
    const notifyJob = new NotifyJob({
      companyName: data.company,
      location: data.location,
      profile: data.job,
      currentCount: data.jobCount,
      userId: parsedToken._id,
    });
    let result = await notifyJob.save();
    res.json({
      result,
      msg: "You will be Notified! ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};

const loopNotification = async () => {
  setTimeout(async () => {
    let allNotiJobs = await NotifyJob.find({});
    allNotiJobs.map(async (singleNotification, index) => {
      let currCount = parseInt(singleNotification.currentCount);
      let data = {
        job: singleNotification.profile,
        location: singleNotification.location,
        page: 1,
      };
      let newRes = {};
      if (singleNotification.companyName === "amazon") {
        newRes = await scrapeAmazon(data);
      } else if (singleNotification.companyName === "google") {
        newRes = await scrapeGoogle(data);
      }
      // TODO: change currCount -1 here
      if (parseInt(newRes.count) !== currCount - 1) {
        console.log("not same");
        await NotifyJob.findOneAndUpdate(
          { _id: singleNotification._id },
          { currentCount: parseInt(newRes.count) }
        );
        console.log(singleNotification.userId);
        try {
          let user = await userModel.findOne({
            _id: singleNotification.userId,
          });
          console.log("sending mail");
          sendEmail(
            user.email,
            user.username,
            "You have new Notification",
            `Hello ${user.username}, there are new changes for your specified requirements!`
          );
        } catch (err) {
          //
        }
      } else {
        console.log("same hai", newRes.count, currCount);
      }
    });
    console.log(allNotiJobs);
  }, 1000);
};

exports.startloop = async (req, res, next) => {
  try {
    loopNotification();
    res.json({
      msg: "Loop Started ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};
exports.viewnotified = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let parsedToken = await parseJwt(token);
    let myNotification = await NotifyJob.find({ userId: parsedToken._id });
    res.json({
      result: myNotification,
      msg: "Loop Started ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let { _id } = await parseJwt(token);
    console.log(_id, req.params.deleteid);
    let deleteNoti = await NotifyJob.findOneAndDelete({
      userId: _id,
      _id: req.params.deleteid,
    });
    res.json({
      result: deleteNoti,
      msg: "Deleted ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};
exports.deleteNotificationByDetails = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let { _id } = await parseJwt(token);
    let data = req.body;
    await NotifyJob.findOneAndDelete({
      userId: _id,
      companyName: data.company.toString(),
      location: data.location,
      profile: data.job,
    });
    return res.json({
      msg: "Removed! ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};

exports.getUserDetail = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let { _id } = await parseJwt(token);
    let result = await userModel.findOne({ _id: _id });
    res.json({
      result: result,
      msg: "Deleted ✅",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Oho! error occoured!",
      status: "error",
    });
  }
};
