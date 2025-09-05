// const express = require("express");
// const trackingRouter = express.Router();
// const tracking = require("../../Controller/Tracking/Tracking");

// trackingRouter.put("/api/donate", tracking.updateDonateStatus);
// trackingRouter.put("/api/request", tracking.updateRequestStatus);

// module.exports = trackingRouter;

const express = require("express");
const trackingRouter = express.Router();
const tracking = require("../../Controller/Tracking/Tracking");

// PATCH instead of PUT
trackingRouter.patch("/api/donate", tracking.updateDonateStatus);
trackingRouter.patch("/api/request", tracking.updateRequestStatus);

module.exports = trackingRouter;

