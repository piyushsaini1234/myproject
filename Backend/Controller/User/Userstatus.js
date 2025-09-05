// controllers/User/UserStatus.js
const connection = require("../../Model/dbconnect");

// Get user donation + request statuses
const getUserStatus = (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const donationQuery = `
    SELECT id, donation_status AS status, created_at AS date
    FROM donate_food 
    WHERE email = ? 
    ORDER BY created_at DESC
  `;

  const requestQuery = `
    SELECT id, status, request_date 
    FROM request_food 
    WHERE email = ? 
    ORDER BY request_date DESC
  `;

  connection.query(donationQuery, [email], (err, donations) => {
    if (err) {
      console.error("Error fetching donation status:", err);
      return res.status(500).json({ error: "Failed to fetch donation status" });
    }

    connection.query(requestQuery, [email], (err2, requests) => {
      if (err2) {
        console.error("Error fetching request status:", err2);
        return res.status(500).json({ error: "Failed to fetch request status" });
      }

      res.json({ donations, requests });
    });
  });
};

module.exports = { getUserStatus };
