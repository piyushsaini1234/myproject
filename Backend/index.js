
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000 ;


const donateFoodRouter = require('./Route/DonateFood/DonateFood');
app.use('/', donateFoodRouter);


const requestFoodRouter = require('./Route/RequestFood/RequestFood');
app.use('/', requestFoodRouter);

const signupRouter = require("./Route/NgoPartner/Signup/Signup");
app.use("/", signupRouter);


const loginRouter = require("./Route/NgoPartner/Login/Login");
app.use("/", loginRouter);

const dashboardRouter = require("./Route/Dashboard/Dashboard");
app.use("/", dashboardRouter);

const router = require("./Route/DonateFoodStatus/DonateFoodStatus");
app.use("/", router);

const trackingRouter = require("./Route/Tracking/Tracking");
app.use("/", trackingRouter);


const UserSignupRouter = require("./Route/UserSignup/UserSignup");
app.use("/", UserSignupRouter);


const UserLoginRouter = require("./Route/UserLogin/UserLogin");
app.use("/", UserLoginRouter);

const UserAllNGOs = require("./Route/AllNGOs/AllNGOs")
app.use("/",UserAllNGOs)

const AllUsersRoute = require("./Route/AllUsers/AllUsers");
app.use("/", AllUsersRoute);

const AdminSignupRouter = require("./Route/Admin/Signup/Signup");
app.use("/", AdminSignupRouter);


const AdminLoginRouter = require("./Route/Admin/Login/Login");
app.use("/", AdminLoginRouter);


const AdminProfileRouter = require("./Route/Admin/Profile/Profile");
app.use("/", AdminProfileRouter);

const imageRouter = require('./Route/Admin/Profile/ImageRoute')
app.use("/uploads", express.static("uploads"));
app.use("/api/images", imageRouter);


const userRoute = require("./Route/User/UserStatus");
app.use("/", userRoute);


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
