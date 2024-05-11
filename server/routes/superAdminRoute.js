const express = require("express");
const { scrape, notify, startloop, viewnotified, deleteNotification, getUserDetail, deleteNotificationByDetails } = require("../controller/superAdminController");
const superAdminRoute = express.Router();

superAdminRoute.post("/scrape", scrape);
superAdminRoute.post("/notify", notify);
superAdminRoute.get("/startloop", startloop);
superAdminRoute.get("/viewnotified", viewnotified);
superAdminRoute.delete("/deletenoti/:deleteid", deleteNotification);
superAdminRoute.post("/deletenotibyinfo", deleteNotificationByDetails);
superAdminRoute.get("/userdetail", getUserDetail);

//Export
module.exports = superAdminRoute;
