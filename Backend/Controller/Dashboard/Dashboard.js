// const connection = require("../../Model/dbconnect");

// // Get total counts for dashboard

// const getDashboard = (req, res) => {
//   const totalDonationQuery = "SELECT COUNT(*) AS totalDonations FROM donate_food";
//   const totalRequestQuery = "SELECT COUNT(*) AS totalRequests FROM request_food";

//   connection.query(totalDonationQuery, (err1, donationResult) => {
//     if (err1) return res.status(500).json({ message: "Error fetching donations" });

//     connection.query(totalRequestQuery, (err2, requestResult) => {
//       if (err2) return res.status(500).json({ message: "Error fetching requests" });

//       res.status(200).json({
//         totalDonations: donationResult[0].totalDonations,
//         totalRequests: requestResult[0].totalRequests,
//       });
//     });
//   });
// };

// module.exports = { getDashboard };



const connection = require("../../Model/dbconnect");

const getDashboard = (req, res) => {
  const queries = {
    totalDonations: "SELECT COUNT(*) AS totalDonations FROM donate_food",
    totalRequests: "SELECT COUNT(*) AS totalRequests FROM request_food",
    donated: "SELECT COUNT(*) AS donated FROM donate_food WHERE LOWER(status) = 'donated'",
    donateApproved: "SELECT COUNT(*) AS donateApproved FROM donate_food WHERE LOWER(status) = 'approved'",
    donatePickedup: "SELECT COUNT(*) AS donatePickedup FROM donate_food WHERE LOWER(status) = 'picked up'",
    donateCompleted: "SELECT COUNT(*) AS donateCompleted FROM donate_food WHERE LOWER(status) = 'completed'",
    requestRequested: "SELECT COUNT(*) AS requestRequested FROM request_food WHERE LOWER(status) = 'requested'",
    requestApproved: "SELECT COUNT(*) AS requestApproved FROM request_food WHERE LOWER(status) = 'approved'",
    requestPreparing: "SELECT COUNT(*) AS requestPreparing FROM request_food WHERE LOWER(status) = 'preparing'",
    requestOutForDelivery: "SELECT COUNT(*) AS requestOutForDelivery FROM request_food WHERE LOWER(status) = 'out for delivery'",
    requestDelivered: "SELECT COUNT(*) AS requestDelivered FROM request_food WHERE LOWER(status) = 'delivered'",
    totalNGOs: "SELECT COUNT(*) AS totalNGOs FROM ngo_Signup",       
    totalUsers: "SELECT COUNT(*) AS totalUsers FROM user_signup",     
  };

  const results = {};
  const keys = Object.keys(queries);

  let completed = 0;

  keys.forEach((key) => {
    connection.query(queries[key], (err, result) => {
      if (err) return res.status(500).json({ message: `Error fetching ${key}` });
      results[key] = result[0][key];
      completed++;

      if (completed === keys.length) {
        res.status(200).json(results);
      }
    });
  });
};

module.exports = { getDashboard };

