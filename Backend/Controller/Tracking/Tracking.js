// const dbconnect = require("../../Model/dbconnect");

// // Update donation status
// exports.updateDonateStatus = (req, res) => {
//   const { id } = req.query;
//   const { status } = req.body;

//   const sql = "UPDATE donate_food SET status = ? WHERE id = ?";
//   dbconnect.query(sql, [status, id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Donation status updated successfully " });
//   });
// };

// // Update request status
// exports.updateRequestStatus = (req, res) => {
//   const { id } = req.query;
//   const { status } = req.body;

//   const sql = "UPDATE request_food SET status = ? WHERE id = ?";
//   dbconnect.query(sql, [status, id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: "Request status updated successfully " });
//   });
// };



const dbconnect = require("../../Model/dbconnect");

// PATCH: Update donation status
exports.updateDonateStatus = (req, res) => {
  const { id } = req.query;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Missing id or status in request" });
  }

  const sql = "UPDATE donate_food SET status = ? WHERE id = ?";
  dbconnect.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donation status updated successfully" });
  });
};

// PATCH: Update request status
exports.updateRequestStatus = (req, res) => {
  const { id } = req.query;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Missing id or status in request" });
  }

  const sql = "UPDATE request_food SET status = ? WHERE id = ?";
  dbconnect.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Request status updated successfully" });
  });
};

